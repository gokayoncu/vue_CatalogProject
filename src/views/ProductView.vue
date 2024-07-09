<template>
    <div :key="product.id" v-for="product in product" class="container" >        
        <img :src="product.images" alt="product.images">
        <div class="product-box">
            <div class="product-header">
                <h2>{{product.title}}</h2>
                <span style="letter-spacing:2px;" >Ürün Eklenme Tarihi: {{product.created_at}}</span>
            </div>
            <span >{{product.descriptions}}</span>
            <div class="product-footer">
                <span style="text-align: right; font-size:1.3rem;" >Ürün Fiyatı: {{product.price}}{{product.currency}}</span>
                <div class="product-btn" v-if="isAuth" >
                    <input type="number" placeholder="1" v-model="amount">
                    <a-button type="primary" class="buyBtn" @click="handleAddCart(product)" >Buy</a-button>
                </div>
                <div class="product-btn" v-else >
                    <span>Please log in.</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import supabase from '@/plugin/supabase';
import cardServices from '@/services/cardServices';
import { useauthStore } from '@/stores/authStore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const product = ref()
const amount = ref<number>(1)
const authStore = useauthStore()
const route = useRoute()
const isAuth=ref()

const loadProduct =async ()=>{
    const {data} = await supabase.from('products').select().eq('id', route.params.id)
    const auth = await authStore.isAuth
    product.value = data
    isAuth.value = auth
}
const handleAddCart= async (product:any)=>{
    const {data:userData} = await supabase.auth.getUser()
    const { error } = cardServices.addCardItem(amount.value,product.id,userData.user?.id)
    if(error){
        location.href='/'
    }else{
        alert("Ürün Başarıyla Eklendi")
    }
}
console.log(isAuth.value)
onMounted(async ()=>{
    await loadProduct();
})

</script>

<style scoped>
.container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem
}
.product-box{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    height: 90%;
    gap: 2rem;

    .product-header{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .product-footer{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        .product-btn{
            display: flex;
            justify-content: flex-end;
            gap: 3rem;
            input{
                width: 40px;
                height: 40px;
                text-align: center;
                border: 1px solid ;
                font-size: 1.2rem
            }
            button{
                background-color: yellowgreen;
                width: 5rem;
                height: 2.7rem;
                font-size: 1.3rem;
            }
        }
    }
}
img{
    width: 40%;
    height: 80%;
}
</style>