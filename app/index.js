import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AppRegistry,
  NavigatorIOS,
  Linking,
} from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';

import QRCodeScanner from 'react-native-qrcode-scanner';

// @TODO: REPLACE WITH SERVER'S IP
const SERVER_URL = 'ws://192.168.1.150:3000/websocket';

class App extends Component {
  constructor(props) {
    super(props)

    this.readCode = this.readCode.bind(this)
  }
  componentWillMount() {
    Meteor.connect(SERVER_URL);  
  }

  handleAddItem() {
    const name = Math.floor(Math.random() * 10); // just generate some random number
    Meteor.call('Items.addOne', { name }, (err, res) => {
      // Do whatever you want with the response
      console.log('Items.addOne', err, res);
    });
  }

  readCode(e) {
    const upcCode = e.data
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native + Meteor!
        </Text>
        <Text style={styles.instructions}>
          Item Count: {this.props.count}
        </Text>

        <TouchableOpacity style={styles.button} onPress={this.handleAddItem}>
          <Text>Add Item</Text>
        </TouchableOpacity>

        <QRCodeScanner
          onRead={this.readCode}
          reactivateTimeout={500}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#c5c5c5',
  },
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

export default createContainer(() => {
  Meteor.subscribe('items');

  return {
    count: Meteor.collection('items').find().length,
  };
}, App);