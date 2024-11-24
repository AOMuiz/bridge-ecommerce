import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface CategoryCardProps {
  title: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({title, image}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  image: {
    width: '80%',
    height: '60%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default CategoryCard;
