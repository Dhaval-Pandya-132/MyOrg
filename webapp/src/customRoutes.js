import React, { useState }  from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import {combineReducers, createStore} from 'redux';
import App from './components/App';
import Dashboard from './components/Dashboard/dashboard';
import { reducer } from './reducers/initialState'
import { eventFormReducer } from './reducers/eventFormModalState'
import { calendarReducer } from './reducers/calendarState';
import Calender from './components/Calendar/Calendar';
import LandingPage from './components/Web-Chat-Component/LandingPage';
import UserContext from "./contexts/UserContext";
import Cookie from "js-cookie";


const reducers = combineReducers({
    eventFormReducer,
    calendarReducer
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());

function CustomRoutes() {
    
    const token = Cookie.get('accessToken');
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

        return (
            <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
                <Provider store={store}>
                    <Router>
                        {isAuthenticated 
                            ?
                                <Switch>
                                    <Route path="/dashboard" component={Dashboard}></Route>
                                    <Route path="/calendar" component={Calender} />
                                    <Route path="/messages" component={LandingPage} />
                                </Switch>  
                            :   <div>
                                    <Route path="/signup" component={App} />
                                    <Route path="/" exact>
                                        <Redirect to="/signup"/>
                                    </Route>
                                    <Redirect to="/signup" />
                                </div>
                        }
                    </Router>
                </Provider>
            </UserContext.Provider>
        )

}
export default CustomRoutes;
