import React from 'react';
import styled from 'styled-components';

const authorId = 'zainkovskii';

const Message = styled.div`
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0.5rem;
  align-self: ${(props) => props.author === authorId ? 'flex-end' : 'flex-start'};
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 20%;
  background-color: ${(props) => props.author === authorId ? 'honeydew' : '#fff'};;
`
const Author = styled.div`
  font-family: Montserrat, sans-serif;
  font-size: 9px;
`
const Text = styled.div`
font-family: Montserrat, sans-serif;
`

export const ChatMessage = ({ message }) => {
  return (
    <Message author={message.author}>
      <Author>{message.author}</Author>
      <Text>{message.text}</Text>
    </Message>
  );
};
