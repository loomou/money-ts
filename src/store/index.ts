import Vue from 'vue';
import Vuex from 'vuex';
import {RecordStore} from './RecordStore';
import {TagStore} from './TagStore';
import {FileStore} from './FileStore';
import {TypeStore} from './TypeStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    RecordStore,
    TagStore,
    FileStore,
    TypeStore
  },
});

export default store;
