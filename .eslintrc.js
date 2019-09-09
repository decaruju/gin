module.exports = {
  extends: "@cognibox/eslint-config-cbx-vue",
    globals: {
        process: true,
        require: true,
        global: true,
        __dirname: true,
    },
    rules: {
        'vue/require-v-for-key': false,
    },
};
