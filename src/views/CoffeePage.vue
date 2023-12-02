<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import useAPI from '@/composables/useAPI';

const { fetchCoffee, currentCoffee } = useAPI()


const route = useRoute()

const Coffee = ref('')
onMounted(async () => {
  await fetchCoffee(route.params.id)
  console.log(route.params.id)
})

onUnmounted(() => {
 currentCoffee.value = null
})

</script>

<template>
  <main
    class="min-h-screen bg-gradient-to-b from-amber-900 to-yellow-300 font-poppins"
  >
    <div
      v-if="currentCoffee"
      class="flex flex-col items-center justify-center gap-6"
    >
      <img class="p-8 h-64 w-64"
        :src="currentCoffee.image"
        :alt="currentCoffee.name"
      />
      <h1 class="text-white-800 text-6xl font-bold">
        {{ currentCoffee.name }}
      </h1>
      
    </div>
  </main>
</template>