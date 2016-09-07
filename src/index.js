import React,{
  Component
  } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import Navigation from './pages/Navigation';

const store = createStore(reducers);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    );
  }
}


export default App;
