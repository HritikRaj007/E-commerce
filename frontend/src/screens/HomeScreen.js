import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import ProductCarousel from '../components/ProductCarousel'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import Meta from '../components/Meta'

const HomeScreen = ({match}) => { 
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1
  const keyword = match.params.keyword
  const productList = useSelector((state) => state.productList)
  
  const { loading, error, products, page, pages } = productList
 // console.log(loading,error,products);
  useEffect(() => {
    dispatch(listProducts(keyword,pageNumber))
  }, [dispatch,keyword,pageNumber])
  
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
      <>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate
          pages={pages}
          page={page}
          keyword={keyword ? keyword : ''}
        />
      </>
      )}
    </>
  )
}

export default HomeScreen