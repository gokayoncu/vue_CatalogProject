<script setup lang="ts">

import { useRoute } from 'vue-router'
import {ref, watch} from 'vue'
import { defineAsyncComponent } from 'vue';

const route = useRoute()
const layout=ref()


watch(()=>route.meta.layout,(value)=>{
  layout.value=defineAsyncComponent(()=>import(`@/views/layout/${value}.vue`))
})
</script>

<template>
  <component :is="layout" style="height:100vh"/>
</template>

<style scoped>

</style>
