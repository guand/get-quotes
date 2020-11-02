import express from 'express'
import axios from 'axios'
import qs from 'querystring'
import db from '../database'
import stringSimilarity from 'string-similarity'

const router = express.Router()
const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;


router.route('/')
  .get(async (req, res) => {
    try {
      const quotesRes = await axios.get(`${process.env.QUOTE_URL}quotes`) // get the list of quotes
      let randomQuote = quotesRes.data[Math.floor(Math.random() * quotesRes.data.length)] // get a random quote within that list
      const ratings = await db('ratings').select('rating').where('rating_id', randomQuote.id) // check database if you have rated the quote before
      const list_ratings = ratings.map(rating => { 
        return rating.rating
      })
      const userRating = average(list_ratings) ? average(list_ratings) : 0 // get the average of your previous ratings
      randomQuote['userRating'] = userRating
      res.send({message: "success", quote: randomQuote})
    } catch (err) {
      console.log(err)
      res.status(400).send(err)
    }
  })

  .post(async (req, res) => {

    const { quoteId, newVote } = req.query

    const requestBody = {
      quoteId: quoteId,
      newVote: newVote
    }

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    try {
      const rateRes = await axios.post(`${process.env.QUOTE_URL}quotes/vote`, qs.stringify(requestBody), config) // rate the current quote
      await db('ratings').insert({rating_id:quoteId, rating: newVote}) // save what you rated the current quote in local database
      const quotesRes = await axios.get(`${process.env.QUOTE_URL}quotes`)
      let randomQuote = quotesRes.data[Math.floor(Math.random() * quotesRes.data.length)]
      let currentItem = null
      for (var value of quotesRes.data) {
        if (value.id == quoteId) {
          currentItem = value
          break
        }
      }
      let currentScore = 0
      let currentQuote = {}



      if (parseInt(newVote) < 3) {
        currentScore = 1  // set current Score to 100 as we want the lowest score for ratings of 2 or less
        for (var value of quotesRes.data) {
          if (currentItem.id != value.id) {
            let score = stringSimilarity.compareTwoStrings(currentItem.en, value.en)
            if (score < currentScore) {
              currentScore = score
              currentQuote = value
            }
          }
        }
      } else if (parseInt(newVote) == 3) {
        currentQuote = randomQuote // 3 is considered neutral so just get a random quote
      } else {
        currentScore = 0 // set score to 0 as we want to get the highest score for ratings of 4 or more
        for (var value of quotesRes.data) {
          if (currentItem.id != value.id) {
            let score = stringSimilarity.compareTwoStrings(currentItem.en, value.en)
            if (score > currentScore) {
              currentScore = score
              currentQuote = value
            }
          }
        }
      }
      const ratings = await db('ratings').select('rating').where('rating_id', currentQuote.id) // get your ratings for the current quote
      const list_ratings = ratings.map(rating => {
        return rating.rating
      })
      const userRating = average(list_ratings) ? average(list_ratings) : 0
      currentQuote['userRating'] = userRating
      res.send({message: "success", quote: currentQuote})
    } catch (err) {
      console.log(err)
      res.status(400).send(err)
    }
  })


export default router
