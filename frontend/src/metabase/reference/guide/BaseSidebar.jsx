/* eslint "react/prop-types": "warn" */
import React from "react";
import PropTypes from "prop-types";
import S from "metabase/components/Sidebar.css";
import { t } from "c-3po";
import Breadcrumbs from "metabase/components/Breadcrumbs.jsx";
import SidebarItem from "metabase/components/SidebarItem.jsx";

import cx from "classnames";
import pure from "recompose/pure";

const BaseSidebar = ({ style, className }) => (
  <div className={cx(S.sidebar, className)} style={style}>
    <div className={S.breadcrumbs}>
      <Breadcrumbs
        className="py4"
        crumbs={[[t`数据源`]]}
        inSidebar={true}
        placeholder={t`数据源`}
      />
    </div>
    <ol>
      <SidebarItem
        key="/reference/guide"
        href="/reference/guide"
        icon="reference"
        name={t`开始`}
      />
      <SidebarItem
        key="/reference/metrics"
        href="/reference/metrics"
        icon="ruler"
        name={t`指标集`}
      />
      <SidebarItem
        key="/reference/segments"
        href="/reference/segments"
        icon="segment"
        name={t`表集`}
      />
      <SidebarItem
        key="/reference/databases"
        href="/reference/databases"
        icon="database"
        name={t`数据库和表`}
      />
    </ol>
  </div>
);

BaseSidebar.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export default pure(BaseSidebar);
