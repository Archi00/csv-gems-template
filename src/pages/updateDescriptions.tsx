import { Meta } from "@/layouts/Meta"
import { Main } from "@/templates/Main"

const UpdateDescriptions = () => {
    const handleUpdate = () => {
        console.log("Hello World!")
    }

    return (
        <Main
            meta={
                <Meta title="Update Descriptions" description="Click the button to update descriptions" />
            }
            current="updateDescriptions"
        >
            <div className="mb-24">
            <button type="button" onClick={handleUpdate} className="mt-8 text-center mx-auto block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Actualitzar</button>
            </div>
        </Main>
    )
}

export default UpdateDescriptions
