<template>
  <div class="color-app">
    <input
      v-model="baseColor"
      type="color"
    >
    <input
      v-model="angle"
      type="range"
      min="0"
      :max="maxAngle"
      step="1"
    >
    {{ angle }}
    <button
      v-if="numberOfColors !== 2"
      @click="numberOfColors=2"
      v-text="2"
    />
    <button
      v-if="numberOfColors !== 3"
      @click="numberOfColors=3"
      v-text="3"
    />
    <button
      v-if="numberOfColors !== 4"
      @click="numberOfColors=4"
      v-text="4"
    />
    <ColorShade :color="baseColor" />
    <template v-if="numberOfColors === 2">
      <ColorShade :color="color(baseColor).rotate(+angle).hex()" />
      <svg
        height="120"
        width="120"
      >
        <line
          x1="60"
          y1="60"
          x2="60"
          y2="10"
          :stroke="baseColor"
          stroke-width="3"
        />
        <line
          x1="60"
          y1="60"
          :x2="Math.sin((+angle+180)/360*Math.PI*2)*50+60"
          :y2="Math.cos((+angle+180)/360*Math.PI*2)*50+60"
          :stroke="color(baseColor).rotate(+angle).hex()"
          stroke-width="3"
        />
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="white"
          stroke-width="3"
          fill="none"
        />
      </svg>
    </template>
    <template v-if="numberOfColors === 3">
      <ColorShade :color="color(baseColor).rotate(+angle).hex()" />
      <ColorShade :color="color(baseColor).rotate(-angle).hex()" />
      <svg
        height="120"
        width="120"
      >
        <line
          x1="60"
          y1="60"
          x2="60"
          y2="10"
          :stroke="baseColor"
          stroke-width="3"
        />
        <line
          x1="60"
          y1="60"
          :x2="Math.sin((+angle+180)/360*Math.PI*2)*50+60"
          :y2="Math.cos((+angle+180)/360*Math.PI*2)*50+60"
          :stroke="color(baseColor).rotate(+angle).hex()"
          stroke-width="3"
        />
        <line
          x1="60"
          y1="60"
          :x2="Math.sin((-angle+180)/360*Math.PI*2)*50+60"
          :y2="Math.cos((-angle+180)/360*Math.PI*2)*50+60"
          :stroke="color(baseColor).rotate(-angle).hex()"
          stroke-width="3"
        />
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="white"
          stroke-width="3"
          fill="none"
        />
      </svg>
    </template>
    <template v-if="numberOfColors=== 4">
      <ColorShade :color="color(baseColor).rotate(+angle).hex()" />
      <ColorShade :color="color(baseColor).rotate(180).hex()" />
      <ColorShade :color="color(baseColor).rotate(180+angle).hex()" />
      <svg
        height="120"
        width="120"
      >
        <line
          x1="60"
          y1="60"
          x2="60"
          y2="10"
          :stroke="baseColor"
          stroke-width="3"
        />
        <line
          x1="60"
          y1="60"
          x2="60"
          y2="110"
          :stroke="color(baseColor).rotate(180).hex()"
          stroke-width="3"
        />
        <line
          x1="60"
          y1="60"
          :x2="Math.sin((+angle+180)/360*Math.PI*2)*50+60"
          :y2="Math.cos((+angle+180)/360*Math.PI*2)*50+60"
          :stroke="color(baseColor).rotate(+angle).hex()"
          stroke-width="3"
        />
        <line
          x1="60"
          y1="60"
          :x2="Math.sin((+angle)/360*Math.PI*2)*50+60"
          :y2="Math.cos((+angle)/360*Math.PI*2)*50+60"
          :stroke="color(baseColor).rotate(180+angle).hex()"
          stroke-width="3"
        />
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="white"
          stroke-width="3"
          fill="none"
        />
      </svg>
    </template>
  </div>
</template>

<script>
import color from 'color';
import ColorShade from './ColorShade.vue';

export default {
  name: 'Color',
  components: { ColorShade },
  data() {
    return {
      baseColor: '#458723',
      color,
      angle: 120,
      numberOfColors: 4,
      Math,
    };
  },
  computed: {
    maxAngle() {
      return this.numberOfColors === 2 ? 360 : 180; // eslint-disable-line no-magic-numbers
    },
  },
};
</script>

<style>
 .color-app {
   color: white;
   font-family: monospace;
 }
 .color {
   width: 100px;
   height: 100px;
 }
</style>
