import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Container, IconButton } from '@material-ui/core';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Folder as FolderIcon, ExitToApp, Functions as FunctionIcon, Shuffle as ShuffleIcon } from '@material-ui/icons';
import Loading from './Loading';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 0.5,
    padding: theme.spacing(3),
  },

}));

const Layout = () => {
  const classes = useStyles();
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { path: '/', icon: <HomeIcon />, text: 'Home' },
  ];
  const location = useLocation();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            App Email
          </Typography>
          <div className={classes.grow} />
          <IconButton edge="end" color="inherit" onClick={handleLogout} style={{ position: 'absolute', right: '16px' }}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              key={item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Container>
          <Outlet />
        </Container>
        <Loading />
      </main>
    </div>
  );
}

export default Layout;
