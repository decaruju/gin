<template>
  <div
    class="backdrop"
    @click="close"
  >
    <div class="app-menu">
      <AppMenuButton
        v-for="app in availableApps"
        @click="$emit('chooseApp', app)"
        :app="app"
      />
      <button
        class="app-menu-close"
        @click="close"
        v-text="'X'"
      />
    </div>
  </div>
</template>

<script>
import AppMenuButton from './AppMenuButton.vue';

export default {
  name: 'AppMenu',
  components: { AppMenuButton },
  props: {
    availableApps: {
      type: Array,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style>
 .menu {
   display: inline-block;
   width: 100px;
   height: 100%;
 }
 .backdrop {
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
 }
 .app-menu {
   position: absolute;
   margin: auto;
   width: 60%;
   height: 60%;
   top: 20%;
   left: 20%;
   background-color: #393950;
   z-index: 2;
   padding: 2%;
 }
 .app-button {
   width: 21%;
   height: 21%;
   margin: 2%;
   padding: 0px;
   cursor: pointer;
   color: #797990;
   background-color: #191920;
 }
 .app-button:hover {
   background-color: #797990;
   color: #191920;
 }
 .app-button .fa {
   padding: 4px;
 }
 .app-menu-close {
   position: absolute;
   top: 0;
   right: 0;
   cursor: pointer;
   color: #797990;
   background-color: #191920;
 }

 .app-menu-close:hover {
   background-color: #797990;
   color: #191920;
 }
</style>
