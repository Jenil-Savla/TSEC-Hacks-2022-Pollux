import { Grid, Typography, Avatar, Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../../utils/Api";
import { GlobalContext } from "../../context/GlobalContext";
import Navbar2 from "../../components/Navbar/Navbar2";

export default function UserProfile() {
  const { id } = useParams();
  const { token } = useContext(GlobalContext);
  const [card, setCard] = useState([]);

  useEffect(() => {
    (async () => {
      let user;
      try {
        let response = await fetch(URL + `api/profile-view/${id}`, {
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
      <Navbar2 />
      <Typography textAlign="center"> Sanika's Profile</Typography>
      <Grid
        container
        display="flex"
        flexDirection="column"
        justify="center"
        alignItems="center"
      >
        <div>
          <Grid
            container
            display="flex"
            flexDirection="row"
            justify="center"
            alignItems="center"
          >
            <div>
              <Typography>Sanika Ardekar</Typography>
              <Typography>
                <span>Age: 20</span> <span> Gender: Female</span>
              </Typography>
              <Typography>Description: wdcn jndjc njdn</Typography>
              <Typography>Stacks: wdcn jndjc njdn</Typography>
              <Typography>Projects: wdcn jndjc njdn</Typography>
              <Typography>
                Experience: wdcn jndjc njdn wsdcb whebch whcbh
              </Typography>
            </div>
            <div>
              <Avatar
                alt="Remy Sharp"
                //src={URL2 + user.photo}
                sx={{
                  width: 70,
                  height: 70,
                  marginTop: "30px",
                  marginLeft: "30px",
                  marginBottom: "30px",
                  marginRight: "50px",
                }}
              />
            </div>
          </Grid>
          <div style={{ marginTop: "50px" }}>
            <Typography>Github Link: </Typography>
            <Typography>Github Link: </Typography>
          </div>
          <div style={{ marginLeft: "150px", marginTop: "50px" }}>
            <Button variant="contained">Send a Chat Request</Button>
          </div>
        </div>
      </Grid>
    </>
  );
}
