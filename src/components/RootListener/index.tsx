import {StupidRootWrapper} from "../StupidRootWrapper";
import {CollectionType, useStupidStore} from "../../stupidStore";
import {useEffect, useState} from "react";
import {ItemWithListener} from "../Item/ItemWithListener";

export const RootListener = () => {
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

    const toggleSelectionTimeout = ({ index }: { index: CollectionType['index'] }) => {
        if (isAvatarMouseDown) {
            setTimeout(() => updateStore({
                [index]: {
                    index,
                    checked: true
                }
            }), 0)
        }
    }

    const toggleSelection = ({ index }: { index: CollectionType['index'] }) => {
        if (isAvatarMouseDown) {
            updateStore({
                [index]: {
                    index,
                    checked: true
                }
            })
        }
    }

    const Children = Object.values(store).map((value, index) => {
        return (
            <ItemWithListener
                handleIsAvatarMouseDown={ handleIsAvatarMouseDown }
                isAvatarMouseDown={ isAvatarMouseDown }
                toggleSelection={ withTimeout ? toggleSelectionTimeout : toggleSelection }
                key={ value.index }
                {...value}
            >
                { index }
            </ItemWithListener>
        )
    })
    return (
        <StupidRootWrapper name="RootListener">
            { Children }
            <div onClick={dropState} >Drop state</div>
            <div onClick={toggleWithTimeout}>{ withTimeout ? 'with timeout' : 'without timeout' }</div>
        </StupidRootWrapper>
    );
}
