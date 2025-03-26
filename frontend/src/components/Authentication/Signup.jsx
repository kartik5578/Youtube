import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import {useHistory} from "react-router-dom"

function Signup() {
   const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dusjvype1/image/upload";

    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [pic, setPic] = useState(null);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const handleClick = () => {
        setShow(!show);
    }

    const postDetails = (pics) => {
        setLoading(true);

        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dusjvype1");
            
            fetch(CLOUDINARY_URL, {
                method: 'post',
                body: data,
            }).then((res) => res.json())
                .then(data => {
                    setPic(data.url.toString());
                    // console.log(data);
                    setLoading(false);
                }).catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        if(!name || !email || !password || !confirmpassword){
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

        if(password !== confirmpassword){
            toast({
                title: "Password and Confirm Password does not match",
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

            const {data} = await axios.post("/api/user", 
                {name, email, password, pic},
                config
            );
            toast({
                title: "Registed Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            });

            localStorage.setItem("userInfo", JSON.stringify(data));

            setLoading(false);
            history.push("/chats")
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
            <FormControl id='first-name' isRequired>
                <FormLabel>Enter Name</FormLabel>
                <Input placeholder='Enter your Name' onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Enter Email</FormLabel>
                <Input placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)} />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? 'text' : 'password'} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='confirmpassword' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input type={show ? 'text' : 'password'} placeholder='Re-enter your password' onChange={(e) => setConfirmpassword(e.target.value)} />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='pic'>
                <FormLabel>Upload Picture</FormLabel>
                <Input type='file' p={1.5} accept='image/*' onChange={(e) => postDetails(e.target.files[0])} />
            </FormControl>

            <Button type="submit" isLoading={loading} onClick={handleSubmit}>Sign Up</Button>
        </VStack>
    )
}

export default Signup;
