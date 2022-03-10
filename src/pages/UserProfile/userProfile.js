import { Grid, Typography, Avatar, Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { URL } from "../../utils/Api";
import { GlobalContext } from "../../context/GlobalContext";
import Navbar2 from "../../components/Navbar/Navbar2";
import "./userProfile.css";

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

  const handleRequest=()=>{
      sendRequest();
  };
  async function sendRequest() {
    //console.log("hello");
    
      let result = await fetch(
        URL+ `api/create-request?reciever=${card.user}`,
        {
          method: "POST",
          
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: "Token " + token,

          },
        }
      );
      try{
      result = await result.json();
      console.log(result);
      }
     catch (error) {
      console.log("Error" + error);
     //alert("nahi hua")
    }
  }
  return (
    <>
      <Navbar2 />
      <div className="root">
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            backgroundColor: "grey",
            height: "100vh",
            width: "180vw",
            marginLeft: "200px",
            marginRight: "180px",
          }}
        >
          <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ backgroundColor: "white", height: "80vh", width: "60vw" }}
          >
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
                    <Typography
                      variant="h4"
                      fontFamily="Anonymous Pro"
                      padding={2}
                      style={{ marginBottom: "20px", marginRight: "180px" }}
                    >
                      {card.name}'s Profile
                    </Typography>
                    <Typography
                      variant="h5"
                      fontFamily="Anonymous Pro"
                      padding={2}
                    >
                      <span>Age: {card.age}</span>{" "}
                      <span> Gender: {card.gender}</span>
                    </Typography>
                    <Typography
                      variant="h5"
                      fontFamily="Anonymous Pro"
                      padding={2}
                    >
                      {card.description}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontFamily="Anonymous Pro"
                      padding={2}
                    >
                      Stacks: {card.stack}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontFamily="Anonymous Pro"
                      padding={2}
                    >
                      Projects: {card.projects}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontFamily="Anonymous Pro"
                      padding={2}
                    >
                      Experience: {card.experience}
                    </Typography>
                  </div>
                </Grid>
                <div>
                  <Typography
                    variant="h5"
                    fontFamily="Anonymous Pro"
                    padding={2}
                  >
                    Github Link:{" "}
                    <Link to={`/{card.github_link}`}>{card.github_link}</Link>
                  </Typography>
                </div>
                <div style={{ marginLeft: "150px", marginTop: "20px" }}>
                  <Button
                  onClick={handleRequest}
                    variant="contained"
                    style={{ size: "50px", borderRadius: "50px" }}
                  >
                    Request Chat
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
