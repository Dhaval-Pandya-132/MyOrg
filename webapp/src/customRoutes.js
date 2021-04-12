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
import Sticky from './components/Sticky-Notes/Sticky';
import StickyLandingPage from './components/Sticky-Notes/StickyLandingPage';
import Cookie from "js-cookie";


const reducers = combineReducers({
    eventFormReducer,
    calendarReducer
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());

function CustomRoutes() {
    
    const token = Cookie.get('tokenId');
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

        return (
            <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
                <Provider store={store}>
                    <Router>
                        {isAuthenticated 
                            ?
                                <Switch>
                                    <Route path="/dashboard" component={Dashboard}/>
                                    <Route path="/calendar" component={Calender} />
                                    <Route path="/messages" component={LandingPage} />
                                    <Route path="/sticky" component={StickyLandingPage} />
                                </Switch>  
                            :   <div>
                                    <Route path="/signup" component={App} />
                                    <Redirect to="/signup"/>
                                </div>
                        }
                    </Router>
                </Provider>
            </UserContext.Provider>
        )

}
export default CustomRoutes;