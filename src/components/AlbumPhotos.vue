<template>
    <q-page class="q-pa-md">
      <q-spinner v-if="isLoading" size="lg" color="primary" />
      <q-card v-else-if="photo" class="q-pa-md">
        <q-img :src="photo.url" class="q-mb-md" :alt="photo.title" />
        <div>{{ photo.title }}</div>
        <q-btn @click="goBack" color="pink" class="q-mt-md">
          Back to Gallery
        </q-btn>
      </q-card>
    </q-page>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useAlbumStore } from '../stores/albumstore'
  
  const route = useRoute()
  const router = useRouter()
  const albumStore = useAlbumStore()
  
  const { photo, isLoading, fetchPhoto } = albumStore
  
  const goBack = () => {
    router.push('/albums')
  }
  
  onMounted(() => {
    fetchPhoto(route.params.id) // Ensure route.params.id is correct
  })
  </script>
  
  <style scoped>
  .q-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .q-img {
    max-width: 100%;
    max-height: 80vh;
  }
  </style>