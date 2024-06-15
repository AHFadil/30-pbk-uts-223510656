import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlbumStore = defineStore('albumStore', () => {
  const albums = ref([])
  const photos = ref([])
  const isLoading = ref(false)
  const photo = ref(null)

  const fetchAlbums = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums')
      albums.value = await response.json()
    } catch (error) {
      console.error('Error fetching albums:', error)
    }
  }

  const fetchPhotos = async (albumId = 1) => {
    try {
      isLoading.value = true
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      const data = await response.json()
      photos.value = data.map((photo) => ({
        id: photo.id,
        thumbnailUrl: photo.thumbnailUrl,
        url: photo.url,
        title: photo.title,
        style: {
          width: '150px',
          height: '150px',
        },
      }))
    } catch (error) {
      console.error('Error fetching photos:', error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchPhoto = async (id) => {
    try {
      isLoading.value = true
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      if (!response.ok) throw new Error(`Error: ${response.statusText}`)
      photo.value = await response.json()
    } catch (error) {
      console.error('Error fetching photo:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    albums,
    photos,
    photo,
    isLoading,
    fetchAlbums,
    fetchPhotos,
    fetchPhoto,
  }
})