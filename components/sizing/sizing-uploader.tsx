'use client';

import { useState, useRef } from 'react';
import { Upload, X, Check, Loader2, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCloudinarySignature } from '@/lib/cloudinary/actions';
import Image from 'next/image';

interface SizingUploaderProps {
    onUploadComplete?: (url: string) => void;
    className?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

export function SizingUploader({ onUploadComplete, className }: SizingUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): string | null => {
        if (file.size > MAX_FILE_SIZE) {
            return 'La imagen es muy grande. Máximo 5MB.';
        }
        if (!ALLOWED_TYPES.includes(file.type)) {
            return 'Formato no válido. Usa JPG, PNG o WebP.';
        }
        return null;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const validationError = validateFile(selectedFile);
            if (validationError) {
                setError(validationError);
                return;
            }
            setError(null);
            setFile(selectedFile);
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
            setUploadedUrl(null); // Reset previous upload
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const selectedFile = e.dataTransfer.files?.[0];
        if (selectedFile) {
            const validationError = validateFile(selectedFile);
            if (validationError) {
                setError(validationError);
                return;
            }
            setError(null);
            setFile(selectedFile);
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
            setUploadedUrl(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        try {
            setUploading(true);

            // 1. Get secure signature from server
            const { signature, timestamp, folder, cloudName, apiKey } = await getCloudinarySignature();

            // 2. Prepare FormData
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', apiKey || '');
            formData.append('timestamp', timestamp.toString());
            formData.append('signature', signature);
            formData.append('folder', folder);

            // 3. Upload directly to Cloudinary
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            const data = await response.json();

            if (data.secure_url) {
                setUploadedUrl(data.secure_url);
                if (onUploadComplete) {
                    onUploadComplete(data.secure_url);
                }
            } else {
                console.error('Upload failed', data);
                alert('Error uploading image');
            }

        } catch (error) {
            console.error('Error uploading:', error);
            alert('Error uploading image');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={cn("w-full max-w-md mx-auto", className)}>
            <div
                className={cn(
                    "relative border-2 border-dashed rounded-xl p-6 transition-all",
                    preview ? "border-slate-300 bg-slate-50" : "border-slate-300 hover:border-slate-400 hover:bg-slate-50",
                    uploadedUrl ? "border-green-500 bg-green-50" : ""
                )}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {!preview ? (
                    <div
                        className="flex flex-col items-center justify-center text-center cursor-pointer py-8"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="bg-slate-100 p-4 rounded-full mb-4">
                            <Camera className="w-8 h-8 text-slate-500" />
                        </div>
                        <h3 className="font-semibold text-lg mb-1">Upload Photo</h3>
                        <p className="text-slate-500 text-sm mb-4">
                            Take a photo of your hand next to a coin for scale.
                        </p>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                            Select or take photo
                        </button>
                        {error && (
                            <p className="text-red-500 text-sm mt-3 font-medium">{error}</p>
                        )}
                    </div>
                ) : (
                    <div className="relative">
                        {/* Image Preview */}
                        <div className="relative aspect-[3/4] w-full bg-slate-200 rounded-lg overflow-hidden md:aspect-square">
                            <Image
                                src={preview}
                                alt="Preview"
                                fill
                                className="object-cover"
                            />

                            {/* Coin Reference Overlay Guide */}
                            <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white/70 rounded-full flex items-center justify-center pointer-events-none">
                                <span className="text-[10px] text-white/90 font-medium bg-black/30 px-1 rounded">Coin</span>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFile(null);
                                    setPreview(null);
                                }}
                                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex gap-3">
                            {!uploadedUrl ? (
                                <button
                                    onClick={handleUpload}
                                    disabled={uploading}
                                    className="flex-1 bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4" /> Confirm & Upload
                                        </>
                                    )}
                                </button>
                            ) : (
                                <div className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2">
                                    <Check className="w-4 h-4" /> Upload Confirmed
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Instructions */}
            <div className="mt-4 bg-slate-50 p-4 rounded-lg text-sm text-slate-600">
                <p className="font-medium mb-1 flex items-center gap-2">
                    💡 Tip:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Use a plain background (table or sheet).</li>
                    <li>Place a standard coin next to your nails.</li>
                </ul>
            </div>
        </div>
    );
}
