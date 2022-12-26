import React, { useState } from 'react'
import Navbar from '../../components/nav-bar'
import SearchBar from '../../components/search-bar'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { endpoint } from 'framework/config'
import Loading from '../../components/Loading'
import API from 'framework/api'

interface UserInfo {
  username: String
  password: String
}
export const Login = () => {
  const [userinfo, setUserInfo] = useState<UserInfo>({
    username: '',
    password: '',
  })
  const [isLoading, setLoading] = useState(false)

  const onChangeFor = (e: any, type: String) => {
    if (type == 'password') {
      setUserInfo({ ...userinfo, password: e.target.value })
    } else {
      setUserInfo({ ...userinfo, username: e.target.value })
    }
  }
  const login = () => {
    console.log('login', userinfo)
    setLoading(true)
    API.post(endpoint?.LOGIN_API, {}, undefined, userinfo)
      .then((res) => {
        window.localStorage.setItem('token', res?.data?.token)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }
  return (
    <>
      <Loading isLoading={isLoading} />
      <Navbar />
      <SearchBar />
      <div className="flex w-full justify-center">
        <div className="w-3/5 px-4 md:px-0">
          <div className="md:mx-6 md:p-12">
            <form>
              <p className="mb-4">
                Please login to your account(u: mor_2314 p:83r5^_)
              </p>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  id="exampleFormControlInput1"
                  placeholder="Username"
                  value={userinfo.username}
                  onChange={(e) => onChangeFor(e, 'username')}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  id="exampleFormControlInput1"
                  placeholder="Password"
                  onChange={(e) => onChangeFor(e, 'password')}
                  value={userinfo.password}
                />
              </div>
              <div className="mb-12 pt-1 pb-1 text-center">
                <button
                  className="mb-3 inline-block w-full rounded bg-orange-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                  type="button"
                  onClick={() => login()}
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login
