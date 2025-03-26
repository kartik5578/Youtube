import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

function Login() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();
   

    const handleClick= ()=>{
        console.log(show);
        setShow(!show);
    }


    const handleSubmit =async ()=>{
        setLoading(true);

        if(!email || !password){
            toast({
                title: "Please fill all Fields!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }

        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }

            const {data} = await axios.post("/api/user/login", 
                {email, password},
                config
            )
            toast({
                title: "Log In Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            });

            localStorage.setItem("userInfo", JSON.stringify(data));

            setLoading(false);
            history.push("/home")
        }catch(err){
            toast({
                title: "Error",
                description: err.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setLoading(false);
        }
    }

  return (
    <VStack spacing='10px'>
        <FormControl id='email' isRequired>
            <FormLabel>Enter Email</FormLabel>
            <Input placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
        </FormControl>

        <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input type={show ? 'text' : 'password'} value={password} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}></Input>
            <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
            </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button type="Submit" isLoading={loading} onClick={handleSubmit}>Log In</Button>
        <Button variant='solid' colorScheme='purple' onClick={() =>{
            setEmail("guest@example.com");
            setPassword("12345")
        } }>Get Guest User Credentials</Button>

    </VStack>
  )
}

export default Login