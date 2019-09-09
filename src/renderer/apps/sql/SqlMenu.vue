<template>
  <div
    class="sql-menu-container"
    :style="{ width: `${width}px`, 'min-width': `${width}px` }"
  >
    <div class="sql-menu">
      <div v-for="schema in schemas">
        <button
          :key="`${schema}`"
          :class="{ open: openSchemas[schema] }"
          class="schema"
          @click="toggleSchema(schema)"
        >
          {{ schema }}
        </button>
        <div
          v-if="openSchemas[schema]"
          :key="`${schema}-tables`"
        >
          <button
            v-for="table in tables[schema]"
            class="table"
            @click="$emit('tableClick', table, schema)"
          >
            {{ table }}
          </button>
        </div>
      </div>
    </div>
    <div
      class="sql-menu-resizer"
      @mousedown.left="startResize"
    />
  </div>
</template>

<script>
export default {
  name: 'SqlMenu',
  props: {
    schemas: {
      type: Array,
      required: true,
    },
    tables: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      openSchemas: {},
      width: 100,
    };
  },
  methods: {
    toggleSchema(schema) {
      this.$set(this.openSchemas, schema, !this.openSchemas[schema]);
    },
    startResize(mouseDownEvent) {
      const initialX = mouseDownEvent.clientX;
      const initialWidth = this.width;
      const resize = (event) => {
        this.width = event.clientX - initialX + initialWidth;
      };
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', resize);
      });
    },
  },
};
</script>

<style>
 .sql-menu-resizer {
     min-width: 1px;
     height: 100%;
     cursor: ew-resize;
     display: inline-block;
     background-color: #494960;
     border-right: solid 1px #595970;
     border-left: solid 1px #595970;
 }
 .sql-menu-container {
     display: flex;
     height: 100%;
     position: relative;
     z-index: 1px;
     background-color: #393950;
     left: 0;
 }
 .sql-menu {
     display: inline-block;
     flex-grow: 1;
     overflow-x: hidden;
     overflow-y: auto;
     height: 100%;
 }
 .schema {
     border: none;
     width: 100%;
     font-weight: bold;
     color: #EEEEEE;
     background-color: #494960;
     text-overflow: ellipsis;
     text-align: left;
     margin: 2px;
     font-size: 16px;
     cursor: pointer;
 }
 .schema:hover {
     background-color: #797990;
     color: #393950;
 }
 .table {
     border: none;
     width: 100%;
     font-weight: bold;
     color: #EEEEEE;
     background-color: #494960;
     text-overflow: ellipsis;
     text-align: left;
     margin: 2px;
     margin-left: 12px;
     font-size: 12px;
     cursor: pointer;
 }
 .table:hover {
     background-color: #797990;
     color: #393950;
 }
 .schema.open {
     background-color: #797990;
     color: #393950;
 }
</style>
