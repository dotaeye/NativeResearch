import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet, Animated, PanResponder,ActivityIndicator, Dimensions, ListView, PixelRatio} from 'react-native';
import {Motion, spring} from 'react-motion';

const {height, width} = Dimensions.get('window');

export default class List extends Component {
  constructor() {
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.numRows = 0;
    this.state = {
      dataSource: this.fillRows()
    };
  }

  componentWillMount() {
    const self = this;
    this._panResponder = PanResponder.create({

      onMoveShouldSetPanResponder: ()=>true,

      onPanResponderGrant: (evt, gestureState) => {

        self.startX = evt.nativeEvent.pageX;
        self.deltaY = 0;
        self.startY = evt.nativeEvent.pageY;
        self.lastY = evt.nativeEvent.pageY;
        self.isSwiping = undefined;
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y}0 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {

        const { distanceToRefresh, resistance }=this.props;

        if (self.isSwiping === undefined) {
          self.isSwiping = Math.abs(self.startX - evt.nativeEvent.pageX) > Math.abs(self.startY - evt.nativeEvent.pageY);
        }
        if (self.isSwiping) {
          return;
        }
        //not allow scroll up
        if (evt.nativeEvent.pageY < self.startY) {
          return;
        }
        self.deltaY = self.deltaY + (evt.nativeEvent.pageY - self.lastY) * resistance;

        self.lastY = evt.nativeEvent.pageY;

        self.setState({
          isDragging: true,
          refreshable: self.deltaY > distanceToRefresh
        });
        // 最近一次的移动距离为gestureState.move{X,Y}

        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },

      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        if (self.isSwiping) {
          return;
        }
        const { distanceToRefresh }=self.props;
        // Quick movement
        if (Math.abs(self.deltaY) > distanceToRefresh) {
          self.setState({
              loading: true
            }
          );
          self.handleRefresh();
        }
        self.setState({
          isDragging: false
        });
      }

    })
  }

  fillRows() {
    this.numRows += 5;
    var rows = Array.apply(0, new Array(this.numRows)).map((x, i) => `Row ${i}`);
    return this.ds.cloneWithRows(rows);
  }

  handleRefresh() {
    let loadingPromise = this.onRefresh();
    // Once actual loading is complete, reset pull to refresh
    loadingPromise.then(this.onRefreshEnd.bind(this));
  }

  onRefreshEnd() {
    console.log('onRefreshEnd');
    this.setState({
      loading: false,
      refreshable: false
    });
  }

  onRefresh() {
    const self = this;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        self.setState({dataSource: self.fillRows()})
      }, 2500);
    });
  }


  _renderHeader(interpolatedStyle) {

    const {
      refreshable,
      isDragging,
      loading,
      } = this.state;

    const translate = interpolatedStyle.translate;

    return (
      <View style={{height:30, marginTop:translate-30}}>
        <View style={[styles.container,styles.centering]}>
          <Text>{loading ? '加载中' : (refreshable ? '松开刷新' : (isDragging ? '下拉刷新' : ''))}</Text>
        </View>
      </View>
    );
  }

  _renderContent(interpolatedStyle) {

    const translate = interpolatedStyle.translate;
    console.log('list-view-refresh');
    return (
      <View style={[styles.list,{paddingTop:translate}]}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <View style={styles.row}><Text>{rowData}</Text></View>}
          />
      </View>
    );
  }

  render() {

    const { distanceToRefresh } =this.props;
    const {
      isDragging,
      loading,
      } = this.state;
    let translate = this.deltaY || 0;
    if (translate > distanceToRefresh) {
      translate = distanceToRefresh + (translate - distanceToRefresh) / 3
    }
    const motionStyle = isDragging ? {
      translate: translate
    } : (loading ? {
      translate: spring(30, {
        stiffness: 300,
        damping: 30
      })
    } : {
      translate: spring(0, {
        stiffness: 300,
        damping: 30
      })
    });
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <Motion style={motionStyle}>
          {interpolatedStyle => this._renderHeader(interpolatedStyle)}
        </Motion>
        <Motion style={motionStyle}>
          {interpolatedStyle => this._renderContent(interpolatedStyle)}
        </Motion>
      </View>
    );
  }
}

List.defaultProps = {
  distanceToRefresh: 30,
  resistance: 0.5
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    paddingTop: 0
  },

  row: {
    padding: 10,
    flex: 1,
    borderTopColor: '#CCCCCC',
    backgroundColor: 'white',
    borderTopWidth: 1 / PixelRatio.get(),
    marginBottom: -1,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
});
