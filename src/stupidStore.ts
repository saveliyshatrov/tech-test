import React, { useState } from "react";

const initState = new Array(22).fill(undefined).reduce((acc, _, index) => {
    return {
        ...acc,
        [index]: {
            index,
            checked: false,
        }
    }
}, {})

export type CollectionType = { index : number, checked: boolean }

type StoreType = Record<string | number, CollectionType>

export const useStupidStore = () => {
    const [store, setStore] = useState<StoreType>(initState);
    const updateStore = (updateCollection: StoreType) => {
        setStore(prevState => ({
            ...prevState,
            ...updateCollection,
        }));
    };

    const dropState = () => {
        setStore(initState);
    }

    return {
        store,
        updateStore,
        dropState,
    }
}
