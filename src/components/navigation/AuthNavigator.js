import { createStackNavigator } from 'react-navigation';
import Login from '../../screen/Login';
import Reset from '../../screen/Reset'

const AuthStack = createStackNavigator({ Login,Reset });

export default AuthStack;
