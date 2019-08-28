import { useState } from 'react'

const BASE_URL = 'http://localhost:3000/api'

export const useFetch = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(undefined)

    const fetchData = async (resource, body) => {
        setLoading(true)
        setData(undefined)
        const options = {
            method: 'POST',
            body: JSON.stringify(body),
        }
        options.headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
        try {
            const response = await fetch(`${BASE_URL}${resource}`, options)
            const json = await response.json()
            setLoading(false)
            setData(json)
            return json
        } catch(errorFetch) {
            setLoading(false)
            console.log(errorFetch)
        }
    }
    
    return {loading, data, fetchData}
}