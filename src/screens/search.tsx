import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import CategoryCard from '@components/category-card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '@components/product-card';
import {globalStyles} from '@styles/global';

const categoryMapping = {
  electronics: 'Fresh Fruits & Vegetable',
  jewelery: 'Cooking Oil & Ghee',
  "men's clothing": 'Meat & Fish',
  "women's clothing": 'Bakery & Snacks',
};

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const {data: categories} = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get(
        'https://fakestoreapi.com/products/categories',
      );
      return response.data;
    },
  });

  const {data: products} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    },
  });

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('searchHistory');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  const saveSearchHistory = async (term: string) => {
    try {
      const newHistory = [term, ...searchHistory.filter(h => h !== term)].slice(
        0,
        5,
      );
      await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
      setSearchHistory(newHistory);
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim()) {
      saveSearchHistory(text.trim());
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('searchHistory');
      setSearchHistory([]);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rice"
          value={searchText}
          onChangeText={handleSearch}
          placeholderTextColor="#9E9E9E"
        />
      </View>

      <View style={styles.historyContainer}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Search History</Text>
          <TouchableOpacity onPress={clearHistory}>
            <Text style={styles.clearButton}>clear</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.historyTags}>
          {searchHistory.map((term, index) => (
            <TouchableOpacity
              key={index}
              style={styles.historyTag}
              onPress={() => setSearchText(term)}>
              <Text style={styles.historyTagText}>{term}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.categoriesGrid}>
        {categories?.map((category: string, index: number) => (
          <CategoryCard
            key={index}
            title={categoryMapping[category]}
            image={`/category-${index + 1}.png`}
          />
        ))}
      </View>

      {searchText && (
        <View style={styles.searchResults}>
          {products
            ?.filter(
              product =>
                product.title
                  .toLowerCase()
                  .includes(searchText.toLowerCase()) ||
                product.category
                  .toLowerCase()
                  .includes(searchText.toLowerCase()),
            )
            .map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                price={product.price}
                image={product.image}
                location="Kigadi Market Kaduna State"
              />
            ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  historyContainer: {
    padding: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  clearButton: {
    color: '#FF6B6B',
    fontSize: 14,
  },
  historyTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  historyTag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  historyTagText: {
    color: '#757575',
    fontSize: 14,
  },
  categoriesGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  searchResults: {
    padding: 16,
    gap: 16,
  },
});

export default Search;
