import { useRouter } from 'next/router'
import React from 'react'

export const Navbar = (props: any) => {
  const router = useRouter()
  const isLogin =
    typeof window != 'undefined' && !window.localStorage.getItem('token')
  const topMenu = [
    {
      id: 1,
      title: 'SAVE MORE ON APP',
    },
    {
      id: 2,
      title: 'SELL ON LAZADA',
    },
    {
      id: 3,
      title: 'CUSTOMER CARE',
    },
    {
      id: 4,
      title: 'DASHBOARD',
      onclick: () => {
        router.push('/dashboard')
      },
    },
    ...[
      isLogin
        ? {
            id: 6,
            title: 'LOGIN',
            onclick: () => {
              router.push('/login')
            },
          }
        : {
            id: 6,
            title: 'LOGOUT',
            onclick: () => {
              window.localStorage.removeItem('token')
              router.push('/login')
            },
          },
    ],
  ]
  return (
    <div className="">
      <nav className="bg-slate-100 px-2">
        <div className="flex flex-wrap justify-end">
          <div className="md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col rounded-lg bg-transparent p-1 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-xs">
              {topMenu.map((val, key) => (
                <li>
                  <a
                    href="#"
                    className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white dark:text-white md:bg-transparent md:p-0 md:text-orange-500"
                    aria-current="page"
                    onClick={val?.onclick}
                  >
                    {val.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
