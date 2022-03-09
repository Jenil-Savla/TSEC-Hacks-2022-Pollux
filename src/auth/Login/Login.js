import { useState, useContext } from "react";
import {
  TextField,
  Grid,
  Container,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { URL } from "../../utils/Api";
import { GlobalContext } from "../../context/GlobalContext";

export default function Login()
{
   const { setToken } = useContext(GlobalContext)
  const navigate = useNavigate();
    const [values, setValues] = useState({
        password: "",
        email: "",
      });

      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get("email"),
          password: data.get("password"),

        });
        createacc();
      };

      const handleChanges = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        });
        console.log(values);
        //localStorage.setItem("user", JSON.stringify(values.email));
      };

      async function createacc() {
        //console.log("hello");
        
          let result = await fetch(
            URL+ "accounts/login/",
            {
              method: "POST",
              body: JSON.stringify({
                email: values.email,
                password: values.password,
              }),
              headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
              },
            }
          );
          try{
          result = await result.json();
          console.log(result);
          if (result.token && result.username) {
            localStorage.setItem('token', JSON.stringify(result.token))
            localStorage.setItem('username', JSON.stringify(result.username))
            setToken(result.token);
              //alert("hua")
            navigate("/home");
          }}
         catch (error) {
          console.log("Error" + error);
         //alert("nahi hua")
        }
      }

    return(<>
    <Container
        disableGutters
        component={motion.div}
        transition={{ type: "spring", stiffness: 40 }}
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        maxWidth="xs"
      >
        <Typography component="h1" variant="h5" style={{ textAlign: "center",  fontFamily:"Anonymous Pro" }}>
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <Grid item xs={12} mb={2}>
            <TextField
              required
              fullWidth
              id="email"
              label="email"
              type="email"
              name="email"
              autoComplete="email"
              autoFocus
              color="success"
              value={values.email}
              onChange={handleChanges}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
            required
            fullWidth
            id="password"
            label="password"
            type="password"
            name="password"
            autoComplete="email"
            autoFocus
            color="success"
            value={values.password}
            onChange={handleChanges} 
          />
          </Grid>
          <Button
            type="submit"
            
            variant="contained"
            sx={{ mt: 5, mb: 7, ml:23 }}
            style={{
              backgroundColor: "#D1CACA",
              color: "black",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Login
          </Button>
          <Typography variant="h5" textAlign="center"  fontFamily="Anonymous Pro">Don't have an Account? 
          <Link to="/signup" style={{textDecoration: "none", marginLeft: "5px",  fontFamily:"Anonymous Pro"}}>
             Signup
          </Link>
          </Typography>
        </Box>
    </Container>
    </>);
}