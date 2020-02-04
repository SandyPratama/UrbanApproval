import React, { useCallback, useEffect, useState } from "react";
import {
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  FlatList,
  PermissionsAndroid
} from "react-native";
import {
  Container,
  Header,
  Content,
  Text,
  View,
  Icon,
  List,
  ListItem,
  Button
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

import RNFetchBlob from "rn-fetch-blob";
import Pdf from "react-native-pdf";

function Download(props) {
  console.log("propsA", props);
  const dispatch = useDispatch();
  const {
    doc_no,
    entity_cd,
    document_descs,
    url_attachment,
    type
  } = props.navigation.state.params.data;
  //console.log(props.navigation.state.params.data);
  const source = {
    uri: props.navigation.state.params.data.url_attachment,
    cache: true
  };
  const user = useSelector(state => getUser(state));
  const [load, setLoad] = useState(true);
  const attachment = useSelector(state => selectAttachment(state));
  console.log("attac", attachment);
  const data = props.navigation.state.params.data;

  const getAttachments = useCallback(async () => {
    await dispatch(getAttachment(entity_cd, doc_no));
    setLoad(false);
  }, [dispatch]);

  useEffect(() => {
    getAttachments();
    requestStorage();
  }, []);

  useEffect(() => {
    if (user !== null) {
      props.navigation.navigate("App");
    }
  });

  const downloadFile = () => {
    const data = props.navigation.state.params.data;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        path:
          RNFetchBlob.fs.dirs.SDCardDir +
          "/downloads/" +
          data.document_descs +
          ".pdf",
        useDownloadManager: true,
        notification: true,
        overwrite: true,
        description: "downloading content...",
        mime: "application/pdf",
        mediaScannable: true
      }
    })
      .fetch("GET", data.url_attachment)
      .then(res => {
        console.log("The file saved to ", res.path());
        alert("Saved at : " + res.path());
      });
  };

  const requestStorage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "IFCA S + want to acces your storage",
          message: "Please be careful with agreement permissions ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

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
          <Text style={Style.actionBarText}>{"Download".toUpperCase()}</Text>
        </View>
        <View style={Style.actionBarRight}>
          <Button transparent style={Style.actionBarBtn} onPress={downloadFile}>
            <Icon
              active
              name="download"
              style={Style.textWhite}
              type="MaterialCommunityIcons"
            />
          </Button>
        </View>
      </Header>

      <Content
        style={Style.bgMain}
        contentContainerStyle={styles.layoutContent}
      >
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, pageCount) => {
            console.log("ok");
          }}
          onError={error => {
            console.log(error);
          }}
          style={styles.pdf}
        />
      </Content>
    </Container>
  );
}

Download.navigationOptions = {
  headerTransparent: true,
  headerTintColor: "white",
  headerTitleStyle: { color: "white" }
};

export default Download;
