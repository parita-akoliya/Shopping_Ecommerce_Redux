
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";

import MainRoute from './routes/MainRoute';
import { Provider } from 'react-redux';
import store from './stores/store';

function App() {
  return (
    <Provider store={store}>
  <Router>
    <MainRoute />
  </Router>
    </Provider>
  
  );
}

export default App;
