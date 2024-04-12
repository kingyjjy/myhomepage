import React,{useState, useEffect} from 'react'
import {Container, Row, Col,Form, Button, ButtonGroup, ButtonToolbar, InputGroup} from 'react-bootstrap'
import { storage } from '../firebase'
import { getDownloadURL, listAll, ref, uploadBytes} from 'firebase/storage'
import { v4 } from 'uuid'

const Upload = () => {
    const [img, setImg] = useState('');
    const [imgUrl, setImgUrl] = useState([]);
    const handleUpload= ()=>{
        if(img !== null){
            const imgRef = ref(storage, `files/${v4()}`)
            uploadBytes(imgRef, img)
            .then((value)=>{
                console.log(value);
                getDownloadURL(value.ref)
                .then(url => {
                    setImgUrl(data =>[...data, url])
                })
            })
        }
    }
    useEffect(()=>{
        listAll(ref(storage, "files")).then(
           (imgs) => {
               console.log(imgs)
               imgs.items.forEach(val => {
                  getDownloadURL(val).then(url =>{ 
                     setImgUrl(data => [...data, url])
               })
           })
       })   
     }, []);
  return (
    <Container className='mt-5 pt-5'>
        <Row className='mb-5 pb-3'>
            <Col md='6'>
                <InputGroup>
                    <Form.Control type='file' onChange={(e)=>setImg(e.target.files[0])} aria-aria-description='inputG'/> 
                    <Button variant='secondary' id='inputG' onClick={handleUpload}>업로드</Button>
                </InputGroup>
            </Col>
        </Row>
        <Row>
            {
                imgUrl.map((data,index)=>(
                    <Col key={index} lg='4' md='12' className='mb-4 mb-lg-0'>
                        <img src={data} alt='{data}' className='w-100 rounded mb-4'/>
                    </Col>
                ))
            }
        </Row>
    </Container>
  )
}

export default Upload