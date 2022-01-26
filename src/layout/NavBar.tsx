import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import * as React from "react";
import { useAuth, signOutUser } from "~/hooks/auth/useAuth";

import Link from "~/components/Link";
import { useRouter } from "next/router";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [user, loading, error] = useAuth();
  const { push } = useRouter();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = async () => {
    await signOutUser();
    handleClose();
    push("/auth");
  };

  const userMenu = [
    <MenuItem key="Profile" onClick={handleClose}>
      Profile
    </MenuItem>,
    <MenuItem key="my_account" onClick={handleClose}>
      My account
    </MenuItem>,
    <MenuItem key="sign_out" onClick={handleSignOut}>
      Sign Out
    </MenuItem>,
  ];
  const noUserMenu = [
    <MenuItem
      key="sign_in"
      LinkComponent={Link}
      onClick={handleClose}
      href="/auth"
    >
      Sign In
    </MenuItem>,
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Starter App
          </Typography>
          <div>
            <Button component={Link} href="/ssuser" color="inherit">
              SSR check
            </Button>
          </div>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {user ? userMenu : noUserMenu}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
