<template>
  <div id="app">
    <TabView
      direction="row"
      :open-app="openApp"
    />
    <div
      v-if="choice"
      class="backdrop"
      @click="closeAppMenu"
    >
      <div class="app-menu">
        <button
          v-for="app in availableApps"
          @click.stop="chooseApp(app)"
        >
          {{ app.name }}
        </button>
        <button @click="closeAppMenu">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SplitView from './components/SplitView.vue';
import TabView from './components/TabView.vue';
import Sql from './apps/sql/Sql.vue';

export default {
  name: 'Gin',
  components: { TabView },
  data() {
    return { choice: undefined };
  },
  computed: {
    availableApps() {
      return [
        {
          component: SplitView,
          name: 'Row',
          props: {
            direction: 'row',
            openApp: this.openApp,
          },
        },
        {
          component: SplitView,
          name: 'Column',
          props: {
            direction: 'column',
            openApp: this.openApp,
          },
        },
        {
          component: TabView,
          name: 'TabView',
          props: {
            openApp: this.openApp,
          },
        },
        {
          component: Sql,
          name: 'Sql editor',
        },
      ];
    },
  },
  methods: {
    chooseApp(app) {
      this.choice.resolve({ ...app, key: Math.random() });
      this.choice = undefined;
    },
    closeAppMenu() {
      this.choice.reject();
      this.choice = undefined;
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
 }
 .menu {
     display: inline-block;
     width: 100px;
     height: 100%;
 }
 .backdrop {
     position: absolute;
     width: 100%;
     height: 100%;
     top: 0;
     left: 0;
 }
 .app-menu {
     position: absolute;
     margin: auto;
     width: 60%;
     height: 60%;
     top: 20%;
     left: 20%;
     background-color: white;
     z-index: 2;
 }
  /* CSS */
</style>
