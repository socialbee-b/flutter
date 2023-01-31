import aws from 'aws-sdk';
import crypto from 'crypto';
import { promisify } from 'util';
// const randomBytes = promisify(crypto.randomBytes);


const region = process.env.REACT_APP_REGION_ID
const bucketName = process.env.REACT_APP_BUCKET_NAME
const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID
const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY
const s3Url = process.env.REACT_APP_BUCKET_URL

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

export async function generateUploadURL() {
    // const rawBytes = await randomBytes(16)
    // const imageName = rawBytes.toString('hex')
    const imageName = "randomImageName.jpg";

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}



export const s3Config = {
    bucketName:  (process.env.REACT_APP_BUCKET_NAME as string),
    // dirName: 'directory-name',      /* Optional */
    region: (process.env.REACT_APP_REGION_ID as string),
    accessKeyId: (process.env.REACT_APP_ACCESS_KEY_ID as string),
    secretAccessKey: (process.env.REACT_APP_SECRET_ACCESS_KEY as string),
    s3Url: (process.env.REACT_APP_BUCKET_URL as string)     
}

