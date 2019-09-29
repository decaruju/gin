<template>
  <div class="color-app">
    <div class="settings">
      <input
        v-model="baseColor"
        type="text"
      >
      <span class="slider-group">
        <HexSlider name="R" v-model="red" />
        <HexSlider name="G" v-model="green" />
        <HexSlider name="B" v-model="blue" />
      </span>
      <span class="slider-group">
        <HexSlider name="H" v-model="hue" />
        <HexSlider name="S" v-model="saturation" />
        <HexSlider name="V" v-model="value" />
      </span>
      Angle
      <input
        v-model.number="angle"
        type="range"
        min="0"
        :max="maxAngle"
        step="1"
      >
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
    </div>
    <div class="palette">
      <ColorShade v-for="color in palette" :color="color" />
    </div>
  </div>
</template>

<script>
import HexSlider from './HexSlider.vue';
import color from 'color';
import ColorShade from './ColorShade.vue';

export default {
  name: 'Color',
  components: {
    ColorShade,
    HexSlider,
  },
  data() {
    return {
      red: 0,
      green: 0,
      blue: 0,
      color,
      angle: 120,
      numberOfColors: 4,
      Math,
    };
  },
  computed: {
    hue: {
      get() {
        return color(this.baseColor).hue();
      },
      set(value) {
        this.baseColor = color.hsv(value, this.saturation, this.value);
      },
    },
    saturation: {
      get() {
        return color(this.baseColor).saturationv();
      },
      set(value) {
        this.baseColor = color.hsv(this.hue, value, this.value);
      },
    },
    value: {
      get() {
        return color(this.baseColor).luminosity();
      },
      set(value) {
        this.baseColor = color.hsv(this.hue, this.saturation, value);
      },
    },
    baseColor: {
      get() {
        return color.rgb(this.red, this.green, this.blue).hex();
      },
      set(value) {
        this.log(value);
        this.red = parseInt(value.red(), 10);
        this.green = parseInt(value.green(), 10);
        this.blue = parseInt(value.blue(), 10);
      },
    },
    maxAngle() {
      return this.numberOfColors === 2 ? 360 : 180; // eslint-disable-line no-magic-numbers
    },
    palette() {
      const currentPalette = [
        this.baseColor,
        this.rotatedColor(this.angle),
      ];
      if (this.numberOfColors === 3) {
        currentPalette.push(this.rotatedColor(-this.angle));
      } else if (this.numberOfColors === 4) {
        currentPalette.push(this.rotatedColor(180));
        currentPalette.push(this.rotatedColor(180 + this.angle));
      }
      return currentPalette;
    },
  },
  methods: {
    rotatedColor(angle) {
      return color(this.baseColor).rotate(angle).hex();
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
 .slider-group {
   display: inline-block;
 }
</style>
