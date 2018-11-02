import React, {Component } from 'react';
import {observer} from "mobx-react";
import {Platform,StyleSheet,Text, View} from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';

import {homeStore} from '../store/HomeStore'
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
        'u'
});

@observer export default class App extends Component  {
    constructor(props){
        super(props);
        homeStore.prueba();
    }
    render() {
        return ( 
            <View style = {styles.container} > 
            <Text style = {styles.welcome} >Welcome 2to Vibo Home! </Text> 
            <Button
        buttonStyle={styles.button}
        title="Proyecto"
        large
    />
            </View> );
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
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});