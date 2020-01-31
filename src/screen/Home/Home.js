import React, { useCallback, useEffect, useState } from "react";
import {
  stylesheet,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text,
  Title,
  Left,
  Right,
  Body,
  Input,
  Item,
  Footer,
  View,
  FooterTab,
  Badge
} from "native-base";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";

import styles from "./styles";
import Style from "../../Theme/Style";

import NavigationService from "../../components/navigation/AppNavigator";

import TextStyles from "helpers/TextStyles";
import strings from "localization";
import getUser from "selectors/UserSelectors";
import { Card } from "react-native-elements";
import SwipeablePanel from "rn-swipeable-panel";
import { getMenu } from "../../actions/MenuActions";
import { selectMenu } from "../../selectors/MenuSelectors";
import Shimmer from "components/common/Shimmer";
import PTRView from "react-native-pull-to-refresh";
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function Home(props) {
  console.log("propsH", props);
  const dispatch = useDispatch();

  const user = useSelector(state => getUser(state));
  const menu = useSelector(state => selectMenu(state));
  const [load, setLoad] = useState(true);
  const getMenus = useCallback(async () => {
    await dispatch(getMenu(user.UserId));
    setLoad(false);
  }, [dispatch]);
  const getMessage = useCallback(
    () => `${strings.homeMessage}\n\ ${user && user.name}`,
    [user]
  );

  useEffect(() => {
    getMenus();
  }, []);

  useEffect(() => {
    if (user !== null) {
      props.navigation.navigate("App");
    }
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    await dispatch(getMenu(user.UserId));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  return (
    <Container style={Style.bgMain}>
      <Header style={Style.navigation}>
        <StatusBar
          backgroundColor="#00AEEF"
          animated
          barStyle="light-content"
        />
      </Header>
      <Content
        style={Style.layoutInner}
        contentContainerStyle={Style.layoutContent}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.section}>
              <View style={styles.profile}>
                <View>
                  <Text style={styles.profileName}>{getMessage()}</Text>
                </View>

                <View style={Style.actionBarRight}>
                  <Button
                    transparent
                    style={Style.actionBtnRight}
                    onPress={() => props.navigation.navigate("Profile")}
                  >
                    <Icon
                      active
                      name="user"
                      style={Style.actionIcon}
                      type="FontAwesome"
                    />
                  </Button>
                </View>
              </View>
              <ImageBackground
                source={require("../../assets/ic_home/property-bg.png")}
                imageStyle={"cover"}
                style={styles.curve}
              />

              <ScrollView>
                {!load ? (
                  menu.map((data, key) => (
                    <TouchableOpacity
                      key={key}
                      style={styles.item}
                      underlayColor="transparent"
                      onPress={() =>
                        props.navigation.navigate("Detail", {
                          data
                        })
                      }
                    >
                      <View>
                        <View style={styles.itemRow}>
                          <View style={styles.itemOverview}>
                            <View>
                              <Text style={styles.itemLocation}>
                                Approval Name
                              </Text>

                              <Text style={styles.itemPrice}>
                                {data.approval_name}
                              </Text>
                            </View>
                          </View>

                          <View style={styles.itemRight}>
                            <Text style={styles.itemDate}>Total Count</Text>
                            <View style={styles.itemBtn1}>
                              <Text style={styles.itemEntity}>
                                {data.total_doc}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View>
                    <View style={styles.itemShimmer}>
                      <Shimmer style={styles.itemText1} />
                      <Shimmer style={styles.itemText2} />
                    </View>
                    <View style={styles.itemShimmer}>
                      <Shimmer style={styles.itemText1} />
                      <Shimmer style={styles.itemText2} />
                    </View>
                    <View style={styles.itemShimmer}>
                      <Shimmer style={styles.itemText1} />
                      <Shimmer style={styles.itemText2} />
                    </View>
                  </View>
                )}
              </ScrollView>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Content>
    </Container>
  );
}

Home.navigationOptions = {
  title: strings.home,
  header: null
};

export default Home;
