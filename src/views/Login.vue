<template>
    <div class="main">
        <div class="card login-form">
            <div class="card-body" v-if="showFrom=='login'">
                <h3 class="card-title text-center">Log in to crud app</h3>
                <div class="card-text">
                    <form method="post">
                        <div class="mb-3">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control form-control-sm" id="exampleInputPassword1">
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">Sign in</button>
                        </div>
                        
                        <div class="footer">
                            Don't have an account? <a href="#" @click="showFrom = 'registration'">Create One</a>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card-body" v-if="showFrom=='registration'">
                <h3 class="card-title text-center">Registration to crud app</h3>
                <div class="card-text">
                    <form method="post">
                        <div class="mb-3">
                            <label for="name">Name</label>
                            <input type="text" class="form-control form-control-sm" id="name" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control form-control-sm" id="exampleInputPassword1">
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">Sign in</button>
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
        showFrom: 'login'
    }),
    methods: {

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