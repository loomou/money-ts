import Vue from 'vue';
import Vuex from 'vuex';
import RecordStore from './RecordStore';
import TagStore from './TagStore';
import FileStore from './FileStore';
import RecordSortStore from '@/store/RecordSortStore';
import TypeStore from './TypeStore';

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
