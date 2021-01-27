<template>
  
  <div class="container">
    <div class="row">
      <h3 class="text-center p-2">Welcome crud app</h3>
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
          <tbody>
            <tr>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
<style scoped>
  .add-product {
    float: right;
  }
</style>
