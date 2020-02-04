import React, { useCallback, useEffect, useState } from "react";
import {
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  TextInput,
  FlatList,
  Dimensions
} from "react-native";
import {
  Container,
  Header,
  Content,
  Text,
  View,
  List,
  ListItem,
  Button,
  Icon
} from "native-base";
import Shimmer from "../../components/common/Shimmer";

import { useSelector, useDispatch } from "react-redux";

import styles from "./styles";
import Style from "../../Theme/Style";

import getUser from "selectors/UserSelectors";
import { getForm } from "../../actions/MenuActions";
import { selectForm } from "../../selectors/MenuSelectors";
import numFormat from "../../components/common/numFormat";
import moment from "moment";
import SearchInput, { createFilter } from "react-native-search-filter";
import CompleteFlatList from "react-native-complete-flatlist";

const { height, width } = Dimensions.get("window");
function Form(props) {
  console.log("propsF", props);
  const dispatch = useDispatch();
  const {
    doc_no,
    entity_cd,
    document_descs
  } = props.navigation.state.params.data;
  //console.log(props.navigation.state.params.data);

  const user = useSelector(state => getUser(state));
  const [load, setLoad] = useState(true);
  const form = useSelector(state => selectForm(state));
  //console.log("attac", attachment);
  const data = props.navigation.state.params.data;

  const getForms = useCallback(async () => {
    await dispatch(getForm(entity_cd, doc_no));
    setLoad(false);
  }, [dispatch]);

  useEffect(() => {
    getForms();
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
          <Text style={Style.actionBarText}>{"Form".toUpperCase()}</Text>
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
        <ScrollView>
          {form.map((data, key) => (
            <View style={styles.attach}>
              <View
                key={key}
                //   style={[{ width: "100%" }]}
              >
                <Button
                  style={{
                    marginTop: 20,
                    width: "60%",
                    marginHorizontal: 15,
                    marginVertical: 15,
                    backgroundColor: "#34BFB8"
                  }}
                  onPress={() =>
                    props.navigation.navigate("Download", {
                      data
                    })
                  }
                >
                  <Icon
                    active
                    name="file-pdf"
                    style={styles.textWhite}
                    type="MaterialCommunityIcons"
                  />
                  <Text>{data.document_descs}</Text>
                </Button>
              </View>
            </View>
          ))}
        </ScrollView>
      </Content>
    </Container>
  );
}

Form.navigationOptions = {
  headerTransparent: true,
  headerTintColor: "white",
  headerTitleStyle: { color: "white" }
};

export default Form;
