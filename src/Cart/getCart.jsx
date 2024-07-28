import {
    useQuery,
  } from "@tanstack/react-query"
import axios from "axios"

axios.defaults.withCredentials = true;

const getCart = async () => {
    const response = await axios.get("http://127.0.0.1:8080/getCart")
    return response.data
}

export const useGetCart = () => {
    return useQuery({
        queryKey:['cart'],
        queryFn: () => getCart(),
    })
}

export const incrementCall = async (pId) => {
    const response = await axios.post("http://127.0.0.1:8080/addToCart", pId, {headers: {
        "Content-Type": "application/json; charset=UTF-8"
    }})
    return response
}

export const decrementCall = async (pId) => {
    const response = await axios.post("http://127.0.0.1:8080/decreaseQty", pId, {headers: {
        "Content-Type": "application/json; charset=UTF-8"
    }})
    return response
}

export const removeItemApi = async (pId) => {
    const response = await axios.post("http://127.0.0.1:8080/removeItem", pId, {headers: {
        "Content-Type": "application/json; charset=UTF-8"
    }})
    return response
}

export const buyApi = async (products) => {
    const response = await axios.post("http://127.0.0.1:8080/buy", JSON.stringify({ prods: products }), {headers: {
        "Content-Type": "application/json; charset=UTF-8"
    }})
    return response
}
