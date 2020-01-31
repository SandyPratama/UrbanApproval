import React, { useCallback, useEffect, useState } from "react";
import {
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  TextInput,
  FlatList
} from "react-native";
import {
  Container,
  Header,
  Content,
  Text,
  View,
  Button,
  Icon
} from "native-base";
import Shimmer from "../../components/common/Shimmer";

import { useSelector, useDispatch } from "react-redux";

import styles from "./styles";
import Style from "../../Theme/Style";

import getUser from "selectors/UserSelectors";
import { getAttachment } from "../../actions/MenuActions";
import { selectAttachment } from "../../selectors/MenuSelectors";
import numFormat from "../../components/common/numFormat";
import moment from "moment";
import SearchInput, { createFilter } from "react-native-search-filter";
import CompleteFlatList from "react-native-complete-flatlist";

function Attachment(props) {
  console.log("propsA", props);
  const dispatch = useDispatch();
  const {
    doc_no,
    entity_cd,
    document_descs,
    type
  } = props.navigation.state.params.data;
  //console.log(props.navigation.state.params.data);

  const user = useSelector(state => getUser(state));
  const [load, setLoad] = useState(true);
  const attachment = useSelector(state => selectAttachment(state));
  const data = props.navigation.state.params.data;

  const getAttachments = useCallback(async () => {
    await dispatch(getAttachment(entity_cd, doc_no, type));
    setLoad(false);
  }, [dispatch]);

  useEffect(() => {
    getAttachments();
  }, []);

  useEffect(() => {
    if (user !== null) {
      props.navigation.navigate("App");
    }
  });

  return (
    <Container>
      <Header style={Style.navigation}>
        <StatusBar
          backgroundColor="#00aeef"
          animated
          barStyle="light-content"
        />

        <View style={Style.actionBarLeft}></View>
        <View style={Style.actionBarMiddle}>
          <Text style={Style.actionBarText}>Attachment</Text>
        </View>
        <View style={Style.actionBarRight}>
          {/* <Button
            transparent
            style={Style.actionBtnRight}
            onPress={() => props.navigation.navigate("Search")}
          >
            <Icon
              active
              name="search"
              style={Style.actionIcon}
              type="FontAwesome"        
            />
          </Button> */}
        </View>
      </Header>
      <Content
        style={Style.bgMain}
        contentContainerStyle={styles.layoutContent}
      >
        <View>
          <Text>{data.document_descs}</Text>
        </View>
      </Content>
    </Container>
  );
}

Attachment.navigationOptions = {
  headerTransparent: true,
  headerTintColor: "white",
  headerTitleStyle: { color: "white" }
};

export default Attachment;
