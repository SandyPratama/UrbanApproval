import React, { useCallback, useEffect } from "react";
import { StatusBar, TouchableOpacity, Image, Alert } from "react-native";
import {
    Container,
    Content,
    Icon,
    Text,
    Right,
    View,
    List,
    ListItem
} from "native-base";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../components/common/Button";
import styles from "./styles";
import Style from "../../Theme/Style";

import strings from "localization";
import TextStyles from "helpers/TextStyles";
import { logout } from "actions/UserActions";
import getUser from "selectors/UserSelectors";

function Profile(props) {
    const user = useSelector(state => getUser(state));
    const dispatch = useDispatch();
    const logoutUser = useCallback(() => {
        Alert.alert(
            "Are you sure ?",
            "Press OK if you want to logging out !",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => dispatch(logout()) }
            ],
            { cancelable: false }
        );
    }, [dispatch]);

    useEffect(() => {
        if (user === null) {
            props.navigation.navigate("Auth");
        }
    });

    return (
        <Container style={Style.bgMain}>
            <StatusBar
                backgroundColor="rgba(0,0,0,0)"
                animated
                barStyle="dark-content"
            />

            <Content
                style={Style.layoutInner}
                contentContainerStyle={Style.layoutContent}
            >
                <View style={styles.owner}>
                <TouchableOpacity
                        style={styles.btnBack}
                       
                    >
                        <Icon
                            name="ios-arrow-dropleft"
                            style={{ fontSize: 30, color: "#fff" }}
                            onPress={()=>props.navigation.navigate("Home")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnSetting}
                        onPress={() => props.navigation.navigate("Setting")}
                    >
                        <Image
                            source={require("@Asset/icon/settings.png")}
                            style={{ width: 25, height: 25 }}
                        />
                        <Text>{"  SETTINGS"}</Text>
                    </TouchableOpacity>

                    {user && (
                        <View style={styles.ownerAvatar}>
                            <Image
                                source={{ uri: user.pict }}
                                style={styles.ownerAvatarImg}
                            />
                        </View>
                    )}

                    {user && (
                        <View style={styles.ownerInfo}>
                            <View>
                                <Text style={styles.ownerName}>
                                    {user.name}
                                </Text>
                                <Text style={styles.ownerLocation}>
                                    {user.Group}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                <List style={styles.infoTab}>
                    {/* <ListItem style={styles.infoItem} onPress={()=>Actions.profile({onBack:()=>this.receiveProps()}) }>
                            <Image source={require('@Asset/icon/settings.png')} style={styles.infoIcon} />
                            <View style={{alignSelf:'center'}} style={{alignSelf:'center'}}>
                                <Text style={styles.infoHeader}>{'Settings'.toUpperCase()}</Text>
                                <Text style={styles.infoDesc}>{'Account Setting & Change Password'}</Text>
                            </View>

                            <Right style={{position:'absolute',right:10}}>
                                <Icon name="ios-arrow-dropright" style={{fontSize: 30,}} />
                            </Right>
                        </ListItem> */}
                    {/* <ListItem style={styles.infoItem} onPress={()=>Actions.menu() }>
                            <Image source={require('@Asset/icon/menu.png')} style={styles.infoIcon} />
                            <View style={{alignSelf:'center'}}>
                                <Text style={styles.infoHeader}>{'Menu'.toUpperCase()}</Text>
                                <Text style={styles.infoDesc}>{'Shortcut Menu'}</Text>
                            </View>

                            <Right style={{position:'absolute',right:10}}>
                                <Icon name="ios-arrow-dropright" style={{fontSize: 30,}} />
                            </Right>
                        </ListItem> */}

                    <ListItem
                        style={styles.infoItem}
                        onPress={() => props.navigation.navigate("ChangePass")}
                    >
                        <View style={styles.infoIcon} />
                        <View style={{ alignSelf: "center" }}>
                            <Text style={styles.infoHeader}>
                                {"Change Password".toUpperCase()}
                            </Text>
                            <Text style={styles.infoDesc}>
                                {
                                    "Recommend features, report problems, or send feedback"
                                }
                            </Text>
                        </View>

                        <Right style={{ position: "absolute", right: 10 }}>
                            <Icon
                                name="ios-arrow-dropright"
                                style={{ fontSize: 30 }}
                            />
                        </Right>
                    </ListItem>
                    <ListItem style={styles.infoItem}>
                        <Image
                            source={require("@Asset/icon/helpcenter.png")}
                            style={styles.infoIcon}
                        />
                        <View style={{ alignSelf: "center" }}>
                            <Text style={styles.infoHeader}>
                                {"Help Center".toUpperCase()}
                            </Text>
                            <Text style={styles.infoDesc}>
                                {
                                    "Recommend features, report problems, or send feedback"
                                }
                            </Text>
                        </View>

                        <Right style={{ position: "absolute", right: 10 }}>
                            <Icon
                                name="ios-arrow-dropright"
                                style={{ fontSize: 30 }}
                            />
                        </Right>
                    </ListItem>
                    <ListItem style={[styles.infoItem]}>
                        <Image
                            source={require("@Asset/icon/rate_us.png")}
                            style={styles.infoIcon}
                        />
                        <View style={{ alignSelf: "center" }}>
                            <Text style={styles.infoHeader}>
                                {"Rate Us!".toUpperCase()}
                            </Text>
                            <Text style={styles.infoDesc}>
                                {"Rate and review application on App Store"}
                            </Text>
                        </View>

                        <Right style={{ position: "absolute", right: 10 }}>
                            <Icon
                                name="ios-arrow-dropright"
                                style={{ fontSize: 30 }}
                            />
                        </Right>
                    </ListItem>
                    <ListItem style={[styles.infoItem, styles.infoItemLast]}>
                        <Image
                            source={require("@Asset/icon/aboutus.png")}
                            style={styles.infoIcon}
                        />
                        <View style={{ alignSelf: "center" }}>
                            <Text style={styles.infoHeader}>
                                {"About Us".toUpperCase()}
                            </Text>
                            <Text style={styles.infoDesc}>
                                {"Description about us"}
                            </Text>
                        </View>

                        <Right style={{ position: "absolute", right: 10 }}>
                            <Icon
                                name="ios-arrow-dropright"
                                style={{ fontSize: 30 }}
                            />
                        </Right>
                    </ListItem>
                    <ListItem
                        style={[styles.infoItem, styles.infoItemLast]}
                        onPress={logoutUser}
                    >
                        <View style={styles.infoIcon} />
                        <View style={{ alignSelf: "center" }}>
                            <Text style={styles.infoHeader}>
                                {"Logout".toUpperCase()}
                            </Text>
                        </View>

                        <Right style={{ position: "absolute", right: 10 }}>
                            <Icon
                                name="ios-arrow-dropright"
                                style={{ fontSize: 30 }}
                            />
                        </Right>
                    </ListItem>
                </List>
            </Content>
        </Container>
    );
}

Profile.navigationOptions = {
    title: strings.profile,
    header: null
};

Profile.propTypes = {
    navigation: PropTypes.object.isRequired
};

export default Profile;
