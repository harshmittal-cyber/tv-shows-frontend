import { combineReducers } from "redux"
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { RESET } from '../constants/userConstant'
import { userReducer } from "./userReducer";
import { showReducer } from "./showReducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userReducer', 'showReducer']
}

const appReducer = combineReducers(
    {
        userReducer,
        showReducer
    }
)

const rootReducer = (state, action) => {
    if (action.type === RESET) {
        // reset state
        state = undefined;
        // reset local storage
        localStorage.clear();
    }
    return appReducer(state, action)
}

export default persistReducer(persistConfig, rootReducer); 
