FormData = (typeof(module) !== "undefined" && module.exports) ? require("form-data") : window.FormData
fetch = (typeof(module) !== "undefined" && module.exports) ? require("node-fetch") : window.fetch
AbortController = (typeof(module) !== "undefined" && module.exports) ? require("abort-controller") : window.AbortController

const sendFetch = (address, options, timeOut) => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeOut)

    options.signal = controller.signal

    return fetch(address, options)
    .then(res => res.json())
    .finally(() => clearTimeout(timeout))
}

const FaceRecClient = (key, timeOut=30*1000) => {
    if (!key)
        throw new Error("you must provide a valid api key")

    return {
        url: "https://api.getperse.com",
        apiVersion: "v0",
        apiKey: key,
        timeOut: timeOut,

        detectFaces(image) {
            if (!image)
                throw new Error("must provide a valid image")

            const formData = new FormData()
            formData.append("image_file", image)

            const options = {
                method: "POST",
                headers: {
                    "x-api-key": this.apiKey
                },
                body: formData
            }

            const path = "face/detect"

            return sendFetch(`${this.url}/${this.apiVersion}/${path}`, options, this.timeOut)
        },

        compareFaces(image_1, image_2) {
            const formData = new FormData()

            formData.append("image_file1", image_1)
            formData.append("image_file2", image_2)

            const options = {
                method: "POST",
                headers: {
                    "x-api-key": this.apiKey
                },
                body: formData
            }

            const path = "face/compare"

            return sendFetch(`${this.url}/${this.apiVersion}/${path}`, options, this.timeOut)
        }
    }
}

if (typeof(module) !== "undefined" && module.exports) { 
    module.exports = {
        FaceRecClient
    }
}