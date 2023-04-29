import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ViewProducts from "./ViewProducts"
import Layout from "./Layout"
import ViewCart from "./Cart/ViewCart"
import Login from "./Login/Login"
import SignUp from "./Signup"
import OrdersPage from "./Orders/OrdersPage"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<ViewProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/cart" element={<ViewCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
