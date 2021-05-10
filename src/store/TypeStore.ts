import {Type} from '@/interfaces/type';
import {MutationTree, Module} from 'vuex';

const state: Type = {
  typePick: 'pay'
};

const mutations:MutationTree<Type> = {
  typeOption(state, e: string) {
    state.typePick = e;
  },

  setTypeVal(state, val: string) {
    state.typePick = val;
  }
};

export const TypeStore:Module<Type, any> = {
  namespaced: true,
  state,
  mutations
};
