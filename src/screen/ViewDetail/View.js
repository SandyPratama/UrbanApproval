import React, { useCallback, useEffect, useState } from "react";
import { Modal, Dimensions, Alert } from "react-native";
import {
  Container,
  Content,
  Button,
  Text,
  Header,
  Left,
  Footer,
  View,
  FooterTab,
  List,
  ListItem,
  Tab,
  Tabs,
  Icon,
  Textarea
} from "native-base";

import { useSelector, useDispatch } from "react-redux";

import styles from "./styles";
import style from "../../Theme/Style";

import NavigationService from "../../components/navigation/AppNavigator";

import getUser from "selectors/UserSelectors";
import { getOtorisasi, approve } from "../../actions/MenuActions";
import { selectOtorisasi } from "../../selectors/MenuSelectors";
import numFormat from "../../components/common/numFormat";
import moment from "moment";

state = {};
const status_descs = {
  P: "Pending",
  R: "Revise",
  C: "Cancel",
  A: "Approve"
};

function ViewDetail(props) {
  console.log("propsV", props);
  const dispatch = useDispatch();
  const {
    request_dept_name,
    request_staff_id,
    doc_no,
    amount,
    entity_cd,
    entity_name,
    descs,
    doc_date,
    module: modules,
    document_descs
    // doc_date,
    // approval_user_name,
    // approval_name,
    // approval_status
  } = props.navigation.state.params.data;
  //console.log(props.navigation.state.params.data);

  const user = useSelector(state => getUser(state));
  const otorisasi = useSelector(state => selectOtorisasi(state));
  // console.log("otorisasi", otorisasi);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeType, setActiveType] = useState("");
  const data = props.navigation.state.params.data;

  const [remarks, setRemarks] = useState("");

  const getOtorisasis = useCallback(
    () => dispatch(getOtorisasi(entity_cd, doc_no)),
    [dispatch]
  );

  const getMessage = useCallback(() => `${user && user.name}`, [user]);

  useEffect(() => {
    getOtorisasis();
  }, []);

  useEffect(() => {
    if (user !== null) {
      props.navigation.navigate("App");
    }
  });

  const handleRemarks = val => {
    setRemarks(val);
    data.reason_remarks = val;
  };

  const onPressed = type => {
    setModalVisible(true);
    if (type == "A") {
      setRemarks("");
    }
    setActiveType(type);
  };

  const submit = () => {
    // Alert.alert(
    //   "Caution !",
    //   "Make sure you know what you are doing!",
    //   [
    //     {
    //       text: "Cancel",
    //       style: "cancel"
    //     },
    //     {
    //       text: "OK",
    //       onPress: () => {
    //         dispatch(approve(activeType, data, user.UserId));
    //         setModalVisible(false);
    //         props.navigation.navigate("Home");
    //       }
    //     }
    //   ],
    //   { cancelable: false }
    // );

    if (remarks.trim() === "" && activeType !== "A") {
      Alert.alert(
        "Caution !",
        "Notes field is required!",
        [
          // {
          //   text: "Cancel",
          //   style: "cancel"
          // },
          {
            text: "OK",
            onPress: () => {
              setModalVisible(true);
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      //setRemarks("");
      Alert.alert(
        "Caution !",
        "Make sure you know what you are doing!",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {
              dispatch(approve(activeType, data, user.UserId));
              setModalVisible(false);
              props.navigation.navigate("Home");
            }
          }
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <Container style={styles.bgMain}>
      <Content
        style={style.layoutInner}
        contentContainerStyle={style.layoutContent}
      >
        <View style={styles.owner}>
          <View style={styles.ownerAvatar}>
            {/* <Image
                source={require("@Asset/images/avatar.png")}
                style={styles.ownerAvatarImg}
              /> */}
          </View>
          <View style={styles.ownerInfo}>
            <View>
              <Text style={styles.ownerName}>{getMessage()}</Text>
              <Text style={styles.ownerLocation}>{entity_name}</Text>
              <Text style={styles.ownerLocation}>{request_dept_name}</Text>
            </View>
          </View>
        </View>
        <Tabs tabBarUnderlineStyle={styles.tabBorder}>
          <Tab
            tabStyle={styles.tabGrey}
            textStyle={styles.tabTextActive}
            activeTabStyle={styles.tabGrey}
            activeTextStyle={styles.tabTextActive}
            heading="Informations"
          >
            <List style={styles.infoTab}>
              <ListItem style={styles.infoItem}>
                <View>
                  {/* <Text style={Styles.infoHeader}>{'Address'.toUpperCase()}</Text> */}
                  <Text style={styles.infoDesc}>Doc No : {doc_no}</Text>
                </View>
              </ListItem>
              <ListItem style={styles.infoItem}>
                <View>
                  <Text style={styles.infoDesc}>
                    Date : {moment(doc_date).format("DD MMMM YYYY")}
                  </Text>
                </View>
              </ListItem>
              <ListItem style={styles.infoItem}>
                <View>
                  <Text style={styles.infoDesc}>
                    Staff ID : {request_staff_id}
                  </Text>
                </View>
              </ListItem>
              {/* <ListItem style={styles.infoItem}>
                                <View>
                                    <Text style={styles.infoDesc}>
                                        Dept : {request_dept_name}
                                    </Text>
                                </View>
                            </ListItem> */}
              <ListItem style={styles.infoItem}>
                <View>
                  <Text style={styles.infoDesc}>Description : {descs}</Text>
                </View>
              </ListItem>
              <ListItem style={[styles.infoItem, styles.infoItemLast]}>
                <View>
                  <Text style={styles.infoTotal}>Rp.{numFormat(amount)}</Text>
                </View>
              </ListItem>
              <ListItem style={[styles.infoItem, styles.infoItemLast]}>
                <View style={styles.viewButton}>
                  <Button
                    bordered
                    style={style.buttonGreen}
                    onPress={() =>
                      props.navigation.navigate("Attachment", { data })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        textAlign: "center",
                        alignItems: "center",
                        width: "100%"
                      }}
                    >
                      <Icon
                        active
                        name="file-pdf"
                        style={{ color: "#fff" }}
                        type="MaterialCommunityIcons"
                      />
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 13,
                          paddingLeft: 5,
                          textAlign: "center"
                          // width: "100%"
                        }}
                      >
                        Attachment
                      </Text>
                    </View>
                  </Button>
                  <Button
                    bordered
                    style={style.buttonGreenOuter}
                    onPress={() => props.navigation.navigate("Form", { data })}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        textAlign: "center",
                        alignItems: "center",
                        width: "100%"
                      }}
                    >
                      <Icon
                        active
                        name="file-pdf"
                        style={{ color: "#fff" }}
                        type="MaterialCommunityIcons"
                      />
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 13,
                          paddingLeft: 5,
                          textAlign: "center"
                          // width: "100%"
                        }}
                      >
                        Form
                      </Text>
                    </View>
                  </Button>
                  {/* <Button
                    bordered
                    style={style.button}
                    onPress={() => props.navigation.navigate("Form", { data })}
                  >
                    <Text style={style.textAF}> Form </Text>
                  </Button> */}
                </View>
              </ListItem>
            </List>
          </Tab>

          <Tab
            tabStyle={styles.tabGrey}
            textStyle={styles.tabText}
            activeTabStyle={styles.tabGrey}
            activeTextStyle={styles.tabText}
            heading="Otorisasi"
          >
            {otorisasi.map((data, key) => (
              <List key={key} style={styles.infoTab2}>
                <ListItem style={styles.infoItem}>
                  <View>
                    <View style={styles.itemRow}>
                      <View style={styles.itemOverview}>
                        <View>
                          <Text style={styles.itemLocation}>
                            {data.approval_user_name}
                          </Text>
                          <Text style={styles.itemLocation}>
                            {data.approval_name}
                          </Text>
                          <Text style={styles.itemLocation}>
                            {data.approval_user_date}

                            {/* {moment().format("DD MMMM YYYY")} */}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.itemRight}>
                        <Text style={styles.itemOverview}>Status</Text>
                        <View style={styles.itemBtn1}>
                          <Text style={styles.itemEntity}>
                            {status_descs[data.approval_status]}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </ListItem>
              </List>
            ))}
          </Tab>
        </Tabs>
      </Content>
      <Footer style={style.greyTopLine}>
        <FooterTab style={style.bgBot}>
          <Button bordered style={style.bgBotA} onPress={() => onPressed("R")}>
            <Text style={[style.textBot, { color: "#fff" }]}>Revise</Text>
          </Button>
          <Button style={style.bgYellowDark} onPress={() => onPressed("A")}>
            <Text style={[style.textBot, { color: "#fff" }]}>Approved</Text>
          </Button>
          <Button bordered style={style.bgBotA} onPress={() => onPressed("C")}>
            <Text style={[style.textBot, { color: "#fff" }]}>Reject</Text>
          </Button>
        </FooterTab>
      </Footer>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Container style={style.bgBot}>
          <Header
            style={{
              justifyContent: "flex-start"
            }}
          >
            <Left>
              <Icon
                name="arrow-left"
                style={{ fontSize: 18, color: "#fff" }}
                type="FontAwesome5"
                onPress={() => setModalVisible(false)}
              />
            </Left>
          </Header>
          <Content
            style={style.layoutInner}
            contentContainerStyle={style.layoutContent}
          >
            <List style={styles.infoTab}>
              <ListItem style={styles.infoItem}>
                <View>
                  {/* <Text style={Styles.infoHeader}>{'Address'.toUpperCase()}</Text> */}
                  <Text style={styles.infoDesc}>Doc No : {doc_no}</Text>
                </View>
              </ListItem>
              <ListItem style={styles.infoItem}>
                <View>
                  <Text style={styles.infoDesc}>
                    Staff ID : {request_staff_id}
                  </Text>
                </View>
              </ListItem>

              <ListItem style={styles.infoItem}>
                <View>
                  <Text style={styles.infoDesc}>Description : {descs}</Text>
                </View>
              </ListItem>
              <ListItem style={[styles.infoItem, styles.infoItemLast]}>
                <View>
                  <Text style={styles.infoTotal}>Rp.{numFormat(amount)}</Text>
                </View>
              </ListItem>
              <ListItem style={styles.infoItem}>
                <View>
                  <Text style={styles.infoDesc}>Notes</Text>
                  <Textarea
                    style={[
                      styles.infoDesc,
                      {
                        width: Dimensions.get("window").width * 0.9
                      }
                    ]}
                    value={remarks}
                    onChangeText={handleRemarks}
                    maxLength={255}
                    autoFocus={true}
                    //onRequired={true}
                  />
                  {/* {setRemarks && (
                    <Text style={{ color: "red" }}>{setRemarks}</Text>
                  )} */}
                </View>
              </ListItem>
              <ListItem>
                <View>
                  <Text style={styles.infoLeft}>
                    Characters Left : {remarks.length}/255
                  </Text>
                </View>
              </ListItem>
              {/* {activeType !== "A" ? (
                // <ListItem style={styles.infoItem}>
                //   <View>
                //     <Text style={styles.infoDesc}>Notes</Text>
                //     <Textarea
                //       style={[
                //         styles.infoDesc,
                //         {
                //           width: Dimensions.get("window").width * 0.9
                //         }
                //       ]}
                //       value={remarks}
                //       onChangeText={handleRemarks}
                //       maxLength={100}
                //     />
                //   </View>
                // </ListItem>
              ) : null} */}
            </List>
          </Content>
          <Footer style={style.greyTopLine}>
            <FooterTab style={style.bgBot}>
              <Button style={style.bgBotA} onPress={() => submit("R")}>
                <Text style={[style.textBot, { color: "#fff" }]}>
                  {status_descs[activeType]}
                </Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Modal>
    </Container>
  );
}

ViewDetail.navigationOptions = {
  headerTransparent: true,
  headerStyle: {
    marginTop: 30
  },
  headerTintColor: "white",

  tabBarVisible: false
};

export default ViewDetail;
