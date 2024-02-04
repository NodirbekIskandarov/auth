import axios from 'axios'

const http = axios.create({
    baseURL: 'baseUrl'
})

export default http