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


export default function CartProducts(items) {
  const api_url = process.env.REACT_APP_API_URL
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

  const increment = (pId, price) => {
    fetch(api_url + "addToCart", {
      method: "POST",
      body: pId,
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        // Handle data
      })
      .catch((err) => {
        console.log(err.message)
      })
    items.items.forEach((element) => {
      if (element.productId === pId) {
        element.qty++
        ++document.getElementById(pId).innerHTML
        items.setSum(items.sum + price)
      }
    })
    console.log(items.items)
  }

  const decrement = (pId, price) => {
    var input = document.getElementById(pId)
    var value = input.innerHTML
    if (value >= 2) {
      fetch(api_url + "decreaseQty", {
        method: "POST",
        body: pId,
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          // Handle data
        })
        .catch((err) => {
          console.log(err.message)
        })
      items.items.forEach((element) => {
        if (element.productId === pId) {
          --element.qty
          --document.getElementById(pId).innerHTML
          items.setSum(items.sum - price)
        }
      })
      console.log(items.items)
    }
  }

  const checkout = (products) => {
    setOpen(true)
    fetch(api_url + "buy", {
      method: "POST",
      body: JSON.stringify({ prods: products }),
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        //setOpen(false)
        //navigate("/orders")
        // Handle data
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const removeItem = (pId) => {
    fetch(api_url + "removeItem", {
      method: "POST",
      body: pId,
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.products)
        items.setItems(data.products)
        let newSum = 0
        data.products.forEach((element) => {
          newSum += element.price * element.qty
        })
        items.setSum(newSum)
        // Handle data
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

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
                  navigate('/orders')
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
            {items.items.map((row) => (
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
        <Typography id="demo">{items.sum}</Typography>
      </Box>
      <Button
        onClick={() => checkout(items.items, items.sum)}
        sx={{ fontSize: 12, my: 2 }}
        variant="contained"
      >
        Checkout
      </Button>
    </>
  )
}
