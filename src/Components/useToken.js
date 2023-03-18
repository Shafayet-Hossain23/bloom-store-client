import { useEffect, useState } from "react"

export const useToken = (email) => {
    const [token, setToken] = useState('')
    useEffect(() => {
        fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data?.accessToken) {
                    localStorage.setItem("accessToken", data?.accessToken)
                    setToken(data?.accessToken)
                }
            })
    }, [email])
    return token
}