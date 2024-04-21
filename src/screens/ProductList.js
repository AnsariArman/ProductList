import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

const ProductList = ({navigation}) => {
  const focused = useIsFocused();
  const [isInternetAvailable, setIsInternetAvailable] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [data, setData] = useState(null);
  const [counts, setCounts] = useState({});
  const [visibleStates, setVisibleStates] = useState([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsInternetAvailable(state.isConnected);
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      try {
        // Check internet connection
        if (isInternetAvailable) {
          // If internet is available, fetch data from API using Axios
          const response = await axios.get('https://dummyjson.com/products');
          const jsonData = response.data;
          setData(jsonData);
          // Save data to local storage
          await AsyncStorage.setItem('apiData', JSON.stringify(jsonData));
          setIsLoader(false);
        } else {
          // If no internet, try to fetch from local storage
          const localData = await AsyncStorage.getItem('apiData');
          //  console.log('Local data:', localData);
          if (localData !== null) {
            setData(JSON.parse(localData));
            setIsLoader(false);
          } else {
            setIsLoader(false);

            console.log('No internet connection and no local data available.');
          }
        }
      } catch (error) {
        setIsLoader(false);

        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [focused, isInternetAvailable]);

  const incrementCount = index => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [index]: (prevCounts[index] || 0) + 1,
    }));
  };

  const decrementCount = index => {
    if (counts[index] > 0) {
      setCounts(prevCounts => ({
        ...prevCounts,
        [index]: prevCounts[index] - 1,
      }));
    }
  };
  const toggleVisibility = index => {
    setVisibleStates(prevStates => {
      const updatedStates = [...prevStates];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.arrow}
            source={require('../Image/left-arrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerName}>Product List</Text>
        <View></View>
      </View>
      {isLoader ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{flex: 1, justifyContent: 'center', marginTop: -20}}
        />
      ) : (
        <FlatList
          data={data?.products}
          numColumns={2}
          contentContainerStyle={{alignItems: 'center'}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View style={styles.productCard}>
                <Image
                  resizeMode="cover"
                  style={styles.heart}
                  source={require('../Image/love.png')}
                />

                <Image
                  resizeMode="cover"
                  style={styles.productImg}
                  source={{uri: item.thumbnail}}
                />
                <Text numberOfLines={1} style={styles.productName}>
                  {item.title}
                </Text>
                <Text style={styles.productPrice}>Price: ₹{item.price}</Text>
                <Text style={styles.productRating}>
                  Rating: {Math.floor(item.rating * 10) / 10}
                </Text>
                {!visibleStates[index] ? (
                  <TouchableOpacity
                    onPress={() => toggleVisibility(index)}
                    style={styles.Button}>
                    <Text style={styles.txt}>ADD</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.buttonCard}>
                    <TouchableOpacity
                    activeOpacity={0.5}
                      onPress={() => decrementCount(index)}
                      style={styles.minusButton}>
                      <Text style={styles.minusTxt}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.count}>{counts[index] || 0}</Text>
                    <TouchableOpacity
                    activeOpacity={0.5}

                      onPress={() => incrementCount(index)}
                      style={styles.plusButton}>
                      <Text style={styles.txt}>+</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topHeader: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 15,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  arrow: {
    height: 20,
    width: 20,
  },
  headerName: {
    fontSize: 16,
    color: '#000000',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  productImg: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  productCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 10,
    marginHorizontal: 8,
    height: 220,
    width: 150,
    borderRadius: 10,
    marginVertical: 7,
    paddingHorizontal: 10,
  },
  heart: {
    height: 15,
    width: 15,
    alignSelf: 'flex-end',
    marginTop: 7,
  },
  productName: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 12,
    color: '#000000',
    fontWeight: 'bold',
  },
  productRating: {
    fontSize: 12,
    color: '#000000',
    fontWeight: 'bold',
  },
  Button: {
    alignSelf: 'center',
    backgroundColor: '#4ea554',
    paddingHorizontal: 40,
    borderRadius: 15,
    marginTop: 8,
    paddingVertical: 4,
  },
  txt: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 12,
  },
  minusTxt:{
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 12,
    
  },
  buttonCard: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 8,
    borderWidth: 1.5,
    borderColor: '#4ea554',
    alignItems: 'center',
  },
  minusButton: {
    backgroundColor: '#4ea554',
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 2,
  },
  plusButton: {
    backgroundColor: '#4ea554',
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 2,
  },
  count: {
    color: '#4ea554',
    fontWeight: '500',
    fontSize: 12,
    paddingHorizontal: 10,
  },
});
