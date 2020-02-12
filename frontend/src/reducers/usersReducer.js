let initialState = {
    name: 'Anon'
}

const userData = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NAME':
        return {
          ...state,
          name: action.name
    }
      default:
        return state
    }
  }

  export default userData