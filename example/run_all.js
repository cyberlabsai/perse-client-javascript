const { createReadStream } = require("fs")
const { FaceRecClient } = require("../index")
require("dotenv").config()

const run_detect = async () => {
    const api_key = process.env.API_KEY

    const client = FaceRecClient(api_key)

    const frame_1 = createReadStream("./images/img1.jpeg")

    console.log("detect")
    const faces = await client.detectFaces(frame_1)

    console.log(faces)
}

const run_compare = async () => {
    const api_key = process.env.API_KEY

    const client = FaceRecClient(api_key)

    const frame_1 = createReadStream("./images/img1.jpeg")

    const frame_2 = createReadStream("./images/img2.jpeg")

    console.log("compare")

    const comp = await client.compareFaces(frame_1, frame_2)

    console.log(comp)
}

const main = async () => {
    console.log("begin")

    await run_detect()

    await run_compare()

    console.log("end")
}

main()