import React, { useState, useEffect } from 'react'
import Navbar from '../../components/nav-bar'
import SearchBar from '../../components/search-bar'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import API from 'framework/api'
import { UserInfo } from './user'
import Loading from '../../components/Loading'
import { formatDate } from './../../util/Utility'

export const Login = () => {
  const [userinfo, setUserInfo] = useState<UserInfo>()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    API.get('https://randomuser.me/api/', {}, undefined, {}, true)
      .then((res) => {
        const userInfo = res?.results[0]
        console.log('userinfo', userInfo)
        userInfo['dob'].date = formatDate(userInfo.dob.date)
        setUserInfo(userInfo)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }, [])
  return (
    <>
      <Loading isLoading={isLoading} />
      <Navbar />
      <SearchBar />
      {userinfo && (
        <div className="items-star  flex p-8 py-4">
          <div className="w-1/5 items-start bg-white p-0">
            <div className="flex flex-col justify-center">
              <img
                src={userinfo?.picture?.large}
                className="h-48 w-96 object-contain"
              />
              <div className="text-center text-sm text-orange-500">
                {userinfo?.name?.title}&nbsp; {userinfo?.name?.first} &nbsp;
                {userinfo?.name?.last}
              </div>
            </div>
          </div>
          <div className="flex w-4/5 flex-col">
            <div className="mb-2 flex w-full flex-row border p-4">
              <div className="flex w-1/5 justify-start">Email</div>
              <div className="flex w-4/5 justify-start">{userinfo?.email}</div>
            </div>
            <div className="flex w-full flex-row border p-4">
              <div className="flex w-1/5 justify-start">Phone Number</div>
              <div className="flex w-4/5 justify-start">
                {userinfo?.cell} , {userinfo?.phone}
              </div>
            </div>
            <div className="flex w-full flex-row border p-4">
              <div className="flex w-1/5 justify-start">Gender</div>
              <div className="flex w-4/5 justify-start">{userinfo?.gender}</div>
            </div>
            <div className="flex w-full flex-row border p-4">
              <div className="flex w-1/5 justify-start">DOB</div>
              <div className="flex w-4/5 justify-start">
                {userinfo?.dob?.date}
              </div>
            </div>
            <div className="flex w-full flex-row border p-4">
              <div className="flex w-1/5 justify-start">Age</div>
              <div className="flex w-4/5 justify-start">
                {userinfo?.dob?.age}
              </div>
            </div>
            <div className="flex w-full flex-row border p-4">
              <div className="flex w-1/5 justify-start">Address</div>
              <div className="flex w-4/5 justify-start">
                {userinfo?.location?.street?.number},{' '}
                {userinfo?.location?.street?.name}, {userinfo?.location?.city},
                {userinfo?.location?.state},{userinfo?.location?.country}{' '}
                {userinfo?.location?.postcode}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Login
