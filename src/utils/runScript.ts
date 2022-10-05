import util from "util"
const exec = util.promisify(require("child_process").exec)

async function runScript(path: string) {
    try {
        const { stdout } = await exec(`python ${path}`)
        console.log("stdout:", stdout)
        return stdout
    } catch (e) {
        console.error(e)
        return e
    }
}

export default runScript
