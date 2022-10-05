import { reqOptions } from "@/utils/Appconfig"
import { useEffect, useState } from "react"

const RefDropDown = ({ handleImgIdChange, handleImgPosChange }: any) => {
    const [ids, setIds] = useState<string[]>([])

    const getIds = async () => {
        const endpoint: string = reqOptions["uri"]["table"]
        const response = await fetch(endpoint)
        const result = await response.json()
        const returnIds = result.map((item: { ID: string }) => item["ID"])
        setIds(returnIds)
        return returnIds
    }

    useEffect(() => {
        getIds()
    }, [])

    return (
        <>
            <select
                onChange={(e) => {
                    e.preventDefault()
                    handleImgIdChange(e.target.value)
                }}
                className="w-[80%]"
            >
                <option id="fEmpty">Ref</option>
                {ids.length > 0
                    ? ids.map((id: string, i: number) => <option key={i}>{id}</option>)
                    : null}
            </select>
            <select
                onChange={(e) => {
                    e.preventDefault()
                    handleImgPosChange(e.target.value)
                }}
                className="w-[80%] mt-2"
            >
                <option id="pEmpty">Pos</option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
            </select>
        </>
    )
}

export default RefDropDown
