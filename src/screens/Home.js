import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
  TextInput,
  FlatList,
} from 'react-native';


const Home = ({navigation}) => {
 
  const DummyShop = [
    {name: 'Electronics', id: 1, icon: require('../Image/loud-speaker.png')},
    {name: 'Properties', id: 2, icon: require('../Image/mansion.png')},
    {name: 'Jobs', id: 3, icon: require('../Image/data-science.png')},
    {name: 'Furniture', id: 4, icon: require('../Image/sofa.png')},
    {name: 'Cars', id: 5, icon: require('../Image/car.png')},
    {name: 'Bikes', id: 6, icon: require('../Image/motorcycle.png')},
    {name: 'Mobiles', id: 7, icon: require('../Image/user-interface.png')},
    {name: 'Pets', id: 8, icon: require('../Image/dog.png')},
  ];
  const dummyTrending = [
    {
      id: 70,
      title: 'Stainless Steel Women',
      description:
        'Fashion Skmei 1830 Shell Dial Stainless Steel Women Wrist Watch Lady Bracelet Watch Quartz Watches Ladies',
      price: 35,
      discountPercentage: 8.98,
      rating: 4.08,
      stock: 111,
      brand: 'Bracelet',
      category: 'womens-watches',
      thumbnail: 'https://cdn.dummyjson.com/product-images/70/thumbnail.jpg',
      images: [
        'https://cdn.dummyjson.com/product-images/70/1.jpg',
        'https://cdn.dummyjson.com/product-images/70/2.jpg',
        'https://cdn.dummyjson.com/product-images/70/thumbnail.jpg',
      ],
    },
    {
      id: 43,
      title: 'frock gold printed',
      description:
        'Ghazi fabric long frock gold printed ready to wear stitched collection (G992)',
      price: 600,
      discountPercentage: 15.55,
      rating: 4.31,
      stock: 150,
      brand: 'Ghazi Fabric',
      category: 'womens-dresses',
      thumbnail: 'https://cdn.dummyjson.com/product-images/43/thumbnail.jpg',
      images: [
        'https://cdn.dummyjson.com/product-images/43/1.jpg',
        'https://cdn.dummyjson.com/product-images/43/2.jpg',
        'https://cdn.dummyjson.com/product-images/43/3.jpg',
        'https://cdn.dummyjson.com/product-images/43/4.jpg',
        'https://cdn.dummyjson.com/product-images/43/thumbnail.jpg',
      ],
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="rgb(251,198,124)" />

      <ImageBackground
        source={require('../Image/BgImages.jpeg')}
        style={styles.imgBg}>
        <View style={styles.topHeader}>
          <Image style={styles.menu} source={require('../Image/menu.png')} />
          <View style={styles.locationView}>
            <Image
              style={styles.location}
              source={require('../Image/circle.png')}
            />
            <Text style={styles.name}>Noida</Text>
          </View>
          <Image style={styles.bell} source={require('../Image/bell.png')} />
        </View>
      </ImageBackground>
      <View style={{flex: 0.7}}>
        <View style={styles.TextInputView}>
          <Image
            style={styles.search}
            source={require('../Image/search.png')}
          />
          <TextInput
            editable={false}
            placeholder="What're you looking for?"
            placeholderTextColor="#747474"
            style={styles.textInput}
          />
        </View>
        <View style={styles.shopAll}>
          <Text style={styles.txt}>Shop for</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProductList');
            }}>
            <Text style={styles.txtAll}>Show all</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={DummyShop}
            numColumns={4}
            contentContainerStyle={{marginTop: 20}}
            renderItem={({item, index}) => {
              return (
                <View key={index} style={styles.shopList}>
                  <Image style={styles.shopsIcon} source={item.icon} />
                  <Text style={styles.listName}>{item.name}</Text>
                </View>
              );
            }}
          />
          <View style={styles.Trending}>
            <Text style={styles.txt}>Trending</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProductList');
              }}>
              <Text style={styles.txtAll}>Show all</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={dummyTrending}
          horizontal
          contentContainerStyle={{marginTop: 10, marginLeft: 5}}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={styles.TrendingList}>
                <View>
                  <Text style={styles.TrendingListName}>{item.title}</Text>
                  <View style={styles.categoryView}>
                    <Text style={styles.TrendingListName}>₹{item.price}</Text>
                    <View style={styles.Blur}>
                      <Text style={styles.TrendingListCategory}>
                        {item.category}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <Image
                  resizeMode="cover"
                  style={styles.TrendingIcon}
                  source={{uri: item.thumbnail}}
                />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imgBg: {
    flex: 0.3,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 13,
  },
  menu: {
    height: 22,
    width: 22,
  },
  bell: {
    height: 22,
    width: 22,
  },
  locationView: {
    flexDirection: 'row',
    backgroundColor: '#74747430',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 30,
  },
  location: {
    height: 17,
    width: 17,
  },
  name: {
    marginLeft: 5,
    fontWeight: '700',
    color:"#ffffff",
  
  },
  TextInputView: {
    marginHorizontal: 30,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    elevation: 10,
    marginTop: -25,
  },
  search: {
    height: 22,
    width: 22,
    marginLeft: 5,
  },
  textInput: {
    marginLeft: 5,
    fontWeight: '400',
  },
  shopAll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginHorizontal: 20,
  },
  Trending: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 20,
  },
  txt: {
    color: '#000000',
    fontWeight: '500',
  },
  txtAll: {
    color: '#fbc67c',
    fontWeight: '500',
  },
  shopList: {
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    height: 50,
    width: 50,
  },
  shopsIcon: {
    height: 30,
    width: 30,
  },
  listName: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '500',
  },
  TrendingList: {
    height: 180,
    width: 270,
    elevation: 3,
    backgroundColor: '#ffffff',
    marginHorizontal: 7,
    borderRadius: 12,
    marginTop: 10,
    paddingHorizontal: 7,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent:"space-between"
  },
  TrendingIcon: {
    height: 170,
    width: 100,
    borderRadius: 100,
    alignSelf: 'center',
  },
  TrendingListName: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  TrendingListCategory: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '500',
  },
  Blur: {
    backgroundColor: '#747474',
    borderRadius: 3,
    paddingHorizontal: 2,
  },
  description:{
    color:"#747474",
    fontSize:12,
    width:150,
    marginTop:10,
    fontWeight:"500"
  }
});
