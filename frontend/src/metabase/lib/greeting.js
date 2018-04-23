import { t } from "c-3po";

const greetingPrefixes = [
  t`你好啊`,
  t`最近怎么样呀`,
  t`你好`,
  t`见到你真开心`,
  t`欢迎回来`,
];

const subheadPrefixes = [
  t`想了解些什么？`,
  t`你在思考什么呢？`,
  t`你想要怎么解决这个问题？`,
];

var Greeting = {
  simpleGreeting: function() {
    // TODO - this can result in an undefined thing
    const randomIndex = Math.floor(
      Math.random() * (greetingPrefixes.length - 1),
    );
    return greetingPrefixes[randomIndex];
  },

  sayHello: function(personalization) {
    if (personalization) {
      var g = Greeting.simpleGreeting();
      if (g === t`最近怎么样呀`) {
        return g + ", " + personalization + "?";
      } else {
        return g + ", " + personalization;
      }
    } else {
      return Greeting.simpleGreeting();
    }
  },

  encourageCuriosity: function() {
    // TODO - this can result in an undefined thing
    const randomIndex = Math.floor(
      Math.random() * (subheadPrefixes.length - 1),
    );

    return subheadPrefixes[randomIndex];
  },
};

export default Greeting;
