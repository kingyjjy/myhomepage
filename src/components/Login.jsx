import React,{useState} from 'react'
import {Container, Row, Col,Form, Button} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthValue } from '../context/AuthContext';

const mystyle = {
    normal:{
      backgroundColor:'#4285f4',
      width:'calc(100% - 63px)',
      color:'#fff', 
      display:'flex', 
      justifyContent:'center', 
      alignItems:'center', 
      cursor:'pointer'
    },
    hover:{
      backgroundColor:'#3367d6'
    }
  }

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState('');
  const [hover, setHover] = useState(false);
  const {setTimeActive} = useAuthValue();
  const navigate = useNavigate();

 

  const login = (e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then(()=>{
      if(!auth.currentUser.emailVerified){
        sendEmailVerification(auth.currentUser)
        .then(()=>{
          setTimeActive(true);
          navigate('/verify-email');
        })
        .catch(err=>alert(err.message))
      }else{
        navigate('/');
      }
    })
    .catch(err=>setError(err.message))
  }

  //google
  const handleGoogleSignin = ()=>{
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
    .then(()=>navigate('/'))
    .catch((err) =>alert(err.message))
  }

  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col>
          <h1 className="text-center mt-5 mb-3">회원 로그인</h1>
          {error && <div className='text-center text-danger'>{error}</div>}
          <Form className='justify-content-center mt-5 mx-auto' onSubmit={login} style={{maxWidth:'400px', border:'1px solid #ddd', borderRadius:'10px', backgroundColor:'#efefef', padding:'40px'}}> 
            <Form.Group className='mb-3' controlId='userid'>
              <Form.Label>email</Form.Label>
              <Form.Control type='email' placeholder='name@example.com' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='userpass'>
              <Form.Label>password</Form.Label>
              <Form.Control type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <div className="text-center mt-4">
              <Button type='submit' variant='outline-dark'>LOGIN</Button>
            </div>
          </Form>
          <p className="text-end mx-auto pt-3" style={{maxWidth:'400px', padding:'0 40px'}}>
            <Link to='/register'>register</Link>
          </p>
        </Col>
      </Row>
      <div className="d-flex justify-content-md-center mt-1 mx-auto" style={{maxWidth:'400px', border:'2px solid #4285f4'}}>
        <div style={{background:'url(images/google.png) no-repeat 10px center', height:'50px', backgroundSize:'40px', width:'63px'}}></div>
        <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onClick={handleGoogleSignin} 
              style={{...mystyle.normal, ...(hover? mystyle.hover : null)}}>Sign in With Google</div>
      </div>
    </Container>
  )
}

export default Login