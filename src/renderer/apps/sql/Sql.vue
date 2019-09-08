<template>
  <div class="sql-app">
    <SqlMenu
      :schemas="schemas"
      :tables="tables"
      @resize="menuWidth=$event"
    />
    <div class="sql-container">
      <div class="sql-toolbar">
        <button
          class="sql-tool"
          @click="openConfig"
        >
          Config
        </button>
      </div>
      <div class="sql-interface">
        <textarea
          v-model="query"
          class="sql-editor"
        />
        <button @click="executeQuery">
          Execute
        </button>
        <SqlTable :value="data" />
        <SqlForm
          v-if="modalOpen"
          :fields="fields"
          @submit="submit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Client } from 'pg';
import SqlTable from './SqlTable.vue';
import SqlMenu from './SqlMenu.vue';
import SqlForm from './SqlForm.vue';

export default {
  name: 'Sql',
  components: {
    SqlTable,
    SqlMenu,
    SqlForm,
  },
  data() {
    return {
      query: 'SELECT NOW();',
      config: {},
      data: {},
      schemas: [],
      fields: [],
      tables: {},
      modalOpen: false,
      menuWidth: 100,
      submit() {
        // leave empty
      },
    };
  },
  created() {
    this.syncStructure();
  },
  methods: {
    openConfig() {
      this.modalOpen = true;
      this.fields = [
        'address',
        'user',
        'password',
        'database',
        'port',
      ];
      this.submit = (event) => {
        this.config = event;
        this.modelOpen = false;
      };
    },
    async syncStructure() {
      let result = await this.execute('SELECT nspname FROM pg_catalog.pg_namespace;');
      this.schemas = result.rows.map((row) => row.nspname);
      result = await this.execute('SELECT schemaname, tablename FROM pg_catalog.pg_tables;');
      this.tables = {};
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
    },
  },
};
</script>

<style>
 .sql-app {
     display: flex;
     height: 100%;
 }
 .sql-editor {
     width: 100%;
     resize: none;
 }
 .sql-data-table {
     width: 100%;
     overflow: scroll;
 }
 .sql-interface {
     padding: 16px;
 }
 .sql-container {
     flex-grow: 1;
     overflow: hidden;
 }
 .sql-toolbar{
     height: 64px;
     width: 100%;
     background-color: #393950;
     padding: 8px;
     box-sizing: border-box;
 }

 .sql-tool {
     height: 48px;
     background-color: blue;
     box-sizing: border-box;
     padding: auto;
     color: white;
     display: inline-block;
 }
</style>
