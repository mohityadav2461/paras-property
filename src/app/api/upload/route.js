import { NextResponse } from 'next/server';
import { uploadMedia } from '@/lib/cloudinary';
import { getSession } from '@/lib/auth';

export async function POST(request) {
  try {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const resourceType = formData.get('resourceType') || 'auto'; // 'image' | 'video' | 'auto'

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const ALLOWED_MIME_TYPES = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
      'video/mp4',
      'video/webm',
      'video/quicktime',
    ];

    const mimeType = file.type || 'image/jpeg';
    if (!ALLOWED_MIME_TYPES.includes(mimeType.toLowerCase())) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, GIF images and MP4/WebM videos are permitted.' },
        { status: 400 }
      );
    }

    // Enforce 10MB limit for images and 50MB limit for videos
    const isVideo = mimeType.startsWith('video/');
    const maxBytes = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        { error: `File size exceeds the allowed limit of ${isVideo ? '50MB' : '10MB'}.` },
        { status: 400 }
      );
    }

    // Convert file to base64 data URI for Cloudinary / local processing
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`;

    const uploadResult = await uploadMedia(base64Data, {
      resource_type: resourceType,
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.url,
      publicId: uploadResult.publicId,
      resourceType: uploadResult.resourceType,
    });
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
