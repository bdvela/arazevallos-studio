'use server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function getCloudinarySignature() {
    const timestamp = Math.round(new Date().getTime() / 1000);

    // We want to upload to 'sizing-tool' folder
    const params = {
        timestamp,
        folder: 'sizing-tool'
    };

    const signature = cloudinary.utils.api_sign_request(
        params,
        process.env.CLOUDINARY_API_SECRET!
    );

    return { timestamp, signature, folder: params.folder, cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, apiKey: process.env.CLOUDINARY_API_KEY };
}
