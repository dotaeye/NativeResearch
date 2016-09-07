import React from 'react';
import ReactNative from 'react-native';
import {Navigator, Platform, BackAndroid} from 'react-native';
import _ from 'lodash';
import Main from '../pages/Main';
import NoTabBarPage from '../pages/NoTabBarPage';
import * as CustomSceneConfigs from '../configs/sceneConfig';


class Router {
  constructor(navigator) {
    this.navigator = navigator;
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', ()=> {
        const routesList = this.navigator.getCurrentRoutes();
        const currentRoute = routesList[routesList.length - 1];
        if (currentRoute.name !== 'home') {
          navigator.pop();
          return true;
        }
        return false;
      });
    }
  }


  push(props = {}, route) {
    let routesList = this.navigator.getCurrentRoutes();
    let nextIndex = routesList[routesList.length - 1].index + 1;
    route.props = props;
    route.index = nextIndex;
    route.sceneConfig = route.sceneConfig ? route.sceneConfig : CustomSceneConfigs.customFloatFromRight;
    route.id = _.uniqueId();
    this.navigator.push(route);
  }


  pop() {
    this.navigator.pop();
  }


  toMainPage(props) {
    this.push(props, {
      component: Main,
      name: 'main',
      sceneConfig: CustomSceneConfigs.customFloatFromRight
    });
  }

  toNoTabBarPage(props) {
    this.push(props, {
      component: NoTabBarPage,
      name: 'notabbarpage',
      sceneConfig: CustomSceneConfigs.customFloatFromRight
    });
  }
}


export default Router;
