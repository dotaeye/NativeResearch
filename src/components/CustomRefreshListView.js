import React, {Component, PropTypes, cloneElement} from 'react';
import {View, Text, StyleSheet, Dimensions, ListView, PixelRatio, ActivityIndicator } from 'react-native';
import LoadingActivityIndicatorIOS from './LoadingActivityIndicatorIOS'

let FIXED = 'fixed';
let TOP = 'top';
let loadMoreTime = 0;

changeProps = (instance, props) => {
  if (!instance) return;
  Object.keys(props).forEach(function (key) {
    instance.props[key] = props[key];
  });
  instance.forceUpdate()
};

class RefresherListView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshable: false,
      isDragging: false,
      loading: false
    }
    this.lastOffsetY = 0;
  }

  //first render
  onResponderGrant(e) {
    if (!this.top) {
      this.lastOffsetY = 0;
      this.top = this.top || (e.nativeEvent.contentInset && e.nativeEvent.contentInset.top);
    }
    this.startDrag = true;
  }

  onScroll(e) {
    this.props.onScroll && this.props.onScroll();
    const { distanceToRefresh }=this.props;
    let offsetY = e.nativeEvent.contentInset.top + e.nativeEvent.contentOffset.y;
    const { refreshable }=this.state;
    if (this.startDrag && offsetY <= 0) {
      if (this.isLoading || this.lastOffsetY == offsetY) return;
      this.lastOffsetY = offsetY;
      let canRefresh = -this.lastOffsetY > distanceToRefresh;
      if (refreshable != canRefresh) {
        this.setState({
          isDragging: true,
          refreshable: -this.lastOffsetY > distanceToRefresh
        });
      }
      console.log(this.lastOffsetY);
    }
  }

  onResponderRelease() {
    const { refreshable, isDragging }=this.state;
    this.startDrag = false;
    if (isDragging) {
      if (refreshable) {
        this.setState({
          loading: true,
          isDragging: false
        });
        this._doLoading();
      } else {
        this.setState({
          isDragging: false
        })
      }

    }
  }

  _doLoading() {
    const { loading, refreshable }=this.state;
    if (!refreshable || loading) return;

    this.handleRefresh()
  }

  getScrollResponder() {
    return this.refs.listview.getScrollResponder();
  }

  setNativeProps(props) {
    this.refs.listview.setNativeProps(props)
  }

  handleRefresh() {
    var loadingPromise = this.props.onRefresh();
    var delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
    this.updateUIThreshold(-this.props.distanceToRefresh);
    Promise.all([
      loadingPromise,
      delay(this.props.minTime)
    ])
      .then(() => {
        this.setState({
          loading: false,
          refreshable: false
        });
        this._hideLoading();
      })
  }


  requestAnimationFrame() {
    this.refs.listview.requestAnimationFrame(...arguments);
  }

  _hideLoading() {
    let listviewscroll = this.getScrollResponder();

    setTimeout(() => {
      this.updateUIThreshold(0);
    }, 300);

    setTimeout(() => {
      this.requestAnimationFrame(() => {
        if (!this.scrolling && !listviewscroll.scrollResponderIsAnimating() && this.lastOffsetY < this.top) {
          listviewscroll.scrollTo({x: -this.top})
        }
      });
    }, 0)
  }

  updateUIThreshold(threshold) {
    let listview = this.refs.listview;
    let listviewscroll = listview.getScrollResponder();
    this.requestAnimationFrame(() => {
      listviewscroll.setNativeProps({style: {contentInset: {top: threshold}}});
      listviewscroll._scrollViewRef.setNativeProps({style: {paddingTop: threshold}});
      listview.setNativeProps({style: {top: -threshold, bottom: 0}})
    });
  }

  onEndReached() {
    const { onEndReached, loadMore }=this.props;
    const time = Date.parse(new Date()) / 1000;
    if (loadMore && time - loadMoreTime > 1) {
      onEndReached();
      loadMoreTime = Date.parse(new Date()) / 1000;
    }
  }

  renderHeader() {
    const { distanceToRefresh }=this.props;
    const {
      refreshable,
      isDragging,
      loading,
      } = this.state;
    let distance = isDragging ? -this.lastOffsetY : (loading ? distanceToRefresh : 0);
    return (
      <View style={{height:distanceToRefresh, marginTop:distance-distanceToRefresh}}>
        <View style={[styles.container,styles.centering]}>
          <Text>{loading ? '加载中' : (refreshable ? '松开刷新' : (isDragging ? '下拉刷新' : ''))}</Text>
        </View>
      </View>);
  }

  renderFooter() {
    const { loadMore } = this.props;
    if (loadMore) {
      return (
        <View
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'center',
            alignItems: 'center', padding: 5 }}
          >
          <ActivityIndicator size="small" color="#3e9ce9"/>
          <Text style={{ textAlign: 'center', fontSize: 16, marginLeft: 10 }}>
            数据加载中……
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    console.log('render--count')
    let Component = this.props.component;
    return (<View style={[{flex:1}, this.props.style]}>
      <Component {...this.props}
        style={this.props.listStyle}
        onResponderRelease={this.onResponderRelease.bind(this)}
        onResponderGrant={this.onResponderGrant.bind(this)}
        renderHeader={this.renderHeader.bind(this)}
        onEndReached={this.onEndReached.bind(this)}
        onEndReachedThreshold={10}
        renderFooter={this.renderFooter.bind(this)}
        ref="listview"
        onScroll={this.onScroll.bind(this)}
        />
    </View>);
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});


RefresherListView.defaultProps = {
  component: ListView,
  distanceToRefresh: 30,
  minTime: 320,
  loadMore: false,
  indicator: <LoadingActivityIndicatorIOS />,
  listStyle: styles.list
};

RefresherListView.DataSource = ListView.DataSource;

export default RefresherListView
