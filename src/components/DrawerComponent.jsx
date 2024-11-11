// src/components/DrawerComponent.jsx
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useLocation } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Popover from '@mui/material/Popover';
import DrawerHeaderComponent from './DrawerHeaderComponent';
import LogoComponent from './LogoComponent';
import Box from '@mui/material/Box';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const DrawerComponent = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const location = useLocation();
  const [nestedOpen, setNestedOpen] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverContent, setPopoverContent] = useState([]);

  const handlePopoverOpen = (event, nestedItems) => {
    setAnchorEl(event.currentTarget);
    setPopoverContent(nestedItems);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'nested-popover' : undefined;

  const handleNestedClick = (item) => {
    setNestedOpen((prevOpen) => ({ ...prevOpen, [item]: !prevOpen[item] }));
  };

  const menuItems = [
    {
      text: 'Overview',
      icon: <InboxIcon />,
      nested: [
        { text: 'App', path: '/dashboard', icon: <MailIcon /> },
        { text: 'Ecommerce', path: '/dashboard/ecommerce', icon: <MailIcon /> },
        { text: 'Analytics', path: '/dashboard/analytics', icon: <MailIcon /> },
        { text: 'Banking', path: '/dashboard/banking', icon: <MailIcon /> },
        { text: 'Booking', path: '/dashboard/booking', icon: <MailIcon /> },
        { text: 'File', path: '/dashboard/file', icon: <MailIcon /> },
        { text: 'Course', path: '/dashboard/course', icon: <MailIcon /> },
      ],
    },
    {
      text: 'Management',
      icon: <InboxIcon />,
      nested: [
        { text: 'User', path: '/dashboard/user', icon: <MailIcon /> },
        { text: 'Product', path: '/dashboard/product', icon: <MailIcon /> },
        { text: 'Order', path: '/dashboard/order', icon: <MailIcon /> },
        { text: 'Invoice', path: '/dashboard/invoice', icon: <MailIcon /> },
        { text: 'Blog', path: '/dashboard/blog', icon: <MailIcon /> },
        { text: 'Job', path: '/dashboard/job', icon: <MailIcon /> },
        { text: 'Tour', path: '/dashboard/tour', icon: <MailIcon /> },
      ],
    },
    {
      text: 'Misc',
      icon: <InboxIcon />,
      nested: [
        { text: 'Permission', path: '/dashboard/permission', icon: <MailIcon /> },
        { text: 'Level', path: '/dashboard/level', icon: <MailIcon /> },
        { text: 'Disabled', path: '/dashboard/disabled', icon: <MailIcon /> },
        { text: 'Label', path: '/dashboard/label', icon: <MailIcon /> },
        { text: 'Params', path: '/dashboard/params', icon: <MailIcon /> },
        { text: 'External link', path: 'https://www.google.com/', icon: <MailIcon />, external: true },
        { text: 'Blank', path: '/dashboard/blank', icon: <MailIcon /> },
      ],
    },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <LogoComponent />
      <DrawerHeaderComponent handleDrawerClose={handleDrawerClose} open={open} />
      <Divider />
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                disablePadding
                sx={{ display: 'block' }}
                onMouseEnter={(event) => !open && item.nested && handlePopoverOpen(event, item.nested)}
                onMouseLeave={handlePopoverClose}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => item.nested && handleNestedClick(item.text)}
                  selected={location.pathname === item.path}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                  {item.nested && (nestedOpen[item.text] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
              {item.nested && (
                <Collapse in={nestedOpen[item.text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.nested.map((nestedItem, nestedIndex) => (
                      <ListItemButton
                        key={nestedIndex}
                        component={nestedItem.external ? 'a' : Link}
                        to={nestedItem.external ? undefined : nestedItem.path}
                        href={nestedItem.external ? nestedItem.path : undefined}
                        target={nestedItem.external ? '_blank' : undefined}
                        rel={nestedItem.external ? 'noopener' : undefined}
                        sx={{
                          pl: 4,
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                        }}
                        selected={location.pathname === nestedItem.path}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          {nestedItem.icon}
                        </ListItemIcon>
                        <ListItemText primary={nestedItem.text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
      <Divider />
      {!open && (
        <Popover
          id={id}
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onMouseEnter={() => setAnchorEl(anchorEl)} // Keep the popover open when hovering over it
          onMouseLeave={handlePopoverClose} // Close the popover when the mouse leaves
        >
          <List>
            {popoverContent.map((nestedItem, nestedIndex) => (
              <ListItemButton
                key={nestedIndex}
                component={nestedItem.external ? 'a' : Link}
                to={nestedItem.external ? undefined : nestedItem.path}
                href={nestedItem.external ? nestedItem.path : undefined}
                target={nestedItem.external ? '_blank' : undefined}
                rel={nestedItem.external ? 'noopener' : undefined}
                sx={{
                  pl: 4,
                  minHeight: 48,
                  justifyContent: 'initial',
                }}
                selected={location.pathname === nestedItem.path}
                onClick={handlePopoverClose} // Close the popover when an item is clicked
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',
                  }}
                >
                  {nestedItem.icon}
                </ListItemIcon>
                <ListItemText primary={nestedItem.text} />
              </ListItemButton>
            ))}
          </List>
        </Popover>
      )}
    </Drawer>
  );
};

export default DrawerComponent;