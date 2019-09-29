<template>
  <div id="app">
    <Root
      :event="currentEvent"
      v-bind="appProps"
      @eventCatched="clearEvent"
    />
    <AppMenu
      v-if="choice"
      :available-apps="availableApps"
      @close="closeAppMenu"
      @chooseApp="chooseApp"
    />
    <div
      class="command"
      v-text="currentEvent.map((event) => event.key).join('')"
    />
  </div>
</template>

<script>
import AppMenu from './components/AppMenu.vue';
import apps from './apps.js';
import keys from './keys.js';

import '../../static/fontawesome/css/all.min.css';

export default {
  name: 'Gin',
  components: {
    Root: apps.root,
    AppMenu,
  },
  data() {
    return {
      choice: undefined,
      currentEvent: [],
      appProps: {
        openApp: this.openApp,
        keys: keys,
      },
    };
  },
  computed: {
    availableApps() {
      return apps.apps;
    },
  },
  created() {
    document.addEventListener('keydown', this.manageEvent);
  },
  methods: {
    clearEvent() {
      this.currentEvent = [];
    },
    manageEvent(event) {
      if (document.activeElement !== document.body) {
        if (event.key === keys.stop) {
          document.activeElement.blur();
        }
        return;
      }
      if (event.key === keys.stop || document.activeElement !== document.body) {
        this.clearEvent();
        if (this.choice) this.closeAppMenu();
      } else if (this.choice) {
        const choosenApp = this.availableApps.find((app) => app.shortcut === event.code);
        if (choosenApp) this.chooseApp(choosenApp);
      } else {
        this.currentEvent.push(event);
      }
    },
    chooseApp(app) {
      this.choice.resolve({ ...app, key: Math.random(), props: { ...app.props, ...this.appProps } });
      this.clearChoice();
    },
    closeAppMenu() {
      this.choice.reject();
      this.clearChoice();
    },
    clearChoice() {
      this.choice = undefined;
      this.clearEvent();
    },
    openApp() {
      this.choice = {};
      this.choice.promise = new Promise((resolve, reject) => {
        this.choice.resolve = resolve;
        this.choice.reject = reject;
      });
      return this.choice.promise;
    },
  },
};
</script>

<style>
button {
 border: none;
 font-weight: bold;
}
:focus,
:active:focus,
.active:focus,
.focus,
:active.focus,
.active.focus {
  outline: none !important;
}
html, body, #app {
    background-color: black;
    height: 100%;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
}
* {
  overflow: hidden;
  box-sizing: border-box;
}
.command {
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;
    font-family: monospace;
    white-space: pre;
}
</style>
