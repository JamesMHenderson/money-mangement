import React, { ErrorInfo } from 'react';
import store from 'app/store';
import { Provider } from 'react-redux';
import Firebase from 'app/firebase/Firebase';
import SidePanel from 'feature/SidePanel/SidePanel';

import styles from './resources/styles/app.module.scss';
import Page from '../page/Page';

class App extends React.Component {
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log('Error', error, info);
  }

  render() {
    return (
      <Provider store={store}>
        <Firebase>
          <div className={styles.container}>
            <Page />
            <SidePanel />
          </div>
        </Firebase>
      </Provider>
    );
  }
}

export default App;
