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
import axios from 'react-native-axios'; // Import Axios for making HTTP requests
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for local data storage
import {useIsFocused} from '@react-navigation/native'; // Import useIsFocused hook to detect screen focus
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo for network connection status

const ProductList = ({navigation}) => {
  const focused = useIsFocused(); // Detects if the screen is focused
  const [isInternetAvailable, setIsInternetAvailable] = useState(false); // State to track internet connection
  const [isLoader, setIsLoader] = useState(false); // State to track loading status
  const [data, setData] = useState(null); // State to store fetched data
  const [counts, setCounts] = useState({}); // State to manage item counts
  const [visibleStates, setVisibleStates] = useState([]); // State to manage visibility of items

  // Effect to listen to network connection changes
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsInternetAvailable(state.isConnected);
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  // Effect to fetch data from API or local storage based on network availability and screen focus
  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      try {
        if (isInternetAvailable) {
          // Fetch data from API if internet is available
          const response = await axios.get('https://dummyjson.com/products');
          const jsonData = response.data;
          setData(jsonData);
          await AsyncStorage.setItem('apiData', JSON.stringify(jsonData)); // Save data to local storage
          setIsLoader(false);
        } else {
          // If no internet, try to fetch from local storage
          const localData = await AsyncStorage.getItem('apiData');
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

  // Function to increment item count
  const incrementCount = index => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [index]: (prevCounts[index] || 0) + 1,
    }));
  };

  // Function to decrement item count
  const decrementCount = index => {
    if (counts[index] > 0) {
      setCounts(prevCounts => ({
        ...prevCounts,
        [index]: prevCounts[index] - 1,
      }));
    }
  };

  // Function to toggle item visibility
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
        // Show loading indicator while data is being fetched
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{flex: 1, justifyContent: 'center', marginTop: -20}}
        />
      ) :
      data !==null?
      (
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
                  // Show ADD button if item is not visible
                  <TouchableOpacity
                    onPress={() => toggleVisibility(index)}
                    style={styles.Button}>
                    <Text style={styles.txt}>ADD</Text>
                  </TouchableOpacity>
                ) : (
                  // Show +/- buttons for item count if item is visible
                  <View style={styles.buttonCard}>
                    <TouchableOpacity
                      onPress={() => decrementCount(index)}
                      style={styles.minusButton}>
                      <Text style={styles.minusTxt}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.count}>{counts[index] || 0}</Text>
                    <TouchableOpacity
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
      )
    :
    <View style={styles.found}>
    <Text style={styles.foundTxt}>no data found</Text>
    </View>
    }
    </SafeAreaView>
  );
};

export default ProductList;

// Styles

const styles = StyleSheet.create({
     // Your style definitions
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
  found:{
    flex:1,
   
    justifyContent:"center",
    alignItems:"center"
  },
  foundTxt:{
    color:"#000000",
    fontSize:30
  }
});
