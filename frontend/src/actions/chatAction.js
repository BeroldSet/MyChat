import { sortReverse } from "../utils/utils"

export const refreshMessages = (newMessages) => {
      sortReverse(newMessages)
      return { type: "REFRESH_MESSAGES", messages: newMessages }
}

export const clearHistory = () => {
      return { type: "CLEAR_HISTORY" }
}