import React from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;