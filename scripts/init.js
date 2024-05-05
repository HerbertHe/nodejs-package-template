import fs from "fs"
import path from "path"
import readline from "readline/promises"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

async function init() {
    console.log("初始化包信息...")
    let name = await rl.question("包名: ")
    const nameRegExp =
        /^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?\/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$/

    while (!nameRegExp.test(name)) {
        console.log("包名不符合规范，请重新输入")
        name = await rl.question("包名: ")
    }

    const description = await rl.question("包的描述: ")
    const author = await rl.question("作者名: ")
    const email = await rl.question("作者 Email: ")
    const repository = await rl.question("仓库 URL: ")
    const license = await rl.question("许可证类型: ")
    const keywords = await rl.question("Keywords (用空格分隔): ")
    let tmp = fs.readFileSync(path.resolve("package.tmp.json"), "utf-8")
    tmp = tmp
        .replace("__PACKAGE_NAME__", name.trim())
        .replace("__PACKAGE_DESCRIPTION__", description.trim())
        .replace("__PACKAGE_AUTHOR__", author.trim())
        .replace("__AUTHOR_EMAIL__", email.trim())
        .replace("__REPOSITORY_URL__", repository.trim())
        .replace("__PACKAGE_LICENSE__", license.trim())
        .replace(
            '"__PACKAGE_KEYWORDS__"',
            `[${keywords
                .split(" ")
                .filter((k) => k.trim() !== "")
                .map((k) => `"${k.trim()}"`)
                .join(", ")}]`
        )
    if (fs.existsSync(path.resolve("package.json"))) {
        console.error("package.json 已经存在, 如需重新生成请先删除该文件...")
        return
    }
    
    fs.writeFileSync(path.resolve("package.json"), tmp, "utf-8")
    console.log("初始化完成！")
}

init()
