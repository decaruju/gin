<template>
  <div class="tab-view">
    <div
      class="flex-container"
      :style="{ flexDirection: 'row', height: '32px' }"
    >
      <button
        v-for="(title, index) in titles"
        class="tab"
        :class="{ active: index===activeTab }"
        @click="activeTab=index"
        v-text="title"
      />
    </div>
    <div class="tab-container">
      <keep-alive>
        <component
          :is="activeComponent.component"
          :key="activeTab"
          v-bind="activeComponent.props"
        />
      </keep-alive>
    </div>
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
 .tab {
     flex-grow: 1;
     background-color: #292940;
     text-transform: uppercase;
     font-weight: bold;
     font-size: 16px;
     color: #999999;
     border-radius: 5px 5px 0 0;
     cursor: pointer;
 }
 .tab:nth-child(even) {
     background-color: #292940;
 }
 .tab:nth-child(odd) {
     background-color: #242435;
 }
 .tab:hover {
     color: #EEEEEE;
     background-color: #393950;
 }
 .tab.active {
     background-color: #101025;
     color: #EEEEEE;
 }
 .tab-container {
     height: 100%;
     padding: 4px;
     background-color: #101025;
 }

</style>
