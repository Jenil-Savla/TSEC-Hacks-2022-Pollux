import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { TextField, Avatar } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import homePage from "../../assets/homePage.jpg";
import { makeStyles } from '@material-ui/styles'
import "./Navbar.css";
import '../../App.css';

const useStyles = makeStyles(() => ({
  colour:{
    display: "flex",
    justifyContent: "center",
    color: "#696969 !important",
  },
}));
const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const anchor = "left";
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{ backgroundColor: "azure", height: "100%"}}
    >
      <List>
        <Link className="mobileDrawer" to={`/home`} style={{textDecoration:"none"}}>
          <ListItem button key="home">
            <ListItemIcon>
              <HiOutlineArrowNarrowRight className="mobileDrawer" />
            </ListItemIcon>
            <ListItemText>
              <span className="mobileDrawer" style={{fontSize:"25px", color:"greenyellow"}}>Home</span>
            </ListItemText>
          </ListItem>
        </Link>  {/*change this */}
        {["Profile"].map((text, index) => (  
          <Link className="mobileDrawer" to={`/${text.toLowerCase()}`} style={{textDecoration:"none"}}>
            <ListItem button key={text} >
              <ListItemIcon>
                <HiOutlineArrowNarrowRight className="mobileDrawer" />
              </ListItemIcon>
              <ListItemText>
                <span className="mobileDrawer" style={{fontSize:"25px", color:"greenyellow"}}>{text}</span>
              </ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
      {/* <hr style={{color:"white"}}/> */}
    </Box>
  );
  const classes = useStyles();
  return (
    <AppBar
      style={{ background: "transparent" , boxShadow: "none" }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/home" style={{cursor:"pointer", textDecoration:"none"}}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            fontFamily="Anonymous Pro"
            fontSize="50px"
            sx={{ display: { xs: "none", md: "flex", color:"black" } }}
          >
            CatCollab
          </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <React.Fragment key={anchor}>
              <Button
                style={{ fontSize: "2rem" }}
                size="large"
                color="inherit"
                onClick={toggleDrawer(anchor, true)}
              >
                <GiHamburgerMenu style={{color:"green"}}/>
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <div style={{ margin: "auto" }}>
              
          </div>
          </Box>
          <Link to="/requests" style={{textDecoration:"none"}}><Typography variant="h5" style={{fontFamily:"Anonymous Pro", marginRight:"30px"}}>View My Requests</Typography></Link>
          <Link to="/profile" style={{textDecoration:"none"}}>
          <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 56, height: 56 }}
      /></Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;