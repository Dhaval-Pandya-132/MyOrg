import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import {combineReducers, createStore} from 'redux';
import App from './components/App';
import Dashboard from './components/Dashboard/dashboard';
import { reducer } from './reducers/initialState'


const reducers = combineReducers({
    reducer
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__());

class CustomRoutes extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/signup" component={App} exact/>
                        {/* <Route path="/" exact>
                            <Redirect to="/signup"/>
                        </Route> */}
                        <Route path="/dashboard" component={Dashboard} exact></Route>
                    </Switch>
                </Router>
            </Provider>
        );
    }

}
export default CustomRoutes;
