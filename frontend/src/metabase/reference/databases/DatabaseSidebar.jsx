/* eslint "react/prop-types": "warn" */
import React from "react";
import PropTypes from "prop-types";
import S from "metabase/components/Sidebar.css";
import { t } from "c-3po";
import Breadcrumbs from "metabase/components/Breadcrumbs.jsx";
import SidebarItem from "metabase/components/SidebarItem.jsx";

import cx from "classnames";
import pure from "recompose/pure";

const DatabaseSidebar = ({ database, style, className }) => (
  <div className={cx(S.sidebar, className)} style={style}>
    <ul>
      <div className={S.breadcrumbs}>
        <Breadcrumbs
          className="py4"
          crumbs={[[t`数据库`, "/reference/databases"], [database.name]]}
          inSidebar={true}
          placeholder={t`数据库`}
        />
      </div>
      <SidebarItem
        key={`/reference/databases/${database.id}`}
        href={`/reference/databases/${database.id}`}
        icon="document"
        name={t`Details`}
      />
      <SidebarItem
        key={`/reference/databases/${database.id}/tables`}
        href={`/reference/databases/${database.id}/tables`}
        icon="table2"
        name={t`${database.name} 的表格`}
      />
    </ul>
  </div>
);
DatabaseSidebar.propTypes = {
  database: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default pure(DatabaseSidebar);
