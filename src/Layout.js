import { Outlet, Link } from "react-router-dom"

import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import StorefrontIcon from "@mui/icons-material/Storefront"
import InventoryIcon from "@mui/icons-material/Inventory"
import LogoutIcon from "@mui/icons-material/Logout"
import Logo from "./logo.svg"

const api_url = process.env.REACT_APP_API_URL

function Layout() {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const userName = localStorage.getItem("user")
  const navigate = useNavigate()

  useEffect(() => {
    fetch(api_url + "isAuthenticated", {
      credentials: "include",
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.isAuthenticated) {
          setIsAuthenticated(true)
          navigate("/")
        } else {
          setIsAuthenticated(false)
          navigate("/login")
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const logout = () => {
    fetch(api_url + "logout", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((data) => {
        console.log(data)
        setIsAuthenticated(false)
        window.location.replace("/login")
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <AppBar position="static" sx={{ background: "#1976d2" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={Logo} alt="React Logo" />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link to="/orders" style={{ textDecoration: "none" }}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Orders</Typography>
                  <InventoryIcon
                    sx={{ pl: 1, display: { md: "flex", margin: "auto" } }}
                  />
                </MenuItem>
              </Link>

              <Link to="/cart" style={{ textDecoration: "none" }}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Cart</Typography>
                  <ShoppingCartIcon
                    sx={{ pl: 1, display: "flex", margin: "auto" }}
                  />
                </MenuItem>
              </Link>
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { md: "flex", xs: "none", flexDirection: "row-reverse" },
              mr: 3,
            }}
          >
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{
                      display: { md: "flex", margin: "auto" },
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    Cart
                  </Typography>
                  <ShoppingCartIcon
                    sx={{ pl: 1, display: "flex", margin: "auto" }}
                  />
                </Box>
              </Button>
            </Link>

            <Link to="/orders" style={{ textDecoration: "none" }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Box sx={{ display: { md: "flex" } }}>
                  <Typography
                    sx={{
                      display: { md: "flex", margin: "auto" },
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    Orders
                  </Typography>
                  <InventoryIcon
                    sx={{ pl: 1, display: { md: "flex", margin: "auto" } }}
                  />
                </Box>
              </Button>
            </Link>

            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Box sx={{ display: { md: "flex" } }}>
                  <Typography
                    sx={{
                      display: { md: "flex", margin: "auto" },
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    Shop
                  </Typography>
                  <StorefrontIcon
                    sx={{ pl: 1, display: { md: "flex", margin: "auto" } }}
                  />
                </Box>
              </Button>
            </Link>
          </Box>
          {isAuthenticated ? (
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  p: 1,
                  display: { md: "flex", margin: "auto" },
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Hi {userName}
              </Typography>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ borderRadius: "100%" }}
              >
                <MenuIcon
                  sx={{
                    display: { md: "flex", margin: "auto" },
                    color: "white",
                  }}
                />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Settings</Typography>
                </MenuItem>

                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
                  <LogoutIcon
                    sx={{ pl: 1, display: { md: "flex", margin: "auto" } }}
                  />
                </MenuItem>
              </Menu>
            </Box>
          ) : <></>}
        </Toolbar>
      </Container>
      <Outlet />
    </AppBar>
  )
}
export default Layout
