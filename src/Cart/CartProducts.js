import * as React from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import CardMedia from "@mui/material/CardMedia"
import { IconButton, Typography } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import CloseIcon from "@mui/icons-material/Close"
import Modal from "@mui/material/Modal"
import { useNavigate } from "react-router-dom"
import { incrementCall } from "./getCart"
import { decrementCall } from "./getCart"
import { removeItemApi } from "./getCart"
import { buyApi } from "./getCart"


export default function CartProducts({items}) {
  const [products, setProducts] = React.useState(items.products);
  const [sum,setSum] = React.useState(products.reduce((prevSum,product)=>{
    return prevSum+product.price*product.qty},0));
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))

  const increment = async (pId, price) => {
    const {data, status} = await incrementCall(pId)
    if(status === 200) {
      setProducts(data.products);
      setSum(sum+price)
    }
  }

  const decrement = async (pId, price) => {
    const decrementedItem = products.find(item => item.productId === pId)
    if (decrementedItem.qty >= 2) {
      const {data, status} = await decrementCall(pId)
      if(status === 200) {
        setProducts(data.products);
        setSum(sum-price)
      }
    }
  }

  const checkout = async (products) => {
    console.log(products)
    const {data, status} = await buyApi(products)
    if(status === 200) {
      navigate("/orders")
    }

    // setOpen(true)
    // fetch(api_url + "buy", {
    //   method: "POST",
    //   body: JSON.stringify({ prods: products }),
    //   credentials: "include",
    //   mode: "cors",
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data)
    //     //setOpen(false)
    //     //navigate("/orders")
    //     // Handle data
    //   })
    //   .catch((err) => {
    //     console.log(err.message)
    //   })
  }

  const removeItem = async (pId) => {
    const {data, status} = await removeItemApi(pId)
    if(status === 200) {
      const removedItem = products.find(item => item.productId === pId)
      setProducts(data.products);
      setSum(sum-removedItem.price*removedItem.qty)
    }}

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }))
  return (
    <>
      <Modal open={open} sx={{ mt: 10 }}>
        <Box sx={{ display: "flex" }}>
          <Alert
            severity="info"
            sx={{ m: "auto" }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false)
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Info</AlertTitle>
            <strong>Order Completed!</strong>
          </Alert>
        </Box>
      </Modal>

      <TableContainer sx={{ backgroundColor: "#eeeeee" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                style={{ backgroundColor: "#212121" }}
                align="center"
              >
                Products
              </StyledTableCell>
              <StyledTableCell
                style={{ backgroundColor: "#212121" }}
                align="center"
              >
                Qty
              </StyledTableCell>
              <StyledTableCell
                style={{ backgroundColor: "#212121" }}
                align="center"
              >
                Price(per piece)
              </StyledTableCell>
              <StyledTableCell
                style={{ backgroundColor: "#212121" }}
                align="center"
              >
                Desc
              </StyledTableCell>
              <StyledTableCell
                style={{ backgroundColor: "#212121" }}
                align="center"
              >
                Remove
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <StyledTableRow key={row.productId}>
                <StyledTableCell
                  align="center"
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <CardMedia
                    height="80"
                    component="img"
                    sx={{ objectFit: "contain" }}
                    src={row.imgUrl}
                    alt="Paella dish"
                  />
                  <Typography sx={{ m: "auto" }}>{row.product}</Typography>
                </StyledTableCell>

                <StyledTableCell>
                  <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    <IconButton
                      onClick={() => decrement(row.productId, row.price)}
                      sx={{
                        background: "#7986cb",
                        "&:hover": { backgroundColor: "#3f51b5" },
                      }}
                      size="large"
                    >
                      <RemoveIcon
                        fontSize="small"
                        style={{ color: "#e8eaf6" }}
                      />
                    </IconButton>

                    <Typography id={row.productId} sx={{ my: "auto" }}>
                      {row.qty}
                    </Typography>

                    <IconButton
                      onClick={() => increment(row.productId, row.price)}
                      sx={{
                        background: "#7986cb",
                        "&:hover": { backgroundColor: "#3f51b5" },
                      }}
                      size="large"
                    >
                      <AddIcon fontSize="small" style={{ color: "#e8eaf6" }} />
                    </IconButton>
                  </Box>
                </StyledTableCell>

                <StyledTableCell align="center">{row.price}</StyledTableCell>

                <StyledTableCell align="center">{row.desc}</StyledTableCell>

                <StyledTableCell align="center">
                  <Button
                    onClick={() => removeItem(row.productId)}
                    sx={{ fontSize: 12 }}
                    variant="contained"
                  >
                    Remove Item
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Typography sx={{ px: 1 }}>Total price:</Typography>
        <Typography id="demo">{sum}</Typography>
      </Box>
      <Button
        onClick={() => checkout(products)}
        sx={{ fontSize: 12, my: 2 }}
        variant="contained"
      >
        Checkout
      </Button>
    </>
  )
}
