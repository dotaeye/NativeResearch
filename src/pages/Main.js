
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons.js';

import Home from './Home';
import About from './About';
import List from './List';
import NewList from './NewList';

class AppMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab:'home'
    };
  }
  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          title="主页"
          selected={this.state.selectedTab === 'home'}
          selectedTitleStyle={styles.selectedTextStyle}
          titleStyle={styles.textStyle}
          renderIcon={() =><Icon name='ios-home' size={26} color='gray' style={styles.icon}/>}
          renderSelectedIcon={() => <Icon name='ios-home' size={26} color='black' style={styles.icon}/>}
          onPress={() => this.setState({ selectedTab: 'home' })}>
          <Home {...this.props}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          title="列表"
          selected={this.state.selectedTab === 'list'}
          selectedTitleStyle={styles.selectedTextStyle}
          titleStyle={styles.textStyle}
          renderIcon={() =><Icon name='ios-list' size={26} color='gray' style={styles.icon}/>}
          renderSelectedIcon={() => <Icon name='ios-list' size={26} color='black' style={styles.icon}/>}
          onPress={() => this.setState({ selectedTab: 'list' })}>
          <List {...this.props}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          title="NewList"
          selected={this.state.selectedTab === 'newlist'}
          selectedTitleStyle={styles.selectedTextStyle}
          titleStyle={styles.textStyle}
          renderIcon={() =><Icon name='ios-list' size={26} color='gray' style={styles.icon}/>}
          renderSelectedIcon={() => <Icon name='ios-list' size={26} color='black' style={styles.icon}/>}
          onPress={() => this.setState({ selectedTab: 'newlist' })}>
          <NewList {...this.props}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          title="关于"
          selected={this.state.selectedTab === 'about'}
          selectedTitleStyle={styles.selectedTextStyle}
          titleStyle={styles.textStyle}
          renderIcon={() =><Icon name='ios-information-circle-outline' size={26} color='gray' style={styles.icon}/>}
          renderSelectedIcon={() => <Icon name='ios-information-circle-outline' size={26} color='black' style={styles.icon}/>}
          onPress={() => this.setState({ selectedTab: 'about' })}>
          <About {...this.props}/>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}
const styles=StyleSheet.create({
  iconStyle:{
    width:26,
    height:26
  },
  textStyle:{
    color:'#999'
  },
  selectedTextStyle:{
    color:'black'
  },
  icon: {
    flex: 1,
    textAlign: 'center'
  }
});
export default AppMain;