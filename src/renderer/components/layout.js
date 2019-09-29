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
        this.closeApp(this.activeIndex);
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
  computed: {
    activeTab() {
      return this.layout[this.activeIndex];
    },
  },
  methods: {
    async onOpenApp(index) {
      try {
        this.layout.splice(index, 0, await this.openApp());
      } catch (_) {}
    },
    nextApp() {
      this.log('yes');
      this.chooseApp(this.activeIndex + 1);
    },
    previousApp() {
      this.chooseApp(this.activeIndex - 1);
    },
    chooseApp(index) {
      this.log(index);
      this.activeIndex = index % this.layout.length;
    },
    closeApp(index) {
      if (index < this.activeIndex) {
        this.activeIndex -= 1;
      }
      if (index === this.activeIndex) {
        this.activeIndex = 0;
      }
      this.layout.splice(index, 1);
    },
  },
};
