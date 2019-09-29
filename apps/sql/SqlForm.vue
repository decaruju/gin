<template>
  <div class="modal">
    <div v-for="field in fields">
      <label>
        <span class="sql-field-label" v-text="field" />
        <input v-model="data[field]">
      </label>
    </div>
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
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      data: {},
    };
  },
  created() {
    Object.keys(this.value).forEach((key) => {
      this.$set(this.data, key, this.value[key]);
    });
  },
};
</script>

<style lang="scss">
 @import '../../src/renderer/index.scss';

 .sql-field-label {
   display: inline-block;
   color: $color-text;
   width: 100px;
 }
</style>
