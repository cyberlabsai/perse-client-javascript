const { createReadStream } = require("fs")
const { FaceRecClient } = require("../index")
require("dotenv").config()

const main = async () => {
    console.log("begin")

    const api_key = process.env.API_KEY

    const client = FaceRecClient(api_key)

    const frame_1 = createReadStream("./images/musk1.jpeg")

    const frame_2 = createReadStream("./images/musk2.jpeg")

    console.log("detect")
    const face_1 = await client.detectFaces(frame_1)

    console.log(face_1)

    const face_token = face_1.image_token

    console.log("compare")

    const face_list = [face_token, frame_2]

    const comp = await client.compareFaces(face_list)

    console.log(comp)

    console.log("end")
}

main()