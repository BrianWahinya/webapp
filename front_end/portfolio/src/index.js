import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavBar from './components/navbar';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './styles/navbar.css';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <h5 className='comingSoon'>Coming Soon...&#128521;</h5>
    <NavBar />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
