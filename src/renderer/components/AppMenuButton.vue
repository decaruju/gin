<template>
  <button
    class="app-button"
    @click.stop="$emit('click')"
  >
    <div :class="['fa', 'fa-2x', app.icon]" />
    <div v-text="app.name" />
    <div v-text="app.shortcut" />
  </button>
</template>

<script>
export default {
  name: 'AppMenuButton',
  props: {
    app: {
      type: Object,
      required: true,
      validator(value) { return value.name && value.icon; },
    },
  },
};
</script>
