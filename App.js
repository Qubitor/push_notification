import React, { Component } from 'react'
import { View, Text ,Image, Linking} from 'react-native'

class HttpExample extends Component {
   state = {
      data: []
   }

   componentDidMount = () => {
      fetch('http://192.168.10.3:8000/iSee/notifi_data')
      .then((response) => response.json())
      .then((responseJson) => {
         console.warn(responseJson);

         this.setState({
            data:responseJson

         })
      })
      .catch((error) => {
         console.error("error");
      });
   }
   render() {
      return (
<View>
         { this.state.data.map((item,index) => (
           <View>
                                         <Text>
                                         ID:{item.id}
                                         </Text>
                                         <Image
                               style={{width: 100, height: 100}}
                               source={{uri:item.image}}
                             />
                                         <Text style={{color:'green'}} onPress={ ()=> Linking.openURL('http://192.168.10.3:8000/iSee/accept/'+item.id) } >
                                         Accept</Text>

                                         <Text  style={{color:'red'}} onPress={ ()=> Linking.openURL('http://192.168.10.3:8000/iSee/reject/'+item.id) } >
                                         Reject</Text>
                                         </View>

                                    ))}


</View>
      )
   }
}
export default HttpExample
