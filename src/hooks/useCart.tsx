import {useQuery, useQueryClient} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const CART_STORAGE_KEY = 'cartItems';

const fetchCartItems = async (): Promise<CartItem[]> => {
  try {
    const storedItems = await AsyncStorage.getItem(CART_STORAGE_KEY);
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};

const useCart = () => {
  const queryClient = useQueryClient();

  // Load cart items with React Query
  const {data: cartItems = [], refetch} = useQuery<CartItem[]>({
    queryKey: [CART_STORAGE_KEY],
    queryFn: fetchCartItems,
    staleTime: Infinity, // Prevent unnecessary re-fetching
  });

  const saveCartItems = async (updatedItems: CartItem[]) => {
    try {
      await AsyncStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(updatedItems),
      );
      queryClient.invalidateQueries({queryKey: [CART_STORAGE_KEY]}); // Trigger UI update
    } catch (error) {
      console.error('Error saving cart items:', error);
    }
  };

  const addToCart = async (item: CartItem) => {
    const existingItem = cartItems.find(i => i.id === item.id);
    let updatedItems;

    if (existingItem) {
      // Update quantity
      updatedItems = cartItems.map(i =>
        i.id === item.id ? {...i, quantity: i.quantity + 1} : i,
      );
    } else {
      // Add new item
      updatedItems = [...cartItems, {...item, quantity: 1}];
    }

    await saveCartItems(updatedItems); // Save and trigger UI update
  };

  const removeFromCart = async (itemId: number) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    await saveCartItems(updatedItems);
  };

  const updateQuantity = async (id: number, quantity: number) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? {...item, quantity} : item,
    );
    await saveCartItems(updatedItems);
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotal,
    refetch,
  };
};

export default useCart;

// import {useState, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export interface CartItem {
//   id: number;
//   title: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// const CART_STORAGE_KEY = 'cartItems';

// const fetchCartItems = async (): Promise<CartItem[]> => {
//   try {
//     const storedItems = await AsyncStorage.getItem(CART_STORAGE_KEY);
//     return storedItems ? JSON.parse(storedItems) : [];
//   } catch (error) {
//     console.error('Error fetching cart items:', error);
//     return [];
//   }
// };

// // const useCart = () => {
// //   const [cartItems, setCartItems] = useState<CartItem[]>([]);

// //   useEffect(() => {
// //     // Load cart items from AsyncStorage on initial render
// //     loadCartItems();
// //   }, [cartItems]);

// //   const loadCartItems = async () => {
// //     try {
// //       const storedItems = await AsyncStorage.getItem('cartItems');
// //       if (storedItems) {
// //         setCartItems(JSON.parse(storedItems));
// //       }
// //     } catch (error) {
// //       console.error('Error loading cart items:', error);
// //     }
// //   };

// //   const addToCart = async (item: CartItem) => {
// //     try {
// //       // Check if item is already in the cart
// //       const existingItem = cartItems.find(i => i.id === item.id);
// //       if (existingItem) {
// //         // If item is in the cart, update the quantity
// //         const updatedItems = cartItems.map(i =>
// //           i.id === item.id ? {...i, quantity: i.quantity + 1} : i,
// //         );
// //         setCartItems(updatedItems);
// //       } else {
// //         // If item is not in the cart, add it with a quantity of 1
// //         setCartItems([...cartItems, {...item, quantity: 1}]);
// //       }

// //       // Save the updated cart items to AsyncStorage
// //       await AsyncStorage.setItem(
// //         'cartItems',
// //         JSON.stringify([...cartItems, {...item, quantity: 1}]),
// //       );
// //     } catch (error) {
// //       console.error('Error adding item to cart:', error);
// //     }
// //   };

// //   //   const addToCart = async (item: CartItem) => {
// //   //     try {
// //   //       const existingItem = cartItems.find(i => i.id === item.id);
// //   //       let updatedItems;

// //   //       if (existingItem) {
// //   //         // Update quantity if item already exists
// //   //         updatedItems = cartItems.map(i =>
// //   //           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
// //   //         );
// //   //       } else {
// //   //         // Add new item
// //   //         updatedItems = [...cartItems, { ...item, quantity: 1 }];
// //   //       }

// //   //       setCartItems(updatedItems); // Update state
// //   //       await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Persist to storage
// //   //     } catch (error) {
// //   //       console.error('Error adding item to cart:', error);
// //   //     }
// //   //   };

// //   const removeFromCart = async (itemId: number) => {
// //     try {
// //       // Filter out the item to be removed
// //       const updatedItems = cartItems.filter(item => item.id !== itemId);
// //       setCartItems(updatedItems);

// //       // Save the updated cart items to AsyncStorage
// //       await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
// //     } catch (error) {
// //       console.error('Error removing item from cart:', error);
// //     }
// //   };

// //   const getTotal = () => {
// //     return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
// //   };

// //   const updateQuantity = async (id: number, quantity: number) => {
// //     try {
// //       const updatedItems = cartItems.map(item =>
// //         item.id === id ? {...item, quantity} : item,
// //       );
// //       setCartItems(updatedItems);

// //       // Save the updated cart items to AsyncStorage
// //       await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
// //     } catch (error) {
// //       console.error('Error updating item quantity:', error);
// //     }
// //   };

// //   return {cartItems, addToCart, removeFromCart, updateQuantity, getTotal};
// // };

// export default useCart;
