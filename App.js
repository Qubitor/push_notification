import React, { Component } from 'react'
import { View, Text ,Image, Linking,Button} from 'react-native'
import { TouchableOpacity, ActivityIndicator,Alert} from 'react-native';
import ReactNativeAN from 'react-native-alarm-notification';
import {Icon,Header} from 'react-native-elements'
const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 1000));


const alarmNotifData = {
    id: "12345",                                  // Required
    title: "iVigil Smart Alert",               // Required
    message: "New Person is entered and pushed into waiting list",           // Required
    channel: "my_channel_id",                     // Required. Same id as specified in MainApplication's onCreate method
    ticker: "My Notification Ticker",
    auto_cancel: true,                            // default: true
    vibrate: true,
    vibration: 100,                               // default: 100, no vibration if vibrate: false
    small_icon: "ic_launcher",                    // Required
    large_icon: "ic_launcher",
    play_sound: true,
    sound_name: null,                             // Plays custom notification ringtone if sound_name: null
    color: "green",
    schedule_once: true,                          // Works with ReactNativeAN.scheduleAlarm so alarm fires once
    tag: 'some_tag',
    fire_date: fireDate,                          // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm.

    // You can add any additional data that is important for the notification
    // It will be added to the PendingIntent along with the rest of the bundle.
    // e.g.
  	data: { foo: "bar" },
};

class HttpExample extends Component {
   state = {
      data: []
   }

   method(){
       //Schedule Future Alarm
       ReactNativeAN.scheduleAlarm(alarmNotifData);

       //Delete Scheduled Alarm
       ReactNativeAN.deleteAlarm("12345");

       //Stop Alarm
       ReactNativeAN.stopAlarm();

       //Send Local Notification Now
       ReactNativeAN.sendNotification(alarmNotifData);

       //Get All Scheduled Alarms
       ReactNativeAN.getScheduledAlarms().then(alarmNotif=>console.log(alarmNotif));

       //Clear Notification(s) From Notification Center/Tray
       // ReactNativeAN.removeAllFiredNotifications()
       // ReactNativeAN.removeFiredNotification("12345")

       //Removes Future Local Notifications
       // ReactNativeAN.cancelAllNotifications()
       // ReactNativeAN.cancelNotification("12345")
   }

   componentDidMount = () => {
      fetch('http://192.168.10.3:8000/iSee/notifi_data')
      .then((response) => response.json())
      .then((responseJson) => {
         if(responseJson.length>0)
         {
           this.method()
         }
         this.setState({
            data:responseJson

         })


      })
      .catch((error) => {
         console.error(error);
      });
   }
   handleAccept = async (x) => {
     fetch('http://192.168.10.3:8000/iSee/accept/'+x)
       .then((response) => response.json())
       .then((responseJson) => {
    Alert.alert("User Accepted Successfully");
       })
       .catch((error) => {
         console.error(error);
       });
   }
   handleReject = async (x) => {
     fetch('http://192.168.10.3:8000/iSee/reject/'+x)
       .then((response) => response.json())
       .then((responseJson) => {
         Alert.alert("User Rejetced Successfully");

       })
       .catch((error) => {
         console.error(error);
       });
   }

   render() {
      return (


<View>
<Header
  placement="left"
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'iVigil', style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/>
         { this.state.data.map((item,index) => (
           <View>
                                         <Text>
                                         ID:{item.id}
                                         </Text>
                                         <Image
                               style={{width: 100, height: 100}}
                               source={{uri:item.image}}
                             />
                                         <TouchableOpacity onPress={this.handleAccept.bind(this,item.id)}>
                                          <Text style={{fontSize:20, color: 'green'}}>Accept</Text>
                                         </TouchableOpacity>
                                         <TouchableOpacity onPress={this.handleReject.bind(this,item.id)}>
                                          <Text style={{fontSize:20,color: 'red'}}>Reject</Text>
                                         </TouchableOpacity>
                                         </View>


                                    ))}



</View>

      )
   }
}

export default HttpExample
