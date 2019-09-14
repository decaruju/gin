<template>
  <div
    class="color-shade"
  >
    <template v-for="color in this.colors">
      <ColorSquare
        :background-color="color"
        :color="negate(color)"
      />
    </template>
  </div>
</template>

<script>
import color from 'color';
import ColorSquare from './ColorSquare';

const CHANGE_RATIO = 0.2;

export default {
  name: 'ColorShade',
  components: { ColorSquare },
  props: {
    color: {
      type: String,
      required: true,
      validator(value) {
        return value.match(/#[0-9A-Fa-f]{6}/);
      },
    },
  },
  data() {
    return {
      numberOfShades: 3,
    };
  },
  computed: {
    colors() {
      const colors = [];
      colors.length = (2 * this.numberOfShades) + 1; // eslint-disable-line no-magic-numbers
      colors[this.numberOfShades] = this.color;
      for (let i = this.numberOfShades; i > 0; i--) {
        colors[i - 1] = this.darken(colors[i]);
      }
      for (let i = this.numberOfShades; i < 2 * this.numberOfShades; i++) { // eslint-disable-line no-magic-numbers
        colors[i + 1] = this.lighten(colors[i]);
      }
      return colors;
    },
  },
  methods: {
    negate(initialColor) {
      return color(initialColor).negate().hex();
    },
    darken(initialColor) {
      return color(initialColor).darken(CHANGE_RATIO).hex();
    },
    lighten(initialColor) {
      return color(initialColor).lighten(CHANGE_RATIO).hex();
    },
  },
};
</script>

<style>
 .color-square {
   display: inline-block;
   width: 100px;
   height: 100px;
 }
</style>
