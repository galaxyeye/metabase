/* @flow */
import React, { Component } from "react";
import StepIndicators from "metabase/components/StepIndicators";
import RetinaImage from "react-retina-image";
import { t } from "c-3po";
import MetabaseSettings from "metabase/lib/settings";
import colors from "metabase/lib/colors";

type Props = {
  onClose: () => void,
};

type State = {
  step: number,
};

const STEPS = [
  {
    title: t`提出一个问题，开始探索数据`,
    text: t`点击图表或表格开始探索数据，或者使用SQL编辑器提一个新问题。`,
    image: (
      <RetinaImage
        className="absolute full"
        style={{ top: 30 }}
        src={`app/assets/img/welcome-modal-1.png`}
      />
    ),
  },
  {
    title: t`创建你自己的图表`,
    text: t`创建饼图、柱状图、热力图等等`,
    image: (
      <RetinaImage
        className="absolute ml-auto mr-auto inline-block left right"
        style={{ bottom: -20 }}
        src={`app/assets/img/welcome-modal-2.png`}
      />
    ),
  },
  {
    title: t`分享你的发现`,
    text: t`创建威力强大并且灵活的面板`,
    image: (
      <RetinaImage
        className="absolute ml-auto mr-auto inline-block left right"
        style={{ bottom: -30 }}
        src={`app/assets/img/welcome-modal-3.png`}
      />
    ),
  },
];

export default class NewUserOnboardingModal extends Component {
  props: Props;
  state: State = {
    step: 1,
  };

  nextStep = () => {
    const stepCount = MetabaseSettings.get("has_sample_dataset") ? 3 : 2;
    const nextStep = this.state.step + 1;

    if (nextStep <= stepCount) {
      this.setState({ step: nextStep });
    } else {
      this.props.onClose();
    }
  };

  render() {
    const { step } = this.state;
    const currentStep = STEPS[step - 1];

    return (
      <div>
        <OnboardingImages currentStep={currentStep} />
        <div className="p4 pb3 text-centered">
          <h2>{currentStep.title}</h2>
          <p
            className="ml-auto mr-auto text-paragraph"
            style={{ maxWidth: 420 }}
          >
            {currentStep.text}
          </p>
          <div className="flex align-center py2 relative">
            <div className="ml-auto mr-auto">
              <StepIndicators
                currentStep={step}
                steps={STEPS}
                goToStep={step => this.setState({ step })}
              />
            </div>
            <a
              className="link flex-align-right text-bold absolute right"
              onClick={() => this.nextStep()}
            >
              {step === 3 ? t`开始` : t`下一步`}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const OnboardingImages = ({ currentStep }, { currentStep: object }) => (
  <div
    style={{
      position: "relative",
      backgroundColor: colors["bg-medium"],
      borderBottom: `1px solid ${colors["border"]}`,
      height: 254,
      paddingTop: "3em",
      paddingBottom: "3em",
    }}
  >
    {currentStep.image}
  </div>
);
