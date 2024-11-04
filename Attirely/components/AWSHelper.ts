import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

const options = {
    keyPrefix: "uploads/",
    bucket: "amplify-attirely-audreyng-amplifydataamplifycodege-4yca6kf6rthy",
    region: "us-east-2",
    successActionStatus: 201
}

let credentials = {
    accessKeyId: "key",
    secretAccessKey: "key",
};
const client = new S3Client({
    region: options.region,
    credentials: credentials
})

function getFileName(path: string): string {
    return path.split('/').pop() || ''; // Extracts the file name from the path
}

function getFileType(path: string): string {
    const extension = path.split('.').pop(); // Gets the file extension
    return extension ? `image/${extension}` : 'application/octet-stream'; // Returns a default type if no extension
}

const AWSHelper = {
    uploadFile: async function(path: string){
        try {
        const file = {
            uri:  `file://${path}`,
            name: getFileName(path),
            type: getFileType(path)
        }

        // Read the file as a Blob or Buffer
        const response = await fetch(file.uri);
        const blob = await response.blob(); // Convert the response to a Blob

        await client.send(new PutObjectCommand({ Bucket: "camera-sec", Key: 'uploads/' + file.name, Body: blob, }) ).then(response => {
        console.log(response)
        }).catch((error) => { console.log(error)})
            return true
        } catch (error) {
            console.log(error);
        }
    }, 
}

export default AWSHelper; 