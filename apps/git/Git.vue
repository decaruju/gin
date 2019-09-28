<template>
  <div>
    <template v-if="repo">
      <div>
        {{ currentBranch }}
      </div>
      <template v-if="currentCommand && currentCommand.command">
        <span> {{ currentCommand.name }} </span>
        <span v-for="arg in currentCommand.args"> {{ arg }} </span>
        <template v-if="currentCommand.command[argIndex]">
          <template v-if="currentCommand.command[argIndex] === 'input'">
            <input v-model="inputText">
            <button
              class="git-button"
              @click="choseArg(inputText)"
            >
              Confirm
            </button>
          </template>
          <template v-else>
            <button
              v-for="(arg) in currentCommand.command[argIndex]"
              class="git-button"
              @click="choseArg(arg)"
            >
              {{ arg }}
            </button>
          </template>
        </template>
      </template>
      <template v-else>
        <button
          v-for="(command, name) in commands"
          class="git-button"
          @click="startCommand(command, name)"
        >
          {{ name }}
        </button>
      </template>
    </template>
    <template v-else>
      <button @click="loadRepo">
        Load repo
      </button>
    </template>
    <div v-text="output" />
  </div>
</template>

<script>
import electron from 'electron';
import git from 'simple-git';

function distinct(value, index, vm) {
  return vm.indexOf(value) === index;
}

export default {
  name: 'Git',
  props: {},
  data() {
    return {
      repo: undefined,
      remotes: [],
      branches: [],
      currentCommand: undefined,
      inputText: '',
      currentBranch: '',
      argIndex: 1,
      commands: [],
      output: '',
      path: '',
    };
  },
  watch: {
  },
  methods: {
    runIfReady() {
      if (this.currentCommand && this.currentCommand.command && this.currentCommand.command[this.argIndex] === undefined) {
        this.runCommand();
        this.resetCommand();
      }
    },
    async runCommand() {
      this.log(this.currentCommand.command[0], this.currentCommand.args);
      this.output = (await this.asyncGitCommand(this.currentCommand.command[0], ...this.currentCommand.args))[1];
      this.loadRepo();
    },
    resetCommand() {
      this.argIndex = 1;
      this.currentCommand = undefined;
    },
    async loadRepo() {
      if (!this.path) {
        this.path = electron.remote.dialog.showOpenDialog({
          properties: ['openDirectory', 'showHiddenFiles'],
          filters: [{ name: '.git' }],
        })[0];
      }
      this.repo = git(this.path.split('/').slice(0, -1).join('/'));
      this.remotes = (await this.asyncGitCommand('getRemotes', false)).map((...args) => args[2][1][0].name).filter(distinct); // eslint-disable-line no-magic-numbers
      const branchData = (await this.asyncGitCommand('branchLocal'))[1];
      this.currentBranch = branchData.current;
      this.branches = Object.keys(branchData.branches);
      this.log(this.branches);

      this.commands = this.generateCommands();
    },
    log(...args) {
      console.log(...args); //eslint-disable-line no-console
      return args[0];
    },
    asyncGitCommand(fn, ...args) {
      let resolve;
      const promise = new Promise((innerResolve) => { resolve = innerResolve; });
      this.repo[fn](...[...args, (...promiseArgs) => resolve(promiseArgs)]);
      return promise;
    },
    generateCommands() {
      return {
        fetch: ['fetch', this.remotes],
        checkout: ['checkout', this.branches],
        checkoutBranch: ['checkoutBranch', 'input', ['HEAD']],
        pull: ['pull', this.remotes, this.branches],
        push: ['push', this.remotes, this.branches],
        branchLocal: ['branchLocal'],
        getRemotes: ['getRemotes'],
      };
    },
    choseArg(arg) {
      this.argIndex += 1;
      this.currentCommand.args.push(arg);
      this.inputText = '';
      this.runIfReady();
    },
    startCommand(command, name) {
      console.log(this); // eslint-disable-line no-console
      this.currentCommand = {
        command: command,
        args: [],
        name,
      };
      this.runIfReady();
    },
  },
};
</script>

<style lang="scss">
 .git-button {
     margin: 8px;
 }
</style>
