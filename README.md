# perse-client-javascript

A simple SDK to help using the perse API.


## How to use

### Getting the package
First, if you are using nodejs, install the dependencies using:

```
npm i
```

Basically, you will need the fetch API, the AbortController and the FormData. If running on browser, they should work natively (at least on newer versions of the browser).

Then, just make sure to include the index.js in yur code with:

```
const { FaceRecClient } = require("perse-client-javascript/index.js")
```

### Creating the client instance

Then, you need to create a client with:

```
const client = FaceRecClient(api_key, timeOut=5*1000)
```

To get an apiKey ( string ), contact our sales team C:

The second parameter is the timeout in milliseconds to perform each request.

### Detecting faces

To detect faces in a frame, use the "detectFaces" method.

```
const faces = await client.detectFaces(frame_1)
```

It takes a file data (ReadStream if nodejs and open the image with createReadStream for instance) and return a Promise with the object with the response from the server.

### Comparing faces

You can use the method "compareFaces" to compare two faces.

```
const comp = await client.compareFaces(face_list)
```

It takes a list with either the image tokens returned by the detectFace or the data of the image file (or even both). The list must have exactly 2 images.

It will also return a Promise with the object with the server's response.

## Examples

For further details, take a look on the "examples" directory. You will find some usefull pieces of code.

## Exceptions

All the functions are throwable and will throw an Error if you input the wrong type of data on in. Also, The detectFaces and compareFaces are based on the fetch API. They will just foward the exceptions if it throws something.