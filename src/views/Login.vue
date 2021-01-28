<template>
    <div class="main">
        <div class="card login-form">
            <div class="card-body" v-if="showFrom=='login'">
                <h3 class="card-title text-center">Log in to Vuejs crud</h3>
                <div class="alert alert-danger" role="alert" v-if="errorMessage.length > 0">
                   <li v-for="(error,ind) in errorMessage" :key="ind">{{ error }}</li>
                </div>
                <div class="alert alert-success" role="alert" v-if="successMessage != null">
                    {{ successMessage }}
                </div>
                <div class="card-text">
                    <form method="post" @submit.prevent="userLogin()">
                        <div class="mb-3">
                            <label for="email">Email address</label>
                            <input v-model="login.email" type="email" class="form-control form-control-sm" id="email" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="password">Password</label>
                            <input v-model="login.password" type="password" class="form-control form-control-sm" id="password">
                        </div>
                        <div class="d-grid">
                            <button type="submit" :disabled="isLoading" class="btn btn-primary">Sign in</button>
                        </div>
                        
                        <div class="footer">
                            Don't have an account? <a href="#" @click="showFrom = 'registration'">Create One</a>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card-body" v-if="showFrom=='registration'">
                <h3 class="card-title text-center">Registration to vuejs</h3>
                <div class="card-text">
                    <div class="alert alert-danger" role="alert" v-if="errorMessage.length > 0">
                        <li v-for="(error,ind) in errorMessage" :key="ind">{{ error }}</li>
                    </div>
                    <div class="alert alert-success" role="alert" v-if="successMessage != null">
                        {{ successMessage }}
                    </div>
                    <form method="post" @submit.prevent="userRegistration()">
                        <div class="mb-3">
                            <label for="name">Name</label>
                            <input v-model="registration.name" type="text" class="form-control form-control-sm" id="name" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="email">Email address</label>
                            <input v-model="registration.email" type="email" class="form-control form-control-sm" id="email" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="password">Password</label>
                            <input v-model="registration.password" type="password" class="form-control form-control-sm" id="password">
                        </div>
                        <div class="d-grid">
                            <button type="submit" :disabled="isLoading" class="btn btn-primary">Registration</button>
                        </div>
                        
                        <div class="footer">
                            You have an account ? <a href="#" @click="showFrom = 'login'">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: () => ({
        showFrom: 'login',
        registration: {
            name: '',
            email: '',
            password: ''
        },
        login: {
            email: '',
            password: ''
        },
        errorMessage: [],
        successMessage: null,
        isLoading: false
    }),
    methods: {
        userRegistration: function() {
            this.isLoading = true;
            this.errorMessage = [];
            this.successMessage = null;
            this.$store.dispatch('auth/registration', this.registration).then((res) => {
                this.successMessage = res;
                this.clearForm();
                this.isLoading = false;
            }).catch((error) => {
                this.errorMessage = error;
                this.isLoading = false;
            })
        },

        userLogin: function() {
            this.isLoading = true;
            this.errorMessage = [];
            this.successMessage = null;
            this.$store.dispatch('auth/login', this.login).then(response => {
                this.isLoading = false;
                this.$router.push('/');
            })
            .catch(error => {
                this.errorMessage = error;
                this.isLoading = false;
            });
        },

        clearForm: function() {
            this.registration= {
                name: '',
                email: '',
                password: ''
            }
        }
    }
}
</script>
<style scoped>
    a {
        text-decoration: none;
    }
    .main{
        height:100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    form{
        padding-top: 10px;
        font-size: 14px;
        margin-top: 30px;
    }

    .card-title{ 
        font-weight:300; 
    }

    .btn{
        font-size: 14px;
    }
    
    .login-form{ 
        width:330px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .footer{
        text-align:center;
        padding:20px 0 0;
    }
</style>