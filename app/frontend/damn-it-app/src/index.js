import React from 'react';
import ReactDOM from 'react-dom/client';
import "blumba/css/blumba.min.css"
import App from "./App";
import { UserProvider } from '../context/UserContext';


ReactDOM.createRoot(
  <UserProvider>
    <App />
  </UserProvider>, document.getElementById('root'));

