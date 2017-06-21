/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    TouchableOpacity,
    TextInput
} from 'react-native';

// import {Server as PeerUpServer}  from 'peer-up/dist/index';
// const fs = require('fs-extra');
//
// const server:PeerUpServer = new PeerUpServer();
// server.listen();

export default class entboxapp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            connected: false,
            msg:""
        };
        this.socket = new WebSocket('ws://45.32.186.169:28475');
        this.socket.onopen = () => {
            this.setState({connected:true})
        };
        this.socket.onmessage = (e) => {
            console.log(e.data);
        };
        this.socket.onerror = (e) => {
            console.log(e.message);
        };
        this.socket.onclose = (e) => {
            this.setState({connected:false})
            console.log(e.code, e.reason);
        };
        this.emit = this.emit.bind(this);

    }

    emit() {
        if( this.state.connected ) {
            this.socket.send(this.state.msg)
        }
    }

    onMsgChange(event) {
        this.setState({msg:event.target.value});
    }

    render() {
        return (
            <View style = {styles.container}>
                <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "chat msg"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           onChangeText = {(text)=>{this.setState({msg:text})}}
                           value={this.state.msg}
                />

                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = { ()=> this.emit()}>
                    <Text style = {styles.submitButtonText}>
                        Submit
                    </Text>
                </TouchableOpacity>
                    <Text>connected:{this.state.connected ? "true":"false"}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('entboxapp', () => entboxapp);
