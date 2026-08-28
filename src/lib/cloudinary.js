import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary from environment variables
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

/**
 * Upload a media buffer / base64 string to Cloudinary
 * @param {string} fileStr - Base64 data URI or remote image URL
 * @param {object} options - upload options (folder, resource_type, etc.)
 */
export async function uploadMedia(fileStr, options = {}) {
  if (!isCloudinaryConfigured()) {
    // If Cloudinary is not configured, return fileStr directly if base64/url
    return {
      url: fileStr,
      publicId: `local-media-${Date.now()}`,
      format: 'jpg',
      resourceType: options.resource_type || 'image',
    };
  }

  try {
    const result = await cloudinary.uploader.upload(fileStr, {
      folder: 'haven_estate_properties',
      resource_type: options.resource_type || 'auto',
      ...options,
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      resourceType: result.resource_type,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(error.message || 'Media upload failed');
  }
}

/**
 * Delete a media asset from Cloudinary
 */
export async function deleteMedia(publicId, resourceType = 'image') {
  if (!isCloudinaryConfigured() || !publicId || publicId.startsWith('local-media')) {
    return { result: 'ok' };
  }

  try {
    return await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return { result: 'error', error };
  }
}

export default cloudinary;
