import './App.css';
import {NavBar} from './Components/Navbar/Navbar'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar'
import CalendarUi from './Components/Calendar/Calendar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Sidebar/> */}
      <Switch>
        <Route path='/calendar'>
      <CalendarUi/>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;