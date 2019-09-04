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
import Sql from './apps/Sql.vue';

const layout = [
  {
    component: Sql,
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
  components: { TabView, SplitView },
  data() {
    return { layout };
  },
};
</script>

<style>
 html, body, #app {
     height: 100%
 }
  /* CSS */
</style>
