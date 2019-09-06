<template>
  <div>
    <textarea class="sql-editor" v-model="query">
    </textarea>
    <button @click="execute">
      Execute
    </button>
    <table v-if="data.rows" class="sql-data-table">
        <tr>
            <th v-for="field in data.fields">
                {{ field.name }}
            </th>
        </tr>
        <tr v-for="row in data.rows">
            <th v-for="field in data.fields">
                {{ row[field.name] }}
            </th>
        </tr>
    </table>
    <div v-else>
      {{data}}
    </div>
  </div>
</template>

<script>
import { Client } from 'pg';
export default {
  name: 'Sql',
  data() {
    return {
      query: 'SELECT NOW();',
      data: {},
    };
  },
  methods: {
    async execute() {
      const client = new Client({ connectionString: 'postgres://dev:dev@localhost:5432/cbx4dev' });
      try {
        client.connect();
        const response = await client.query(this.query);
        this.data = response;
      } catch (e) {
        this.data = e;
      } finally {
        client.end();
      }
    },
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
</style>
