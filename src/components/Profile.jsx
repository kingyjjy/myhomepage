import React,{useEffect, useState} from 'react'
import { Container, Row } from 'react-bootstrap'
import { useAuthValue } from '../context/AuthContext'

const Profile = () => {
  const { currentUser } = useAuthValue();
  const [verify, setVerify] = useState(false);
  const vry = ()=>{
    if(currentUser){
      if(currentUser.emailVerified){
        setVerify('인증완료');
      }
    }
  }
  useEffect(()=>{
    vry();
  }, []);
  return (
    <Container className='pt-3'>
      <Row className='mt-5 mb-5 pb-5'>
        <h1 className="text-center pt-4 mb-5">PROFILE</h1>
        <p><strong>Email : </strong>{currentUser?.email}</p>
        <p><strong>Email verified : </strong>{verify}</p>
      </Row>
    </Container>
  )
}

export default Profile