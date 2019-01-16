import React, { Component } from "react";
import PropTypes from "prop-types";

import ModalContent from "metabase/components/ModalContent.jsx";
import { t } from "c-3po";

export default class QuestionSavedModal extends Component {
  static propTypes = {
    addToDashboardFn: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  render() {
    return (
      <ModalContent
        id="QuestionSavedModal"
        title={t`已保存！是否加入面板？`}
        onClose={this.props.onClose}
        className="Modal-content Modal-content--small NewForm"
      >
        <div>
          <button
            className="Button Button--primary"
            onClick={this.props.addToDashboardFn}
          >{t`立即加入`}</button>
          <button
            className="Button ml3"
            onClick={this.props.onClose}
          >{t`暂不加入`}</button>
        </div>
      </ModalContent>
    );
  }
}
