import React from "react";

import ModalContent from "metabase/components/ModalContent.jsx";
import { t } from "c-3po";

import Button from "metabase/components/Button";

const nop = () => {};

const ConfirmContent = ({
  title,
  content,
  message = t`确定当前操作?`,
  onClose = nop,
  onAction = nop,
  onCancel = nop,
  confirmButtonText = t`是`,
  cancelButtonText = t`取消`,
}) => (
  <ModalContent
    title={title}
    formModal
    onClose={() => {
      onCancel();
      onClose();
    }}
  >
    <div>{content}</div>

    <p className="mb4">{message}</p>

    <div className="ml-auto mb4">
      <Button
        onClick={() => {
          onCancel();
          onClose();
        }}
      >
        {cancelButtonText}
      </Button>
      <Button
        danger
        ml={2}
        onClick={() => {
          onAction();
          onClose();
        }}
      >
        {confirmButtonText}
      </Button>
    </div>
  </ModalContent>
);

export default ConfirmContent;
