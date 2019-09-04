<template>
  <div class="tab-view">
    <div class="flex-container" :style="{ flexDirection: 'row', height: '32px' }">
        <button class="flex-item" v-for="(title, index) in titles" @click="activeTab=index">
            {{ title }}
        </button>
    </div>
    <keep-alive>
    <component
        :key="activeTab"
        :is="activeComponent.component"
        v-bind="activeComponent.props"
    />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'TabView',
  props: {
    layout: {
      type: Array,
      required: true,
    },
    titles: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 0,
    };
  },
  computed: {
    activeComponent() {
      return this.layout[this.activeTab];
    },
  },
};
</script>

<style>
 .tab-view {
     height: 100%;
 }
</style>
