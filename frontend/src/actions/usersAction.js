
export const enterName = (name) => {
      const enteredName = name || "Anon"
      return { type: "SET_NAME", name: enteredName }
}