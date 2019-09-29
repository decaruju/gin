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
        <div
          class="tab-text"
          v-text="children.name"
        />
        <button
          class="close-button"
          @click.stop="closeApp(index)"
          v-text="'X'"
        />
      </button>
      <button
        class="open-app"
        @click.stop="onOpenApp"
        v-text="'+'"
      />
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

<style lang="scss">
 @import "../index.scss";

 $tab-height: 32px;

 .tab-view {
   height: 100%;
   position: absolute;
   width: 100%;

   .tab {
     position: relative;
     flex-grow: 1;
     text-transform: uppercase;
     font-weight: bold;
     font-size: 16px;
     color: $color-text-inactive;
     cursor: pointer;

     &:nth-child(even) {
       background-color: $color-primary;
     }
     &:nth-child(odd) {
       background-color: $color-alternate;
     }

     &:hover {
       background-color: $color-active;
       color: $color-text;
     }

     &.active {
       background-color: $color-background;
       color: $color-text;
       cursor: default;
     }

     .tab-text {
       vertical-align: middle;
       text-overflow: ellipsis;
       white-space: nowrap;
       width: calc(100% - 32px);
     }

     .close-button {
       position: absolute;
       right: 0;
       top: 0;
       height: $tab-height;
       width: $tab-height;
       color: $color-text-inactive;
       cursor: pointer;
       background-color: inherit;

       &:hover {
         color: $color-text;
         background-color: $shadow-white-light;
       }
     }
   }

   .tab-container {
     height: calc(100% - 32px);
     width: 100%;
     background-color: $color-background;
     position: absolute;
     top: $tab-height;
     left: 0;
     border: 5px solid $shadow-white-light;
   }

   .open-app {
     color: $color-text-inactive;
     cursor: pointer;
     width: $tab-height;
     font-size: 24px;
     border-bottom: none;
     padding: inherit;

     &:nth-child(even) {
       background-color: $color-primary;
     }
     &:nth-child(odd) {
       background-color: $color-alternate;
     }

     &:hover {
       color: $color-text;
       background-color: $color-active;
       border-color: $color-active;
     }
   }
 }

</style>
