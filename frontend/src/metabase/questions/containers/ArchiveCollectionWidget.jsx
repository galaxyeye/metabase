import React, { Component } from "react";
import { connect } from "react-redux";
import { t } from "c-3po";
import ModalWithTrigger from "metabase/components/ModalWithTrigger";
import Button from "metabase/components/Button";
import Icon from "metabase/components/Icon";
import Tooltip from "metabase/components/Tooltip";

import { setCollectionArchived } from "../collections";

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = {
  setCollectionArchived,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ArchiveCollectionWidget extends Component {
  _onArchive = async () => {
    try {
      await this.props.setCollectionArchived(this.props.collectionId, true);
      this._onClose();
      if (this.props.onArchived) {
        this.props.onArchived();
      }
    } catch (error) {
      console.error(error);
      this.setState({ error });
    }
  };

  _onClose = () => {
    if (this.refs.modal) {
      this.refs.modal.close();
    }
  };

  render() {
    return (
      <ModalWithTrigger
        {...this.props}
        ref="modal"
        triggerElement={
          <Tooltip tooltip={t`归档`}>
            <Icon size={18} name="archive" />
          </Tooltip>
        }
        title={t`确认将本问题集归档？`}
        footer={[
          <Button onClick={this._onClose}>{t`取消`}</Button>,
          <Button warning onClick={this._onArchive}>{t`归档`}</Button>,
        ]}
      >
        <div className="px4 pb4">{t`问题集中的所有问题也同样会被归档。`}</div>
      </ModalWithTrigger>
    );
  }
}
