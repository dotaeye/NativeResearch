import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, Dimensions, ListView, PixelRatio} from 'react-native';
import CustomRefreshListView from '../components/CustomRefreshListView';
import LoadingActivityIndicatorIOS from '../components/LoadingActivityIndicatorIOS';



export default class NewList extends React.Component {
  constructor() {
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.numRows = 0;
    this.state = {
      dataSource: this.fillRows(),
      recordCount: 20
    };
  }

  onRefresh() {
    return new Promise((resolve) => setTimeout(()=> {
      this.setState({dataSource: this.fillRows(), recordCount: 20});
      resolve(true);
    }, 3000));
    // You can either return a promise or a callback
  }


  fillRows() {
    this.numRows += 20;
    var rows = Array.apply(0, new Array(this.numRows)).map((x, i) => `Row ${i}`);
    return this.ds.cloneWithRows(rows);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <CustomRefreshListView
          dataSource={this.state.dataSource}
          onRefresh={this.onRefresh.bind(this)}
          onEndReached={this.onRefresh.bind(this)}
          loadMore={this.numRows>10}
          renderRow={(rowData) => <View style={{padding:10,borderBottomColor: '#CCCCCC', backgroundColor: 'white',borderBottomWidth: 1}}><Text>{rowData}</Text></View>}
          />
      </View>
    );
  }
};