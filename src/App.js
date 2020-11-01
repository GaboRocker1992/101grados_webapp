
import React from "react";
import './App.css';
import { AppBar, Toolbar, IconButton, Typography, makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import GroupIcon from '@material-ui/icons/Group';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Strings} from "./utils/Strings";

//Components
import HomeView from "./views/homeView/home";
import ActorsView from "./views/actorsView/actors";
import MoviesView from "./views/moviesView/movies";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    width: "100%",
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


function App() {
  
  const classes = useStyles();
  const strings = Strings();
  const [evenForMenu, setEventForMenu] = React.useState(null);
  const [currentView, setCurrentView] = React.useState("home");

  const showMenu = (event) => {
    setEventForMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setEventForMenu(null);
  };

  const updateCurrentView = (view) => {
    setCurrentView(view);
    closeMenu();
  }

  return (
    <div className={classes.root}>
        <AppBar position="static" className = {classes.appBar}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} onClick={showMenu} color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  {strings.appName}
                </Typography>
            </Toolbar>
        </AppBar>

        <StyledMenu
          id="customized-menu"
          anchorEl={evenForMenu}
          keepMounted
          open={Boolean(evenForMenu)}
          onClose={closeMenu}>
                        
          <StyledMenuItem onClick = {() => updateCurrentView("actors")}>
            <ListItemIcon>
                <GroupIcon fontSize = "large" />
            </ListItemIcon>
            <ListItemText primary = {strings.itemActors} />
          </StyledMenuItem>

          <StyledMenuItem onClick = {() => updateCurrentView("movies")}>
            <ListItemIcon>
              <OndemandVideoIcon fontSize = "large" />
            </ListItemIcon>
            <ListItemText primary = {strings.itemMovies} />
          </StyledMenuItem>
        </StyledMenu>

        {/* Reenderizing the differents views */}
        {currentView === "home" ?
          <HomeView/>
        :
          currentView === "actors" ?
            <ActorsView/>
          :
            currentView === "movies" ?
              <MoviesView/>
            :
              null 
        }        
    </div>
  );
}

export default App;