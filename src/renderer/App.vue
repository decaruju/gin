<template>
  <div id="app">
    <TabView
      :layout="layout"
      :titles="layout.map((item) => item.component.name)"
      direction="row"
    />
  </div>
</template>

<script>
import SplitView from './components/SplitView.vue';
import TabView from './components/TabView.vue';
import Sql from './apps/sql/Sql.vue';

const layout = [
  {
    component: SplitView,
    props: {
      layout: [
        {
          component: Sql,
        },
        {
          component: Sql,
        },
      ],
      direction: 'row',
    },
  },
  {
    component: Sql,
  },
  {
    component: SplitView,
    props: {
      layout: [
        {
          component: Sql,
        },
        {
          component: SplitView,
          props: {
            layout: [
              {
                component: Sql,
              },
              {
                component: Sql,
              },
            ],
            direction: 'column',
          },
        },
      ],
      direction: 'row',
    },
  },
];

export default {
  name: 'Gin',
  components: { TabView },
  data() {
    return { layout };
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
     with: 100px;
     height: 100%;
 }
  /* CSS */
</style>
