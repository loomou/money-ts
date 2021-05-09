import {files, Profile} from '@/interfaces/files';

const state = () => ({
  profile: undefined,
});

const mutations = {
  fetchProfile(state : Profile) {
    const storedProfile = window.localStorage.getItem('profile');
    const defaultProfile = {
      displayName: undefined,
      avatar: undefined,
      gender: "男",
    };

    state.profile = typeof storedProfile === 'string' ? JSON.parse(storedProfile) : defaultProfile;
  },

  saveProfile(state : Profile, profile : files) {
    state.profile = profile;

    window.localStorage.setItem('profile', JSON.stringify(state.profile));
  },
};

export default {
  namespaced: true,
  state,
  mutations
};
