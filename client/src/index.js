import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

// import containers
import App from './containers/App';
import Counter from './containers/Counter';
import Stuff from './containers/Stuff';
import Signup from './containers/Signup';

// import components
import Welcome from './components/Welcome';

import reducers from './reducers';

// make sure to have redux dev tools in chrome 
// configure redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// store takes 3 parameters (reducers, {a preloaded state}, middlewares,  )
const store = createStore(
    reducers,
    {
        // gets token from local storage so user stays signed in even refreshing
        // this also goes around cookies being blocked because we are using a token
        auth: { authenticated: localStorage.getItem('token')}
    },
    // invoke reduxThunk
    composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
    // provider that takes the store and gives it to all of its children
    // no need for handle input change anymore
<Provider store={store}>
    <Router>
        <App>
            <Route exact path='/' component={Welcome}/>
            <Route exact path='/counter' component={Counter}/>
            <Route exact path='/stuff' component={Stuff}/>
            <Route exact path='/signup' component={Signup}/>
        </App>
    </Router>
</Provider>,
document.getElementById('root'));