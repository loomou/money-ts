import {files, Profile} from '@/interfaces/files';
import {MutationTree, Module} from 'vuex';


const state:Profile = {
  profile: undefined,
};

const mutations:MutationTree<Profile> = {
  fetchProfile(state) {
    const storedProfile = window.localStorage.getItem('profile');
    const defaultProfile = {
      displayName: undefined,
      avatar: undefined,
      gender: "男",
    };

    state.profile = typeof storedProfile === 'string' ? JSON.parse(storedProfile) : defaultProfile;
  },

  saveProfile(state, profile : files) {
    state.profile = profile;

    window.localStorage.setItem('profile', JSON.stringify(state.profile));
  },
};

export const FileStore: Module<Profile, any> = {
  namespaced: true,
  state,
  mutations
};
