import {X} from 'lucide-react-native';
import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

export interface CartItemProps {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  quantity,
  price,
  image,
  updateQuantity,
  removeFromCart,
}) => (
  <View style={styles.cartItem}>
    {image ? (
      <Image source={{uri: image}} style={styles.itemImage} />
    ) : (
      <View style={styles.itemImage} />
    )}
    <View style={styles.itemDetails}>
      <Text style={styles.itemName}>{name}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButtonWrapper}
          onPress={() => updateQuantity(id, Math.max(quantity - 1, 0))}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>{quantity}</Text>

        {/* Increment Quantity */}
        <TouchableOpacity
          style={styles.quantityButtonWrapper}
          onPress={() => updateQuantity(id, quantity + 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        justifyContent: 'space-between',
        alignSelf: 'stretch',
      }}>
      <TouchableOpacity
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          justifyContent: 'space-between',
          marginLeft: 'auto',
        }}
        onPress={() => removeFromCart(id)}>
        <X size={24} color="#ccc" />
      </TouchableOpacity>
      <Text style={styles.itemPrice}>${price.toFixed(2)}</Text>
    </View>
  </View>
);

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth + 1,
    borderBottomColor: '#eee',
  },
  itemImage: {
    width: 64,
    height: 64,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButtonWrapper: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  quantityButton: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4CAF50',
    paddingHorizontal: 8,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 12,
  },
});
