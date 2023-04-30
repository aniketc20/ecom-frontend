import React from "react"
import EmptyOrderIcon from "./Empty-order.svg"

export default function EmptyCart() {
  return (
    <div style={{backgroundColor: "white"}}>
      <img src={EmptyOrderIcon} alt="No Order Logo" />
    </div>
  )
}
