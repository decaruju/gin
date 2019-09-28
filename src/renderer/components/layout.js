export default {
  props: {
    keys: {
      type: Object,
      required: true,
    },
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
      console.log(this.event); //eslint-disable-line no-console
      if (!this.event.length) return;
      if (this.event[0].code !== this.keys.prefix && this.layout.length) {
        this.transmittedEvent = this.event;
        return;
      }
      let event;
      if (this.event[1]) event = this.event[1];
      else if (this.layout.length) return;
      else event = this.event[0];
      if (event.code === this.keys.prefix) {
        this.transmittedEvent = this.event.slice(1);
      }
      if (event.code === this.keys.layout.open) {
        this.$emit('eventCatched');
        this.onOpenApp();
      }
      if (event.code === this.keys.layout.close) {
        this.$emit('eventCatched');
        this.closeApp(this.activeTab);
      }
      if (event.code === this.keys.layout.next) {
        this.$emit('eventCatched');
        this.nextApp();
      }
      if (event.code === this.keys.layout.previous) {
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
