import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import MenuIcon from '@mui/icons-material/Menu';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import "../Style/NavigationMenu.css"
import { NavLink, Link } from "react-router-dom";


type Anchor = 'bottom';

export default function NavigationMenu() {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/Home" className="noUnderline">
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <NavLink to="/AddPost" className="noUnderline">
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Add Post"} />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      <List>
        <NavLink to="/Login" className="noUnderline">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {<LoginIcon />}
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink to="/Register" className="noUnderline">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AppRegistrationIcon/>
              </ListItemIcon>
              <ListItemText primary={"Register"} />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
    </Box>
  );

  return (
    <div className="navigationBottom">
      <Link to="/Home">
        <LocalDiningIcon fontSize="large" color="primary"/>
      </Link>
      <div>
      {(['bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button  onClick={toggleDrawer(anchor, true)}><MenuIcon fontSize="large" color="primary"/></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
        </div>
    </div>
  );
}