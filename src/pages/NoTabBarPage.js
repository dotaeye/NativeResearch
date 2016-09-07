import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalView from './ModalView';

import Nav from '../components/Nav';

const {height, width} = Dimensions.get('window');


export default class NoTabBarPage extends Component {

  onGoToMainPage(){
    this.props.router.toMainPage({
      id: 'main'
    });
  }

  onBack(){
    this.props.router.pop();
  }


  render() {
    const {router} = this.props;
    const navs={
      Left:[
        {
          icon:'ios-arrow-back',
          onPress: ()=> {
            router.toMainPage({
              id:'main'
            })
          }
        }
      ],
      Center:[{
        text:'No TabBar Page'
      }]
    };
    return (
      <View style={styles.container}>
        <Nav navs={navs}/>
        <Text style={styles.title}>Hello
          <Text style={{fontSize:18}}>
            No TabBar Page
          </Text>
        </Text>

        <TouchableOpacity onPress={this.onGoToMainPage.bind(this)} >
          <Text style={styles.subTitle}>Go To Main Page</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.onBack.bind(this)} >
          <Text style={styles.subTitle}>Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.modal.show()} >
          <Text style={styles.subTitle}>Show Modal</Text>
        </TouchableOpacity>


        <ModalView ref={ (view) => this.modal = view } router={ this.props.router }
                 actions={ this.props.actions }/>
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
    backgroundColor: '#ccc'
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)'

  },
  subTitle: {
    marginTop: 10,
    fontSize: 16,
    color: '#000'
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
