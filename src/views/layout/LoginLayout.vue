<template>
    <a-layout class="layout">
      <a-layout-header >
            <div class="logo">Catalog</div>
            <a-menu
            v-model:selectedKeys="selectedKeys"
            theme="dark"
            mode="horizontal"
            :style="{ lineHeight: '64px' }"
            >
                <a-menu-item key="1"><RouterLink to='/'>Home</RouterLink></a-menu-item>
            </a-menu>
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
  import { ref } from 'vue';
  const selectedKeys = ref<string[]>(['2']);
  </script>
  <style scoped>
  
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
  