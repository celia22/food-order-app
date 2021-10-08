import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
import { AuthContext } from "./Context/UserAuthContext";

function App() {
    const [user] = useAuthState(auth);

    const { hideSidebar, setHideSidebar, userLogged, setUserLogged } = useContext(AuthContext);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                //let uid = user.uid;
                // console.log(user.email);
                setUserLogged(true);
                setHideSidebar(false)
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
            <div>
                { !hideSidebar && <Sidebar /> }
                <Switch>
                    <Route
                        exact path="/login"
                        render={props =>
                            <Login {...props} />
                        }
                    >
                        {userLogged && <Redirect to="/" />}
                    </Route>
                    <Route
                        exact path="/servicios"
                        render={props =>
                            <ServiciosContainer {...props}/>
                        }
                    >
                        {!userLogged && <Redirect to="/login" />}
                    </Route>
                    <Route
                        exact path="/imagenes"
                        render={props =>
                            <FotosCentroContainer {...props}/>
                        }
                    >
                        {!userLogged && <Redirect to="/login" />}
                    </Route>
                    <Route
                        exact path="/empleados"
                        render={props =>
                            <EmpleadosContainer {...props}/>
                        }
                    />
                    <Route
                        exact path="/perfil"
                        render={props =>
                            <Perfil {...props}/>
                        }
                    >
                        {!userLogged && <Redirect to="/login" />}
                    </Route>
                    <Route
                        exact path="/"
                        render={props =>
                            <Calendar {...props}/>
                        }
                    >
                        {!userLogged && <Redirect to="/login" />}
                    </Route>
                    <Route exact path="/*">
                        {!userLogged && <Redirect to="/login" />}
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;