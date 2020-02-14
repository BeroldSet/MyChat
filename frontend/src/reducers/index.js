import { combineReducers } from 'redux';
import userData from "./usersReducer"
import chatData from "./chatReducer"

export default combineReducers({
    userData,
    chatData
});