import React from "react";
import '../../App.css'
import Button from "@mui/material/Button";
import { Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <Grid container display="flex" flexDirection="column" alignItems="center" className="welcome-grid">
        <Typography variant="h1" textAlign="center" marginTop="250px" fontFamily="Anonymous Pro">
          CatCollab
        </Typography>

        <p className="para">
          <span
            style={{
              color: "black",
              textAlign: "center",
              display: "flex",
              fontSize: 25,
              alignItems: "center",
              marginLeft: 400,
              marginRight: 400,
              justifyContent: "center",
              fontFamily:"Anonymous Pro"
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. It has survived not only five centuries, but also the leap
            into electronic typesettin g, remaining essentially unchanged.
          </span>
        </p>

        <Link to="/signup" style={{textDecoration:"none"}}>
          <Button
            variant="contained"
            style={{ padding: "30", borderRadius: "50px", width: "250px" }}
          >
            Get Started
          </Button>{" "}
        </Link>
      </Grid>
    </div>
  );
};

export default Welcome;
