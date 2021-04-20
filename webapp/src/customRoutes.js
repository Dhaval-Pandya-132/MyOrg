import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch, } from "react-router-dom";
import { combineReducers, createStore } from 'redux';
import App from './components/App';
import Dashboard from './components/Dashboard/dashboard';
import { globalStateReducer } from './reducers/globalState'
import { eventFormReducer } from './reducers/eventFormModalState'
import { calendarReducer } from './reducers/calendarState';
import CalendarContainer from './containers/CalendarContainer';
import LandingPage from './components/Web-Chat-Component/LandingPage';
import ChatContainer from './containers/ChatContainer'
import OrgChartTree from './components/OrgChart/OrgChartTree'
import UserContext from "./contexts/UserContext";
import UserProfile from "./components/UserProfile/profile";
import UserProfileContainer from './containers/UserProfileContainer'
import OrgChartContainer from './containers/OrgChartContainer'
import Sticky from './components/Sticky-Notes/Sticky';
import StickyNote from './components/StickyNotes/StickyNote';
import Cookie from "js-cookie";


const reducers = combineReducers({
    eventFormReducer,
    calendarReducer,
    globalStateReducer
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
                            <Route path="/dashboard" component={Dashboard} />
                            <Route path="/calendar" component={CalendarContainer} />
                            <Route path="/messages" component={ChatContainer} />
                            <Route path="/sticky" component={StickyNote} />
                            <Route path="/profile" component={UserProfileContainer} />
                            <Route path="/orgchart" component={OrgChartContainer} />
                        </Switch>
                        : <div>
                            <Route path="/signup" component={App} />
                            <Redirect to="/signup" />
                        </div>
                    }
                </Router>
            </Provider>
        </UserContext.Provider>
    )

}
export default CustomRoutes;