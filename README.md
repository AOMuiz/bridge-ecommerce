This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

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

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

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
