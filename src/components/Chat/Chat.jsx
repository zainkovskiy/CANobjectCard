import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Chat.scss';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { ChatMessage } from 'components/ChatMessage';

export const Chat = ({ isShowChat }) => {
  const [ messages, setMessages ] = useState([
    {
      author: 'bot',
      text: 'Hello world' 
    },
    {
      author: 'zainkovskii',
      text: 'Hello can' 
    },
    {
      author: 'bot',
      text: 'Hello' 
    },
    {
      author: 'zainkovskii',
      text: 'Hello Ivan' 
    },
    {
      author: 'zainkovskii',
      text: 'Hello can' 
    },
  ])
  return (
    <motion.div className='chat'
      initial={{ y: 300, scale: 0 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ y: 300, scale: 0 }}
    >
      <div className="chat__header">
        <ChatTitle>Чат</ChatTitle>
        <IconButton
          size='small'
          onClick={isShowChat}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div className="chat__field">
        {
          messages.map((message, idx) => 
            <ChatMessage
              key={idx}
              message={message}
            />
          )
        }
      </div>
      <div className="chat__send">
        <TextField
          fullWidth
          autoComplete='off'
          size='small'
        />
        <IconButton
          color="primary"
        >
          <SendIcon />
        </IconButton>
      </div>
    </motion.div>
  );
};

const ChatTitle = styled.span`
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-size: 18px;
`
