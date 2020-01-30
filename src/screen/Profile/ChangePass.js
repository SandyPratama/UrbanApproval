import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, TouchableOpacity, Image } from "react-native";
import {
    Container,
    Content,
    Icon,
    Text,
    View,
    Input,
    Form,
    Item,
    Label,
    Button,
    Footer
} from "native-base";
import { useSelector, useDispatch } from "react-redux";

// import Button from "../../components/common/Button";
import styles from "./styles";
import { Style } from "../../Theme";

import strings from "localization";
import { logout,changePass } from "actions/UserActions";
import getUser from "selectors/UserSelectors";

export default function ChangePass(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => getUser(state));

    const [newPass, setNewPass] = useState("");
    const [conPass, setConPass] = useState("");
    const [currPass, setCurrPass] = useState("");

    useEffect(() => {
        if (user === null) {
            props.navigation.navigate("Auth");
        }
    });

    const savePassword = () =>{
        if(newPass == conPass){
            dispatch(changePass(user.user,newPass,currPass));
        } else {
            alert("Password Doesn't Match")
        }
    }

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
                            onPress={()=>props.navigation.goBack()}
                        />
                    </TouchableOpacity>

                    <View style={styles.ownerAvatar}>
                        <Image
                            source={{ uri: user.pict }}
                            style={styles.ownerAvatarImg}
                        />
                    </View>
                    <View style={styles.ownerInfo}>
                            <View>
                                <Text style={styles.ownerName}>
                                    {user.name}
                                </Text>
                                <Text style={styles.ownerLocation}>
                                    {user.Group}
                                </Text>
                                <Text style={styles.ownerLocation}>
                                Change Password

                                </Text>
                            </View>
                        </View>
                </View>

                <Form>
                    <Item floatingLabel disabled>
                        <Label style={[Style.textWhite, Style.textMedium]}>
                            Old Password
                        </Label>
                        <Input
                            style={[Style.textWhite, Style.textMedium]}
                            value={currPass} onChangeText={(val)=>setCurrPass(val)}
                        />
                    </Item>

                    <Item floatingLabel disabled>
                        <Label style={[Style.textWhite, Style.textMedium]}>
                            New Password
                        </Label>
                        <Input
                            style={[Style.textWhite, Style.textMedium]}
                            value={newPass} onChangeText={(val)=>setNewPass(val)}
                        />
                    </Item>

                    <Item floatingLabel disabled>
                        <Label style={[Style.textWhite, Style.textMedium]}>
                            Confirm Password
                        </Label>
                        <Input
                            style={[Style.textWhite, Style.textMedium]}
                            value={conPass} onChangeText={(val)=>setConPass(val)}
                        />
                    </Item>

                </Form>
                    <View>
                    <Button style={{backgroundColor:'blue'}} onPress={savePassword}>
                        <Text style={[Style.textWhite]}>Save</Text>
                    </Button>
                    </View>
            </Content>
        </Container>
    );
}

ChangePass.navigationOptions = {
    title: strings.profile,
    header: null
};
