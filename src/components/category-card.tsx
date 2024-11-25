import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface CategoryCardProps {
  title: string;
  image: string;
}

// Define the mapping of categories to colors
const categoryStyles: Record<string, {bg: string; border: string}> = {
  electronics: {bg: '#53B1751A', border: '#53B175B2'},
  jewelery: {bg: '#F8A44C1A', border: '#F8A44CB2'},
  "men's clothing": {bg: '#F7A59340', border: '#F7A593'},
  "women's clothing": {bg: '#D3B0E040', border: '#D3B0E0'},
};

// Local images mapping
const images: Record<string, any> = {
  electronics: require('../assets/images/electronics.jpg'),
  jewelery: require('../assets/images/jewelery.jpg'),
  "men's clothing": require('../assets/images/mens_clothing.jpg'),
  "women's clothing": require('../assets/images/womens_clothing.jpg'),
};

const CategoryCard: React.FC<CategoryCardProps> = ({title, image}) => {
  const navigation =
    useNavigation<
      StackNavigationProp<SearchStackParamList, 'CategoryDetails'>
    >();
  // Get the styles for the current category, fallback to default styles if not found
  const {bg, border} = categoryStyles[title.toLowerCase()] || {
    bg: '#F8F8F8',
    border: '#E0E0E0',
  };

  const resolvedImage =
    images[title.toLowerCase()] ||
    require('../assets/images/default.png') ||
    image;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CategoryDetails', {category: title.toLowerCase()})
      }
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: bg,
          borderColor: border,
          borderWidth: 1,
        },
      ]}>
      {/* source={{uri: image}} */}
      <Image source={resolvedImage} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    textAlign: 'center',
    marginTop: 8,
    textTransform: 'capitalize',
  },
});

export default CategoryCard;
