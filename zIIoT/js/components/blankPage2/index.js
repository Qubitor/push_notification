import React, { Component } from "react";
import { TouchableOpacity, Image ,ScrollView} from "react-native";
import { connect } from "react-redux";
import RejectList from "../reject_list"
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Card, CardItem,
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";

class AcceptList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      data: [],
      isLoading: true
    };
  }
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    // this.timer = setInterval(()=> 5000)
    this._interval = setInterval(() => {
      fetch('http://192.168.10.26:8000/sample/accept_api')
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
        .catch((error) => {
          // console.error(error);
        });
    }, 3000)
  }

  render() {
    const { props: { name, index, list } } = this;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>AcceptList page</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>

        <Content >

          <ScrollView>
          <Body>
            {this.state.data.map((item, index) => (
              <Row style={{ flexDirection: 'column', alignItems: 'center', }} key={index}>
                <Text>
                  ID:{item.id}
                </Text>
                <Image source={{ uri: item.image }}
                  style={{ alignItems: 'center', width: 100, height: 100 }} />
              <Text>
                  {item.start_date}
                </Text>
              </Row>

            ))}
          </Body>

              </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default AcceptList;
