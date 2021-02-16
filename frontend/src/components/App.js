//import logo from './logo.svg';
//import './App.css';
import Header from './headerComponent.js';
import Body from './bodyComponent.js';
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <Router>
        <Header/>
        <Route exact path="/" component={Body}/>
      </Router>
    </div>
  );
}

export default App;
