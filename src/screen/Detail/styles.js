import { StyleSheet, Dimensions } from "react-native";
import Colors from "helpers/Colors";
const { width: dw, height: dh } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BCD4",
    height: 50
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  body: {
    marginTop: 40
  },
  searchInput: {
    padding: 10,
    borderColor: "#CCC",
    borderWidth: 1
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  eventList: {
    marginTop: 20
  },
  eventBox: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row"
  },
  eventDate: {
    flexDirection: "column"
  },
  eventDay: {
    fontSize: 50,
    color: "#0099FF",
    fontWeight: "600"
  },
  eventMonth: {
    fontSize: 16,
    color: "#0099FF",
    fontWeight: "600"
  },
  eventContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10
  },
  description: {
    fontSize: 15,
    color: "#646464"
  },
  eventTime: {
    fontSize: 18,
    color: "#151515"
  },
  userName: {
    fontSize: 16,
    color: "#151515"
  },
  card: {
    backgroundColor: "rgba(56, 172, 236, 1)",
    borderWidth: 0,
    borderRadius: 20,
    height: 150
  },
  item: {
    flex: 1,
    width: "90%",
    marginHorizontal: "5%",
    marginTop: 30,
    backgroundColor: "rgba(18, 18, 18, 0.3)",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd"
  },
  itemShimmer: {
    width: dw * 0.9,
    height: dh * 0.3,
    marginHorizontal: "5%",
    marginTop: 30,
    paddingTop: 10,
    backgroundColor: "rgba(18, 18, 18, 0.3)",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd"
  },
  itemImg: {
    marginBottom: 10,
    width: "100%",
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  itemImgBg: {
    position: "absolute",
    marginBottom: 10,
    width: "100%",
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    opacity: 0.4,
    backgroundColor: "#000"
  },
  itemFavorite: {
    position: "absolute",
    alignSelf: "flex-end",
    color: "#309224",
    marginTop: 10,
    paddingRight: 10,
    fontSize: 24
  },
  itemPrice: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold"
  },
  itemLocation: {
    color: "#999",
    fontSize: 11,
    fontFamily: "Montserrat-Regular",
    marginBottom: 10
  },
  itemRow: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingBottom: 5
  },
  itemRowIcon: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingBottom: 5,
    marginBottom: 15
  },
  itemLeft: {
    flexGrow: 1,
    flexDirection: "row"
  },
  itemRight: {
    flexGrow: 1,
    alignItems: "flex-end",
    paddingVertical: 15
  },

  itemOverview: {
    flexGrow: 1,
    flexDirection: "row",
    paddingVertical: 15
  },
  itemOverviewIcon: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemIcon: {
    color: "#999",
    marginRight: 5,
    fontSize: 24
  },
  itemLeftIcon: {
    color: "#333",
    marginRight: 5,
    fontSize: 24
  },
  itemNo: {
    color: "#666",
    marginRight: 5,
    fontFamily: "Montserrat-SemiBold",
    marginTop: 5,
    fontSize: 14
  },
  itemDate: {
    color: "#f5f5f5",
    fontFamily: "Montserrat-Regular",
    fontSize: 11,
    textAlign: "right"
  },
  itemEntity: {
    color: "#FFFFFF",
    fontFamily: "Montserrat-Regular",
    fontSize: 18, //awalnya 23(diubah donny)
    textAlign: "right",
    position: "absolute",
    right: 0,
    paddingTop: 15
  },
  itemEntityName: {
    color: "#4acfac",
    fontFamily: "Montserrat-Regular",
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 18 //awalnya 16(diubah donny)
  },
  itemText: {
    color: "#333",
    marginRight: 5,
    fontFamily: "Montserrat-SemiBold",
    marginTop: 5,
    fontSize: 12
  },
  itemBtn: {
    flexDirection: "row",
    backgroundColor: "#121212",
    color: "#333",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 10
  },
  itemBtn1: {
    flexDirection: "row",
    backgroundColor: "#000",
    color: "#fff",
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 180,
    marginRight: 10,
    width: 50,
    justifyContent: "center",
    shadowColor: "#262833",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13
  },
  nullList: {
    height: dh - dh / 3,
    justifyContent: "center",
    alignItems: "center"
  },
  itemText1: {
    width: dw * 0.4,
    height: 25,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10
  },
  itemText2: {
    width: dw * 0.3,
    height: 10,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10
  },
  itemText3: {
    width: dw * 0.45,
    height: 10,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10
  },
  itemText4: {
    width: dw * 0.3,
    height: 10,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10
  },
  itemText5: {
    width: dw * 0.45,
    height: 25,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10
  }
});

export default styles;
