// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText, Collapse, Drawer } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = React.useState({});
  const location = useLocation();

  const handleClick = (item) => {
    setOpen((prevOpen) => ({ ...prevOpen, [item]: !prevOpen[item] }));
  };

  const menuItems = [
    {
      text: 'Item 1',
      path: '/item1',
      nested: [
        { text: 'Subitem 1-1', path: '/item1/subitem1' },
        { text: 'Subitem 1-2', path: '/item1/subitem2' },
      ],
    },
    { text: 'Item 2', path: '/item2' },
  ];

  return (
    <Drawer variant="permanent">
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem button component={Link} to={item.path} selected={location.pathname === item.path} onClick={() => handleClick(item.text)}>
              <ListItemText primary={item.text} />
              {item.nested ? (open[item.text] ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItem>
            {item.nested && (
              <Collapse in={open[item.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.nested.map((nestedItem, nestedIndex) => (
                    <ListItem
                      key={nestedIndex}
                      button
                      component={Link}
                      to={nestedItem.path}
                      selected={location.pathname === nestedItem.path}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={nestedItem.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;