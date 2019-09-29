<template>
  <div
    class="color-square"
    :style="{ 'background-color': backgroundColor, color: color }"
    v-text="backgroundColor.toUpperCase()"
  />
</template>

<script>
export default {
  name: 'ColorSquare',
  props: {
    backgroundColor: {
      type: String,
      required: true,
      validator(value) {
        return value.match(/#[0-9A-Fa-f]{6}/);
      },
    },
    color: {
      type: String,
      required: true,
      validator(value) {
        return value.match(/#[0-9A-Fa-f]{6}/);
      },
    },
  },
};
</script>

<style>
 .color-square {
   display: inline-block;
   width: 100px;
   height: 100px;
 }
</style>
