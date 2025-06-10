import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import bcrypt from "bcryptjs";

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [hasedOtp, setHashedOtp] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const toast = useToast();
  const history = useHistory();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer); // cleanup
  }, [cooldown]);

  const handleClick = () => {
    console.log(show);
    setShow(!show);
  };

  const getOtp = async () => {
    setLoading(true);
    const url = "http://localhost:5000/api/v1/auth/otp/send-otp";
    const gethash = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    const data = await gethash.json();
    if (!gethash.ok) {
      if (gethash.status === 401) {
        throw new Error("Unauthorized: Please log in again.");
      } else if (gethash.status === 403) {
        throw new Error("Forbidden: You don’t have access.");
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    }
    setHashedOtp(data.otp ? data.otp : "");
    setLoading(false);
    setCooldown(60);
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!email || !password) {
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
    const verifyOtp = async (Otp) => {
      console.log(Otp, hasedOtp);
      const isOtpCorrect = await bcrypt.compare(Otp, hasedOtp);
      return isOtpCorrect;
    };

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // const {data} = await axios.post("/api/user/login",
      //     {email, password},
      //     config
      // )
      const isOtpCorrect = await verifyOtp(password);
      console.log(isOtpCorrect);
      if (!isOtpCorrect) {
        toast({
          title: "OTP is incorrect",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        return;
      }
      toast({
        title: "Log In Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      localStorage.setItem("userInfo", JSON.stringify("user"));
      setLoading(false);
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/otp/get-tokens",
        {
          email: email,
        },
        {
          headers: config.headers,
          withCredentials: true,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Please log in again.");
        } else if (response.status === 403) {
          throw new Error("Forbidden: You don’t have access.");
        } else {
          throw new Error(data.message || "Something went wrong.");
        }
      }
     localStorage.setItem('accessToken',data.accessToken)
      
      history.push("/home");
    } catch (err) {
      toast({
        title: "Error",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Enter Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        type="Submit"
        isLoading={loading}
        onClick={getOtp}
        isDisabled={cooldown > 0}
      >
        {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Send OTP"}
      </Button>
      <Button type="Submit" isLoading={loading} onClick={handleSubmit}>
        Log In
      </Button>
      <Button
        variant="solid"
        colorScheme="purple"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("12345");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

export default Login;
