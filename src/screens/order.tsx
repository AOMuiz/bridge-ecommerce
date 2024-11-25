// import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';

import {globalStyles} from '@styles/global';
import useCart from '@hooks/useCart';
import CartItem from '@components/cart-item';

const Order: React.FC = () => {
  const {cartItems, updateQuantity, removeFromCart, getTotal} = useCart();

  const total = getTotal();

  // useEffect(() => {
  //   console.log('Cart updated:', cartItems, total);
  // }, [cartItems, total]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="default" />

      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <CartItem
            id={item.id}
            name={item.title}
            quantity={item.quantity}
            price={item.price}
            image={item.image}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        }
        contentContainerStyle={styles.cartContainer}
      />

      <View style={styles.total}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutLabel}>Go to Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  cartContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  total: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  checkoutButton: {
    backgroundColor: '#53B175',
    paddingVertical: 16,
    alignItems: 'center',
    width: '80%',
    borderRadius: 30,
    marginBottom: 10,
    marginHorizontal: 'auto',
  },
  checkoutLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#757575',
    fontSize: 16,
  },
});

export default Order;
