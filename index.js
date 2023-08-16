/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './native/App';
import {name as appName} from './native/app.json';

AppRegistry.registerComponent(appName, () => App);
