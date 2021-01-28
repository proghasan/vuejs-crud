<template>
  <div class="container">
    <div class="row">
      <h3 class="text-center p-1">Welcome Vuejs crud </h3>
      <div class="col-md-2 ms-auto ">
        <router-link to="product" class="btn btn-primary btn-sm add-product">Add Product</router-link>
      </div>
      <div class="col-md-12 mt-1">
        <table class="table table-sm table-bordered">
          <thead class="text-center">
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(product, ind) in products" :key="ind">
              <td>{{ ind+1 }}</td>
              <td>
                <img :src="product.image" alt=""> 
              </td>
              <td>{{ product.title }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.description }}</td>
              <td>
                <router-link :to="{ name: 'EditProduct', params: { id: product.id } }" class="btn btn-sm btn-warning">
                  Edit
                </router-link>
                <button @click.prevent="deleteProduct(product.id)" class="btn btn-sm btn-danger ms-2">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    products: [],
    successMessage: null,
    errorMessage: null,
  }),

  async created() {
    await this.getProducts();
  },
  methods: {
    getProducts: async function() {
      await this.$store.dispatch('product/getProducts');
      this.products = this.$store.getters['product/products'];
    },

    deleteProduct: function(id) {
      this.$store.dispatch('product/deleteProduct', id)
        .then(res => {
          this.successMessage = res;
          this.getProducts();
        })
        .catch(error => this.errorMessage =  error);
    }
  }
}
</script>
<style scoped>
  .add-product {
    float: right;
  }
  table img{
    width: 100px;
    height: 100px;
  }
</style>
