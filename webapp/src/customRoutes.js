import React from 'react';
<<<<<<< HEAD
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import {combineReducers, createStore} from 'redux';
import App from './components/App';
import { reducer } from './reducers/initialState'
=======
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch, } from "react-router-dom";
import { combineReducers, createStore } from 'redux';
import App from './App'
import { eventFormReducer } from './reducers/eventFormModalState'
import { calendarReducer } from './reducers/calendarState'
import Calender from './components/Calendar/Calendar'
>>>>>>> 0a0e1c8b24822759dcc9d4e8de2c34b53895a04e


const reducers = combineReducers({
    eventFormReducer,
    calendarReducer
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());

class CustomRoutes extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/signup" component={App} exact />
                        <Route path="/calendar" component={Calender} />
                        <Route path="/">
                            <Redirect to="/signup" />
                        </Route>
                    </Switch>
                </Router>
            </Provider>
        );
    }

}
export default CustomRoutes;
