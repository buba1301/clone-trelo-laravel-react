import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../lib/store';
import Root from './Root.jsx';

const App = () => (
    <Provider store={store}>
        <Root />
    </Provider>
);

export default App;

if (document.getElementById('example')) {
  ReactDOM.render(<App />, document.getElementById('example'));
}
