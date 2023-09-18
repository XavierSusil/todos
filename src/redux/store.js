import {combineReducers , configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {persistReducer , persistStore } from 'redux-persist'
import loginSlice from './slices/loginSlice'
import snackbarSlice from './slices/snackbarSlice'
import filterSortSlice from './slices/filterSortSlice'

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        login:loginSlice,
        snackbar:snackbarSlice,
        filterSort:filterSortSlice
    })
)

export const store = configureStore({
    reducer:persistedReducer
})

export const persistor = persistStore(store);
