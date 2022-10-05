import { useRouter } from "next/router"
import { Meta } from "@/layouts/Meta"
import { Main } from "@/templates/Main"
import Image from "next/image"

const Index = () => {
    const router = useRouter()

    return (
        <Main
            meta={
                <Meta title="Templates" description="Website to create .csv templates for gems" />
            }
            current="home"
        >
            <div className="mb-24">
                <a className="text-center block">
                    <Image
                        className="flex m-auto"
                        src={`${router.basePath}/assets/images/doggy.gif`}
                        alt="Cute Dog"
                        width={"500vw"}
                        height={"250vh"}
                    />
                </a>
                <h1 className="text-2xl font-bold white-space whitespace-pre-line text-center"></h1>
            </div>
        </Main>
    )
}

export default Index
