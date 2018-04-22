import React, { Component } from "react";
import { t } from "c-3po";
import Icon from "metabase/components/Icon.jsx";

export default class Unauthorized extends Component {
  render() {
    return (
      <div className="flex layout-centered flex-full flex-column text-grey-2">
        <Icon name="key" size={100} />
        <h1 className="mt4">{t`抱歉，您没有权限访问该页面。`}</h1>
      </div>
    );
  }
}
