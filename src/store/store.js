import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

export const store = new vuex.Store({
  state: {
    theme: 'light'
  },
  getters: {
    GetTheme: state => state.theme
  },
  mutations: {
    SetTheme: (state, result) => {
      state.theme = result
    }
  }
})
