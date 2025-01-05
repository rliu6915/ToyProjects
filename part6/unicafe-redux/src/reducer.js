const initialState = {
  good: 5,
  ok: 4,
  bad: 2
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state.good + 1}
    case 'OK':
      return { ...state, ok: state.ok + 1}
    case 'BAD':
      return { ...state, bad: state.bad + 1}
    case 'ZERO':
      return { ...state, good: 0, ok: 0, bad: 0}
    case 'RESET':
      return { ...state, good: 5, ok: 4, bad: 2}
    default: return state
  }
}

export default counterReducer
