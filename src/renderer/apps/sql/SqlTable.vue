<template>
  <div class="sql-table">
    <table
      v-if="value.rows"
      class="sql-value-table"
    >
      <tr>
        <th v-for="field in value.fields">
          {{ field.name }}
        </th>
      </tr>
      <tr v-for="row in value.rows">
        <td v-for="field in value.fields">
          {{ row[field.name] }}
        </td>
      </tr>
    </table>
    <div v-else>
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SqlTable',
  props: {
    value: {
      type: [Object, Error],
      required: true,
    },
  },
};
</script>

<style>
 .sql-table {
     width: 100%;
     overflow-x: auto;
   overflow-y: auto;
   height: 400px;
 }
 table {
 }
 th {
     background-color: #EEEEEE;
     max-width: 300px;
 }
 tr:nth-child(even) {background: #CCC}
 tr:nth-child(odd) {background: #FFF}
</style>
