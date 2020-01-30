import React, { Component } from 'react';
import { View, Text, Image, Platform, StatusBar, ScrollView } from 'react-native';
import CompleteFlatList from 'react-native-complete-flatlist';

{/* <ScrollView>
{!load ? (
  detail.map((data, key) => ( */}
    // <TouchableOpacity
    //   key={key}
    //   style={styles.item}
    //   underlayColor="transparent"
    //   onPress={() => props.navigation.navigate("View", { data })}
    // >
    //   <View>
    //     <View style={styles.itemRow}>
    //       <View style={styles.itemOverview}>
    //         <View>
    //           <Text style={styles.itemEntityName}>
    //             {data.entity_name}
    //           </Text>
    //           <Text style={styles.itemLocation}>
    //             Doc No : {data.doc_no}
    //           </Text>
    //           <Text style={styles.itemLocation}>
    //             Date : {moment(data.doc_date).format("DD MMMM YYYY")}
    //           </Text>
    //           <Text style={styles.itemLocation}>
    //             Staff ID : {data.request_staff_id}
    //           </Text>
    //           <Text style={styles.itemLocation}>
    //             Dept : {data.request_dept_name}
    //           </Text>
    //           <Text style={styles.itemPrice}>
    //             Rp.{numFormat(data.amount)}
    //           </Text>
    //         </View>
    //       </View>
    //       <View style={styles.itemRight}>
    //         {/* <Text style={styles.itemDate}>{data.doc_date}</Text> */}
    //         <Text style={styles.itemEntity}>{data.entity_cd}</Text>
    //       </View>
    //     </View>
    //     <View style={styles.itemRowIcon}>
    //       <View style={styles.itemLeft}>
    //         <View style={styles.itemBtn}>
    //           <Text style={styles.itemDate}>{data.descs}</Text>
    //         </View>
    //       </View>
    //     </View>
    //   </View>
    // </TouchableOpacity>
//   ))
// ) : (
  // <View>
  //   <View autoRun={true} style={styles.itemShimmer}>
  //     <Shimmer autoRun={true} style={styles.itemText1} />
  //     <Shimmer autoRun={true} style={styles.itemText2} />
  //     <Shimmer autoRun={true} style={styles.itemText3} />
  //     <Shimmer autoRun={true} style={styles.itemText4} />
  //     <Shimmer autoRun={true} style={styles.itemText5} />
  //   </View>
  //   <View autoRun={true} style={styles.itemShimmer}>
  //     <Shimmer autoRun={true} style={styles.itemText1} />
  //     <Shimmer autoRun={true} style={styles.itemText2} />
  //     <Shimmer autoRun={true} style={styles.itemText3} />
  //     <Shimmer autoRun={true} style={styles.itemText4} />
  //     <Shimmer autoRun={true} style={styles.itemText5} />
  //   </View>
  //   <View autoRun={true} style={styles.itemShimmer}>
  //     <Shimmer autoRun={true} style={styles.itemText1} />
  //     <Shimmer autoRun={true} style={styles.itemText2} />
  //     <Shimmer autoRun={true} style={styles.itemText3} />
  //     <Shimmer autoRun={true} style={styles.itemText4} />
  //     <Shimmer autoRun={true} style={styles.itemText5} />
  //   </View>
  // </View>
// )}
// </ScrollView>

const data = [
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Syah', status: 'Active', time: '9:14 PM', date: '1 Dec 2018' },
  { name: 'Izzat', status: 'Active', time: '8:15 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  { name: 'Fattah', status: 'Active', time: '8:10 PM', date: '1 Jan 2018' },
  {
    name: 'Muhyiddeen',
    status: 'Blocked',
    time: '10:10 PM',
    date: '9 Feb 2018',
  },
];

class Search extends Component {
  cell = (data,index) => {
    const item = data.cleanData ? data.cleanData : data

    console.log(data.cleanData)
    console.log('data.cleanData will be not null if search bar is not empty. caution, data without search is not same like data with search due to implement the highlight component. data.cleanData is equal to data')

    console.log('this is index number : '+index)

    console.log(item+' this is original data')

    return <Text>{data.name}</Text>;
  }

  render() {
    const { navigation } = this.props;
    return (
      <CompleteFlatList
      searchKey={['name', 'status', 'time', 'date']}
      highlightColor="yellow"
      pullToRefreshCallback={() => {
        alert('refreshing');
      }}
      data={data}
      ref={c => this.completeFlatList = c}
      renderSeparator={null}
      renderItem={this.cell}
      onEndReached={() => console.log("reach end")}
      onEndReachedThreshold={0}
    />
    );
  }
  
}


export default Search;