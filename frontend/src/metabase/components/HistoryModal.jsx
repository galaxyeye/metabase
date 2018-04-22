import React, { Component } from "react";
import PropTypes from "prop-types";
import { t } from "c-3po";
import ActionButton from "metabase/components/ActionButton.jsx";
import LoadingAndErrorWrapper from "metabase/components/LoadingAndErrorWrapper.jsx";
import ModalContent from "metabase/components/ModalContent.jsx";

import moment from "moment";

function formatDate(date) {
  var m = moment(date);
  if (m.isSame(moment(), "day")) {
    return t`今天, ` + m.format("h:mm a");
  } else if (m.isSame(moment().subtract(1, "day"), "day")) {
    return t`昨天, ` + m.format("h:mm a");
  } else {
    return m.format("MMM D YYYY, h:mm a");
  }
}

export default class HistoryModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: null,
    };
  }

  static propTypes = {
    revisions: PropTypes.array,
    entityType: PropTypes.string.isRequired,
    entityId: PropTypes.number.isRequired,

    onFetchRevisions: PropTypes.func.isRequired,
    onRevertToRevision: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onReverted: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    let { entityType, entityId } = this.props;

    try {
      await this.props.onFetchRevisions({ entity: entityType, id: entityId });
    } catch (error) {
      this.setState({ error: error });
    }
  }

  async revert(revision) {
    let { entityType, entityId } = this.props;
    try {
      await this.props.onRevertToRevision({
        entity: entityType,
        id: entityId,
        revision_id: revision.id,
      });
      this.props.onReverted();
    } catch (e) {
      console.warn("revert failed", e);
      throw e;
    }
  }

  revisionDescription(revision) {
    if (revision.is_creation) {
      return t`初版`;
    } else if (revision.is_reversion) {
      return t`回滚到之前的版本：${revision.description}`;
    } else {
      return revision.description;
    }
  }

  render() {
    var { revisions } = this.props;
    return (
      <ModalContent
        title={t`修订记录`}
        onClose={() => this.props.onClose()}
      >
        <LoadingAndErrorWrapper
          className="flex flex-full flex-basis-auto"
          loading={!revisions}
          error={this.state.error}
        >
          {() => (
            <div className="pb4 flex-full">
              <div className="border-bottom flex px4 py1 text-uppercase text-grey-3 text-bold h5">
                <span className="flex-half">{t`时间`}</span>
                <span className="flex-half">{t`提交人`}</span>
                <span className="flex-full">{t`描述`}</span>
              </div>
              <div className="px2 scroll-y">
                {revisions.map((revision, index) => (
                  <div
                    key={revision.id}
                    className="border-row-divider flex py1 px2"
                  >
                    <span className="flex-half">
                      {formatDate(revision.timestamp)}
                    </span>
                    <span className="flex-half">
                      {revision.user.common_name}
                    </span>
                    <span className="flex-full flex">
                      <span>{this.revisionDescription(revision)}</span>
                      {index !== 0 ? (
                        <div className="flex-align-right pl1">
                          <ActionButton
                            actionFn={() => this.revert(revision)}
                            className="Button Button--small Button--danger text-uppercase"
                            normalText={t`回滚`}
                            activeText={t`回滚中…`}
                            failedText={t`回滚失败`}
                            successText={t`回滚完成`}
                          />
                        </div>
                      ) : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </LoadingAndErrorWrapper>
      </ModalContent>
    );
  }
}
