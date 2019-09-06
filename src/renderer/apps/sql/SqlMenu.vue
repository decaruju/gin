<template>
  <div class="sql-menu">
      <div v-for="schema in schemas">
          <button @click="toggleSchema(schema)" :key="`${schema}`" :class="{ open: openSchemas[schema] }">
            {{ schema }}
          </button>
          <div v-if="openSchemas[schema]" :key="`${schema}-tables`">
              <div v-for="table in tables[schema]">
                  {{ table }}
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'SqlMenu',
     data() {
         return {
             openSchemas: {},
         };
     },
     methods: {
         toggleSchema(schema) {
             this.$set(this.openSchemas, schema, !this.openSchemas[schema])
         },
     },
     props: {
         schemas: {
             type: Array,
             required: true,
         },
         tables: {
             type: Object,
             required: true,
         }
     },
};
</script>

<style>
 .sql-menu {
     width: 100px;
     height: 100%;
     display: inline-block;
     position: fixed;
     z-index: 1px;
     background-color: rebeccapurple;
     left: 0;
 }
 button.open {
     background-color: red
 }
</style>
