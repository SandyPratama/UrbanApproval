import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import { Icon } from "native-base";

import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Button, TextField, ErrorView } from "../../components/common";
import styles from "./styles";

import ShadowStyles from "helpers/ShadowStyles";
import TextStyles from "helpers/TextStyles";
import getUser from "selectors/UserSelectors";
import errorsSelector from "selectors/ErrorSelectors";
import { isLoadingSelector, successSelector } from "selectors/StatusSelectors";
import strings from "localization";
import { reset, actionTypes } from "actions/UserActions";

function Login(props) {
  const [newPass, setNewPass] = useState("");
  const [conPass, setConPass] = useState("");

  const user = useSelector(state => getUser(state));
  const isLoading = useSelector(state =>
    isLoadingSelector([actionTypes.LOGIN], state)
  );
  const errors = useSelector(state =>
    errorsSelector([actionTypes.LOGIN], state)
  );
  const isSuccess = useSelector(state =>
    successSelector([actionTypes.RESETPASS_SUCCESS], state)
  );

  const dispatch = useDispatch();
  const resetUser = useCallback(
    () => dispatch(reset(newPass, conPass, user.user)),
    [newPass, conPass, dispatch]
  );
  const [icon, setIcon] = useState("eye-off");
  const [hidePassword, setHidePassword] = useState(true);

  _changeIcon = () => {
    icon !== "eye-off"
      ? (setIcon("eye-off"), setHidePassword(true))
      : (setIcon("eye"), setHidePassword(false));
  };

  useEffect(() => {
    console.log("isSuccess");
    if (isSuccess) {
      props.navigation.navigate("Auth");
    }
  });

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images1.png")} />
      <View style={[styles.formContainer]}>
        <Text style={TextStyles.fieldTitle}>{"New Password"}</Text>
        <TextField
          placeholder={"New Password"}
          onChangeText={setNewPass}
          value={newPass}
        />
        <Text style={TextStyles.fieldTitle}>{"Confirm Password"}</Text>
        <TextField
          placeholder={"Confirm Password"}
          value={conPass}
          onChangeText={setConPass}
          secureTextEntry={hidePassword}
        />
        <Icon
          name={icon}
          size={20}
          style={styles.eye}
          onPress={() => _changeIcon()}
        />

        <ErrorView errors={errors} />
        <Button
          onPress={resetUser}
          title={isLoading ? strings.loading : "Reset"}
        />
      </View>
    </View>
  );
}

Login.navigationOptions = {
  headerTransparent: true,
  headerTintColor: "black",
  headerTitleStyle: { color: "black" }
};

Login.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Login;
