/* @flow */

import type {
  ClickAction,
  ClickActionProps,
} from "metabase/meta/types/Visualization";
import { t } from "c-3po";

export default ({ question }: ClickActionProps): ClickAction[] => {
  if (question.id()) {
    return [
      {
        name: "nest-query",
        title: t`分析该查询的结果`,
        icon: "table",
        question: () => question.composeThisQuery(),
      },
    ];
  }
  return [];
};
