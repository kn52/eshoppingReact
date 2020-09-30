import React from 'react';
import './App.css';
import DefaultRoutes from "./route/RouterSwitch";
import { Provider } from 'react-redux';
import store from './redux/store/Store';

function App() {
    return (
        <Provider store={store} >
            <div className="App">
                <DefaultRoutes/>
            </div>
        </Provider>
    );
}

export default App;