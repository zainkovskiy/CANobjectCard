import React from 'react';
import styled from 'styled-components'

const StatusBarItemComponent = styled.div`
  color: #fff;
  background-color: ${props => props.status ? '#0c54a0' : '#ccc'};
  padding: 0.5rem 1.5rem 0.5rem 1rem;
  font-family: Montserrat, sans-serif;
  font-size: 12px;
  clip-path: polygon(90% 0, 100% 50%, 90% 100%, 0 100%, 0 0);
`

export const StatusBarItem = ({ title, status }) => {
  return (
      <StatusBarItemComponent status={status} >
        {title}
      </StatusBarItemComponent>
  );
};
