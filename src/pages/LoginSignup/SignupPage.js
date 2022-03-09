import "./LoginSignup.css";
import { Grid } from "@mui/material";
import Signup from '../../auth/Signup/Signup'
export default function SignupPageRelative() {
  return (
    <>
      <Grid container direction="row">
        <Grid item sm={6} md={3} className="right-box">
          
        </Grid>
        <Grid item sm={6} md={6} className="left-box">
          
          <div className="box">
            <Signup />
            
          </div>
        </Grid>
      </Grid>
    </>
  );
}