import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch, } from "react-router-dom";
import { combineReducers, createStore } from 'redux';
import App from './App'
import { eventFormReducer } from './reducers/eventFormModalState'
import Calender from './components/Calendar'


const reducers = combineReducers({
    eventFormReducer
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
                        <Route path="/calendar" component={Calender} exact />
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
