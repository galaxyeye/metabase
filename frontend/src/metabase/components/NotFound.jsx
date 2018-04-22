import React, { Component } from "react";
import { Link } from "react-router";
import { t } from "c-3po";
import * as Urls from "metabase/lib/urls";

export default class NotFound extends Component {
  render() {
    return (
      <div className="layout-centered flex full">
        <div className="p4 text-bold">
          <h1 className="text-brand text-light mb3">{t`我们有点迷失...`}</h1>
          <p className="h4 mb1">
            {t`您访问的页面可能被外星人虏走了。`}.
          </p>
          <p className="h4">{t`您可能输入了一个错误的链接。`}</p>
          <p className="h4 my4">{t`您可以:`}</p>
          <div className="flex align-center">
            <Link to={Urls.question()} className="Button Button--primary">
              <div className="p1">{t`提出一个新问题`}</div>
            </Link>
            <span className="mx2">{t`或者`}</span>
            <a
              className="Button Button--withIcon"
              target="_blank"
              href="https://giphy.com/tv/search/kitten"
            >
              <div className="p1 flex align-center relative">
                <span className="h2">😸</span>
                <span className="ml1">{t`休息一小会儿.`}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
