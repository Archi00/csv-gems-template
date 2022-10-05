export interface SubConfig {
    site_name?: string
    title: string
    description: string
    locale?: string
}

export interface AppConfigInterface {
    [key: string]: SubConfig
}

export const AppConfig: AppConfigInterface = {
    home: {
        site_name: "Templates",
        title: "Templates Home Page",
        description: "Web page to create csv and table templates for gems",
        locale: "en",
    },
    table: {
        title: "Table Creator",
        description: "Populate table, translate it and export into csv!",
    },
    CSV: {
        title: "Download CSV",
        description: "Check registered gems and download the translated CSVs",
    },
    images: {
        title: "Upload & Edit Images",
        description: "Upload, Crop, Resize Images",
    },
}

const currentIP = "localhost" || process.env.NEXT_PUBLIC_CUSTOM_IP || "192.168.1.126"

export const server =
    process.env.NODE_ENV !== "production"
        ? `http://${currentIP}:3000`
        : "https://csv-gems-template-archi00.vercel.app"

export const reqOptions = {
    uri: {
        en: `/api/writeENTable`,
        es: `/api/writeESTable`,
        cat: `/api/writeCATTable`,
        remove: `/api/deleteTables`,
        delete: `/api/deleteElement`,
        image: `/api/saveImage`,
        getImages: `/api/getImages`,
        downloadImages: `/api/downloadImages`,
        table: `/api/readTable`,
        ftp: `/api/sendFTP`,
        csv: `/api/saveCsv`,
        script: `/api/importScript`,
        compress: `/api/compressImages`,
        setImage: `/api/setImages`

    },
    post: {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: "",
    },
    postImg: {
        method: "POST",
        headers: {
            "Content-Type": "image/jpg",
            name: "",
            index: "",
        },
        body: "",
    },
}