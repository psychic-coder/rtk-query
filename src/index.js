import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from './features/api/apiSlice';

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
     <ApiProvider api={apiSlice}>
      <App/>
     </ApiProvider>
    </React.StrictMode>
  );

  /*In summary, using ApiProvider simplifies the setup process for RTK Query and provides a more cohesive API for interacting with your API endpoints. It abstracts away some of the Redux-specific details, making it easier to work with RTK Query in your application.
*/