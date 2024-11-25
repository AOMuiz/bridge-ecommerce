import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';

import ProductCard from '@components/product-card';
import CategoryCard from '@components/category-card';
import {useSearch} from '@hooks/useSearch';
import SearchBar from '@components/search-bar';
import {Category, Products} from 'src/types/products';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import useCart from '@hooks/useCart';
import {API_URL} from '@api/api-client';

const SearchScreen = () => {
  const {searchText, setSearchText, searchHistory, handleSearch, clearHistory} =
    useSearch();
  const {addToCart} = useCart();

  const {data: categories, isLoading: isCategoriesLoading} = useQuery<
    Category[]
  >({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get<Category[]>(
        `${API_URL}/products/categories`,
      );
      return response.data;
    },
  });

  const {data: products, isLoading: isProductsLoading} = useQuery<Products>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get<Products>(`${API_URL}/products`);
      return response.data;
    },
  });

  // Filter products based on search text
  const filteredProducts = products?.filter(
    product =>
      product.title.toLowerCase().includes(searchText.toLowerCase()) ||
      product.category.toLowerCase().includes(searchText.toLowerCase()),
  );

  const filteredCategories = categories?.filter(category =>
    category.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        searchHistory={searchHistory}
        onSearch={handleSearch}
        onClearHistory={clearHistory}
      />

      {/* Combined FlatList for Categories and Products */}
      <FlatList
        data={filteredProducts || []}
        keyExtractor={item =>
          item?.id ? `product-${item.id}` : `category-${item}`
        }
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        // eslint-disable-next-line react-native/no-inline-styles
        columnWrapperStyle={{gap: 10}}
        ListHeaderComponent={
          <FlatList
            data={filteredCategories || []}
            keyExtractor={(item, index) => `${item}-${index}`}
            numColumns={2}
            renderItem={({item}) => (
              <View style={styles.categoryItem}>
                <CategoryCard title={item} image={`../assets/${item}.jpg`} />
              </View>
            )}
            contentContainerStyle={styles.categoriesGrid}
            ListEmptyComponent={
              isCategoriesLoading ? (
                <ActivityIndicator size="large" color="#00A651" />
              ) : (
                <Text style={styles.emptyText}>No categories found</Text>
              )
            }
          />
        }
        renderItem={({item}) =>
          item?.id ? (
            <ProductCard
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              onAddToCart={() => addToCart(item as any)}
              description={item.description}
            />
          ) : null
        }
        ListEmptyComponent={
          isProductsLoading ? (
            <ActivityIndicator size="large" color="#00A651" />
          ) : (
            <Text style={styles.emptyText}>No products found</Text>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 16,
    gap: 10,
    columnGap: 10,
  },
  categoriesGrid: {
    paddingBottom: 16,
  },
  categoryItem: {
    flex: 1,
    padding: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#757575',
    fontSize: 16,
  },
});

export default SearchScreen;
