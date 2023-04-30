import * as React from "react"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import { useNavigate } from "react-router-dom"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Modal from "@mui/material/Modal"

export default function ViewProducts() {
  const api_url = process.env.REACT_APP_API_URL
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  useEffect(() => {
    fetch(api_url + "dashboard", {
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
        setProducts(data.products)
        console.log("useeffect")
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  function addToCart(name) {
    setOpen(true)
    fetch(api_url + "addToCart", {
      method: "POST",
      body: name,
      mode: "cors",
      credentials: "include",
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
  }

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
            <strong>Item Added to cart!</strong>
          </Alert>
        </Box>
      </Modal>
      <Box sx={{ marginTop: "120px" }}>
        <Carousel responsive={responsive} slidesToSlide={4}>
          {products.map((row) => (
            <Card sx={{ m: 1 }} key={row.productId}>
              <CardHeader
                titleTypographyProps={{ variant: "h5" }}
                title={row.productName}
                //subheader={row.productName}
              />
              <CardMedia
                height="150"
                sx={{ objectFit: "contain" }}
                component="img"
                image={row.imgUrl}
                alt="Paella dish"
              />
              <CardContent>
                <Typography
                  variant="body3"
                  sx={{ fontSize: 15 }}
                  color="text.secondary"
                >
                  {row.desc}
                </Typography>
              </CardContent>
              <Box>
                <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                  ${row.price}
                </Typography>
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Button
                    onClick={() => addToCart(row.productId)}
                    sx={{ fontSize: 10 }}
                    variant="contained"
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Box>
            </Card>
          ))}
          {/* </Box> */}
        </Carousel>
      </Box>
    </>
  )
}
