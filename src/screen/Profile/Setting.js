import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, TouchableOpacity, Image } from "react-native";
import {
    Container,
    Content,
    Icon,
    Text,
    Right,
    View,
    List,
    ListItem,
    Input,
    Form,
    Item,
    Label,
    Picker
} from "native-base";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../components/common/Button";
import styles from "./styles";
import { Style, Colors } from "../../Theme";

import strings from "localization";
import TextStyles from "helpers/TextStyles";
import { saveProfile } from "actions/UserActions";
import getUser from "selectors/UserSelectors";

export default function Setting(props) {
    const user = useSelector(state => getUser(state));
    const dispatch = useDispatch();

    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.handphone);

    useEffect(() => {
        if (user === null) {
            props.navigation.navigate("Auth");
        }
    });

    const saveProfiles = () =>{
        const data = {
            email : user.user,
            name : name,
            phone : phone,
            gender : "Male",
        }
        dispatch(saveProfile(data));
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
                        // onPress={() =>
                        //     Actions.profile({
                        //         onBack: () => this.receiveProps()
                        //     })
                        // }
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
                </View>

                <Form>
                    <Item>
                        <Label style={[Style.textWhite, Style.textMedium]}>
                            User Profile
                        </Label>
                    </Item>
                    <Item floatingLabel disabled>
                        <Label style={[Style.textWhite, Style.textMedium]}>
                            Email
                        </Label>
                        <Input
                            style={[Style.textWhite, Style.textMedium]}
                            value={user.user}
                            disabled
                        />
                    </Item>

                    <Item floatingLabel disabled>
                        <Label style={[Style.textWhite, Style.textMedium]}>
                            Group
                        </Label>
                        <Input
                            style={[Style.textWhite, Style.textMedium]}
                            value={user.Group}
                            disabled
                        />
                    </Item>

                    <Item floatingLabel>
                        <Label style={[Style.textWhite, Style.textMedium]}>
                            Nama
                        </Label>
                        <Input
                            style={[Style.textWhite, Style.textMedium]}
                            value={name}
                            onChangeText={val => setName(val)}
                        />
                    </Item>

                    <Item floatingLabel last>
                        <Label style={[Style.textWhite, Style.textMedium]}>
                            Handphone
                        </Label>
                        <Input
                            style={[Style.textWhite, Style.textMedium]}
                            value={phone}
                            onChangeText={val => setPhone(val)}
                        />
                    </Item>

                    <Button style={{backgroundColor:'blue'}} onPress={saveProfiles}>
                        <Text style={[Style.textWhite]}>Save</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    );
}

Setting.navigationOptions = {
    title: strings.profile,
    header: null
};
