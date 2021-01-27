export default {
    namespaced: true,

    state: () => ({
        user: null,
        token: null
    }),
    
    getters: {
        jwt: (state) => {
            if(state.token) 
                return state.token;
            else 
                return localStorage.getItem('_accessToken');
        },

        user: (state) => {
            if(state.user != null) 
                return state.user;
            else 
                return JSON.parse(localStorage.getItem('_user'));
        }
    },

    mutations: {
        setUser: (state,payload) => {
            state.user = payload;
        },
        setToken: (state,payload) => {
            state.token = payload;
        }
    },

    actions: {
        login: function(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('login', payload, {
                    headers: {
                        "Accept": "application/json"
                    }
                }).then(response => {
                    let r = response.data;
                    context.commit('setUser', r.user);
                    context.commit('setToken', r.token);
                    localStorage.setItem('_accessToken', r.token);
                    localStorage.setItem('_user', JSON.stringify(r.user));
                    resolve(response.data)
                })
                .catch(error => reject(error.response.data.message))
            })
        },

        registration: function(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('registration', payload, {
                    headers: {
                        "Accept": "application/json"
                    }
                }).then(response => resolve(response.data.message))
                .catch((error) => reject(error.response.data.message))
            })
        },

        logout: function(context) {
            return new Promise((resolve, reject) => {
                axios.get('logout', {
                    headers: {
                        Authorization: this.getters['auth/jwt'],
                        "Content-Type": "application/json",
                    }
                }).then(response => {
                    context.commit('setUser', null);
                    context.commit('setToken', null);
                    localStorage.removeItem('_accessToken');
                    localStorage.removeItem('_user');
                    resolve(response.data.message)
                })
                .catch(error => reject(error.response.data.message))
            })
        }
    }
}