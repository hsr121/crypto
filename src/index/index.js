import { inject, observer, Provider } from 'mobx-react';
import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import store from '../store';
import Home from './home/home';
import Transactions from './transactions/transaction';


const App = () => (
    <Provider store={store}>
            <Home />
    </Provider>
);

export default App;
