(ns metabase.driver.h2tcp-test
  (:require [expectations :refer :all]
            [metabase
             [db :as mdb]
             [driver :as driver]
             [query-processor :as qp]]
            [metabase.driver.h2tcp :as h2]
            [metabase.models.database :refer [Database]]
            [metabase.test.data.datasets :refer [expect-with-engine]]
            [metabase.test.util :as tu]
            [toucan.db :as db])
  (:import metabase.driver.h2tcp.H2TcpDriver))

(expect-with-engine :h2
                    "UTC"
                    (tu/db-timezone-id))
