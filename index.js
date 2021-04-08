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

const FaceRecClient = (key, timeOut=5*1000) => {
    if (!key)
        throw new Error("you must provide a valid api key")

    return {
        url: "https://76f5ey2m6j.execute-api.us-east-1.amazonaws.com",
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
                    "x-api-key": this.key
                },
                body: formData
            }

            const path = "/v0/face/detect"

            return sendFetch(`${this.url}${path}`, options, this.timeOut)
        },

        compareFaces(images) {
            const formData = new FormData()

            images.forEach((image, index) => {
                if (typeof(image) === "string") {
                    const data_name = `image_token${index + 1}`

                    formData.append(data_name, image)
                }

                else if (typeof(image) === "object") {
                    const data_name = `image_file${index + 1}`

                    formData.append(data_name, image)
                }

                else {
                    throw `unknown image data at position: ${index}\nvalue is: ${image}`
                }
            })

            const options = {
                method: "POST",
                headers: {
                    "x-api-key": this.key
                },
                body: formData
            }

            const path = "/v0/face/compare"

            return sendFetch(`${this.url}${path}`, options, this.timeOut)
        }
    }
}

if (typeof(module) !== "undefined" && module.exports) { 
    module.exports = {
        FaceRecClient
    }
}