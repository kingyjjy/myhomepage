import React,{useState, useEffect} from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useAuthValue } from '../context/AuthContext'
import { auth } from '../firebase'
import { sendEmailVerification } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const VerifyEmail = () => {
  const {currentUser} = useAuthValue();
  const [time, setTime] = useState(60);
  const {timeActive, setTimeActive} = useAuthValue();
  const navigate = useNavigate();
  useEffect(()=>{
    const interval = setInterval(()=>{
      currentUser?.reload()
      .then(()=>{
        if(currentUser?.emailVerified){
          clearInterval(interval);
          navigate('/');
        }
      })
    },1000)
  },[navigate,currentUser])

  useEffect(()=>{
    let interval = null;
    if(timeActive && time !== 0){
      interval = setInterval(()=>{
        setTime((time)=>time-1)
      },1000)
    }else if(time == 0){
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return ()=>clearInterval(interval);
  },[timeActive, time, setTimeActive])
  const resendEmailVerification=()=>{
    sendEmailVerification(auth.currentUser)
    .then(()=>{
      setTimeActive(true);
    })
    .catch((err)=>alert(err.message))
  }
  
  return (
    <Container style={{maxWidth:"600px", marginTop:'80px', textAlign:'center'}}>
      <Row>
        <Col>
          <h1 style={{fontSize:'1.8em'}}>Please check your email address.</h1>
          <p><strong>확인이메일이 다음 주소로 발송되었습니다.</strong></p>
          <p className="text-center text-danger">{currentUser?.email}</p>
          <div className="text-center mt-5">
            <Button variant='success' onClick={resendEmailVerification} disabled={timeActive}>이메일 다시보내기{timeActive && time}</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default VerifyEmail