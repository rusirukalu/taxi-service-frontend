import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'; 
import theme from './theme';


const container = document.getElementById('root');
const root = createRoot(container); // createRoot is used in React 18

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
