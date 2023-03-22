import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Link,
  Button
} from "@mui/material";
import axios from "axios";

function NavBar() {
  


    const logout = (event) => {
        event.preventDefault();
        axios.post('/api/logout', { withCredentials: true }).then(response => {
            console.log(response);
        }).catch(error => {
          console.log(error);
        });
    };


    // for logged in as
    // const getUserInfo = (event) => {
    //   let username="";

    //   event.preventDefault();
    //   axios.get('/api/view', { withCredentials: true }).then(response => {
    //       console.log(response);
    //   }).catch(error => {
    //     console.log(error);
    //   });
    // };



  return (
    <Box sx={{
        display: 'flex',
        flexGrow: 1,
      }}>
      <AppBar position="static" >
        <Toolbar>
            <Link href="/login"  color="inherit" underline="none"  m={2}> Login</Link>
            <Link href="/register"  color="inherit" underline="none" m={2}> Register</Link>
            <Link href="/"  color="inherit" underline="none" m={2}> Home Page</Link>
            <Link href="/create" color="inherit" underline="none" m={2}> Create Fight</Link>
            <Link href="/join"  color="inherit" underline="none" m={2}> Join Fight</Link>

            <Button onClick={logout} color="inherit">Log Out</Button>
         </Toolbar>
      </AppBar>
    </Box>
  );
}
export default NavBar;