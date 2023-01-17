import React from 'react';
import styled from 'styled-components'
import { StatusBarItem } from "components/StatusBarItem";

const StatusBarStyleComponent = styled.div`
  display: flex;
  gap: 1rem;
`

export const StatusBar = ({status}) => {
  return (
    <StatusBarStyleComponent>
      {
        statusList.map((item, idx) => {
          return (
            <StatusBarItem
              key={idx}
              title={item}
              status={ idx <= status }
            />
          )
        })
      }
    </StatusBarStyleComponent>
  );
};

const statusList = [
  'Черновик',
  'Листинг',
  'Реклама',
  'Сделка',
]