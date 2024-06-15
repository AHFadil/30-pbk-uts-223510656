<template>
    <q-page class="q-pa-md">
      <q-spinner v-if="isLoading" size="lg" color="primary" />
      <div v-else class="photo-grid">
        <q-img
          v-for="photo in photos"
          :key="photo.id"
          :src="photo.thumbnailUrl"
          :alt="photo.title"
          class="cursor-pointer"
          @click="selectPhoto(photo.id)"
          :style="photo.style"
        ></q-img>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAlbumStore } from '../stores/albumstore'
  
  const router = useRouter()
  const albumStore = useAlbumStore()
  
  const { photos, isLoading, fetchPhotos } = albumStore
  
  const selectPhoto = (photoId) => {
    router.push({ path: `/albums/${photoId}` })
  }
  
  onMounted(() => {
    fetchPhotos()
  })
  </script>
  
  <style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
  
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }
  </style>