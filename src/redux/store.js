import {combineReducers , configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {persistReducer , persistStore } from 'redux-persist'
import loginSlice from './slices/loginSlice'
import todoSlice from './slices/todoSlice'

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        login:loginSlice,
        todo:todoSlice
    })
)

export const store = configureStore({
    reducer:persistedReducer
})

export const persistor = persistStore(store);
