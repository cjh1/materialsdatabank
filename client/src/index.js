import React from 'react';
import ReactDOM from 'react-dom';
//import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import Cookies from 'universal-cookie';
import _ from 'lodash'

import './index.css';
import configureStore from './store/configureStore'
import rootSaga from './sagas'
import Header from './components/header';
import Footer from './components/footer';
import Main from './components/main';
import SideBar from './components/sidebar';
import DatasetContainer from './containers/dataset'
import Welcome from './components/welcome'
import Search from './components/search'
import { SelectLoginProvider, OauthRedirect } from './components/oauth'
import { authenticate, loadCuratorGroup } from './redux/ducks/girder'
import Deposit from './components/deposit'


const store = configureStore()
store.runSaga(rootSaga)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const style = {
  display: 'flex'
}

const cookies = new Cookies();
const cookieToken = cookies.get('girderToken');
if (!_.isNil(cookieToken)) {
  store.dispatch(authenticate(cookieToken));
}

ReactDOM.render(
    <MuiThemeProvider >
      <Provider store={store}>
        <ConnectedRouter history={store.history}>
          <div>
           <Header />
           <SideBar />
            <div style={style}>
              <Route exact path='/' component={Main}/>
              <Route exact path='/dataset/:id' component={DatasetContainer}/>
              <Route exact path='/welcome' component={Welcome}/>
              <Route exact path='/search' component={Search}/>
              <Route exact path='/deposit' component={Deposit}/>
            </div>
           <Footer />
           <OauthRedirect/>
           <SelectLoginProvider/>
          </div>
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
  );

//registerServiceWorker();
