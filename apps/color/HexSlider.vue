<template>
  <div>
    <span v-text="name" />
    <input
      type="range"
      min="0"
      max="255"
      step="1"
      :value="value"
      @input="$emit('input', parseInt($event.target.value, 10))"
    >
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'HexSlider',
  props: {
    value: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
  },
};
</script>
