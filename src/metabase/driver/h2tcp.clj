(ns metabase.driver.h2tcp
  (:require [clojure.string :as s]
            [honeysql.core :as hsql]
            [metabase.driver.h2 :as h2]
            [metabase
             [driver :as driver]
             [util :as u]]
            [metabase.driver.generic-sql :as sql]
            [metabase.models.database :refer [Database]]
            [clojure.java.jdbc :as jdbc])
  (:import (ai.platon.pulsar.ql H2Config)))

(defn- connection-details->spec
  "Create a database specification for a h2 database."
  [{:keys [host port dbname]
    :or   {host "localhost", port 9092, dbname "xsqltest"}
    :as   opts}]
  (merge {:classname   "org.h2.Driver"                      ; must be in classpath
          :subprotocol "h2"
          :subname     (str "tcp://" host ":" port "/~/" dbname)
          :user "sa"
          :password "sa"}
         (dissoc opts :host :port :dbname :user :password)))

(defn- can-connect? [details]
  (let [connection-spec (connection-details->spec details)]
    (= 1 (first (vals (first (jdbc/query connection-spec ["select 1"])))))))

(defn- humanize-connection-error-message [message]
  (condp re-matches message
    #"^Connection is broken .*$"
    (driver/connection-error-messages :cannot-connect-check-host-and-port)

    #"^Database .* not found .*$"
    (driver/connection-error-messages :cannot-connect-check-host-and-port)

    #"^Wrong user name or password .*$"
    (driver/connection-error-messages :username-or-password-incorrect)

    #".*"                                                   ; default
    message))

(defrecord H2TcpDriver []
  clojure.lang.Named
  (getName [_] "X-SQL"))

(u/strict-extend H2TcpDriver
                 driver/IDriver
                 (merge (sql/IDriverSQLDefaultsMixin)
                        {
                         :can-connect?                      (u/drop-first-arg can-connect?)
                         :date-interval                     (u/drop-first-arg h2/h2-date-interval)
                         :details-fields                    (constantly [
                                                                         ;{:name         "host"
                                                                         ; :display-name "Host (localhost)"
                                                                         ; :default      "localhost"}
                                                                         ;{:name         "port"
                                                                         ; :display-name "Port (9092)"
                                                                         ; :type         :integer
                                                                         ; :default      9092}
                                                                         {:name         "dbname"
                                                                          :display-name "Database name"
                                                                          :placeholder  "xsqltest"
                                                                          :required     true}
                                                                         ;{:name         "user"
                                                                         ; :display-name "Database username (sa)"
                                                                         ; :placeholder  "sa"
                                                                         ; :required     true}
                                                                         ;{:name         "password"
                                                                         ; :display-name "Database password (sa)"
                                                                         ; :type         :password
                                                                         ; :placeholder  "*******"}
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
  "Register the H2tcp driver"
  []
  (. H2Config config)
  (driver/register-driver! :h2tcp (H2TcpDriver.))
  )
