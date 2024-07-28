import React from "react"
import UserOrders from "./UserOrders"
import EmptyCart from "./EmptyCart"
import { useGetOrders } from "./getOrders"

export default function OrdersPage() {
  const {isLoading, data} = useGetOrders()
  if(isLoading) {
    return <>Loading</>
  }
  else if (data!==undefined && data.length !== 0) {
    return <UserOrders orders={data} />
  } 
  else {
    return <EmptyCart />
  }
}
