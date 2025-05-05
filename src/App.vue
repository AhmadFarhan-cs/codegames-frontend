<template>
  <div>
  
  <router-view />
  </div>
</template>

<script>
import { onMounted } from 'vue'

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/your-endpoint`)
    const data = await response.json()
    console.log(data)
  } catch (err) {
    console.error('API fetch error:', err)
  }
})

</script>   