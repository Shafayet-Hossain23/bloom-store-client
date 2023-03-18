import { useEffect, useState } from "react"

export const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [adminLoading, setAdminLoading] = useState(true)
    useEffect(() => {
        fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/users/admin?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data?.isAdmin) {
                    setIsAdmin(data?.isAdmin)
                    setAdminLoading(false)
                }
                if (!data?.isAdmin) {
                    setIsAdmin(false)
                    setAdminLoading(false)
                }

            })
    }, [email])
    return [isAdmin, adminLoading]
}