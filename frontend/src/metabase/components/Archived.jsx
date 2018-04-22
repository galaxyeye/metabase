import React from "react";
import EmptyState from "metabase/components/EmptyState";
import Link from "metabase/components/Link";
import { t } from "c-3po";
const Archived = ({ entityName, linkTo }) => (
  <div className="full-height flex justify-center align-center">
    <EmptyState
      message={
        <div>
          <div>{t`${entityName} 已归档`}</div>
          <Link
            to={linkTo}
            className="my2 link"
            style={{ fontSize: "14px" }}
          >{t`查看存档`}</Link>
        </div>
      }
      icon="viewArchive"
    />
  </div>
);

export default Archived;
