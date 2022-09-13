import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Planner from "./components/Planner/Planner";
import Calculator from "./components/Calculator/Calculator";
import Student from "./components/Student/Student";
// import Student from '/components/Student/Student';
import "./App.css";
import Login from "./components/Login/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
import Dashboard from "./components/Dashboard/Dashboard";
import Cards from "./components/Cards/Cards";
import { Switch, Route } from "react-router-loading";
// import CallState from "./components/CallState/CallState";
function App() {
  return (
    <>
      <div>
        <Provider store={store}>
          <Router>
            <div>
              {sessionStorage.logged_in == 1 ? (
                <>
                  <Nav />
                </>
              ) : null}
              <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/planner" component={Planner}></Route>
                <Route path="/student" component={Student}></Route>
                <Route path="/Calculator" component={Calculator}></Route>
                <Route path="/routes_cards" component={Cards}></Route>
                <Route path="/Dashboard" component={Dashboard}></Route>
              </Switch>
            </div>
          </Router>
        </Provider>
      </div>
    </>
  );
}
const Home = () => <Login />;
export default App;
