import {
  SET_QUOTES
} from '../actions/type'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_QUOTES:
      return action.quotes
    default:
      return state
  }
}