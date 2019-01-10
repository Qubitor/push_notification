import React, { Component } from "react";
import { TouchableOpacity, Image,ImageBackground, Alert, TouchableHighlight, Button } from "react-native";
import { connect } from "react-redux";
import AcceptList from "../blankPage2";
import RejectList from "../reject_list"
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {
  Container,
  Header,
  Title,
  Content,
  Text,

  Icon,
  Left,
  Body,
  Right,
  Card, CardItem, View,
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import styles from "./styles";
ip="192.168.10.26"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      data: [],
      reject: [],
      accept: [],
      waiting: [],
      isLoading: true
    };
  }
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  componentWillMount() {
    // this.timer = setInterval(()=> 5000)
    this._interval = setInterval(() => {
      fetch('http://'+ip+':8000/sample/notifi_data')
        .then((response) => response.json())

        .then((responseJson) => {
          if (responseJson.length > 0) {
            // this.method()

            //  console.warn(responseJson)
          }

          this.setState({
            isLoading: false,
            data: responseJson


          })

        })
        // console.warn(this.state.data)
        .catch((error) => {
          // console.error(error);
        });
    }, 3000)

    this.reject()
    this.accept()
    this.waiting()
  }

  reject() {
    this.reject = setInterval(() => {
      fetch('http://'+ip+':8000/sample/rev')
        .then((response) => response.json())

        .then((responseJson) => {
          // console.warn(responseJson)
          // console.warn(JSON.stringify(responseJson))
          const name = responseJson[0]
          console.log(name)
          const val = name.slice(2)
          //  console.warn(val)
          this.setState({
            isLoading: false,
            reject: val
          })
        })
        .catch((error) => {
          // console.error(error);
        });
    }, 3000)
  }
  waiting() {
    this.waiting = setInterval(() => {
      fetch('http://'+ip+':8000/sample/test')
        .then((response) => response.json())

        .then((responseJson) => {
          // console.warn(responseJson)
          // console.warn(JSON.stringify(responseJson))
          const name = responseJson[0]
          console.log(name)
          const val = name.slice(2)
          //  console.warn(val)
          this.setState({
            isLoading: false,
            waiting: val
          })
        })
        .catch((error) => {
          // console.error(error);
        });
    }, 3000)
  }
  accept() {
    this.accept = setInterval(() => {
      fetch('http://'+ip+':8000/sample/sam')
        .then((response) => response.json())

        .then((responseJson) => {
          // console.warn(responseJson)
          // console.warn(JSON.stringify(responseJson))
          const name = responseJson[0]
          console.log(name)
          const val = name.slice(2)
          //  console.warn(val)
          this.setState({
            isLoading: false,
            accept: val
          })
        })
        .catch((error) => {
          // console.error(error);
        });
    }, 3000)
  }



  handleAccept = async (x) => {
    alert("hi");
    fetch('http://'+ip+':8000/sample/accept/' + x)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.warn('hi');
        Alert.alert("User Accepted Successfully");
      })
      .catch((error) => {
        console.error(error);
        // console.warn('notsuccessful');
      });
  }
  handleReject = async (x) => {
    fetch('http://'+ip+':8000/sample/reject/' + x)
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert("User Rejetced Successfully");

      })
      .catch((error) => {
        console.error(error);
      });
  }
  handleDelete = async (x) => {
    fetch('http://'+ip+':8000/sample/cans/' + x)
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert("User Ignore Successfully");

      })
      .catch((error) => {
        console.error(error);
      });
  }

  onFocus() {
    this.setState({
      backgroundColor: 'green'
    })
  }

  render() {
    console.log(DrawNav, "786785786");
    return (
      <Container style={styles.container}>
        <Header style={{backgroundColor:'#329fb8'}}>
          <Left>

            <TouchableOpacity
            
              transparent
              onPress={() => {
                DrawerNav.dispatch(
                  NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "Home" })]
                  })
                );
                DrawerNav.goBack();
              }}
            >
              <Icon style={{ color: 'white'}}  name="power" />
            </TouchableOpacity>
          </Left>

          <Body>
            <Title>Home</Title>
          </Body>

          <Right>
            <TouchableOpacity
              transparent
              onPress={() => DrawerNav.navigate("DrawerOpen")}
            >
              <Icon style={{ color: 'white'}} name="menu" />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content >
       
          <Body style={{paddingTop:10}} >
            <Row style={{ padding: 10 }}>
              <Left><Text style={{ color: 'red' }}>Rejected:{this.state.reject}</Text></Left>
              <Text style={{ color: 'green' }}>Accepted:{this.state.accept}</Text>
              <Right><Text style={{ color: 'orange' }}>Waiting:{this.state.waiting}</Text></Right>
            </Row>
            {this.state.data.map((item, index) => (
              
              <Row style={{ flexDirection: 'column', alignItems: 'center',paddingTop:10 }} key={index}>
                
                <View style={{borderWidth:0.9,padding:5,borderColor:'#ddd'}}>
                <Image source={{ uri: item.image }}
                  style={{ alignItems: 'center', width: 150, height: 150 }} />
                  </View>
                  <View style={{paddingTop:15}}>
                  <Text>
                  ID:{item.id}
                </Text>
                </View>
                <Row>
                  <TouchableOpacity
                    style={styles.row}

                  >

                    <Button
                      color="green"

                      onPress={() =>
                        Alert.alert(
                          'Alert Title',
                          'Confirm msg',
                          [

                            { text: 'No', onPress: () => console.log('OK Pressed'), style: 'cancel' },
                            { text: 'Yes', onPress: () => { this.handleAccept(item.id) } },
                          ],
                          { cancelable: false }
                        )
                      }
                      title="Accept" />
                      

                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.row}

                  >

                    <Button
                      color="red"
                      onPress={() =>
                        Alert.alert(
                          'Alert Title',
                          'Confirm Msg',
                          [

                            { text: 'No', onPress: () => console.log('OK Pressed'), style: 'cancel' },
                            { text: 'Yes', onPress: () => { this.handleReject(item.id) } },
                          ],
                          { cancelable: false }
                        )
                      }

                      title="Reject" />
                    {/* <Text style={styles.reject}>Reject</Text> */}

                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.row}
                   
                  >

                    <Button
                    title="Ignore"
                      color="orange"
                      onPress={() =>
                        Alert.alert(
                          'Alert Title',
                          'Confirm Msg',
                          [
  
                            { text: 'No', onPress: () => console.log('OK Pressed'), style: 'cancel' },
                            { text: 'Yes', onPress: () => { this.handleDelete(item.id) } },
                          ],
                          { cancelable: false }
                        )
                      }
                       />
                    {/* <Text style={styles.delete}>Ignore</Text> */}


                  </TouchableOpacity>

                </Row>
              </Row>
              
            ))}
          </Body>
         

          {/* {this.props.list.map((item, i) => (
              <Row key={i}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() =>
                    this.props.navigation.navigate("BlankPage", {
                      name: { item }
                    })}
                >
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              </Row>
            ))} */}

        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer())
  };
}
const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const DrawNav = DrawerNavigator(
  {
    Home: { screen: HomeSwagger },
    AcceptList: { screen: AcceptList },
    RejectList: { screen: RejectList }
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
);
const DrawerNav = null;
DrawNav.navigationOptions = ({ navigation }) => {
  DrawerNav = navigation;
  return {
    header: null
  };
};
export default DrawNav;
