<template>
  <div class="sql-app">
    <SqlMenu :schemas="schemas" :tables="tables" />
    <div class="sql-interface">
        <div class="sql-toolbar">
            <div class="sql-tool">
                d
            </div>
            <div class="sql-tool">
                d
            </div>
            <div class="sql-tool">
                d
            </div>
        </div>
    <textarea class="sql-editor" v-model="query">
    </textarea>
    <button @click="executeQuery">
      Execute
    </button>
    <SqlTable :value="data" />
    </div>
  </div>
</template>

<script>
import { Client } from 'pg';
import SqlTable from './SqlTable.vue';
import SqlMenu from './SqlMenu.vue';

export default {
  name: 'Sql',
    components: {
        SqlTable,
        SqlMenu,
    },
  data() {
    return {
      query: 'SELECT NOW();',
      data: {},
      schemas: [],
        tables: {},
    };
  },
     async created() {
         this.syncStructure();
     },
  methods: {
      async syncStructure() {
          let result = await this.execute('SELECT nspname FROM pg_catalog.pg_namespace;');
          this.schemas = result.rows.map((row) => row.nspname);
          result = await this.execute('SELECT schemaname, tablename FROM pg_catalog.pg_tables;');
          this.tables = {}
          result.rows.forEach((row) => {
              if (!(row.schemaname in this.tables)) this.tables[row.schemaname] = [];
              this.tables[row.schemaname].push(row.tablename);
          });
      },
      async execute(query) {
          let rtn;
          const client = new Client({ connectionString: 'postgres://hqectjvv:HHdbpQap7lBeEvzeJyUSoJlbqH_aGrqZ@salt.db.elephantsql.com:5432/hqectjvv' });
          try {
              client.connect();
              rtn = await client.query(query);
          } catch (e) {
              rtn = e;
          } finally {
              client.end();
          }
          return rtn;
      },
      async executeQuery() {
          this.data = await this.execute(this.query);
      }
  },
};
</script>

<style>
 .sql-editor {
     width: 100%;
 }
 .sql-data-table {
     width: 100%;
 }
 .sql-interface {
     margin-left: 100px;
 }
 .sql-toolbar {
     height: 64px;
     width: 100%;
     background-color: #aeae21;
     padding: 8px;
     box-sizing: border-box;
 }

 .sql-tool {
     width: 48px;
     height: 48px;
     background-color: blue;
     box-sizing: border-box;
     padding: auto;
     color: white;
     display: inline-block;
 }
</style>
