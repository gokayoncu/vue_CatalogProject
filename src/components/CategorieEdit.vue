<template>
    <div class="container">
        <div class="categorie-box">
            <h2 style="margin-bottom:40px;" >Add New Categorie</h2>
            <a-textarea
                v-model:value="title"
                placeholder="Please enter the name of the new categorie"
                auto-size
            />
            <a-button type="primary" @click="handleAddNewCategorie" >Add Categorie</a-button>
        </div>
        <div class="categorie-box">
            <h2 style="margin-bottom:40px;" >Delete Categorie</h2>
            <a-select  style="width: 300px"  v-model:value="id"  >
                <a-select-option :value="categorie.id" :key="categorie.id" v-for="categorie in category">{{categorie.title}}</a-select-option>
            </a-select>
        <a-button type="primary" @click="handleRemoveCategorie" >Remove Categorie</a-button>
    
        </div>
    </div>      
</template>

  <script setup lang="ts">
    import categoriesservices from '@/services/categoriesservices';
    import { onMounted, ref } from 'vue';
  
    const title =ref()
    const id =ref()
    const category= ref()
    const handleAddNewCategorie= async()=>{
        const { error } = await categoriesservices.addCategories(title.value) 
        if(!error){
            location.href='/'
        }else{
            alert(error.message)
        }
    }
    
    const handleRemoveCategorie= async()=>{
        const { error } = await categoriesservices.removeCategories(id.value)
        if(!error){
            location.href='/'
        }else{
            alert(error.message)
        }
    }
    const getCategories = async ()=>{
       const {data} = await categoriesservices.getCategories()
       category.value=data
    }
    onMounted( async()=>{
        await getCategories()
    })
          
  </script>

  <style>
  .container{
    display: flex;
    gap: 15rem;
    justify-content: center;
  }
  .categorie-box{
    width: 320px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap:1rem;
    margin-left: 15px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

    button{
        width:150px;
    }
  }
  </style>