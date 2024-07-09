<template>
    <a-layout class="layout">
        <a-layout-header class="header">
            <div>
              <span class="logo">Catalog</span>
            <a-menu
              v-model:selectedKeys="selectedKeys1"
              theme="dark"
              mode="horizontal"
              :style="{ lineHeight: '64px' }"
            >
              <a-menu-item key="1"><RouterLink to='/'>Home</RouterLink></a-menu-item>    
            </a-menu>
            </div>        
            <a-dropdown-button class="dropdown">
              <span v-if="!isAuth"><RouterLink to='/login'>Login</RouterLink></span>
              <span v-else ><strong>{{currentUser?.displayName}}</strong></span>
              <template #overlay v-if="isAuth" >
                <a-menu >
                  <a-menu-item key="1">
                    <UserOutlined />
                    <RouterLink to='/card' >Basket</RouterLink>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <UserOutlined />
                    <RouterLink to='/insertcategorie'>Edit Categories</RouterLink>
                  </a-menu-item>
                  <a-menu-item key="3">
                    <UserOutlined />
                    <RouterLink to='/insertproducts'>Edit Products</RouterLink>
                  </a-menu-item>
                  <a-menu-item key="4" @click="handleLogout" >
                    <UserOutlined />
                    Logout
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown-button>
          </a-layout-header>
        <a-layout-content style="padding: 0 50px ">
            <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>Login</a-breadcrumb-item>
            </a-breadcrumb>
        <div :style="{ background: '#fff', padding: '24px', minHeight: '555px' }"><RouterView /></div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
    
  </template>
  
  <script lang="ts" setup>
    import { RouterLink, RouterView} from 'vue-router'
    import { useauthStore } from '@/stores/authStore'
    import {onMounted , ref} from 'vue'
    import type { IUser } from '@/services/authservices';
    import categoriesservices from '@/services/categoriesservices';
    const currentUser = ref<IUser>()
    const isAuth = ref()
    const authStore = useauthStore()
    const selectedKeys1 = ref<string[]>(['1']);
    const categories = ref()

    onMounted(async () => {
      currentUser.value= await authStore.user
      isAuth.value = await authStore.isAuth
      const {data} = await categoriesservices.getCategories()
      categories.value=data
    })

    const handleLogout= async()=>{
      await authStore.logout()
      location.href='/login'
    }
  </script>
  <style scoped>
  .header{
    display:flex;
    justify-content: space-between;
  }
  .dropdown{
    display: flex;
    align-items: center;
  }
   .logo {
    display: flex;
    line-height: 30px;
    font-size: 18px;
    padding-left: 20px;
    float: left;
    width: 120px;
    height: 31px;
    color: #fff;
    margin: 16px 24px 16px 0;
  }
  
  .site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
  }
  .ant-row-rtl .logo {
    float: right;
    margin: 16px 0 16px 24px;
  }
  .logo {
    display: flex;
    line-height: 30px;
    font-size: 18px;
    padding-left: 20px;
    float: left;
    width: 120px;
    height: 31px;
    color: #fff;
    margin: 16px 24px 16px 0;
  }
  
  [data-theme='dark'] .site-layout-content {
    background: #141414;
  }
  </style>
  