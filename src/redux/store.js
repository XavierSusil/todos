import {combineReducers , configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {persistReducer , persistStore } from 'redux-persist'
import loginSlice from './slices/loginSlice'
import filterStatusSlice from './slices/filterStatusSlice'

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        login:loginSlice,
        filterStatus:filterStatusSlice
    })
)

export const store = configureStore({
    reducer:persistedReducer
})

export const persistor = persistStore(store);
