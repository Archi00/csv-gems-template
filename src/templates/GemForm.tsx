import { CategoriesDropdown } from "./CategoriesDropdown"
import { Hardness } from "@/utils/Hardness"

const GemForm = ({
    loading,
    gemName,
    handleAppendToJson,
    handleCatSelection,
    flCat,
    slCat,
    tlCat,
}: any) => (
    <>
        <div className="flex w-full overflow-hidden text-lg pt-4 gap-y-8 whitespace-nowrap sm:mx-[-30px] sm:ml-[30px] flex-col sm:px-0 sm:flex-row sm:justify-center">
            <form id="form" className="sm:max-w-lg">
                <table id="t01">
                    <tbody>
                        <tr>
                            <th id="product">Product Details</th>
                        </tr>
                        <tr>
                            <td id="type">NAME</td>
                            <td>
                                :{" "}
                                <input
                                    id="name"
                                    placeholder="Name of the gem"
                                    className="ml-4 max-w-[45%]"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td id="weight">TOTAL WEIGHT</td>
                            <td>
                                :{" "}
                                <input
                                    id="nameWight"
                                    placeholder="Total weight"
                                    className="ml-4 max-w-[45%]"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td id="size">SIZE : (LxWxH)</td>
                            <td>
                                :{" "}
                                <input
                                    placeholder="Size (LxWxH)"
                                    className="ml-4 max-w-[45%]"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td id="shape">SHAPE</td>
                            <td>
                                :{" "}
                                <input
                                    placeholder="Cut/Shape"
                                    className="ml-4 max-w-[45%]"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td id="color">COLOR</td>
                            <td>
                                : <input placeholder="Color" className="ml-4 max-w-[45%]"></input>
                            </td>
                        </tr>
                        <tr>
                            <td id="hardness">HARDNESS</td>
                            <td>
                                :{" "}
                                <input
                                    placeholder="hardness"
                                    className="ml-4 max-w-[45%]"
                                    value={gemName && Hardness[gemName] ? Hardness[gemName] : ""}
                                    readOnly
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td id="origin">ORIGIN</td>
                            <td>
                                : <input placeholder="origin" className="ml-4 max-w-[45%]"></input>
                            </td>
                        </tr>
                        <tr>
                            <td id="treatment">TREATMENT</td>
                            <td id="unh">
                                : <span className="ml-4 max-w-[45%]">Unheated / Untreated</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <form className="sm:max-w-lg sm:mx-[-30px]">
                <table>
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>
                                :{" "}
                                <input
                                    id="ref"
                                    placeholder="ref"
                                    className="ml-4 max-w-[45%]"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <td>PRICE</td>
                            <td>
                                :{" "}
                                <input
                                    id="price"
                                    placeholder="price"
                                    className="ml-4 max-w-[45%]"
                                ></input>
                            </td>
                        </tr>
                        <CategoriesDropdown
                            flCat={flCat}
                            slCat={slCat}
                            tlCat={tlCat}
                            handleCatSelection={handleCatSelection}
                        />
                    </tbody>
                </table>
            </form>
        </div>
        <div className="flex justify-center mt-12 w-full pb-4">
            {loading ? (
                <button
                    disabled
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                >
                    <svg
                        role="status"
                        className="inline mr-3 w-4 h-4 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                        />
                    </svg>
                    Loading...
                </button>
            ) : (
                <button
                    className="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleAppendToJson()}
                >
                    Append to JSON
                </button>
            )}
        </div>
    </>
)
export { GemForm }
