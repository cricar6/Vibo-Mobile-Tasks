import React, {Component } from 'react';
import {observer} from "mobx-react";
import {Platform,StyleSheet,Text, View} from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';

import {homeStore} from '../store/HomeStore'


@observer export default class Home extends Component  {

    constructor(props){
        super(props);
        this.onSend = this.onSend.bind(this);
    }

    onSend() {
        homeStore.prueba();
    }
    render() {
        return ( 
            <View style = {styles.container} > 
            <Text style = {styles.welcome} >Hello android vibo app! </Text> 
            <Button buttonStyle={styles.button}
            title="Proyecto" large 
            onPress={this.onSend} />
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
    }
});