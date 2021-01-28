import { createStore } from 'vuex'
import auth from './auth'
import product from './product'

export default createStore({
  modules: {
    auth,
    product
  }
})
