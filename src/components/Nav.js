import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('window');


class Nav extends Component {

  _renderNavContent() {

    let navs = this.props.navs || {};

    return ['Left', 'Center', 'Right'].map((position)=> {
      let navPart = navs[position];
      if (navPart && navPart.length > 0) {
        return (
          <View
            key={position}
            style={{flex: position=='Center'?2:1}}>
            <View style={[styles.textWrapper, styles['textWrapper'+position]]}>
              {navPart.map((nav, navIndex)=> {
                return nav.icon ?
                  (<TouchableOpacity key={navIndex} onPress={nav.onPress}>
                    <Icon name={nav.icon} size={24} style={[styles.navItem,styles.navIcon,styles['nav'+position]]}/>
                  </TouchableOpacity>
                  )
                  : (<Text style={[styles.navItem,styles['nav'+position]]} key={navIndex}>
                  {nav.text}
                </Text>)
              })}
            </View>
          </View>
        )
      }
      return (
        <View  key={position} style={[styles.textWrapper, styles['textWrapper'+position]]}>

        </View>
      )
    })
  }


  render() {
    return (
      <View
        ref={view=>this.nav=view}
        style={styles.nav}>
        {this._renderNavContent()}
      </View>
    )
  }
}


const navHeight = 40;
const statusBarHeight = Platform.OS === 'ios' ? 16 : 0;


const styles = StyleSheet.create({
  nav: {
    height: navHeight + statusBarHeight,
    width: width,
    borderBottomColor: 'rgba(0,0,0,0.03)',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: statusBarHeight,
    paddingLeft: 15,
    paddingRight: 15
  },
  navItem: {
    color: '#000'
  },
  navIcon: {
    width: 40
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textWrapperRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  textWrapperLeft: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  textWrapperCenter: {
    flex: 2,
  },
  navLeft: {},
  navRight: {
    textAlign: 'right'
  },
  navCenter: {
    color: 'rgba(241,196,15,0.9)',
  }
});

Nav.navHeight = navHeight;

export default Nav;
