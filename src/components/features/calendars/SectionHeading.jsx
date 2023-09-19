/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { BarsArrowUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { LinkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export default function SectionHeading({user}) {
  return (
    <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900 uppercase">Calendars</h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
            <label htmlFor="mobile-search-candidate" className="sr-only">
            Search
            </label>
            <label htmlFor="desktop-search-candidate" className="sr-only">
            Search
            </label>
            <div className="flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                type="text"
                name="mobile-search-candidate"
                id="mobile-search-candidate"
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-grandkit-500 focus:ring-grandkit-500 sm:hidden"
                placeholder="Search"
                />
                <input
                type="text"
                name="desktop-search-candidate"
                id="desktop-search-candidate"
                className="hidden w-full rounded-md border-gray-300 pl-10 focus:border-grandkit-500 focus:ring-grandkit-500 sm:block sm:text-sm"
                placeholder="Search calendars"
                />
            </div>
            {/* <button
                type="button"
                className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-grandkit-500 focus:outline-none focus:ring-1 focus:ring-grandkit-500"
            >
                <BarsArrowUpIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="ml-2">Sort</span>
                <ChevronDownIcon className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            </button> */}
            </div>
        </div>
        <Link
            to="/dashboard/calendars/create"
            className="g-primary-btn whitespace-nowrap"
        >
            Create
        </Link>
    </div>
  )
}
