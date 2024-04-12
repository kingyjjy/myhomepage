import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Left from './Left'
import {FcAssistant} from 'react-icons/fc'
import { Link } from 'react-router-dom'

const Header = ({children}) => {
  return (
   <Container>
        <Row>
            <Col md='3' style={{borderRight:'1px solid #ddd'}}>
                <h1 className="text-center mt-5 pt-5">
                    <Link to='/'><FcAssistant/></Link>
                </h1>
                <Left/>
            </Col>
            <Col md='9'>{children}</Col>
        </Row>
   </Container>
  )
}

export default Header