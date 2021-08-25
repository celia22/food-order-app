import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Calendar from "./Components/Calendar/Calendar";
import "./App.css";
import auth from "./firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import EmpleadosContainer from "./Container/Empleados/EmpleadosContainer";
import FotosCentroContainer from "./Container/FotosCentro/FotosCentroContainer";
import ServiciosContainer from "./Container/Servicios/ServiciosContainer";
import Perfil from "./Components/Perfil/Perfil";
import Login from "./Components/Login/Login";
import UserAuthProvider from "./Context/UserAuthContext";

function App() {
    const [user] = useAuthState(auth);

    const [userLogged, setUserLogged] = useState();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                //let uid = user.uid;
                //console.log(user);
                setUserLogged(true);
                //console.log(userLogged);
            } else {
                // User is signed out
                // ...
                //console.log("user is not logged");
                //console.log(userLogged);
            }
        });
    }, [user]);

    return (
        <div className="App">
            <UserAuthProvider>
                <BrowserRouter>
                    {!userLogged
                        ? (<Redirect to="/login" />)
                        : (<Redirect to="/" />)
                    }
                    <div>
                        <Sidebar />
                        <Switch>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <Route exact path="/servicios">
                                <ServiciosContainer />
                            </Route>
                            <Route exact path="/imagenes">
                                <FotosCentroContainer />
                            </Route>
                            <Route exact path="/empleados">
                                <EmpleadosContainer />
                            </Route>
                            <Route exact path="/perfil">
                                <Perfil />
                            </Route>
                            <Route path="/">
                                <Calendar />
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </UserAuthProvider>
        </div>
    );
}

export default App;