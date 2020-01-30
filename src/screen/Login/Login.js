import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar
} from 'react-native';
import { Icon } from 'native-base';

import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {Button , TextField, ErrorView} from '../../components/common';
import styles from './styles';

import ShadowStyles from 'helpers/ShadowStyles';
import TextStyles from 'helpers/TextStyles';
import getUser from 'selectors/UserSelectors';
import errorsSelector from 'selectors/ErrorSelectors';
import { isLoadingSelector } from 'selectors/StatusSelectors';
import strings from 'localization';
import { login, actionTypes } from 'actions/UserActions';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => getUser(state));
  const isLoading = useSelector(state => isLoadingSelector([actionTypes.LOGIN], state));
  const errors = useSelector(state => errorsSelector([actionTypes.LOGIN], state));

  const dispatch = useDispatch();
  const loginUser = useCallback(() => dispatch(login(email, password)), [email, password, dispatch]);
  const passwordChanged = useCallback(value => setPassword(value), []);
  const emailChanged = useCallback(value => setEmail(value), []);
  const [icon, setIcon] = useState("eye-off")
  const [hidePassword, setHidePassword] = useState(true)

  _changeIcon = () => {
    icon !== "eye-off"
      ? (setIcon("eye-off"), setHidePassword(true))
      : (setIcon("eye"), setHidePassword(false))
  }

  useEffect(() => {
    if (user !== null) {
      console.log(user.isResetPass);
      if(user.isResetPass == 1){
        props.navigation.navigate('Reset');
      } else {
        props.navigation.navigate('App');
      }
    }
  });

  return (
    
    <View style={styles.container}>

     <Image source={require('../../assets/images1.png')}/>
      <View style={[styles.formContainer]}>
        <Text style={TextStyles.fieldTitle}>
          {strings.email}
        </Text>
        <TextField
          placeholder={strings.email}
          onChangeText={emailChanged}
          value={email}
        />
        <Text style={TextStyles.fieldTitle}>
          {strings.password}
        </Text>
        <TextField
          placeholder={strings.password}
          value={password}
          onChangeText={passwordChanged}
          secureTextEntry={hidePassword}
        />
                <Icon name={icon} size={20} style={styles.eye} onPress={() => _changeIcon()} />

        <ErrorView errors={errors} />
        <Button
          // onPress={()=>props.navigation.navigate("Reset")}
          
          onPress={loginUser}
          title={isLoading ? strings.loading : strings.login}
        />
      </View>
    </View>
  );
}

Login.navigationOptions = {
  header: null,
};

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Login 
