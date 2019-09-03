<template>
  <div class="flex-container" :style="{ flexDirection: direction }">
    <component
      v-for="child in layout"
      :is="child.component"
      v-bind="child.props"

     />
  </div>
</template>

<script>
export default {
  name: 'layout',
  props: {
    layout: {
      type: Array,
      required: true
    },
    direction: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.flex-container {
    display: flex;
    flex-grow: 1;
    border: solid black 2px;
    margin: 4px;
}
</style>
