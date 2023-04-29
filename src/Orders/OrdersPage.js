import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserOrders from "./UserOrders"
import EmptyCart from "./EmptyCart"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()
  const api_url = process.env.REACT_APP_API_URL

  useEffect(() => {
    fetch(api_url + "orders", {
      credentials: "include",
      method: "GET",
      mode: "cors",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.message === "Access denied") {
          navigate("/login")
        }
        setOrders(data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])
  var page
  if (orders.length === 0) {
    page = <EmptyCart />
  } else {
    page = <UserOrders orders={orders} />
  }
  return <>{page}</>
}
