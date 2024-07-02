import { useState } from 'react'
import styled from 'styled-components';
import './App.css'
import {RootComponentEvent} from "./components/RootComponentEvent";
import {RootListener} from "./components/RootListener";

const RootOfRoots = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 10px;
  padding: 10px;
`

function App() {
  const [isClicked, setIsClicked] = useState(false);

  return (
      <RootOfRoots>
          <RootComponentEvent/>
          <RootListener/>
      </RootOfRoots>
  )
}

export default App
