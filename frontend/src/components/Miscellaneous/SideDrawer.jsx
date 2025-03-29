import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "../User Avatar/UserListItem";
import { getSender } from "../../Config/Chatlogics";
import NotificationBadge from "@parthamk/notification-badge";
import { Effect } from "@parthamk/notification-badge";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();

  const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Enter Something",
        position: "top-left",
        isClosable: true,
        duration: 5000,
        status: "warning",
      });

      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (err) {
      toast({
        title: "Error while searching",
        position: "top-left",
        isClosable: true,
        duration: 5000,
        status: "error",
      });
    }
  };

  const accessChat = async (userId) => {
    
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      const { data } = await axios.post(`/api/chat`, { userId }, config);
     
      
    
      if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      console.log(data)
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (err) {
      toast({
        title: "Error Fetching the chats",
        description: err.message,
        position: "top-left",
        isClosable: true,
        duration: 5000,
        status: "error",
      });
    }
  };

  return (
    <>
      {/* <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="green"
        w="100%"
        p="5px 10px 5px 10px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" ref={btnRef} onClick={onOpen}>
            <Search2Icon />
            <Text d={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl">Flamingo</Text>

        <div>
          <Menu>
            <MenuButton p={2}>
              <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
              />
              <BellIcon m={1} fontSize="2xl" />
            </MenuButton >
            <MenuList pl={4}>
            {!notification.length && "No New Message"}
            {notification.map((notif) =>(
              <MenuItem key={notif._id} onClick={()=>{
                setSelectedChat(notif.chat)
                setNotification(notification.filter((n)=> n !== notif));
              }}>
                {notif.chat.isGroupedChat?`New Message is ${notif.chat.chatName}`:`New Message from ${getSender(user, notif.chat.users)}`}
              </MenuItem>
            ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal
                user={user}
                childern={<MenuItem color="#02C173">My Profile</MenuItem>}
              ></ProfileModal>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box> */}

      <Drawer
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? ( <ChatLoading /> ) : 
            (
              searchResult.map((users) => (
                <UserListItem
                  key={users._id}
                  user={users}
                  handleFunction={() => accessChat(users._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
