import React, { Component } from 'react';
import { observer } from "mobx-react";
import { Platform, StyleSheet, Text, View } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';

import { authStore } from '../store/AuthStore'
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import ToDoList from './ToDoList';


@observer export default class App extends Component {
    render() {
        /*
        if(authStore.user) {
            return ( <Home /> );
        }
        return ( <SignUp/>  );
        */
        return <ToDoList />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    button: {
        backgroundColor: 'violet',
        marginTop: 20,
    }
});