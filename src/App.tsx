import React from 'react';
import MainLayout from './layouts/MainLayout';
import { GlobalStyles } from '@mui/material';

const globalStyles = {
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  html: {
    height: '100%',
    width: '100%',
  },
  body: {
    height: '100%',
    width: '100%',
  },
  '#root': {
    height: '100%',
    width: '100%',
  },
};

const App: React.FC = () => {
  return (
      <>
        <GlobalStyles styles={globalStyles} />
        <MainLayout />
      </>
  );
};

export default App;
