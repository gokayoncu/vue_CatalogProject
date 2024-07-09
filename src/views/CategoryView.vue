<template>
    <div>
        <a-breadcrumb style="margin-bottom: 10px " v-if="category">
            <a-breadcrumb-item>Categories</a-breadcrumb-item>
            <a-breadcrumb-item>{{category.title}}</a-breadcrumb-item>          
          </a-breadcrumb>
          <a-skeleton :paragraph="{ rows: 0 }" v-else />
        <a-skeleton avatar :paragraph="{ rows: 4 }" v-if="loading" />
        <div v-else >
            <a-empty v-if="products.lenght>0" description="Bu kategoriye ait ürün bulunamadı."/>
            <a-row :gutter="16" v-else>
                <a-col :span="6" :key="product.id" v-for="product in products" >
                    <RouterLink :to="'/product/'+product.id">
                        <a-card hoverable style="width: 240px">
                            <template #cover>
                              <img alt="example" :src="product.images" />
                            </template>
                            <a-card-meta :title="product.title">
                              <template #description>
                                {{ product.price }}{{ product.currency }}
                              </template>
                            </a-card-meta>
                        </a-card>
                    </RouterLink>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script setup lang="ts">
    import categoriesservices from '@/services/categoriesservices';
    import productservices from '@/services/productservices';
    import { onMounted, ref,watch } from 'vue';
    import { useRoute } from 'vue-router';
    const route = useRoute();
    const products = ref();
    const loading = ref(true)
    const category = ref()
    
    const loadProduct =async ()=>{
        loading.value = true;
        const {data} = await productservices.getProducts(route.params.id)
        products.value = data
        loading.value = false
    }
    
    const selectCategory=async ()=>{
      const {data}= await categoriesservices.selectCategories(route.params.id)
      category.value = data
    }

    watch(()=>route.params.id, async()=> await loadProduct() )

    onMounted(async ()=>{
        await loadProduct()
        await selectCategory()
    })

</script>

<style scoped >
    
    img{
        aspect-ratio: 10/9;
    }
    
</style>