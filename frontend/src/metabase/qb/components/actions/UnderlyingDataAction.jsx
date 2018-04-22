/* @flow */

import type {
  ClickAction,
  ClickActionProps,
} from "metabase/meta/types/Visualization";
import { t } from "c-3po";

export default ({ question }: ClickActionProps): ClickAction[] => {
  if (question.display() !== "table" && question.display() !== "scalar") {
    return [
      {
        name: "underlying-data",
        title: t`表格形式查看`,
        icon: "table",
        question: () => question.toUnderlyingData(),
      },
    ];
  }
  return [];
};
