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
import { getDetail, getSearch } from "../../actions/MenuActions";
import { selectDetail } from "../../selectors/MenuSelectors";
import numFormat from "../../components/common/numFormat";
import moment from "moment";
import SearchInput, { createFilter } from "react-native-search-filter";
import CompleteFlatList from "react-native-complete-flatlist";

function Detail(props) {
  cell = (data, index) => {
    const item = data.cleanData ? data.cleanData : detail;

    console.log(detail.cleanData);
    console.log(
      "data.cleanData will be not null if search bar is not empty. caution, data without search is not same like data with search due to implement the highlight component. data.cleanData is equal to data"
    );

    console.log("this is index number : " + index);

    console.log(item + " this is original data");

    return (
      <View style={Style.bgMain}>
        <ScrollView>
          {!load ? (
            <TouchableOpacity
              style={styles.item}
              underlayColor="transparent"
              onPress={() => props.navigation.navigate("View", { data })}
            >
              <View style={{ backgroundColor: "#333335" }}>
                <View style={styles.itemRow}>
                  <View style={styles.itemOverview}>
                    <View>
                      <Text style={styles.itemEntityName}>
                        {data.entity_name}
                      </Text>
                      <Text style={styles.itemLocation}>
                        Doc No : {data.doc_no}
                      </Text>
                      <Text style={styles.itemLocation}>
                        Date : {moment(data.doc_date).format("DD MMMM YYYY")}
                      </Text>
                      <Text style={styles.itemLocation}>
                        Staff ID : {data.request_staff_id}
                      </Text>
                      {/* <Text style={styles.itemLocation}>
                        Dept : {data.request_dept_name}
                      </Text> */}
                      <Text style={styles.itemPrice}>
                        Rp.{numFormat(data.amount)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.itemRight}>
                    {/* <Text style={styles.itemDate}>{data.doc_date}</Text> */}
                    <Text style={styles.itemEntity}>{data.entity_cd}</Text>
                  </View>
                </View>
                <View style={styles.itemRowIcon}>
                  <View style={styles.itemLeft}>
                    <View style={styles.itemBtn}>
                      <Text style={styles.itemDate}>{data.descs}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View>
              <View autoRun={true} style={styles.itemShimmer}>
                <Shimmer autoRun={true} style={styles.itemText1} />
                <Shimmer autoRun={true} style={styles.itemText2} />
                <Shimmer autoRun={true} style={styles.itemText3} />
                <Shimmer autoRun={true} style={styles.itemText4} />
                <Shimmer autoRun={true} style={styles.itemText5} />
              </View>
              <View autoRun={true} style={styles.itemShimmer}>
                <Shimmer autoRun={true} style={styles.itemText1} />
                <Shimmer autoRun={true} style={styles.itemText2} />
                <Shimmer autoRun={true} style={styles.itemText3} />
                <Shimmer autoRun={true} style={styles.itemText4} />
                <Shimmer autoRun={true} style={styles.itemText5} />
              </View>
              <View autoRun={true} style={styles.itemShimmer}>
                <Shimmer autoRun={true} style={styles.itemText1} />
                <Shimmer autoRun={true} style={styles.itemText2} />
                <Shimmer autoRun={true} style={styles.itemText3} />
                <Shimmer autoRun={true} style={styles.itemText4} />
                <Shimmer autoRun={true} style={styles.itemText5} />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  const dispatch = useDispatch();
  console.log("propsD", props);
  const {
    approval_name,
    approval_user,
    approval_id
  } = props.navigation.state.params.data;
  //console.log(props.navigation.state.params.data);

  const user = useSelector(state => getUser(state));
  const [load, setLoad] = useState(true);
  const detail = useSelector(state => selectDetail(state));

  const getDetails = useCallback(async () => {
    await dispatch(getDetail(approval_user, approval_id));
    setLoad(false);
  }, [dispatch]);

  useEffect(() => {
    getDetails();
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
          <Text style={Style.actionBarText}>{approval_name.toUpperCase()}</Text>
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
        <CompleteFlatList
          searchKey={[
            "entity_name",
            "doc_no",
            "doc_date",
            "amount",
            "descs",
            "request_staff_name"
          ]}
          // highlightColor="yellow"
          // pullToRefreshCallback={() => {
          //   alert("refreshing");
          // }}
          data={detail}
          ref={c => (this.completeFlatList = c)}
          renderSeparator={null}
          renderItem={this.cell}
          onEndReached={() => console.log("reach end")}
          onEndReachedThreshold={0}
          backgroundStyles="black"
        />
      </Content>
    </Container>
  );
}

Detail.navigationOptions = {
  headerTransparent: true,
  headerTintColor: "white",
  headerTitleStyle: { color: "white" }
};

export default Detail;
