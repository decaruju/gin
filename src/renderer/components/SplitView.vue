<template>
  <div class="flex-container" :style="{ flexDirection: direction }">
      <div class="flex-item" v-for="child in layout">
        <component
            :is="child.component"
            v-bind="child.props"

        />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplitView',
  props: {
    layout: {
      type: Array,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.flex-container {
    display: flex;
    height: 100%;
}

 .flex-item {
     flex-grow: 1;
     border: solid black 2px;
 }

</style>
