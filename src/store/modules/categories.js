import firebase from 'firebase';

export default {
  namespaced: true,
  state: {
    items: [],
  },
  getters: {},
  actions: {
    fetchCategory({ dispatch }, { id }) {
      return dispatch('fetchItem', { emoji: '🏷', resource: 'categories', id }, { root: true });
    },

    fetchCategories({ dispatch }, { ids }) {
      return dispatch('fetchItems', { resource: 'categories', ids, emoji: '🏷' }, { root: true });
    },

    fetchAllCategories({ commit }) {
      const db = firebase.firestore();
      return new Promise((resolve) => {
        db.collection('categories').onSnapshot((querySnapshot) => {
          const categories = querySnapshot.docs.map((doc) => {
            const item = { id: doc.id, ...doc.data() };
            commit('setItem', { resource: 'categories', item }, { root: true });
            return item;
          });
          resolve(categories);
        });
      });
    },
  },
  mutations: {},
};
