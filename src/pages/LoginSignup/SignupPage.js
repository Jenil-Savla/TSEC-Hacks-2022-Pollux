import "./LoginSignup.css";
import { Grid } from "@mui/material";
import Signup from "../../auth/Signup/Signup";
import signup from '../../assets/signup.svg';

export default function SignupPageRelative() {
  return (
    <>
      <Grid container direction="row">
        <Grid item className="right-box">
        <Grid
            item
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            marginTop="140px"
          >
          <img src={signup} alter="hello" style={{width:"500px", height:"500px"}}/>
          </Grid>
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
