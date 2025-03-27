// src/components/MainContent.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const drawerWidth = 240;

export default function MainContent() {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Typography sx={{ marginBottom: 2 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </Typography>
      {/* Add your main content here */}
    </Box>
  );
}