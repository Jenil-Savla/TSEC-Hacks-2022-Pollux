import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Navbar2 from "../../components/Navbar/Navbar2";
import { useState, useContext, useEffect } from "react";
import { URL } from "../../utils/Api";
import { GlobalContext } from "../../context/GlobalContext";

const Requests = () => {
  const { token } = useContext(GlobalContext);
  const [card, setCard] = useState([]);
  // const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    (async () => {
      let user;
      try {
        let response = await fetch(URL + "api/chat-request", {
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
  const handleDecline = (sender) => {
    deleteReq(sender);
  };

  async function deleteReq(sender) {
    //console.log("hello");
     //console.log(card.sender);
    let result = await fetch(URL + `api/chat-request?reciever=${sender}`, {
      method: "POST",
      body: JSON.stringify({
        accepted: false,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Token " + token,
      },
    });
    try {
      result = await result.json();
      console.log(result);
    } catch (error) {
      console.log("Error" + error);
      //alert("nahi hua")
    }
  }

  return (
    <div>
      <Navbar2 />
      <Box ml={5} mr={5} pl={7} pr={3} mt={3} pt={3} mb={1} pb={1}>
        <Grid container spacing={3} alignContent="flex-start" justify="center">
          {card.map((card, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card sx={{ minWidth: 275 }} key={index}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {card.name}
                    </Typography>

                    <Typography variant="body1">{card.sender_stack}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" sx={{ color: "blue", fontWeight: 50 }}>
                      Accept
                    </Button>
                    <Button
                      size="small"
                      sx={{ color: "red", fontWeight: 50 }}
                      onClick={()=>{handleDecline(card.sender)}}
                    >
                      Decline
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default Requests;
