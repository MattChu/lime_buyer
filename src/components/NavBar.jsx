import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

import { AppBar, Toolbar, Typography, Grid, Button, Avatar } from "@mui/material";

export const NavBar = () => {
  const { user } = useContext(UserContext);
  return (
    <AppBar sx={{ mt: 0, mb: 1, position: "sticky", borderRadius: 0, boxShadow: 10 }}>
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
