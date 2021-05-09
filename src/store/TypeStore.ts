import {Type} from '@/interfaces/type';

const state = () => ({
  typePick: 'pay'
});

const mutations = {
  typeOption(state: Type, e: string) {
    state.typePick = e;
  },

  setTypeVal(state: Type, val: string) {
    state.typePick = val;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
