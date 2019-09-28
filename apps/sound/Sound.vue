<template>
  <div>
    <button @click="play">
      play
    </button>
  </div>
</template>

<script>
import baudio from 'baudio';

export default {
  name: 'Mail',
  data() {
    return {
      client: undefined,
      data: [],
    };
  },
  methods: {
    play() {
      let i = 0, n = 0;
      const b = baudio((t) => {
        const x = Math.sin((t * 262) + Math.sin(n)); // eslint-disable-line no-magic-numbers
        n += Math.sin(t);
        i += 1;
        if (i === 100000) throw Error; //eslint-disable-line no-magic-numbers
        return x;
      });
      b.play();
    },
  },
};
</script>

<style>
</style>
