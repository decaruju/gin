<template>
  <div class="modal">
    <label v-for="field in fields">
      {{ field }}
      <input v-model="data[field]">
    </label>
    <button @click="$emit('submit', data)">
      Save
    </button>
  </div>
</template>

<script>
export default {
  name: 'SqlForm',
  props: {
    fields: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      data: {},
    };
  },
};
</script>

<style>
</style>
