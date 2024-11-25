import {Settings2} from 'lucide-react-native';
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

type SearchBarProps = {
  searchText: string;
  setSearchText: (text: string) => void;
  searchHistory: string[];
  onSearch: (text: string) => void;
  onClearHistory: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  setSearchText,
  searchHistory,
  onSearch,
  onClearHistory,
}) => {
  return (
    <View>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products"
          value={searchText}
          onChangeText={onSearch}
          placeholderTextColor="#9E9E9E"
        />
        <TouchableOpacity style={styles.filterButton}>
          <Settings2 color={'#5F9117'} />
        </TouchableOpacity>
      </View>

      {/* Search History */}
      <View style={styles.historyContainer}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Search History</Text>
          <TouchableOpacity onPress={onClearHistory}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    height: 48,
    backgroundColor: '#FCFCFD',
    borderRadius: 10,
    borderColor: '#EFEFEF',
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    flex: 1,
  },
  filterButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#00000028',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 3,

    // Shadow for Android
    elevation: 6,
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
    color: '#FF882EC2',
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
});

export default SearchBar;
