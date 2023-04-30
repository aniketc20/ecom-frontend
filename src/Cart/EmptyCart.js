import React from "react"
import EmptyCartIcon from "./emptyCart.svg"

export default function EmptyCart() {
  return (
    <div style={{backgroundColor: "white"}}>
      <img src={EmptyCartIcon} alt="No Order Logo" />
    </div>
  )
}
