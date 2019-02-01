(ns metabase.driver.wsql
  (:require [clojure.string :as s]
            [honeysql.core :as hsql]
            [metabase.driver.h2 :as h2]
            [metabase
             [db :as mdb]
             [driver :as driver]
             [util :as u]]
            [metabase.db.spec :as dbspec]
            [metabase.driver.generic-sql :as sql]
            [metabase.models.database :refer [Database]]
            [metabase.util.honeysql-extensions :as hx]
            [toucan.db :as db])
  (:import (ai.platon.pulsar.ql H2Config)))

(defn- connection-details->spec
  "Create a database specification for a h2 database."
  [{:keys [host port db]
    :or {host "localhost", port 9092, db "test"}
    :as opts}]
  (merge {:classname "org.h2.Driver" ; must be in classpath
          :subprotocol "h2"
          :subname (str "tcp://" host ":" port "/~/" db)}
         (dissoc opts :host :port :db)))

(defn- humanize-connection-error-message [message]
  (condp re-matches message
    #"^Connection is broken .*$"
    (driver/connection-error-messages :cannot-connect-check-host-and-port)

    #"^Database .* not found .*$"
    (driver/connection-error-messages :cannot-connect-check-host-and-port)

    #"^Wrong user name or password .*$"
    (driver/connection-error-messages :username-or-password-incorrect)

    #".*" ; default
    message))

(defrecord WSQLDriver []
  clojure.lang.Named
  (getName [_] "Web SQL"))

(u/strict-extend WSQLDriver
  driver/IDriver
  (merge (sql/IDriverSQLDefaultsMixin)
         {
           :can-connect?          (constantly true)
           :date-interval                     (u/drop-first-arg h2/h2-date-interval)
           :details-fields                    (constantly [{:name         "host"
                                                             :display-name "Host"
                                                             :default      "localhost"}
                                                            {:name         "port"
                                                             :display-name "Port"
                                                             :type         :integer
                                                             :default      9092}
                                                            {:name         "dbname"
                                                             :display-name "Database name"
                                                             :placeholder  "test"
                                                             :required     true}
                                                            {:name         "user"
                                                             :display-name "Database username"
                                                             :placeholder  "sa"
                                                             :required     true}
                                                            {:name         "password"
                                                             :display-name "Database password, default: sa"
                                                             :type         :password
                                                             :placeholder  "*******"}
                                                          ])
           :humanize-connection-error-message (u/drop-first-arg humanize-connection-error-message)
           :current-db-time                   (driver/make-current-db-time-fn h2/h2-db-time-query h2/h2-date-formatters)})

  sql/ISQLDriver
  (merge (sql/ISQLDriverDefaultsMixin)
         {:active-tables             sql/post-filtered-active-tables
          :column->base-type         (u/drop-first-arg h2/h2-column->base-type)
          :connection-details->spec  (u/drop-first-arg connection-details->spec)
          :date                      (u/drop-first-arg h2/h2-date)
          :string-length-fn          (u/drop-first-arg h2/h2-string-length-fn)
          :unix-timestamp->timestamp (u/drop-first-arg h2/h2-unix-timestamp->timestamp)}))

(defn -init-driver
  "Register the Web SQL driver"
  []
  (. H2Config config)
  (driver/register-driver! :wsql (WSQLDriver.)))
