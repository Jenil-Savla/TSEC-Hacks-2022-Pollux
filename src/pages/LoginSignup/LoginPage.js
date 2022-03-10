import "./LoginSignup.css";
import { Grid } from "@mui/material";
import Login from '../../auth/Login/Login';
import signup from '../../assets/signup.svg';

export default function LoginPage() {
  return (
    <>
      <Grid container direction="row">
        <Grid item sm={6} md={3} className="right-box">
        <Grid
            item
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
            marginTop="140px"
          >
          <img src={signup} alter="hello" style={{width:"500px", height:"500px"}}/>
          </Grid>
        </Grid>
        <Grid item sm={6} md={6} className="left-box">
          <div className="box">
            <Login/>
          </div>
        </Grid>
      </Grid>
    </>
  );
}