<template>
    <div class="container">
        <div class="product-box">
            <h2 style="margin-bottom:25px;" >Add New Categorie</h2>
            <a-space direction="vertical">
                <a-input
                v-model:value="products.title"
                placeholder="Enter the name of the new products title"
                style="width: 380px"
            />
            <a-input
                v-model:value="products.descriptions"
                placeholder="Enter the name of the new products descriptions"
                style="width: 380px"
            />
            <a-input-number v-model:value="products.price"  placeholder="Enter the name of the new products price" style="width: 380px">            
                <template #addonAfter>
                  <a-select  style="width: 50px" placeholder="$" v-model:value="products.currency">
                    <a-select-option value="$">$</a-select-option>
                    <a-select-option value="€">€</a-select-option>
                    <a-select-option value="£">£</a-select-option>
                    <a-select-option value="¥">¥</a-select-option>
                  </a-select>
                </template>
            </a-input-number>
            <a-select  style="width: 380px"  v-model:value="products.categorie_id"  >
                <a-select-option :value="categorie.id" :key="categorie.id" v-for="categorie in category">{{categorie.title}}</a-select-option>
            </a-select>
            <a-input
                v-model:value="products.images"
                placeholder="Enter the name of the new products images (URL)"
                style="width: 380px"
            />
            </a-space>
            <a-button type="primary" @click="handleAddNewProduct" >Add Product</a-button>
        </div>
        <div class="remove-product">
            <h2 style="margin-bottom:25px;" >Remove Product</h2>
            <a-select  style="width: 370px"  v-model:value="productId">
                <a-select-option :key="product.id" :value="product.id" v-for="product in product" > {{product.title}}</a-select-option>
            </a-select>
            <a-button type="primary" style="width: 140px" @click="handleRemoveProduct" >Remove Product</a-button>
        </div> 
    </div> 
</template>

  <script setup lang="ts">
    import type { IProduct } from '@/services/authservices';
    import { onMounted, reactive, ref } from 'vue';
    import categoriesservices from '@/services/categoriesservices';
    import productservices from '@/services/productservices';
    const category = ref()
    const productId=ref()
    const product=ref()
    const products =reactive<IProduct>({
        title: '',
        descriptions: '',
        price: "",
        currency: '$',
        categorie_id: "Select Categories",
        images: '',
    })
    const getProduct=async()=>{
        const {data} = await productservices.getAllProduct()
        product.value= data
    }
    const handleAddNewProduct= async()=>{
        const { error } = await productservices.addProduct(products)            
        if(!error){
            location.href='/'
        }
        else{
            alert(error.message)
        }
    }
    const handleRemoveProduct=async ()=>{
        const { error } = await productservices.removeProduct(productId.value)
        if(!error){
            location.href='/'
        }else{
            alert(error.message)
        }              
    }
    const selectCategory=async ()=>{
      const {data}= await categoriesservices.getCategories()
      category.value = data
    }
    onMounted(async ()=>{        
        await selectCategory()
        await getProduct()
    })
  </script>

  <style>
  .container{
    display: flex;
    gap: 15rem;
    justify-content: center;
  }
  .product-box{
    width: 400px;
    display: flex;
    flex-direction: column;
    gap:1rem;
    padding: 10px;
    margin-left: 15px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

    button{
        width:150px;
    }
  }
  .remove-product{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 10px;
    border: 1px solid transparent;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }
  </style>