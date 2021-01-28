<template>
  <div class="container">
    <div class="row">
      <h3 class="text-center p-5"> {{ product.id == 0 ? 'Entry' : 'Update'}} new product.</h3>
      <div class="alert alert-danger" role="alert" v-if="errorMessages.length > 0">
          <li v-for="(error,ind) in errorMessages" :key="ind">{{ error }}</li>
      </div>
      <div class="alert alert-success" role="alert" v-if="successMessage != null">
          {{ successMessage }}
      </div>
      <form method="post" @submit.prevent="$data[product.id == 0 ? save() : update()]">
        <div class="mb-3">
          <label for="title">Title</label>
          <input v-model="product.title" type="text" class="form-control">
        </div>
        <div class="mb-3">
          <label for="price">Price</label>
          <input v-model="product.price" type="number" step="0.001" class="form-control">
        </div>
        <div class="mb-3">
          <label for="description">Descipiton</label>
          <textarea v-model="product.description" class="form-control"></textarea>
        </div>
        <div class="mb-3">
          <label for="image">Image</label>
          <input type="file" class="form-control" @change="imageUpload">
        </div>
        <div class="d-grid">
          <button type="submit" :disabled="isLoading" class="btn btn-primary">{{ product.id == 0 ? 'Save' : 'Update' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    isLoading: false,
    product: {
      id: 0,
      title: '',
      price: '',
      description: '',
      image: ''
    },
    successMessage: null,
    errorMessages: [],
  }),
  async created() {
    if(this.$route.params.id != undefined){
      await this.getProduct();
    }
  },
  methods: {
    imageUpload: function(e) {
      this.product.image = e.target.files[0];
    },

    save: function() {
      this.isLoading= true;
      this.successMessage = null;
      this.errorMessages = [];
      let fd = new FormData();
      Object.keys(this.product).forEach(key => {
        fd.append(key, this.product[key]);
      })

      this.$store.dispatch('product/saveProduct', fd)
      .then(response => {
        this.successMessage = response;
        this.clearForm();
        this.isLoading= false;
      })
      .catch(error => {
        this.errorMessages = error;
        this.isLoading= false;
      });
    },

    getProduct: async function() {
      await this.$store.dispatch('product/getProduct', this.$route.params.id)
        .then(res => {
          this.product = res;
          this.product.image = '';
        }).catch(error => this.errorMessages = error)
    },

    update: function() {
      this.isLoading= true;
      this.successMessage = null;
      this.errorMessages = [];
      let fd = new FormData();
      Object.keys(this.product).forEach(key => {
        fd.append(key, this.product[key]);
      })

      this.$store.dispatch('product/updateProduct', fd)
      .then(response => {
        this.successMessage = response;
        this.isLoading= false;
      })
      .catch(error => {
        this.errorMessages = error;
        this.isLoading= false;
      });
    },

    clearForm: function() {
      this.product= {
        id: 0,
        title: '',
        price: '',
        description: '',
        image: ''
      }
    }
  }
}
</script>
