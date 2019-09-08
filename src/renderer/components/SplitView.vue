<template>
  <div
    ref="container"
    class="flex-container"
    :class="[`flex-container-${direction}`]"
    :style="{ flexDirection: direction }"
  >
    <template v-for="(child, index) in layout">
      <div
        class="flex-item"
        :style="{ width: direction === 'row' ? `${widths[index]}px` : '100%' }"
      >
        <component
          :is="child.component"
          v-bind="child.props"
        />
      </div>
      <template v-if="index !== layout.length-1">
        <div
          class="resizer"
          :class="{ 'vertical-resizer': direction==='row', 'horitontal-resizer': direction==='column' }"
          @mousedown.left="resize($event, index)"
        />
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SplitView',
  props: {
    layout: {
      type: Array,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      widths: [],
      isMounted: false,
    };
  },
  computed: {
    containerSize() {
      if (!this.isMounted) {
        return { width: 0, height: 0 };
      }
      return {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
    },
  },
  watch: {
    containerSize(newValue, oldValue) {
      if (this.direction === 'row') {
        const delta = newValue.width - oldValue.width;
        for (let i = 0; i < this.widths.length; i++) {
          this.$set(this.widths, i, this.widths[i] + (delta / this.layout.length));
        }
      }
    },
  },
  mounted() {
    this.isMounted = true;
  },
  created() {
    this.widths = Array.from({ length: this.layout.length }).map(() => window.innerWidth / this.layout.length);
  },
  methods: {
    resize(mouseDownEvent, index) {
      const initialX = mouseDownEvent.clientX;
      const initialWidth = this.widths[index];
      const resize = (event) => {
        const newValue = event.clientX - initialX + initialWidth;
        const delta = this.widths[index] - newValue;
        this.$set(this.widths, index, newValue);
        this.$set(this.widths, index + 1, this.widths[index + 1] + delta);
      };
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', resize);
      });
    },
  },
};
</script>

<style>
 .flex-container-column {
     width: 100%;
 }
.flex-container {
    display: flex;
    height: 100%;
}

 .flex-item {
     padding: 4px;
     border: solid 1px #595970;
 }
 .resizer {
     z-index: 10;
 }
 .vertical-resizer {
     width: 3px;
     background-color: #494960;
     cursor: ew-resize;
 }
 .horizontal-resizer {
     height: 5px;
     background-color: grey;
 }

</style>
