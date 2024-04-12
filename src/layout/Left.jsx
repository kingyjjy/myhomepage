import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

const Left = () => {
  return (
    <div>
       <ListGroup as='ul'>
            <ListGroup.Item as='li'><Link to='/'>HOME</Link></ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item as='li'><Link to='/profile'>PROFILE</Link></ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item as='li'><Link to='/bbs'>BBS</Link></ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item as='li'><Link to='/upload'>image upload</Link></ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item as='li'><Link onClick={()=>signOut(auth)}>LOGOUT</Link></ListGroup.Item>
          </ListGroup>
    </div>
  )
}

export default Left