<template>
  <div class="fontawesome-app">
    <span class="fontawesome-search-container">
      Icon
      <input
        v-model="searchText"
        class="fontawesome-search"
      >
    </span>
    <span class="fontawesome-search-container">
      Class
      <input
        v-model="klass"
        class="fontawesome-search"
      >
    </span>
    <div>
      <span
        v-for="icon in filteredIcons"
        class="fontawesome-icon"
      >
        <span :class="['fa', klass, `fa-${icon}`]" /> {{ icon }}
      </span>
    </div>
  </div>
</template>

<script>
import icons from './icons';

export default {
  name: 'Fontawesome',
  data() {
    return {
      searchText: '',
      klass: '',
    };
  },
  computed: {
    filteredIcons() {
      return icons.filter((icon) => icon.match(this.searchText));
    },
  },
};
</script>

<style>
.fontawesome-icon {
  color: white;
    display: inline-block;
    margin: 4px;
    padding: 2px;
    font-size: 16px;
    background-color: #393950;
}
 .fontawesome-app .fa {
     padding: 2px;
 }
 .fontawesome-search {
     margin: 16px;
     padding: 4px;
     font-size: 24px;
 }
 .fontawesome-app {
     height: 100%;
     overflow-y: scroll;
 }
 .fontawesome-search-container {
     color: white;
     font-size: 24px;
     display: inline-block;
 }
</style>
