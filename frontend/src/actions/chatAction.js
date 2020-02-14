
export const getMessages = () => {
    return async dispatch => {
          let response = await fetch('http://localhost:8000/messages')
          if (response.ok) {
                const responseJson = await response.json();
                dispatch({ type: 'GET_MESSAGES', messages: responseJson });
          }
    }
}

// export const refreshMessages = (newMessages) => {
//       return { type: "REFRESH_MESSAGES", messages: newMessages }
// }