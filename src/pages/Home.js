import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Nav from '../components/Nav';

const {height, width} = Dimensions.get('window');

export default class Home extends Component {

  render() {
    const {router} = this.props;

    const navs={
      Left:[
        {
          icon:'ios-arrow-back',
          onPress: ()=> {
            router.toNoTabBarPage({
              id:'notabbarpage'
            })
          }
        }
      ],
      Center:[{
        text:'Home Page'
      }],
      Right:[{
          icon:'ios-search-outline',
          onPress: ()=> {
            router.toNoTabBarPage({
              id:'notabbarpage'
            })
          }
        },
        {
          icon:'ios-add',
          onPress: ()=> {
            router.toNoTabBarPage({
              id:'notabbarpage'
            })
          }
        }
      ]
    };

    return (
      <View style={styles.container}>
        <Nav navs={navs}/>
        <Text style={styles.title}>Hello
          <Text style={{fontSize:18,color:'rgba(255,255,255,0.6)'}}>
            Home Page
          </Text>
        </Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  bgWall: {
    height: height,
    width: width
  },
  noderLogo: {
    height: 150,
    width: 150
  },
  container: {
    width: width,
    height: height,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#292829'
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    color: 'rgba(255,255,255,0.7)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',

  },
  subTitle: {
    marginTop: 10,
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    alignItems: 'center'
  },
  rowIcon: {
    height: 40,
    width: 40
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100
  },
  blog: {
    height: 20,
    width: 100,
    opacity: 0.5
  },
  reactNative: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.3)'
  }
});
