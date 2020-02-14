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
            console.log("REFRESH_MESSAGES",action.messages)
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