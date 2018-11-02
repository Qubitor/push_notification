import React, { Component } from 'react';
import { TouchableOpacity, View, ActivityIndicator, Text, Alert} from 'react-native';
export default class App extends Component {
handlePress = async () => {
  fetch('http://192.168.10.3:8000/data')
    .then((response) => response.json())
    .then((responseJson) => {
 Alert.alert("Your data" + responseJson[0].x);

    })
    .catch((error) => {
      console.error(error);
    });
}
  render(){
  return(
   <View style={{paddingTop: 50, paddingLeft: 50 }}>
    <TouchableOpacity onPress={this.handlePress.bind(this)}>
     <Text style={{paddingTop: 50, paddingLeft: 50, color: '#FF0000'}}> Click to View</Text>
    </TouchableOpacity>
</View>
  );
}
}
