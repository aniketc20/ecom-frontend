import {
    useQuery,
  } from "@tanstack/react-query"
import axios from "axios"


const getOrders = async () => {
    const response = await axios.get("http://127.0.0.1:8080/orders", {withCredentials:true})
    return response.data
}

export const useGetOrders = () => {
    return useQuery({
        queryKey:['orders'],
        queryFn: () => getOrders()
    })
}