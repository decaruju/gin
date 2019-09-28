export default {
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
      transmittedEvent: [],
      layout: [],
      activeIndex: 0,
    };
  },
  watch: {
    event() {
      if (!this.event.length) return;
      if (this.event[0].code !== 'Space' && this.layout.length) {
        this.transmittedEvent = this.event;
        return;
      }
      let event;
      if (this.event[1]) event = this.event[1];
      else if (this.layout.length) return;
      else event = this.event[0];
      if (event.code === 'Space') {
        this.transmittedEvent = this.event.slice(1);
      }
      if (event.code === 'KeyT') {
        this.$emit('eventCatched');
        this.onOpenApp();
      }
      if (event.code === 'KeyL') {
        this.$emit('eventCatched');
        this.nextApp();
      }
      if (event.code === 'KeyD') {
        this.$emit('eventCatched');
        this.closeApp(this.activeTab);
      }
      if (event.code === 'KeyH') {
        this.$emit('eventCatched');
        this.previousApp();
      }
    },
  },
  methods: {
    async onOpenApp(index) {
      try {
        this.layout.splice(index, 0, await this.openApp());
      } catch (_) {}
    },
    nextApp() {
      this.chooseApp(this.activeTab + 1);
    },
    previousApp() {
      this.chooseApp(this.activeTab - 1);
    },
    chooseApp(index) {
      this.activeIndex = Math.min(Math.max(index, 0), this.layout.length - 1);
    },
    closeApp(index) {
      if (index < this.activeTab) {
        this.activeIndex -= 1;
      }
      if (index === this.activeTab) {
        this.activeIndex = 0;
      }
      this.layout.splice(index, 1);
    },
  },
};
