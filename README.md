# gin - work environment

gin aims to be a work environment, that is, a software running its own apps.
Ideally, all work should be doable in gin.

gin comes with a tab-view app and a split-view app which allows the user to open multiple apps in the same gin window.
Currently a few apps are available, all in alpha :
- SQL editor
- Color picker
- Font Awesome catalog
- Impulse sound maker

Additionnal apps could be :
- note taking
- time tracking
- file manager
- text editor
- email
- webview for web apps (ie slack)

## Motivations
Window management in MacOS sucks, gin aims to replace it.
The end goal is to open a single gin instance and to use only apps within it.
It's like electron-emacs.

Everytime I use a web app or any software, I try to integrate it within gin.

## Keyboard
Every actions in ginapps should be doable with keyboard shortcuts, ideally without key combinations and while prefering key sequences.
For instance, when in an app, to open a new sql editor app, you type in sequence Space o s

- Space prefix to indicate the command should be passed to the tab view, not the app
- o opens the app menu
- s select the SQL editor in the menu

## Customization
gin should be entirely customizable, from color themes to keyboard shortcuts.

## Why electron
For a project like gin to work, the app ecosystem needs to flourish, web technologies are the most known and used, this therefore simplified the creation of apps.

## Why Vue
To allow for more complicated apps, a frontend framework is needed.
We feel that Vue.js is currently the best candidate for ours needs.

There are plans to support other frameworks or no frameworks in the future.

## Contributing
Please do.
You can either contribute to the main gin project, to an app or create your own app.


> GIN

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev
```
