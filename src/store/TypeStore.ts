import {Type} from '@/interfaces/type';
import {MutationTree, Module} from 'vuex';

const state: Type = {
  typePick: 'pay'
};

const mutations: MutationTree<Type> = {
  typeOption(state, type: string) {
    state.typePick = type;
  },

  setTypeVal(state, val: string) {
    state.typePick = val;
  }
};

export const TypeStore: Module<Type, any> = {
  namespaced: true,
  state,
  mutations
};
