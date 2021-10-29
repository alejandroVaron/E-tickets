import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
const store = createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    user: {},
    companySelect: "",
    project: {},
    userHistory: {},
  },
  getters: {},
  mutations: {
    setUser(state, value) {
      state.user = value;
    },
    setCompany(state, value) {
      state.companySelect = value;
    },
    setProject(state, value) {
      state.project = value;
    },
    setUserHistory(state, value) {
      state.userHistory = value;
    },
  },
  actions: {},
});
export default store;
