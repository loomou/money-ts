import Vue from 'vue';
import Vuex from 'vuex';
// @ts-ignore
import RecordStore from './RecordStore.ts';
// @ts-ignore
import TagStore from './TagStore.ts';
// @ts-ignore
import FileStore from './FileStore.ts';
// @ts-ignore
import RecordSortStore from '@/store/RecordSortStore.ts';
// @ts-ignore
import TypeStore from './TypeStore.ts';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    RecordStore,
    TagStore,
    FileStore,
    RecordSortStore,
    TypeStore
  },
});

export default store;
