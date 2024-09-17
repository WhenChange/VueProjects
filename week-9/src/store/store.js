// store.js
import { createStore } from 'vuex'
import { getAuth, signOut } from 'firebase/auth';

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, user) {
      
      commit('setAuthentication', true);
      commit('setUser', user);
    },
    logout({ commit }) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          commit('setAuthentication', false);
          commit('setUser', null);
          console.log('User successfully signed out.');
          console.log(auth.currentUser);
        })
        .catch((error) => {
          console.error('Sign out error:', error);
        });
    },
  },
});
