import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';

const DonationHistory = props => {
  let date = new Date(props.item.createdAt);

  date = date.toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // console.log("ewfrwe",date);
  const [showd, setshowd] = useState(false);

  return (
    <View style={styles.screen}>
      <View style={styles.postsummary}>
        <Text style={styles.amount}>
          {Number(props.item.Totalamount).toFixed(2)}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.titlecontainer}>
        <Text style={styles.title}>{props.item.Fundpost?.title}</Text>
      </View>

      <Button
        title={'Show Transaction Details'}
        onPress={() => setshowd(!showd)}
      />
      {/*<Button
        title={'Show Post'}
        onPress={() => {
          props.navigation.navigate('FundDetails', {
            fundpostid: props.item.Fundpost._id,
            name: props.item.Fundpost.title,
          });
        }}
      />*/}
      {showd && (
        <View style={styles.tdetails}>
          <Text>Transaction_Id:-{props.item._id} </Text>
          <Text
          style={{ textDecorationLine:'underline' }}
            onPress={() => {
              props.navigation.navigate('FundDetails', {
                fundpostid: props.item.Fundpost._id,
                name: props.item.Fundpost.title,
              });
            }}>
            Post_Id :- {props.item.Fundpost._id}
          </Text>
        </View>
      )}
    </View>
  );
};

export default DonationHistory;

const styles = StyleSheet.create({
  screen: {
    
    // shadowColor:'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  postsummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  amount: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: '#888',
  },
  title: {
    fontSize: 16,
  },
  titlecontainer: {
    marginTop: 10,
  },
  tdetails: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 6,
    padding: 10,
  },
});
