FormData = (typeof(module) !== "undefined" && module.exports) ? require("form-data") : window.FormData
fetch = (typeof(module) !== "undefined" && module.exports) ? require("node-fetch") : window.fetch
AbortController = (typeof(module) !== "undefined" && module.exports) ? require("abort-controller") : window.AbortController

const sendFetch = (address, options, timeOut) => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeOut)

    options.signal = controller.signal

    return fetch(address, options)
    .then(res => res.json())
    .catch(err => console.log("Error fetching data:\n", err))
    .finally(() => clearTimeout(timeout))
}

const FaceRecClient = (key, timeOut=5*1000) => {
    if (!key)
        throw new Error("you must provide a valid api key")

    return {
        url: "https://76f5ey2m6j.execute-api.us-east-1.amazonaws.com",
        apiKey: key,
        timeOut: timeOut,

        uploadImage(image) {
            const formData = new FormData()
            formData.append("data", image)

            const path = "/v0/upload"

            const options = {
                method: "POST",
                headers: {
                    "x-api-key": this.key
                },
                body: formData
            }

            return sendFetch(`${this.url}${path}`, options, this.timeOut)
        },

        detectFaces(uuid) {
            if (!uuid)
                throw new Error("must provide a valid image token")

            let options = {
                method: "GET",
                headers: {
                    "x-api-key": this.apiKey
                }
            }

            const path = "/v0/facedetect"

            return sendFetch(`${this.url}${path}?image_token=${uuid}`, options, this.timeOut)
        },

        compareFaces(uuid1, uuid2) {
            if (!uuid1 || !uuid2)
                throw new Error(`must provide valid image uuids\nimage_token 1: ${uuid1}\nimage_token 2: ${uuid2}`)

            let options = {
                method: "GET",
                headers: {
                    "x-api-key": this.apiKey
                }
            }

            const path = "/v0/facecompare"

            return sendFetch(`${this.url}${path}?image_token_1=${uuid1}&image_token_2=${uuid2}`, options, this.timeOut)
        }
    }
}

if (typeof(module) !== "undefined" && module.exports) { 
    module.exports = {
        FaceRecClient
    }
}