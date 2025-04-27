import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Box,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useToast,
    FormControl,
    Input,
  } from '@chakra-ui/react'
import { deployContract } from '../../Contract/deployContract';



function ContractFormModal({children, setContractAddress, setVideos}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [address, setAddress] = useState(0);
    const [url, setUrl] = useState();
    const [deposit, setDeposit] = useState();
    const [pricePerThousandViews, setPricePerThousandViews] = useState();
    const [duration, setDuration] = useState(0);

    const toast = useToast();

    const handleSubmit = async () =>{
        if (!address || !url || !pricePerThousandViews || !duration || !deposit) {
            toast({
                position: "top",
               title:"All Fields are required",
                isClosable: true,
                duration: 5000,
                status:"error"
            })
            return;
        }
    try {
       const contractaddress = await deployContract(address,url,pricePerThousandViews,duration,deposit);
        console.log(contractaddress)
        setContractAddress(contractaddress)

        const obj = {
            "url" : url,
            "deposite": deposit,
            "duration": duration,
            "active": true
        }

        setVideos(obj)
        
        toast({
            position: "top",
           title:"Contract Deployed Successfully",
            isClosable: true,
            duration: 5000,
            status:"success"
        })
      onClose()

    } catch (error) {
      toast({
        position: "top",
       title:"Error while Creating Group",
        isClosable: true,
        duration: 5000,
        status:"error"
    })
    return
    }


  }

    return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
             bgGradient="linear(to-b,rgba(43, 255, 255, 0.12) 0%, rgba(43, 255, 255, 0.04) 50%, rgba(43, 255, 255, 0.07) 100%)"
             borderRadius="2xl"
             p={6}
             boxShadow="lg"
             color="green.900"
            >
              <ModalHeader fontSize={'35px'} display={'flex'} justifyContent={'center'}>Create Ad Contract</ModalHeader>
              <ModalCloseButton />
              <ModalBody display={'flex'} 
              flexDir={'column'}
              alignItems={'center'}
              >
                <FormControl>
                    <Input placeholder='Youtuber address'  border="1px solid #00AA66"
                borderRadius="lg" mb={3} onChange={(e)=> setAddress(e.target.value)} />
                </FormControl>
                <FormControl>
               
                    <Input placeholder='Youtube Video Link'  border="1px solid #00AA66"
                borderRadius="lg" mb={1} onChange={(e)=> setUrl(e.target.value)} />
                </FormControl>
                <FormControl>
                    <Input placeholder='1000 view Rate (ETH)'  border="1px solid #00AA66"
                borderRadius="lg" mb={3} onChange={(e)=> setPricePerThousandViews(e.target.value)} />
                </FormControl>
                <FormControl>
                    <Input placeholder='Duration (days)'  border="1px solid #00AA66"
                borderRadius="lg" mb={3} onChange={(e)=> setDuration(e.target.value)} />
                </FormControl>
                <FormControl>
                    <Input placeholder='Deposite(ETH)'  border="1px solid #00AA66"
                borderRadius="lg" mb={1} onChange={(e)=> setDeposit(e.target.value)} />
                </FormControl>
            


              </ModalBody>
    
              <ModalFooter display={"flex"} justifyContent={"center"} >
                <Button  colorScheme='green' mr={1}  w="50%"
              bg="#00AA66"
              color="white"
              borderRadius="2xl"
              _hover={{ bg: '#009955' }}
              onClick={handleSubmit}>
                  Create Contract
                </Button>

              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default ContractFormModal