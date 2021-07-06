const { createReadStream } = require("fs")
const { FaceRecClient } = require("../index")
require("dotenv").config()

const main = async () => {
    console.log("begin")

    const api_key = process.env.API_KEY

    const client = FaceRecClient(api_key)

    const frame_1 = createReadStream("./images/img1.jpeg")

    const frame_2 = createReadStream("./images/img2.jpeg")

    console.log("detect")
    const faces = await client.detectFaces(frame_1)

    console.log(faces)

    console.log("compare")

    const face_list = [frame_1, frame_2]

    const comp = await client.compareFaces(face_list)

    console.log(comp)

    console.log("end")
}

main()