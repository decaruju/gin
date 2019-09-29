import SplitView from './components/SplitView.vue';
import TabView from './components/TabView.vue';

import Sql from '../../apps/sql/Sql.vue';
import Color from '../../apps/color/Color.vue';
import Git from '../../apps/git/Git.vue';
import Sound from '../../apps/sound/Sound.vue';
import Fontawesome from '../../apps/fontawesome/Fontawesome.vue';

export default {
  root: TabView,
  apps: [
    {
      component: SplitView,
      name: 'Row',
      icon: 'fa-align-justify fa-rotate-90',
      shortcut: 'KeyR',
      props: {
        direction: 'row',
      },
    },
    {
      component: SplitView,
      name: 'Column',
      icon: 'fa-align-justify',
      shortcut: 'KeyC',
      props: {
        direction: 'column',
      },
    },
    {
      component: TabView,
      name: 'TabView',
      icon: 'fa-table',
      shortcut: 'KeyT',
    },
    {
      component: Git,
      icon: 'fa-git',
      name: 'Git',
      shortcut: 'KeyG',
    },
    {
      component: Sound,
      icon: 'fa-envelope',
      name: 'Sound',
    },
    {
      component: Fontawesome,
      name: 'Fontawesome',
      icon: 'fa-font-awesome',
    },
    {
      component: Color,
      name: 'Color picker',
      icon: 'fa-palette',
      shortcut: 'KeyL',
    },
    {
      component: Sql,
      name: 'Sql editor',
      icon: 'fa-database',
      shortcut: 'KeyS',
    },
  ],
};
