/* Instruments */
import { combineReducers } from 'redux';
import { settingSlice } from './slices/settings';
import { UserReducer } from './slices/user';
import productReducer from './slices/product';
import CategoriesReducer from './slices/categories';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can use other storage options if needed

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['user', 'isAuthenticated'],
};
const persistConfig = {
  key: 'settings',
  storage, // Use the storage engine you imported
  // Other configuration options if needed
};

const persistedReducer = persistReducer(persistConfig, settingSlice.reducer);
const reducer = combineReducers({
  settings: persistedReducer,
  user: persistReducer(userPersistConfig, UserReducer.reducer),
  product: persistReducer(productPersistConfig, productReducer),
  categories: CategoriesReducer,
});

export { rootPersistConfig, reducer };
