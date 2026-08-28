'use client';

import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  Video, 
  CheckCircle, 
  AlertCircle,
  Film,
  Plus
} from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export default function MediaUploader({
  images = [],
  onChangeImages,
  videoUrl = '',
  onChangeVideo,
}) {
  const { showToast } = useSettings();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Handle Multi-Image Upload
  const handleImageFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploadingImage(true);
    setUploadProgressText(`Uploading ${files.length} image(s)...`);

    try {
      const newImages = [...images];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgressText(`Uploading image ${i + 1} of ${files.length}...`);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('resourceType', 'image');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          const isFirst = newImages.length === 0;
          newImages.push({
            url: data.url,
            cloudinaryPublicId: data.publicId || '',
            altText: file.name.replace(/\.[^/.]+$/, ''),
            displayOrder: newImages.length,
            isCover: isFirst,
          });
        }
      }

      onChangeImages(newImages);
      showToast(`${files.length} image(s) uploaded successfully!`, 'success');
    } catch (err) {
      showToast('Image upload failed. Please try again.', 'error');
    } finally {
      setIsUploadingImage(false);
      setUploadProgressText('');
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  // Handle Video Upload
  const handleVideoFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 80 * 1024 * 1024) {
      showToast('Video file exceeds maximum 80MB size limit.', 'warning');
      return;
    }

    setIsUploadingVideo(true);
    setUploadProgressText('Uploading property walkthrough video...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('resourceType', 'video');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChangeVideo(data.url);
        showToast('Property video uploaded successfully!', 'success');
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (err) {
      showToast('Video upload failed. Please try again.', 'error');
    } finally {
      setIsUploadingVideo(false);
      setUploadProgressText('');
      if (videoInputRef.current) videoInputRef.current.value = '';
    }
  };

  // Set Cover Image
  const handleSetCover = (index) => {
    const updated = images.map((img, idx) => ({
      ...img,
      isCover: idx === index,
    }));
    onChangeImages(updated);
    showToast('Cover photo updated', 'info');
  };

  // Delete Image
  const handleDeleteImage = (index) => {
    let updated = images.filter((_, idx) => idx !== index);
    // If we deleted the cover photo and other images remain, make the first one cover
    if (updated.length > 0 && !updated.some((img) => img.isCover)) {
      updated[0].isCover = true;
    }
    onChangeImages(updated);
  };

  // Move Image Left
  const handleMoveLeft = (index) => {
    if (index === 0) return;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    onChangeImages(updated);
  };

  // Move Image Right
  const handleMoveRight = (index) => {
    if (index === images.length - 1) return;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    onChangeImages(updated);
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: PROPERTY IMAGES */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Property Images ({images.length})
            </h4>
            <p className="text-xs text-slate-500">
              Upload high-resolution property images. Select one image as the primary cover photo.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={imageInputRef}
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageFileChange}
            />

            <button
              type="button"
              disabled={isUploadingImage}
              onClick={() => imageInputRef.current?.click()}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploadingImage ? uploadProgressText : 'Upload Images'}</span>
            </button>
          </div>
        </div>

        {/* Images Grid */}
        {images.length === 0 ? (
          <div
            onClick={() => imageInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-600 hover:bg-slate-50 transition-colors space-y-2"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-700 block">
              Click to browse and upload multiple property images
            </span>
            <span className="text-[11px] text-slate-400 block">
              Supports JPG, PNG, WEBP from mobile and desktop
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`group relative rounded-xl overflow-hidden border-2 bg-slate-100 flex flex-col justify-between shadow-xs ${
                  img.isCover ? 'border-emerald-600 ring-2 ring-emerald-600/30' : 'border-slate-200'
                }`}
              >
                {/* Image */}
                <div className="h-32 w-full relative overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.altText || `property-photo-${idx}`}
                    className="w-full h-full object-cover"
                  />

                  {img.isCover && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-bold shadow-xs flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Cover
                    </span>
                  )}
                </div>

                {/* Control Actions Bar */}
                <div className="p-2 bg-white flex items-center justify-between border-t border-slate-100 text-xs">
                  {/* Reorder Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveLeft(idx)}
                      className="p-1 rounded text-slate-500 hover:text-slate-900 disabled:opacity-30"
                      title="Move left"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === images.length - 1}
                      onClick={() => handleMoveRight(idx)}
                      className="p-1 rounded text-slate-500 hover:text-slate-900 disabled:opacity-30"
                      title="Move right"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Set Cover & Delete */}
                  <div className="flex items-center gap-1.5">
                    {!img.isCover && (
                      <button
                        type="button"
                        onClick={() => handleSetCover(idx)}
                        className="px-2 py-0.5 rounded text-[11px] font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        Set Cover
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDeleteImage(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: PROPERTY VIDEO */}
      <div className="pt-6 border-t border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Film className="w-4 h-4 text-emerald-700" />
              <span>Property Video (Optional)</span>
            </h4>
            <p className="text-xs text-slate-500">
              Upload a walkthrough or drone video. If no video is uploaded, the video section will stay completely hidden on the public page.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={videoInputRef}
              accept="video/*"
              className="hidden"
              onChange={handleVideoFileChange}
            />

            <button
              type="button"
              disabled={isUploadingVideo}
              onClick={() => videoInputRef.current?.click()}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Video className="w-3.5 h-3.5" />
              <span>{isUploadingVideo ? uploadProgressText : videoUrl ? 'Replace Video' : 'Upload Video'}</span>
            </button>
          </div>
        </div>

        {videoUrl ? (
          <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-black max-w-lg">
            <video
              src={videoUrl}
              controls
              className="w-full h-56 object-cover"
            />
            <div className="p-2 bg-slate-900 text-white flex items-center justify-between text-xs px-3">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Video Uploaded
              </span>
              <button
                type="button"
                onClick={() => onChangeVideo('')}
                className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Video</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>No video uploaded yet for this property.</span>
            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              className="text-emerald-700 font-bold hover:underline"
            >
              + Upload Walkthrough Video
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
