import axios from 'axios'

// get a random quote
export const startGetRandomQuote = () => async (dispatch) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/quotes`)
  const { quote } = data
  return quote
}

// rate the current quote
export const voteRandomQuote = (quoteId, newVote) => async (dispatch) => {
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/quotes?quoteId=${quoteId}&newVote=${newVote}`)
  const { quote } = data
  return quote
}