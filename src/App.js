import "./App.css";
import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Pages/Home";
import "./App.css";
import auth from "./firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import EmpleadosContainer from "./Container/Empleados/EmpleadosContainer";
import FotosCentroContainer from "./Container/FotosCentro/FotosCentroContainer";
import ServiciosContainer from "./Container/Servicios/ServiciosContainer";
import Perfil from "./Components/Perfil/Perfil";
import Login from "./Components/Login/Login";
import { AuthContext } from "./Context/UserAuthContext";

function App() {
  const [user] = useAuthState(auth);

  const { hideSidebar, userLogged } = useContext(AuthContext);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       //let uid = user.uid;
  //       // console.log(user.email);
  //       console.log(user);
  //       // setUserLogged(true);
  //       // setHideSidebar(false);
  //       //console.log(userLogged);
  //     } else {
  //       // User is signed out
  //       // ...
  //       //console.log("user is not logged");
  //       //console.log(userLogged);
  //     }
  //   });
  // }, [user]);

  return (
    <div className="App">
      <div>
        {!hideSidebar && <Sidebar />}
        <Switch>
          <Route exact path="/login">
            {userLogged ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/servicios">
            {!userLogged ? <Redirect to="/login" /> : <ServiciosContainer />}
          </Route>
          <Route exact path="/imagenes">
            {!userLogged ? <Redirect to="/login" /> : <FotosCentroContainer />}
          </Route>
          <Route exact path="/empleados">
            {!userLogged ? <Redirect to="/login" /> : <EmpleadosContainer />}
          </Route>
          <Route exact path="/perfil" >
            {!userLogged ? <Redirect to="/login" /> : <Perfil />}
          </Route>
          <Route exact path="/">
            {!userLogged ? <Redirect to="/login" /> : <Home />}
          </Route>
          <Route path="/">
            {!userLogged && <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
