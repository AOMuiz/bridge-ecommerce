import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Plus} from 'lucide-react-native';
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface ProductCardProps {
  id: number | string;
  title: string;
  price: string;
  image: string;
  description: string;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  description,
  onAddToCart,
}) => {
  const navigation =
    useNavigation<
      StackNavigationProp<SearchStackParamList, 'CategoryDetails'>
    >();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ProductDetails', {productId: id})}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.price}>₦{price.toLocaleString()}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
        <Plus color={'white'} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#E2E2E2',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#ffffff',

    // Shadow for iOS
    shadowColor: '#00000028',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 3,

    // Shadow for Android
    elevation: 6,

    // backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    objectFit: 'contain',
    marginBottom: 5,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
  },
  description: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FD903E',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#087319',
    borderRadius: 10,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'flex-end',
    color: '#FFFFFF',
  },
  addButtonText: {
    // color: '#FFFFFF',
    // fontSize: 10,
  },
});

export default ProductCard;
