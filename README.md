## React Native Product Search App

A React Native application that allows users to search for products by category, view product details, and navigate seamlessly using a bottom tab navigation system. This project leverages React Navigation, React Query, and a well-structured component hierarchy.
Features

- **Dynamic Category Search**: View and filter products by category.
- **Product Listing**: Display a grid of products with details like title, price, and description.
- **Navigation**: Seamless navigation using React Navigation, with both stack and tab navigators.
- **State Management**: Powered by **React Query** for efficient API data fetching and caching.
- **Cart Management**:

## Folder Structure!

📂 ProductSearchApp
├── 📂 android # Android-specific files (auto-generated)
├── 📂 ios # iOS-specific files (auto-generated)
├── 📂 src # Main app source code
│ ├── 📂 api # API layer for Axios configurations and API calls
│ │ ├── apiClient.ts # Axios instance configuration
│ │ └── productApi.ts # API functions for products and categories
│ ├── 📂 components # Reusable UI components
│ │ ├── CategoryCard.tsx
│ │ ├── ProductCard.tsx
│ │ └── SearchBar.tsx
│ ├── 📂 hooks # Custom hooks (React Query hooks, search history, etc.)
│ │ ├── useProducts.ts
│ │ ├── useCategories.ts
│ │ └── useSearchHistory.ts
│ ├── 📂 navigation # Navigation configurations and stack/screens
│ │ └── AppNavigator.tsx
│ ├── 📂 screens # Screen components for different app views
│ │ ├── HomeScreen.tsx
│ │ ├── SearchScreen.tsx
│ │ └── ProductDetailsScreen.tsx
│ ├── 📂 state # State management (React Query providers, context, etc.)
│ │ └── queryClient.ts # React Query client setup
│ ├── 📂 utils # Utility functions/helpers
│ │ ├── categoryMapping.ts # Maps API categories to UI categories
│ │ └── constants.ts # Constants like API base URLs, app colors, etc.
│ ├── 📂 assets # Static assets like images, fonts, etc.
│ │ ├── images # App images (icons, placeholders, etc.)
│ │ └── fonts # Custom fonts (if applicable)
│ └── App.tsx # Entry point of the app
├── 📂 node_modules # Node modules (auto-generated)
├── .gitignore # Git ignore file
├── package.json # Project dependencies and scripts
├── README.md # Project documentation
├── tsconfig.json # TypeScript configuration
└── babel.config.js # Babel configuration

## **Installation and Setup**

### **Prerequisites**

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [React Native CLI]()
- A simulator/emulator or a physical device for testing

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## **Technologies Used**

- **React Native** : Cross-platform mobile app development.
- **React Navigation** : Navigation system (tab and stack navigators).
- **React Query** : API state management and data fetching.
- **TypeScript** : Type safety and better developer experience.
- **Axios** : HTTP client for API requests.
- **Lucide Icons** : Beautiful icons for the UI.

---

## **API Integration**

The app fetches product data from [Fake Store API](https://fakestoreapi.com/).

### **Endpoints Used**

- **Fetch Categories** : `GET /products/categories`
- **Fetch Products** : `GET /products/`
- **Fetch Products by Category** : `GET /products/category/{category}`
