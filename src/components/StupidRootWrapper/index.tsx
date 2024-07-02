import React, { FC } from 'react';

import styled from "styled-components";

const StupidRootWrapperRoot = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid white;
  padding: 10px;
`

const StupidRootWrapperContent = styled.div`
  display: flex;
  flex-direction: column;
`

type Props = {
    name: string;
    children: React.ReactNode
}

export const StupidRootWrapper: FC<Props> = ({ name, children }) => {
    return (
        <StupidRootWrapperRoot>
            { name }
            <StupidRootWrapperContent>
                { children }
            </StupidRootWrapperContent>
        </StupidRootWrapperRoot>
    )
}
