import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { View } from './views/View';
import { Toolbar } from "./components/Toolbar";
import { PlaybackProvider } from './context/PlaybackContext';

ReactDOM.render(
  <React.StrictMode>
    <PlaybackProvider>
      <Toolbar />
      <View />
    </PlaybackProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
