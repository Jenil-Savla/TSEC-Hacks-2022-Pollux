import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Box,
  Typography,
  CssBaseline,
} from "@mui/material";
import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import "../../App.css";
import { useState, useEffect, useContext } from "react";
import { URL, URL2 } from "../../utils/Api";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";


export default function HomePage() {
  const { token } = useContext(GlobalContext);
  const [card, setCard] = useState([]);

  useEffect(() => {
    (async () => {
      let user;
      try {
        let response = await fetch(URL + "api/profile-list/", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Token " + token,
          },
        });
        user = await response.json();
        console.log(user);
      } catch (error) {
        console.log("Error" + error);
        user = [];
      }

      setCard(user);
    })();
  }, []);

  return (
    <>
      <Grid container className="homepage-body">
        <Navbar />
        <div className="root">
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
            style={{ gap: 45, marginTop: 10, marginLeft: 450 }}
          >
            {card.map((user, index) => {
              return (
                <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                  <Link
                    to={{ pathname: "/profile/" + user.name + "/" + user.id }}
                    style={{ textDecoration: "none" }}
                  >
                    <CardActionArea>
                      <Card
                        sx={{
                          display: "flex",
                          width: "40vw",
                          backgroundColor: "#C4C4C4",
                      
                        }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={URL2 + user.photo}
                          sx={{
                            width: 70,
                            height: 70,
                            marginTop: "30px",
                            marginLeft: "30px",
                            marginBottom: "30px",
                            marginRight: "50px",
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "50vw",
                          }}
                        >
                          <CardContent
                            sx={{ flex: "1 0 auto", marginTop: "5px" }}
                          >
                            <Typography variant="h4" fontFamily="Anonymous Pro">
                              {user.name}
                            </Typography>
                            <Typography variant="h6" fontFamily="Anonymous Pro">
                              {user.stack}
                            </Typography>
                            <Typography variant="h6" fontFamily="Anonymous Pro">
                              {user.description}
                            </Typography>
                          </CardContent>
                        </Box>
                      </Card>
                    </CardActionArea>
                  </Link>
                </Grid>
              );
            })}
            ;
          </Grid>
        </div>
      </Grid>
    </>
  );
}
