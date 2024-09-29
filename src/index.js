import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './theme';


const container = document.getElementById('root');
const root = createRoot(container); // createRoot is used in React 18

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);


root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);


reportWebVitals();
