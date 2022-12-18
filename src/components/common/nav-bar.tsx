import React from 'react'

export const Navbar = (props: any) => {
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
      title: 'CUSTOMER CARE',
    },
    {
      id: 5,
      title: 'TRACK MY ORDER',
    },
    {
      id: 6,
      title: 'LOGIN',
    },
    {
      id: 7,
      title: 'SIGNUP',
    },
    {
      id: 7,
      title: 'TUKAR BAHASA',
    },
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
