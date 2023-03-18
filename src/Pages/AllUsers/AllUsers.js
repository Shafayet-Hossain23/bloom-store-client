import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingElement from '../../Components/LoadingElement';
import useTitle from '../../Components/useTitle';

const AllUsers = () => {
    const { data: usersData = [], isLoading: usersLoading, refetch: usersRefetch } = useQuery({
        queryKey: ["getAllUser"],
        queryFn: async () => {
            const res = await fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/getAllUser`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(usersData)
    useTitle("All Users")
    if (usersLoading) {
        return <LoadingElement></LoadingElement>
    }
    return (
        <div className='lg:mx-7 lg:mt-7 mx-2 mt-2'>
            <div className='my-10 bg-[#F4F4F4] p-2'>
                <h1 className='text-2xl font-semibold'>All Users</h1>
            </div>
            {
                usersData?.length > 0 ? < div className="overflow-x-auto mb-20">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                usersData.map((data, i) => <tr
                                    key={data?._id}
                                    className="hover"
                                >
                                    <td>
                                        {data?.name}
                                    </td>
                                    <td>
                                        {data?.email}
                                    </td>

                                </tr>)
                            }


                            {/* row 3 */}

                        </tbody>
                    </table>
                </div> :
                    <div className='bg-[#F8D7DA] p-4 my-28'>
                        <p>No users are registered in your website.</p>
                    </div>
            }
        </div>
    );
};

export default AllUsers;