import { csvJSON, saveByteArray } from "@/utils/helpers"
import { useEffect, useState } from "react"


const parseDescription = () => {
    const [info, setInfo] = useState<string>("")
    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                setInfo(reader.result!.toString() || "")

            })
            reader.readAsBinaryString(e.target.files[0]!)
            
        }
    }

    useEffect(() =>{
        if (!info) return
        saveByteArray(info, "test.pdf")
    },[info])

    return (
        <div>
            <input type="file" accept="file" onChange={onSelectFile} />
        </div>
    )
}

export default parseDescription
