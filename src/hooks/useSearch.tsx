import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSearch = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // Track the timeout

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
      if (timer) {
        clearTimeout(timer); // Clear previous timeout if the user is typing
      }

      // Set a new timeout to save the search history after 3 seconds of inactivity
      const newTimer = setTimeout(() => {
        saveSearchHistory(text.trim());
      }, 3000); // 3000ms = 3 seconds

      setTimer(newTimer); // Save the timer to clear it later
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

  return {
    searchText,
    setSearchText,
    searchHistory,
    handleSearch,
    clearHistory,
  };
};
