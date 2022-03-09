import Navbar2 from "../../components/Navbar/Navbar2";
import "./Profile.css";
import { Grid, Typography, FilledInput, Button, Box } from "@mui/material";
import { useState, useContext } from 'react';
import { GlobalContext } from "../../context/GlobalContext";

export default function Profile() {
    const { token } = useContext(GlobalContext);
    const name = localStorage.getItem('name')
    const [values, setValues] = useState({
        age:"",
        gender:"",
        github_link:"",
        stack:"",
        experience:"",
        description:"",
        projects:"",
        name:""
      });
      const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        createProfile();
    
      }
      async function createProfile(){
        try{
          let result = await fetch(URL + "api/profile/",
          {
            method: "POST",
            body: JSON.stringify({
              age: values.age,
              gender: values.gender,
              github_link: values.github_link,
              stack: values.stack,
              experience: values.experience,
              description: values.description,
              projects: values.projects,
              name: name
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Token " + token,
          },
        }
      );
      result = await result.json();
      console.log(result);
    }
    catch (error) {
      console.log("Error" + error);
     }
  }
  
    const handleChanges = (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
      console.log(values);
    };
  return (
    <>
      <Grid container className="profile-body">
        <Navbar2 />
        <div className="root">
        
        <Grid container direction="column" justifyContent="space-evenly" alignItems="flex-start" style={{gap:15}}> 
        <Grid item xs={12} sm={12} md={6} lg={6} style={{marginTop:"20px", marginLeft:"36px"}}>
        <Typography style={{fontSize: "30px", marginTop: "30px"}}><span style={{color:"white"}}>Create a Member Log</span></Typography>
        </Grid>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
         
        <Grid container direction="row" marginBottom={5}>
        <Grid item sm={6} md={3} style={{marginLeft:"46px"}}>
        <Typography ><span style={{color:"white"}}>Age</span></Typography>
        </Grid>
        <Grid item sm={6} md={3} style={{marginLeft: '15px'}}>
        <FilledInput
                id="age"
                label="Age"
                type="text"
                name="age"
                variant="outlined"
                color="primary"
                autoComplete="age"
                value={values.age}
                fullWidth
                onChange={handleChanges}
                style={{width:"250px"}}
              />
        </Grid>
        </Grid>

        <Grid container direction="row" marginBottom={5}>
        <Grid item sm={6} md={3} style={{marginLeft:"46px"}}>
        <Typography><span style={{color:"white"}}>Gender</span></Typography>
        </Grid>
        <Grid item sm={6} md={3} style={{marginLeft: '15px'}}>
        <FilledInput
                id="gender"
                label="Gender"
                required
                type="text"
                name="gender"
                variant="outlined"
                color="primary"
                autoComplete="gender"
                value={values.gender}
                fullWidth
                onChange={handleChanges}
                style={{width:"250px"}}
              />
        </Grid>
        </Grid>

        <Grid container direction="row" marginBottom={5}>
        <Grid item sm={6} md={3} style={{marginLeft:"46px"}}>
        <Typography><span style={{color:"white"}}>GitHub Link</span></Typography>
        </Grid>
        <Grid item sm={6} md={3} style={{marginLeft: '15px'}}>
        <FilledInput
                id="github_link"
                label="github_link"
                required
                type="text"
                name="github_link"
                variant="outlined"
                color="primary"
                autoComplete="github"
                value={values.github_link}
                fullWidth
                onChange={handleChanges}
                style={{width:"250px"}}
              />
        </Grid>
        </Grid>

        <Grid container direction="row" marginBottom={5}>
        <Grid item sm={6} md={3} style={{marginLeft:"46px"}}>
        <Typography><span style={{color:"white"}}>Stack</span></Typography>
        </Grid>
        <Grid item sm={6} md={3} style={{marginLeft: '15px'}}>
        <FilledInput
                id="stack"
                label="Stack"
                required
                type="text"
                name="stack"
                variant="outlined"
                color="primary"
                autoComplete="stack"
                value={values.stack}
                fullWidth
                onChange={handleChanges}
                style={{width:"250px"}}
              />
        </Grid>
        </Grid>

        <Grid container direction="row" marginBottom={5}>
        <Grid item sm={6} md={3} style={{marginLeft:"46px"}}>
        <Typography><span style={{color:"white"}}>Experience</span></Typography>
        </Grid>
        <Grid item sm={6} md={3} style={{marginLeft: '15px'}}>
        <FilledInput
                id="experience"
                label="experience"
                required
                type="text"
                name="experience"
                variant="outlined"
                color="primary"
                autoComplete="experience"
                value={values.experience}
                fullWidth
                onChange={handleChanges}
                style={{width:"250px"}}
              />
        </Grid>
        </Grid>

        <Grid container direction="row" marginBottom={5}>
        <Grid item sm={6} md={3} style={{marginLeft:"46px"}}>
        <Typography><span style={{color:"white"}}>About Yourself</span></Typography>
        </Grid>
        <Grid item sm={6} md={3} style={{marginLeft: '15px'}}>
        <FilledInput
                id="description"
                label="description"
                required
                type="text"
                name="description"
                variant="outlined"
                color="primary"
                autoComplete="description"
                value={values.description}
                fullWidth
                multiline
                onChange={handleChanges}
                style={{width:"250px"}}
              />
        </Grid>
        </Grid>

        <Grid container direction="row" marginBottom={5}>
        <Grid item sm={6} md={3} style={{marginLeft:"46px"}}>
        <Typography><span style={{color:"white"}}>Projects</span></Typography>
        </Grid>
        <Grid item sm={6} md={3} style={{marginLeft: '15px'}}>
        <FilledInput
                id="projects"
                label="projects"
                required
                type="text"
                name="projects"
                variant="outlined"
                color="primary"
                autoComplete="projects"
                value={values.projects}
                fullWidth
                onChange={handleChanges}
                style={{width:"250px"}}
              />
        </Grid>
        </Grid>
        <Button
              type="submit"
              variant="contained"
              sx={{ ml: 14, mt: 2, mb: 1 }}
              style={{
                backgroundColor: "#C4C4C4",
                color: "red",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Save
            </Button>
            </Box>
        </Grid>

        </div>
      </Grid>
    </>
  );
}
