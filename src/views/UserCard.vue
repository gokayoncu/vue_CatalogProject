<template>
  <a-breadcrumb >
    <a-breadcrumb-item class="cardHeader" >My Cards</a-breadcrumb-item>          
  </a-breadcrumb>
  <a-table :columns="columns" :data-source="cards" :scroll="{ x: 1100, y: 300 }">
    <template #bodyCell="{column,record }">
      <template v-if="column.title === 'Products İmages'">
        <img :src='record.products?.images' alt="İmages not Founded" class="table-images">
      </template>
      <template v-else-if="column.title === 'Price'">
        <p>{{record.products?.price}} {{record.products?.currency}}</p>
      </template>
      <template v-else-if="column.title === 'actions'">
        <a-button @click="handleRemove(record)">Sil</a-button>
      </template>
    </template>
  </a-table>
  <div class="total-amount" >Total amount: {{cardSum}}</div>
</template>

<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue';
import { ref, onMounted, computed } from 'vue';
import cardServices from '@/services/cardServices';

interface DataItem {
  id: number;
  amount: number;
  title: string;
  currency: string;
  price: number;
  images: string;
}

const columns: TableColumnsType = [
  { title: 'Products İmages',dataIndex: ['products','images'],width: 50},
  { title: 'Title', dataIndex: ['products','title'],width: 100 },
  { title: 'Price', dataIndex: ['products','price'],width: 50 },
  { title: 'amount', dataIndex: 'amount', width: 50 },
  { title: 'actions', dataIndex: ['actions'], width: 50 },
];

const cards = ref<DataItem[]>([]);

const cardSum = computed(()=>{
  return cardServices.calculatedCardSum(cards.value)
})

const loading = async () => {
  const userId = await cardServices.getUser();
  const  data  = await cardServices.getCard(userId)
  cards.value = data
};
  const handleRemove= async(cardItem:any)=>{
    await cardServices.removeCardItem(await cardServices.getUser(),cardItem.id)
    await loading()
  }

onMounted(async () => {
  await loading();
});

</script>

<style>
  .cardHeader{
    margin-bottom: 1rem;
  }
  .table-images{
    width: 5rem;
    height: 5rem;
  }
  .total-amount{
    position: absolute;
    font-size: 1.4rem;
    top: 8rem;
    right: 150px;
    background-color: yellowgreen;
    padding: 5px;
    border-radius: 10px
  }
</style>