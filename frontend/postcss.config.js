import stylelint from "stylelint";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import postcssReporter from "postcss-reporter";

export default {
  plugins: [
    stylelint,
    autoprefixer,
    postcssPresetEnv,
    postcssReporter({ clearReportedMessages: true }),
  ],
};
