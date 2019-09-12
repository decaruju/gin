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
          class="app-button"
          @click.stop="chooseApp(app)"
        >
          <div :class="['fa', 'fa-2x', app.icon]" />
          <div>
            {{ app.name }}
          </div>
        </button>
        <button
          class="app-menu-close"
          @click="closeAppMenu"
        >
          X
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SplitView from './components/SplitView.vue';
import TabView from './components/TabView.vue';
import Sql from './apps/sql/Sql.vue';
import Git from './apps/git/Git.vue';
import Fontawesome from './apps/fontawesome/Fontawesome.vue';
import '../../static/fontawesome/css/all.min.css';

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
          icon: 'fa-grip-lines-vertical',
          props: {
            direction: 'row',
            openApp: this.openApp,
          },
        },
        {
          component: SplitView,
          name: 'Column',
          icon: 'fa-grip-lines',
          props: {
            direction: 'column',
            openApp: this.openApp,
          },
        },
        {
          component: TabView,
          name: 'TabView',
          icon: 'fa-table',
          props: {
            openApp: this.openApp,
          },
        },
        {
          component: Git,
          icon: 'fa-git',
          name: 'Git',
        },
        {
          component: Fontawesome,
          name: 'Fontawesome',
          icon: 'fa-font-awesome',
        },
        {
          component: Sql,
          name: 'Sql editor',
          icon: 'fa-database',
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
     background-color: #393950;
     z-index: 2;
     padding: 2%;
 }
 .app-button {
     width: 21%;
     height: 21%;
     margin: 2%;
     padding: 0px;
     cursor: pointer;
     color: #797990;
     background-color: #191920;
 }
 .app-button:hover {
     background-color: #797990;
     color: #191920;
 }
 .app-button .fa {
     padding: 4px;
 }
 .app-menu-close {
     position: absolute;
     top: 0;
     right: 0;
     cursor: pointer;
     color: #797990;
     background-color: #191920;
 }

 .app-menu-close:hover {
     background-color: #797990;
     color: #191920;
 }
</style>
