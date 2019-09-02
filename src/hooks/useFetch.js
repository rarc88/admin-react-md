import { useState, useContext } from 'react'
import { Context } from '../Context'

export const useFetch = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(undefined)
    const {auth, BASE_URL} = useContext(Context)

    const fetchData = async ({ resource, body = undefined, method = 'POST', backgroud = false  }) => {
        if(!backgroud) {
            setLoading(true)
            setData(undefined)
        }
        
        const options = {
            method: method,
            // body: JSON.stringify(Object.fromEntries(body)),
            body: body,
        }
        options.headers = {
            // 'Content-Type': 'application/json',
            'Authorization': auth.value,
            Accept: 'application/json',
        }
        try {
            const response = await fetch(`${BASE_URL}${resource}`, options)
            const json = await response.json()

            if(!backgroud) {
                setLoading(false)
                setData(json)
            }

            return json
        } catch(error) {
            if(!backgroud) setLoading(false)
            console.log(error)
        }
    }
    
    return {loading, data, fetchData}
}