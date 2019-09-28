<template>
  <div class="tab-view">
    <div
      class="flex-container"
      :style="{ flexDirection: 'row', height: '32px' }"
    >
      <button
        v-for="(children, index) in layout"
        class="tab"
        :class="{ active: index===activeIndex }"
        @click="activeIndex=index"
      >
        <span class="tab-text">
          {{ children.name }}
        </span>
        <button
          class="close-button"
          @click.stop="closeApp(index)"
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
        v-show="activeIndex === index"
        :event="transmittedEvent"
        v-bind="component.props"
        @eventCatched="$emit('eventCatched')"
        @close="closeApp(index)"
      />
    </div>
  </div>
</template>

<script>
import layout from './layout';

export default {
  name: 'TabView',
  mixins: [layout],
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
