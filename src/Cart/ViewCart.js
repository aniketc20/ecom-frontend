import * as React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CartProducts from "./CartProducts"
import EmptyCart from "./EmptyCart"

export default function ViewCart() {
  const [items, setItems] = useState([])
  var [sum, setSum] = useState(0)
  const navigate = useNavigate()
  const api_url = process.env.REACT_APP_API_URL

  useEffect(() => {
    fetch(api_url + "getCart", {
      credentials: "include",
      method: "GET",
      mode: "cors",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Access denied") {
          navigate("/login")
        }
        if (data.products != null) {
          setItems(data.products)
          data.products.forEach((element) => {
            sum += element.price * element.qty
            setSum(sum)
          })
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])
  var page
  if (items.length === 0) {
    page = <EmptyCart />
  } else {
    page = (
      <CartProducts
        items={items}
        setItems={setItems}
        sum={sum}
        setSum={setSum}
      />
    )
  }
  return <>{page}</>
}
