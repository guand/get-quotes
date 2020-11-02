import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { startGetRandomQuote, voteRandomQuote } from '../../actions/quotes'
import { Rate, Layout, Typography, Spin, Row, Col } from 'antd'
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons'
const { Header, Content, Footer } = Layout
const { Text } = Typography

const HomePage = ({ startGetRandomQuote, voteRandomQuote }) => {

  const [quote, setQuote] = useState({})
  const [quoteLoading, setQuoteLoading] = useState(false)

  useEffect(() => {
    const fn = async () => {
      setQuoteLoading(true)
      const quoteRes = await startGetRandomQuote()
      setQuoteLoading(false)
      setQuote(quoteRes)
    }
    fn()
  }, [])


  const handleRating = async (e) => {
    setQuoteLoading(true)
    const quoteRes = await voteRandomQuote(quote.id, e)
    setQuoteLoading(false)
    setQuote(quoteRes)
  }
  
  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };


  return (
    <Layout className="layout">
      <Content style={{ padding: '50px', backgroundColor: 'white' }}>
        {quoteLoading ? <Spin tip="Loading..."><figure className="quote">
            <blockquote>
              {quote.en}
            </blockquote>
            <figcaption>
            &mdash; {quote.author}, <cite>{quote.source}</cite>  </figcaption>
          </figure></Spin> : <figure className="quote">
            <blockquote>
              {quote.en}
            </blockquote>
            <figcaption>
            &mdash; {quote.author}, <cite>{quote.source}</cite>  </figcaption>
          </figure>}
          
        <Row justify="space-between">
        <Col span={4}>
        <Text type="success">Rate</Text> <Rate
          character={({ index }) => {
            return customIcons[index + 1];
          }}
          onChange={handleRating}
        />
        </Col>
        <Col span={4}>Your average Rating: {quote.userRating}</Col>
        <Col span={4}>Overall average Rating: {quote.rating}</Col>
        </Row>
      </Content>
    </Layout>
  )
}

const mapStateToProps = state => ({ state })

export default connect(mapStateToProps, { startGetRandomQuote, voteRandomQuote })(HomePage)