// src/components/DrawerHeaderComponent.jsx
import React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DrawerHeaderComponent = ({ theme, handleDrawerClose,open ,handleDrawerOpen}) => {
  return (
    <DrawerHeader>
      <IconButton onClick={open?handleDrawerClose:handleDrawerOpen}
      sx={{
          zIndex: '1101',
          position: 'fixed',
          //top: '24px',
          left: open?'240px':'65px',
          transform: 'translateX(-50%)',
          color: '#637318',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(145 158 171 / 0.12)',
          transition: 'left var(--layout-transition-duration) var(--layout-transition-easing) 0ms',
          '-moz-box-align': 'center',
          alignItems: 'center',
          '-moz-box-pack': 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          outline: 0,
          margin: 0,
          cursor: 'pointer',
          userSelect: 'none',
          verticalAlign: 'middle',
          appearance: 'none',
          textDecoration: 'none',
          fontFamily: '"Public Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          textAlign: 'center',
          flex: '0 0 auto',
          borderRadius: '50%',
          overflow: 'visible',
          fontSize: '1.125rem',
          padding: '4px',
          //right: '0px'
          // marginRight: open ? '1px' : '-19px', // Adjust the marginRight value as needed
      }}
      >
        {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </DrawerHeader>
  );
};

export default DrawerHeaderComponent;