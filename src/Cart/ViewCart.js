import * as React from "react"
import CartProducts from "./CartProducts"
import EmptyCart from "./EmptyCart"
import { useGetCart } from "./getCart"

export default function ViewCart() {
  const {data, fetchStatus} = useGetCart()
  if(fetchStatus==='fetching') {
    return <>Loading</>
  }
  else if (fetchStatus==='idle' && data.products.length !== 0) {
    return <CartProducts items={data}/>
  } 
  else {
    return (
      <EmptyCart />
    )
  }
}
