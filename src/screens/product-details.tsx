import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  ChevronLeft,
  Heart,
  Share2,
  ChevronDown,
  Star,
} from 'lucide-react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQuery} from '@tanstack/react-query';
import {fetchProductInfo} from '@api/api-client';
import useCart from '@hooks/useCart';

type ProductDetailsProps = {
  navigation: StackNavigationProp<SearchStackParamList, 'ProductDetails'>;
  route: RouteProp<SearchStackParamList, 'ProductDetails'>;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({navigation, route}) => {
  const {productId} = route.params;
  const {addToCart} = useCart();
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductInfo(productId),
  });

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: Number(product.price),
        image: product.image,
        quantity,
      });
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  if (isError || !product) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading product</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Share2 size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{uri: product.image}}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={styles.imagePagination}>
          <View style={styles.paginationDot} />
          <View style={[styles.paginationDot, styles.paginationInactive]} />
          <View style={[styles.paginationDot, styles.paginationInactive]} />
        </View>
      </View>

      {/* Product Info */}
      <ScrollView style={styles.productInfo}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{product.title}</Text>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <Heart
              size={24}
              color={isFavorite ? '#FF0000' : '#000'}
              fill={isFavorite ? '#FF0000' : 'none'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>{product.category}</Text>

        {/* Quantity and Price */}
        <View style={styles.quantityPriceContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={handleDecrement}
              style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={handleIncrement}
              style={[styles.quantityButton]}>
              <Text
                style={[
                  styles.quantityButtonText,
                  styles.quantityButtonTextGreen,
                ]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>
            ${(Number(product.price) * quantity).toFixed(2)}
          </Text>
        </View>

        {/* Product Details */}
        <TouchableOpacity style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Product Detail</Text>
          <ChevronDown size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.detailsText}>{product.description}</Text>

        {/* Rating */}
        <TouchableOpacity style={styles.infoRow}>
          <Text style={styles.infoTitle}>Review</Text>
          <View style={styles.reviewStars}>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  color="#FFA500"
                  fill={
                    i < Math.floor(product?.rating?.rate as number)
                      ? '#FFA500'
                      : 'none'
                  }
                />
              ))}
            <Text style={styles.ratingText}>
              ({product?.rating?.count} reviews)
            </Text>
          </View>
          <ChevronDown size={24} color="#000" />
        </TouchableOpacity>

        {/* Add to Basket Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Add To Basket</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  imageContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  imagePagination: {
    flexDirection: 'row',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#53B175',
    marginHorizontal: 4,
  },
  paginationInactive: {
    backgroundColor: '#E0E0E0',
  },
  productInfo: {
    flex: 1,
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textTransform: 'capitalize',
  },
  quantityPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    // borderWidth: 1,
    // borderColor: '#E0E0E0',
  },
  quantityButton: {
    padding: 10,
    borderRadius: 12,
  },
  quantityButtonGreen: {
    // backgroundColor: '#4CAF50',
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#000',
  },
  quantityButtonTextGreen: {
    fontSize: 20,
    color: '#4CAF50',
  },
  quantityText: {
    fontSize: 18,
    paddingHorizontal: 20,
    height: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  detailsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  nutritionBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#FF0000',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  ratingText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 14,
  },
  reviewStars: {
    flexDirection: 'row',
    marginRight: 10,
  },
  addButton: {
    // backgroundColor: '#4CAF50',
    // borderRadius: 15,
    // padding: 20,
    // alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#53B175',
    paddingVertical: 16,
    alignItems: 'center',
    width: '80%',
    borderRadius: 30,
    // marginBottom: 10,
    marginHorizontal: 'auto',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProductDetails;
