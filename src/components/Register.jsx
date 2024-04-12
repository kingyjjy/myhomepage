import React,{useState} from 'react'
import {Container, Row, Col,Form, Button} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useAuthValue } from '../context/AuthContext';

const Register = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword, setConfirmPassword ] = useState('');
  const [error, setError] = useState('');
  const {setTimeActive} = useAuthValue();
  const navigate = useNavigate();

  //패스워드 검증
  const validatePassword = ()=>{
    let isValid = true;
    if(password !== '' && confirmPassword !== ''){
      if(password !== confirmPassword){
        isValid = false;
        setError('비밀번호 오류');
      }
    }
    return isValid;
  }
  const register = (e)=>{
    e.preventDefault();
    setError('');
    if(validatePassword()){
      createUserWithEmailAndPassword(auth, email,password)
      .then(()=>{
        sendEmailVerification(auth.currentUser)
        .then(()=>{
          setTimeActive(true);
          navigate('/verify-email')
        }).catch((err)=>alert(err.message))
        
      }).catch((err)=>setError(err.message))
    }
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    
  }
  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col>
          <h1 className="text-center mt-5 mb-3">회원가입</h1>
          {error && <div className='text-center text-danger'>{error}</div>}
          <Form className='justify-content-center mt-5 mx-auto' onSubmit={register} style={{maxWidth:'400px', border:'1px solid #ddd', borderRadius:'10px', backgroundColor:'#efefef', padding:'40px'}}> 
            <Form.Group className='mb-3' controlId='userid'>
              <Form.Label>email</Form.Label>
              <Form.Control type='email' placeholder='name@example.com' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='userpass'>
              <Form.Label>password</Form.Label>
              <Form.Control type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='reuserpass'>
              <Form.Label>confirm password</Form.Label>
              <Form.Control type='password' placeholder='confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </Form.Group>
            <div className="text-center mt-4">
              <Button type='submit' variant='outline-dark'>JOIN</Button>
            </div>
          </Form>
          <p className="text-end mx-auto pt-3" style={{maxWidth:'400px', padding:'0 40px'}}>
            <Link to='/login'>login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default Register