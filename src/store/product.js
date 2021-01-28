export default {
    namespaced: true,
    
    state: () => ({
        product: null,
        products: []
    }),

    getters: {
        product: (state) => {
            return state.product;
        },

        products: (state) => {
            return state.products;
        }
    },

    mutations: {
        setProduct: (state, payload) => {
            state.product = payload;
        },
        setProducts: (state, payload) => {
            state.products = payload;
        }
    },

    actions: {
        saveProduct: function(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post("save-product", payload, {
                    headers: {
                        Authorization: this.getters['auth/jwt'],
                        "Content-Type": "application/json",
                    }
                })
                .then(response => resolve(response.data.message))
                .catch(error => reject(error.response.data.message))
            })
        },

        updateProduct: function(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post("update-product", payload, {
                    headers: {
                        Authorization: this.getters['auth/jwt'],
                        "Content-Type": "application/json",
                    }
                })
                .then(response => resolve(response.data.message))
                .catch(error => reject(error.response.data.message))
            })
        },

        deleteProduct: function(context, payload) {
            return new Promise((resolve, reject) => {
                axios.delete("delete-product/"+payload, {
                    headers: {
                        Authorization: this.getters['auth/jwt'],
                        "Content-Type": "application/json",
                    }
                })
                .then(response => resolve(response.data.message))
                .catch(error => reject(error.response.data.message))
            })
        },

        getProducts: function(context) {
            return new Promise((resolve, reject) => {
                axios.get("products", {
                    headers: {
                        Authorization: this.getters['auth/jwt'],
                        "Content-Type": "application/json",
                    }
                })
                .then(response => {
                    context.commit('setProducts', response.data.products);
                    resolve(response)
                })
                .catch(error => reject(error.response.data.message))
            })
        },

        getProduct: function(context, payload) {
            return new Promise((resolve, reject) => {
                axios.get("product/"+payload, {
                    headers: {
                        Authorization: this.getters['auth/jwt'],
                        "Content-Type": "application/json",
                    }
                })
                .then(response => {
                    context.commit('setProduct', response.data.product);
                    resolve(response.data.product)
                })
                .catch(error => reject(error.response.data.message))
            })
        }
    },
}