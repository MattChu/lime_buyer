import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useLocation } from "react-router-dom";

import { AppBar, Toolbar, Typography, Grid, Button, Avatar } from "@mui/material";

import InputLocation from "./InputLocation";
import InputDistance from "./InputDistance";

export const NavBar = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);
  return (
    <AppBar sx={{ mt: 0, position: "sticky", borderRadius: 0, boxShadow: 10 }}>
      <Toolbar>
        <Typography
          component="h1"
          variant="h1"
          to="/"
          sx={{
            fontSize: 20,
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            textAlign: { xs: "left" },
          }}
        >
          <strong>LimeBuyer</strong>
        </Typography>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {pathname === "/mapview" && (
            <>
              <InputLocation />
              <InputDistance />
            </>
          )}
          <Button color="inherit" component={Link} to="/">
            MapView
          </Button>
          <Button color="inherit" component={Link} to="/Signup">
            Signup
          </Button>
          {user ? (
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
              <Avatar
                sx={{
                  display: "flex",
                  alignContent: "center",
                  width: 24,
                  m: 1,
                  height: 24,
                  bgcolor: "white",
                }}
                // alt={`Avatar Image for ${loggedInUser?.username}`}
                // src={`${loggedInUser?.avatar_url}`}
                // title={`Currently logged in as ${loggedInUser.name}`}
              />
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
