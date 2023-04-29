import * as React from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Box from "@mui/material/Box"
import CardMedia from "@mui/material/CardMedia"
import { Typography } from "@mui/material"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

export default function CustomizedTables(props) {
  return (
    <TableContainer sx={{ backgroundColor: "#eeeeee" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell
              style={{ backgroundColor: "#212121" }}
              align="center"
            >
              Order Id
            </StyledTableCell>
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
              Total
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.orders.map((row) => (
            <StyledTableRow key={row.orderId}>
              <StyledTableCell component="th" scope="row" align="center">
                {row.orderId}
              </StyledTableCell>
              <StyledTableCell>
                {row.products.map((product) => (
                  <Box key={product.productId} sx={{ display: "flex" }}>
                    <CardMedia
                      component="img"
                      sx={{
                        height: 70,
                        width: 70,
                        mt: 1,
                        objectFit: "contain",
                      }}
                      src={product.imgUrl}
                      alt="Paella dish"
                    />
                    <Typography sx={{ m: "auto" }}>
                      {product.product}
                    </Typography>
                  </Box>
                ))}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.products.map((product) => (
                  <Box
                    key={product.productId}
                    sx={{ display: "flex", height: 60, mt: 1 }}
                  >
                    <Typography sx={{ m: "auto" }}>{product.qty}</Typography>
                  </Box>
                ))}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.products.map((product) => (
                  <Box
                    key={product.productId}
                    sx={{ display: "flex", height: 60, mt: 1 }}
                  >
                    <Typography sx={{ m: "auto" }}>{product.price}</Typography>
                  </Box>
                ))}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.products.map((product) => (
                  <Box
                    key={product.productId}
                    sx={{ display: "flex", height: 60, mt: 1 }}
                  >
                    <Typography sx={{ m: "auto" }}>{product.desc}</Typography>
                  </Box>
                ))}
              </StyledTableCell>
              <StyledTableCell scope="row" align="center">
                {row.totalPrice}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
