import {useEffect, useState} from "react";
import {StupidRootWrapper} from "../StupidRootWrapper";
import {Item} from "../Item";
import {useStupidStore, CollectionType} from "../../stupidStore";

export const RootComponentEvent = () => {
    const { store, updateStore, dropState } = useStupidStore();
    const [ isAvatarMouseDown, setIsAvatarMouseDown ] = useState(false);
    const [withTimeout, setWithTimeout] = useState(false);

    const toggleWithTimeout = () => setWithTimeout(prev => !prev);

    const handleMouseUp = () => setIsAvatarMouseDown(false);

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, [])
    const handleIsAvatarMouseDown = ({ index }: { index: CollectionType['index'] }) => {
        setIsAvatarMouseDown(true);
        updateStore({
            [index]: {
                index,
                checked: true
            }
        })
    }

    const toggleSelection = ({ index }: { index: CollectionType['index'] }) => {
        updateStore({
            [index]: {
                index,
                checked: true
            }
        })
    }

    const toggleSelectionTimeout = ({ index }: { index: CollectionType['index'] }) => {
        setTimeout(() => updateStore({
            [index]: {
                index,
                checked: true
            }
        }), 0)
    }

    const Children = Object.values(store).map((value, index) => {
        return (
            <Item
                handleIsAvatarMouseDown={ handleIsAvatarMouseDown }
                isAvatarMouseDown={ isAvatarMouseDown }
                toggleSelection={ withTimeout ? toggleSelectionTimeout : toggleSelection }
                key={ value.index }
                {...value}
            >
                { index }
            </Item>
        )
    })
    return (
        <StupidRootWrapper name="RootComponentEvent">
            { Children }
            <div onClick={dropState} >Drop state</div>
            <div onClick={toggleWithTimeout}>{ withTimeout ? 'with timeout' : 'without timeout' }</div>
        </StupidRootWrapper>
    )
}
