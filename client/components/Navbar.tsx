"use client"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { Bars3Icon, XMarkIcon, UserCircleIcon, BellIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Workflows", href: "#", current: false },
  { name: "Analytics", href: "#", current: false },
  { name: "Settings", href: "#", current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Agent <span style={{ color: "oklch(76.8% 0.233 130.85)" }}>X</span>
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-12 flex items-baseline space-x-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "text-white border-b-2 pb-1"
                        : "text-gray-300 hover:text-white hover:border-b-2 hover:border-gray-500 pb-1",
                      "px-4 py-2 text-lg font-semibold transition-all duration-200 border-transparent",
                    )}
                    style={item.current ? { borderBottomColor: "oklch(76.8% 0.233 130.85)" } : {}}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-6">
              <button className="p-2 text-gray-400 hover:text-white transition-colors duration-200">
                <BellIcon className="h-6 w-6" />
              </button>
              <Link href="/profile">
                <UserCircleIcon className="h-8 w-8 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer" />
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-lg bg-neutral-800 p-3 text-gray-400 hover:bg-neutral-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden border-t border-neutral-800">
        <div className="space-y-1 px-4 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current ? "text-white bg-neutral-800" : "text-gray-300 hover:text-white hover:bg-neutral-800",
                "block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200",
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
