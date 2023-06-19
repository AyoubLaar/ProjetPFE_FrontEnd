import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Menu from "@mui/material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const pages = [
    // { innerHTML: "Search", icon: <SearchIcon />, href: "/" },
    {
      innerHTML: "Publier Anonce",
      icon: <AddCircleOutlineOutlinedIcon />,
      href: "/Publier",
    },
  ];

  const SignInButton = (
    <Button
      size="small"
      variant="outlined"
      color="primary"
      href={"/Login"}
      startIcon={<VpnKeyOutlinedIcon />}
    >
      <Typography fontWeight={400}>{"Sign in"}</Typography>
    </Button>
  );

  const compteMenuButton = (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        size="small"
        startIcon={<AccountCircleOutlinedIcon />}
      >
        <Typography fontWeight={400}>COMPTE</Typography>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        fullwidth
      >
        <MenuItem
          onClick={() => {
            window.location.assign("/Profile");
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.localStorage.removeItem("ESTATE_HUB_JWT");
            window.location.assign("/");
          }}
        >
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <div style={{ width: "100%", alignItems: "center" }}>
        <IconButton
          sx={{
            width: "fit-content",
            display: "flex",
            marginLeft: "auto",
            paddingRight: "20px",
            alignItems: "center",
          }}
        >
          <CloseIcon fontSize="large" color="primary" />
        </IconButton>
      </div>
      <List>
        {pages.map((page) => (
          <ListItem sx={{ padding: 0 }}>
            <Button
              sx={{
                width: "100%",
                borderRadius: "0",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                justifyContent: "start",
                paddingLeft: "20%",
                "&:hover": {
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  backgroundColor: "lightblue",
                },
              }}
              variant="outlined"
              color="primary"
              startIcon={page.icon}
              size="large"
              href={page.href}
            >
              {page.innerHTML}
            </Button>
          </ListItem>
        ))}
        {jwt == null ? (
          <ListItem sx={{ padding: 0 }}>
            <Button
              sx={{
                width: "100%",
                borderRadius: "0",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                justifyContent: "start",
                paddingLeft: "20%",
                "&:hover": {
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  backgroundColor: "lightblue",
                },
              }}
              variant="outlined"
              color="primary"
              startIcon={<SearchIcon />}
              size="large"
              href="/Login"
            >
              Sign In
            </Button>
          </ListItem>
        ) : (
          [
            <ListItem sx={{ padding: 0 }}>
              <Button
                sx={{
                  width: "100%",
                  borderRadius: "0",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  justifyContent: "start",
                  paddingLeft: "20%",
                  "&:hover": {
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    backgroundColor: "lightblue",
                  },
                }}
                variant="outlined"
                color="primary"
                startIcon={<AccountCircleOutlinedIcon />}
                size="large"
                href="/Profile"
              >
                Profile
              </Button>
            </ListItem>,
            <ListItem sx={{ padding: 0 }}>
              <Button
                sx={{
                  width: "100%",
                  borderRadius: "0",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  justifyContent: "start",
                  paddingLeft: "20%",
                  "&:hover": {
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    backgroundColor: "lightblue",
                  },
                }}
                variant="outlined"
                color="primary"
                startIcon={<ExitToAppIcon />}
                size="large"
                onClick={() => {
                  window.localStorage.removeItem("ESTATE_HUB_JWT");
                  window.location.assign("/");
                }}
              >
                Sign out
              </Button>
            </ListItem>,
          ]
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
        <Toolbar sx={{ color: "black" }}>
          <Button color="Black" href="/" sx={{ padding: 0 }}>
            <Typography variant="h5" color="primary.dark" fontWeight={600}>
              Estate Hub
            </Typography>
          </Button>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            flex={1}
            sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
          >
            {pages.map((page) => (
              <Button
                size="small"
                variant="outlined"
                color="primary"
                href={page.href}
                startIcon={page.icon}
              >
                <Typography fontWeight={400}>{page.innerHTML}</Typography>
              </Button>
            ))}
            {jwt == null ? SignInButton : compteMenuButton}
          </Stack>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { md: "none" },
              marginLeft: "auto",
            }}
          >
            <MenuIcon sx={{ color: "primary.dark" }} fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        container={document.body}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          padding: "0",
          display: { sm: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
