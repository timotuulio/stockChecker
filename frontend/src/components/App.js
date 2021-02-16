//import logo from './logo.svg';
//import './App.css';
import Header from './headerComponent.js';
import Body from './bodyComponent.js';
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  //const [page, setPage] = useState("0")
  var state = {
    page: "asd"
  }

  return (
    <div>
      <Router>
        <Header state="{state.page}"/>
        <Body/>
        <Route path="/asd" component={Header}/>
      </Router>
    </div>
  );
}

export default App;
