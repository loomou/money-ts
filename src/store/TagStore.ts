import createId from '../libs/createId';
import router from '../router';
import {Tags, tagState} from '@/interfaces/tags';
import {MutationTree, Module} from 'vuex';

const state: tagState = {
  tagList: [],
  currentTag: undefined,
  filterTag: undefined,
  createTagType: 'pay',
  showTip: false,
};

const mutations: MutationTree<tagState> = {
  // fetchTags(state) {
  //   state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
  //   if (state.tagList.length === 0) {
  //     state.tagList = defaultType;
  //     window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
  //   }
  // },

  setTagList(state, payload) {
    state.tagList = payload
  },

  createTag(state, payload: Tags) {
    const id = createId().toString();
    state.tagList.push({id, name: payload.name, icon: 'other', type: payload.type});
    window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
  },

  setCurrentTag(state, id: Tags) {
    state.currentTag = id;
  },

  setFilterTag(state, type: string) {
    state.filterTag = state.tagList.filter(t => t.type === type);
  },

  updateTag(state, payload: Tags) {
    const {id, name, icon, type} = payload;
    const tag = state.tagList.filter(item => item.id === id)[0];
    tag.name = name;
    tag.id = id;
    tag.icon = icon;
    tag.type = type;
    window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    router.back();
  },

  removeTag(state, id: string | number) {
    let index = -1;
    for (let i = 0; i < state.tagList.length; i++) {
      if (state.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      state.tagList.splice(index, 1);
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
      router.back();
    } else {
      window.alert('删除失败');
    }
  },

  modifyCurrentTag(state) {
    state.currentTag = 'pay';
  },
};

export const TagStore: Module<tagState, any> = {
  namespaced: true,
  state,
  mutations,
};
