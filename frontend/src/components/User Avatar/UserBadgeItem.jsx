import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'

function UserBadgeItem({user, handleFunction}) {
  return (
    <Box 
    p={2}
    py={1}
    borderRadius={'lg'}
    m={1}
    variant='solid'
    backgroundColor={'green'}
    color={'white'}
    fontSize={12}
    cursor={'pointer'}
    onClick={handleFunction}
    
    >
        {user.name}
        <CloseIcon pl={1} />
    </Box>
  )
}

export default UserBadgeItem