import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.jsx"

import { Provider } from 'react-redux';
import { configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import songReducer from "./songState"
import songSaga from './songSaga.jsx';

const saga = createSagaMiddleware();
const store = configureStore({
  reducer:{
   songs:songReducer
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(saga)
});

saga.run(songSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
    <App/>
  </React.StrictMode>
  </Provider>
  
);


