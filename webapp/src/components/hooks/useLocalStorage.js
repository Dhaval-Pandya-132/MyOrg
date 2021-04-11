// When we close our browser, we want our information to persist 
// So we use useLocalStorage
// It will work as useState and store everything in local storage 
// So even if we close/refresh our page the data is there

import { useEffect, useState } from 'react'

const PREFIX = 'runtime-error-webchat-data-'
// Key is the value we will use to store in local
// and valye is the actual state we are saving
export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        if(jsonValue != null) return JSON.parse(jsonValue)
        if(typeof initialValue === 'function'){
            return initialValue()
        }
        else {
            return initialValue;
        }
    })
    
    useEffect(() => {


        localStorage.setItem(prefixedKey, JSON.stringify(value))

    }, [prefixedKey, value])

    return [value, setValue]
}

