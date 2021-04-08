const { createReadStream } = require("fs")
const { FaceRecClient } = require("../index")

const main = async () => {
    console.log("inicio")

    const api_key = ""

    const client = FaceRecClient(api_key)

    // const UUID = ""

    // const UUID_2 = ""

    // const result_compare = await client.compareFaces(UUID, UUID_2)

    // console.log(result_compare)

    // const result = await client.detectFaces(UUID)

    // console.log(result)

    const frame_1 = createReadStream("lula1.jpeg")
    const frame_2 = createReadStream("lula2.jpeg")

    console.log("updando 1")
    const tmp_UUID_1 = await client.uploadImage(frame_1)
    console.log("updando 2")
    const tmp_UUID_2 = await client.uploadImage(frame_2)

    const UUID_1 = tmp_UUID_1.image_token
    const UUID_2 = tmp_UUID_2.image_token

    console.log(UUID_1)
    console.log(UUID_2)

    console.log("face 1")
    const face_1 = await client.detectFaces(UUID_1)
    console.log("face 2")
    const face_2 = await client.detectFaces(UUID_2)

    console.log(face_1)
    console.log(face_2)

    console.log("similaridade")
    const similaridade = await client.compareFaces(UUID_1, UUID_2)
    console.log(similaridade)

    console.log("fim")
}

main()