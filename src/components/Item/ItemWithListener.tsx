import React, {FC, useEffect, useRef} from 'react';
import styled from "styled-components";
import {CollectionType} from "../../stupidStore";

type Props = {
    children: React.ReactNode;
    handleIsAvatarMouseDown: ({ index }: { index: CollectionType['index'] }) => void;
    toggleSelection: ({ index }: { index: CollectionType['index'] }) => void;
    isAvatarMouseDown: boolean;
} & CollectionType;

const Avatar = styled.div<Pick<Props, 'checked'>>`
  width: 30px;
  height: 30px;
  background: ${ props => props.checked ? 'red' : 'gray' };
  border-radius: 50%;
  pointer-events: auto;
`

const ItemRoot = styled.div`
  height: 40px;
  width: 400px;
  display: flex;
  box-sizing: border-box;
  padding: 5px;
  border-bottom: 1px solid white;
  align-items: center;
  gap: 5px;
  user-select: none;
  pointer-events: auto;
`

export const ItemWithListener: FC<Props> = ({
    index,
    children,
    handleIsAvatarMouseDown,
    checked ,
    isAvatarMouseDown,
    toggleSelection,
}) => {

    const ref = useRef<React.LegacyRef<HTMLDivElement>>(null)

    const onMouseDown = () => {
        handleIsAvatarMouseDown({ index })
    }

    const handleToggleSelection = () => {
        toggleSelection({ index })
    }

    useEffect(() => {
        ref.current?.addEventListener('mouseover', handleToggleSelection, { capture: true })
        return () => ref.current?.removeEventListener('mouseover', handleToggleSelection, { capture: true })
    }, [handleToggleSelection]);

    return (
        <ItemRoot ref={ ref }>
            <Avatar onMouseDown={ onMouseDown } checked={ checked }/>
            { children }
        </ItemRoot>
    )
}
