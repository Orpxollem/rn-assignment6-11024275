import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Cart() {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try{
                const cart = await AsyncStorage.getItem('cart');
                if(cart) {
                    setCartItems(JSON.parse(cart));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCartItems();
    }, []);


    const removeFromCart = async (removeItem) => {
        try{
            const updatedCart = cartItems.filter(item => item.id !== removeItem.id);
            setCartItems(updatedCart);
            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.log(error);
        }
    };

    const Cart = ({item}) => {
        return (
            <View style={styles.imageRow}>
                <Image source={item.image} style={{height: 170, width: 130}}/>
                <View style={styles.cartItemText}>
                    <Text style={{fontWeight:'600'}}>{item.title}</Text>
                    <Text style={{fontSize:13}}>{item.description}</Text>
                    <Text style={{color:'#dd8560', fontWeight:'bold', fontSize:17, marginTop:3}}>{item.ammount}</Text>
                </View>

                <View>
                    <TouchableOpacity onPress={() => removeFromCart(item)} style={styles.remove}>
                        <Image source={require('./assets/remove.png')} style={{height: 25, width:25}}/>
                    </TouchableOpacity>
                </View>
                     
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={{marginLeft: '30%'}}>
                    <Image source={require('./assets/Logo.png')} style={{marginLeft: 20, width:100, height:40, alignSelf:'center'}}/>
                </View>
                <View style={{marginLeft: '30%'}}>
                    <TouchableOpacity>
                        <Image source={require('./assets/Search.png')}/>
                    </TouchableOpacity>
                </View>
            </View>

            <Image source={require('./assets/checkout.png')} style={{alignSelf:'center', height:42, width: 200, marginTop: 10}}/>

            
            <FlatList
            data={cartItems}
            renderItem={Cart}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            />

            <View>
                <View style={styles.row}>
                    <Text style={{fontSize:20, marginTop:5, fontWeight:'bold'}}>EST. TOTAL</Text>
                    <Text style={{marginLeft:'55%', color:'#dd8560', fontWeight:'bold', fontSize:24}}>$240</Text>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={[styles.row, {marginTop:20}]}>
                        <Image source={require('./assets/shoppingBag.png')} style={{tintColor:'#fff', marginRight: 20}} />
                        <Text style={{color:'#fff', fontSize: 22, alignSelf: 'center'}}>CHECKOUT</Text>
                    </TouchableOpacity>
                </View>
            </View>

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
        alignSelf: 'center',
        marginBottom: 24,
    },
      footer: {
        backgroundColor: '#000',
        height: 70,
        marginLeft: -25,
        marginRight: -40
      },
      imageRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      },
      cartItemText: {
        justifyContent: 'center',
        marginLeft: -20
      },
      remove: {
        position: 'absolute',
        right: 0,
        bottom: 0
      }

});
