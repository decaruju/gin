<template>
  <div class="tab-view">
    <div
      class="flex-container"
      :style="{ flexDirection: 'row', height: '32px' }"
    >
      <button
        v-for="(children, index) in layout"
        class="tab"
        :class="{ active: index===activeTab }"
        @click="activeTab=index"
      >
        <span class="tab-text">
          {{ children.name }}
        </span>
        <button
          class="close-button"
          @click.stop="closeTab(index)"
        >
          X
        </button>
      </button>
      <div
        class="open-app"
        @click.stop="onOpenApp"
      >
        +
      </div>
    </div>
    <div class="tab-container">
      <component
        :is="component.component"
        v-for="(component, index) in layout"
        v-show="activeTab === index"
        :event="transmittedEvent"
        v-bind="component.props"
        @eventCatched="$emit('eventCatched')"
        @close="closeTab(index)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabView',
  props: {
    openApp: {
      type: Function,
      required: true,
    },
    event: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 0,
      layout: [],
      transmittedEvent: [],
    };
  },
  watch: {
    event() {
      console.log(this.event); // eslint-disable-line no-console
      if (!this.event.length) return;
      if (this.event[0].code === 'Space') {
        this.transmittedEvent = this.event.slice(1);
        return;
      }
      if (this.event[0].code === 'KeyT') {
        this.$emit('eventCatched');
        this.onOpenApp();
      }
      if (this.event[0].code === 'KeyL') {
        this.$emit('eventCatched');
        this.nextTab();
      }
      if (this.event[0].code === 'KeyD') {
        this.$emit('eventCatched');
        this.closeTab(this.activeTab);
      }
      if (this.event[0].code === 'KeyH') {
        this.$emit('eventCatched');
        this.previousTab();
      }
    },
  },
  methods: {
    async onOpenApp() {
      try {
        this.layout.push(await this.openApp());
      } catch (_) {
        return false;
      }
      return true;
    },
    nextTab() {
      this.choseTab(this.activeTab + 1);
    },
    previousTab() {
      this.choseTab(this.activeTab - 1);
    },
    choseTab(index) {
      this.activeTab = Math.min(Math.max(index, 0), this.layout.length - 1);
    },
    closeTab(index) {
      if (index < this.activeTab) {
        this.activeTab -= 1;
      }
      if (index === this.activeTab) {
        this.activeTab = 0;
      }
      this.layout.splice(index, 1);
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
 .tab-text {
     vertical-align: middle;
     margin: 0 auto;
 }
 .close-button {
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
     cursor: default;
 }
 .tab-container {
     height: 100%;
     width: 100%;
     padding: 4px;
     background-color: #101025;
     position: absolute;
     top: 32px;
     left: 0;
 }
 .open-app {
     color: #EEEEEE;
     padding: 8px;
     cursor: pointer;
 }
 .open-app:hover {
     background-color: #393950;
 }

</style>
