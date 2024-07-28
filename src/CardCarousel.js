import React from "react"
import { makeStyles } from "@mui/styles"
import Typography from "@mui/material/Typography"
import Carousel from "react-multi-carousel"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"

const useStyles = makeStyles({
  root: {
    margin: "10px 10px",
    display: "flex",
  },
  header: {
    flexGrow: 1,
  },
  media: {
    height: 100,
    marginTop: "10px",
  },
  paper: {
    width: 300,
  },
  image: {
    width: "100%",
  },
  typo: {
    textAlign: "center",
  },
  mx: {
    margin: "6px 0px",
  },
  card: {
    width: 300,
  },
})

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

const Cards = (props) => {
  return (
    <Carousel responsive={responsive} sx={{ display: "flex" }}>
      <CardSwipeable key={1} item={props.products[0]} />
      {/* <CardSwipeable key={1} item={props.products[1]} /> */}
    </Carousel>
  )
}

function CardSwipeable(props) {
  const classes = useStyles()
  return (
    <div classes={classes.root}>
      <Card className={`${classes.root} ${classes.card}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            sx={{ objectFit: "contain" }}
            component="img"
            image="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-3.jpg"
          />
          <CardContent>
            <Typography
              className={classes.typo}
              gutterBottom
              variant="h6"
              component="h6"
              color="secondary"
            >
              ${props.item.price}
            </Typography>
            <Typography
              className={`${classes.typo} ${classes.mx}`}
              variant="h5"
              color="inherit"
              component="h3"
            >
              {props.item.productName}
            </Typography>
            <Typography
              className={classes.typo}
              color="textSecondary"
              component="p"
            >
              {props.item.desc}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default Cards
