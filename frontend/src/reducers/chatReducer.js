let initialState = {
    chatMessages: []
}

const chatData = (state = initialState, action) => {
    switch (action.type) {
        // case 'GET_MESSAGES':
        //     return {
        //         ...state,
        //         chatMessages: action.messages
        //     }
        case 'REFRESH_MESSAGES':
            return {
                ...state,
                chatMessages: action.messages
            }
        case 'CLEAR_HISTORY':
            return {
                ...state,
                chatMessages: []
            }
        default:
            return state
    }
}

export default chatData