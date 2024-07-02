import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {

    const products = [
        {
            id: '1',
            image: require('./assets/dress1.png'),
            title: 'Office Wear',
            description: 'reversible angora cardigan',
            ammount: '$120',
        },
        {
            id: '2',
            image: require('./assets/dress2.png'),
            title: 'Black',
            description: 'reversible angora cardigan',
            ammount: '$120',   
        },
        {
            id: '3',
            image: require('./assets/dress3.png'),
            title: 'Church Wear',
            description: 'reversible angora cardigan',
            ammount: '$120',
        },
        {
            id: '4',
            image: require('./assets/dress4.png'),
            title: 'Lamerei',
            description: 'reversible angora cardigan',
            ammount: '$120',   
        },
        {
            id: '5',
            image: require('./assets/dress5.png'),
            title: '21WN',
            description: 'reversible angora cardigan',
            ammount: '$120',
        },
        {
            id: '6',
            image: require('./assets/dress6.png'),
            title: 'Lopo',
            description: 'reversible angora cardigan',
            ammount: '$120',   
        },
        {
            id: '7',
            image: require('./assets/dress7.png'),
            title: '21WN',
            description: 'reversible angora cardigan',
            ammount: '$120',
        },
        {
            id: '8',
            image: require('./assets/dress3.png'),
            title: 'lame',
            description: 'reversible angora cardigan',
            ammount: '$120',   
        }
    ];

    const addToCart = async (item) => {
        try {
            const cartItems = await AsyncStorage.getItem('cart');
            let cart = cartItems ? JSON.parse(cartItems) : [];
            cart.push(item);
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error(error);
        }
    };
    

    const Store = ({item}) => {
        return (
            <View style={styles.imageRow}>
                <View style={styles.column}>
                    <View>
                        <Image source={item.image} style={{height: 220, width: 165}}/>
                        <TouchableOpacity style={styles.addIcon} onPress={() => addToCart(item)}>
                            <Image source={require('./assets/add_circle.png')} style={{height:25, width:25}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoCol}>
                        <Text style={{fontWeight:'600'}}>{item.title}</Text>
                        <Text style={{fontSize:12}}>{item.description}</Text>
                        <Text style={{color:'#dd8560', fontWeight:'bold', fontSize:17, marginTop:3}}>{item.ammount}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            <View style={styles.row}>
                <View>
                    <TouchableOpacity>
                        <Image source={require('./assets/Menu.png')} style={{height: 32, width: 32}}/>
                    </TouchableOpacity>
                </View>
                <View>
                <Image source={require('./assets/Logo.png')} style={{marginLeft: 20, width:100, height:40}}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity>
                        <Image source={require('./assets/Search.png')} style={{height: 30, width: 30, marginRight: 20}} />
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Cart')}
                    >
                        <Image source={require('./assets/shoppingBag.png')} style={{height: 30, width: 30}} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.row, {marginTop:10}]}>
                    <View>
                        <Image source={require('./assets/header.png')} style={{marginTop:10}}/>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.iconCircle}>
                            <Image source={require('./assets/Listview.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.iconCircle, {marginLeft:10}]}>
                            <Image source={require('./assets/Filter.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={products}
                    numColumns={2}
                    renderItem={({item}) => (
                        <Store
                            item={item}
                        />
                    )}
                />
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 70,
        marginLeft: 25,
        marginRight: 25,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    iconCircle: {
        height: 45,
        width: 45,
        borderRadius: 30,
        backgroundColor: '#ececec',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginRight: 10,
    },
    addIcon: {
        position: 'absolute',
        top: 190,
        left: 135,
    },
    infoCol: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 10,
    }
    })