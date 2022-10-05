export const CategoriesDropdown = ({ flCat, slCat, tlCat, handleCatSelection }: any) => {
    return (
        <>
            <tr>
                <td>CATEGORIES</td>
                <td>
                    :
                    <select
                        onChange={(e) => {
                            handleCatSelection(e, 0)
                        }}
                        className="ml-4 max-w-[45%]"
                    >
                        <option id="fOption"></option>
                        {flCat.sort().map((cat: string, id: number) => {
                            return (
                                <option value={cat} key={id}>
                                    {cat}
                                </option>
                            )
                        })}
                    </select>
                </td>
                <td align="center"></td>
            </tr>
            {slCat.length > 0 ? (
                <tr>
                    <td></td>
                    <td>
                        :
                        <select
                            onChange={(e) => {
                                handleCatSelection(e, 1)
                            }}
                            className="ml-4 max-w-[45%]"
                        >
                            <option id="sOption"></option>
                            {slCat.sort().map((cat: string, id: number) => {
                                return (
                                    <option value={cat} key={id}>
                                        {cat}
                                    </option>
                                )
                            })}
                        </select>
                    </td>
                    <td align="center"></td>
                </tr>
            ) : null}
            {tlCat.length > 0 ? (
                <tr>
                    <td></td>
                    <td>
                        :
                        <select
                            onChange={(e) => {
                                handleCatSelection(e, 2)
                            }}
                            className="ml-4 max-w-[45%]"
                        >
                            <option id="tOption"></option>
                            {tlCat.sort().map((cat: string, id: number) => {
                                return (
                                    <option value={cat} key={id}>
                                        {cat}
                                    </option>
                                )
                            })}
                        </select>
                    </td>
                    <td align="center"></td>
                </tr>
            ) : null}
        </>
    )
}
