import { ref } from 'vue'
import axios from 'axios'

const Coffees = ref([])
const pages = ref(1)
const loading = ref(false)
const activePage = ref(1)
const pageSize = ref(12)
const currentCoffee = ref(null)

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  auth: {
    username: import.meta.env.VITE_API_USERNAME,
    password: import.meta.env.VITE_API_PASSWORD,
  },
})

const getCoffees = async () => {
  loading.value = true
  const { data, headers } = await api.get('/api/coffees', {
    params: {
      page: activePage.value,
      size: pageSize.value,
    },
  })
  coffees.value = data
  pages.value = Number(headers['x-total-pages']) || 1
  loading.value = false
}

const fetchCoffee = async (id) => {
    const { data } = await api.get(`/api/coffees/${id}`)
    currentCoffee.value = data
    console.log(data)
  }

const useAPI = () => {
  return { coffees, pages, activePage, loading, pageSize, getCoffees, fetchCoffee, currentCoffee}
}

export default useAPI