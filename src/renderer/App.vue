<template>
  <div id="app">
    <layout
      :layout="layout"
      direction="row"
    />
  </div>
</template>

<script>
import Layout from './components/Layout.vue'

const layout = [
  {
    component: Layout,
    props: {
      layout: [
        {
          component: Layout,
          props: {
            layout: [{ component: 'input' }],
            direction: 'row'
          }
        }
      ],
      direction: 'column'
    }
  }
]

export default {
  name: 'gin',
  components: { Layout },
  data () {
    return { layout }
  }
}
</script>

<style>
 #app {
     height: 100%
 }
  /* CSS */
</style>
