import {
    Grid,
    Box,
    Typography,
    Button,
    Container,
    TextField,
  } from "@mui/material";
  import '../../App.css';
  import { MdVisibility, MdVisibilityOff } from "react-icons/md";
  import { useState } from "react";
  import { motion } from "framer-motion";
  import { useNavigate, Link } from "react-router-dom";

  import { URL } from '../../utils/Api';
  
  export default function Signup() {
    
    const navigate = useNavigate();
  
    const [values, setValues] = useState({
      email: "",
      password: "",
      username: "",
      first_name: "",
      last_name: "",
      phone: ""
    });
  
    const handleChanges = (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
      console.log(values);
    };
  
    
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get("email"),
        password: data.get("password"),
        username: data.get("username"),
        first_name: data.get("first_name"),
        last_name: data.get("last_name"),
        phone: data.get("phone")
      });
      createacc();
    };
  
    async function createacc() {
      try {
        let result = await fetch(
          URL + "accounts/register/",
          {
            method: "POST",
            body: JSON.stringify({
              email: values.email,
              password: values.password,
              username: values.username,
              first_name: values.first_name,
              last_name: values.last_name,
              phone: values.phone,
              
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        result = await result.json();
        console.log(result);
        if(result.Success === 'Your account is successfully created'){
         navigate("/login");
        }
        } catch (error) {
        console.log("Error" + error);
        
      }
    }
  
    return (
      <>
        <Container
          component={motion.div}
          transition={{ type: "spring", stiffness: 40 }}
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          maxWidth="xs"
        >
          <Typography component="h1" variant="h4" style={{ textAlign: "center", fontFamily:"Anonymous Pro" }}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container display="flex" flexDirection="row" mb={2}>
          <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  type="text"
                  name="first_name"
                  autoComplete="first_name"
                  autoFocus
                  color="success"
                  value={values.first_name.trim()}
                  onChange={handleChanges}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  type="text"
                  name="last_name"
                  autoComplete="last_name"
                  autoFocus
                  color="success"
                  value={values.last_name.trim()}
                  onChange={handleChanges}
                />
              </Grid>
              </Grid>
            <Grid item xs={12} mb={2}>
              <TextField
                required
                fullWidth
                id="user-name"
                label="User Name"
                type="text"
                name="username"
                autoComplete="user-name"
                autoFocus
                color="success"
                value={values.username.trim()}
                onChange={handleChanges}
              />
            </Grid>
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
                value={values.email.trim()}
                onChange={handleChanges}
              />
            </Grid>
            <Grid item xs={12} mb={2}>
              
              <TextField
              required
              fullWidth
              id="password"
              label="password"
              type="password"
              name="password"
              //autoComplete="email"
              autoFocus
              color="success"
              value={values.password.trim()}
              onChange={handleChanges} 
            />
            <Grid item xs={12} mt={2}>
              <TextField
                required
                fullWidth
                id="phone"
                label="phone"
                type="text"
                name="phone"
                autoComplete="phone"
                autoFocus
                color="success"
                value={values.phone.trim()}
                onChange={handleChanges}
              />
            </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, mb:4, ml:18 }}
              style={{
                backgroundColor: "blue",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Sign Up
            </Button>
            <Typography variant="h5" textAlign="center"  fontFamily="Anonymous Pro">Already have an Account?  
            <Link to="/login" style={{textDecoration: "none", color: "blue", marginLeft: "5px",  fontFamily:"Anonymous Pro"}}>
               Login
            </Link>
            </Typography>
          </Box>
        </Container>
      </>
    );
  }
  