import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

import ProductCard from '@components/product-card';
import {ArrowLeft, SlidersHorizontal} from 'lucide-react-native';
import {Product} from 'src/types/products';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

// Define props for the CategoryDetails screen
type CategoryDetailsNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'CategoryDetails'
>;
type CategoryDetailsRouteProp = RouteProp<
  SearchStackParamList,
  'CategoryDetails'
>;

interface CategoryDetailsProps {
  navigation: CategoryDetailsNavigationProp;
  route: CategoryDetailsRouteProp;
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({
  navigation,
  route,
}) => {
  const category = route.params?.category || 'Beverages';

  const {data: products} = useQuery<Product[]>({
    queryKey: ['products', category],
    queryFn: async () => {
      const response = await axios.get<Product[]>(
        `https://fakestoreapi.com/products/category/${category}`,
      );
      return response.data;
    },
  });

  const renderProduct = ({item}: {item: Product}) => (
    <View style={styles.productCardContainer}>
      <ProductCard
        id={item.id}
        title={item.title}
        price={item.price}
        image={item.image}
        description={item.description}
        onAddToCart={() => console.log('Add to cart:', item.id)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{category}</Text>

        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  filterButton: {
    padding: 8,
  },
  productGrid: {
    padding: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCardContainer: {
    width: '48%',
    marginBottom: 16,
  },
  // ProductCard styles
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    aspectRatio: 1,
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    gap: 4,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  volumeText: {
    fontSize: 14,
    color: '#666666',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  addButton: {
    width: 32,
    height: 32,
    backgroundColor: '#4CAF50',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default CategoryDetails;
