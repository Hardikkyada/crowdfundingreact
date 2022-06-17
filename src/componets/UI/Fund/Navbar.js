import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {useEffect} from 'react';

function Navbar() {
  const [state, setState] = React.useState(true);

  const toggleDrawer = open => event => {
    console.log('khfiuhfkuhfkjmnklh*/*/*/*');
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState(false);
  };

  return (
    <div>
      <React.Fragment>
        {/* <Button onClick={toggleDrawer('left', true)}>{anchor}</Button> */}
        <Drawer
          anchor="left"
          open={state}
          onClose={toggleDrawer('open', false)}>
          <Box
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}>
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default Navbar;
