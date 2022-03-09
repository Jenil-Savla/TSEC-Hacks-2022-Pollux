import "./LoginSignup.css";
import { Grid } from "@mui/material";
import Login from '../../auth/Login/Login';
export default function LoginPage() {
  return (
    <>
      <Grid container direction="row">
        <Grid item sm={6} md={3} className="right-box">
          {/* <Grid
            item
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
          </Grid> */}
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