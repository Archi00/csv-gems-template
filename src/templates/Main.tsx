import Link from "next/link"
import type { ReactNode } from "react"
import table from "../tables/en-table.json"

import { AppConfig, AppConfigInterface } from "../utils/Appconfig"

type IMainProps = {
    meta: ReactNode
    current: keyof AppConfigInterface
    children: ReactNode
}

const Main = (props: IMainProps) => (
    <div className="w-full px-4 text-gray-700 antialiased">
        {props.meta}

        <div className="mx-auto max-w-screen-lg">
            <div className="border-b border-gray-300 max-w-screen-md m-auto">
                <div className="pt-4 pb-8">
                    <div className="text-3xl font-bold text-gray-900 pb-2">
                        {AppConfig[props.current]!.title}
                    </div>
                    <div className="text-xl">{AppConfig[props.current]!.description}</div>
                </div>
                <div>
                    <ul className="flex flex-wrap text-xl">
                        <li className="mr-6">
                            <Link href="/">
                                <a className="border-none text-gray-700 hover:text-gray-900">
                                    Home
                                </a>
                            </Link>
                        </li>
                        <li className="mr-6">
                            <Link href="/descriptions/">
                                <a className="border-none text-gray-700 hover:text-gray-900">
                                    Descriptions
                                </a>
                            </Link>
                        </li>
                        <li className="mr-6">
                            <Link href="/prices/">
                                <a className="border-none text-gray-700 hover:text-gray-900">
                                    Prices
                                </a>
                            </Link>
                        </li>
                        <li className="mr-6">
                            <Link href="/tableCreator/">
                                <a className="border-none text-gray-700 hover:text-gray-900">
                                    Table Creator
                                </a>
                            </Link>
                        </li>
                        {table.length > 0 ? (
                            <>
                                <li className="mr-6">
                                    <Link href="/imagesTab/">
                                        <a className="border-none text-gray-700 hover:text-gray-900">
                                            Images
                                        </a>
                                    </Link>
                                </li>
                                <li className="mr-6">
                                    <Link href="/downloadCSVs/">
                                        <a className="border-none text-gray-700 hover:text-gray-900">
                                            CSVs
                                        </a>
                                    </Link>
                                </li>
                            </>
                        ) : null}
                    </ul>
                </div>
            </div>

            <div className="content py-2 text-xl">{props.children}</div>
        </div>
    </div>
)

export { Main }
