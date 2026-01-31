'use client';

import { useState, useRef } from 'react';
import { Upload, X, Check, Loader2, Camera, Palette, Hand, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCloudinarySignature } from '@/lib/cloudinary/actions';
import Image from 'next/image';

interface UploadedImage {
    file: File;
    preview: string;
    uploadedUrl: string | null;
    type: 'hand' | 'design';
}

interface SizingUploaderProps {
    onUploadComplete?: (images: { hands: string[], design: string | null }) => void;
    className?: string;
    showDesignUpload?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

const handPositions = [
    { id: 'left-front', label: 'Mano izquierda (frente)', emoji: '🤚' },
    { id: 'left-back', label: 'Mano izquierda (dorso)', emoji: '✋' },
    { id: 'right-front', label: 'Mano derecha (frente)', emoji: '🤚' },
    { id: 'right-back', label: 'Mano derecha (dorso)', emoji: '✋' },
];

export function SizingUploader({ onUploadComplete, className, showDesignUpload = false }: SizingUploaderProps) {
    const [handPhotos, setHandPhotos] = useState<(UploadedImage | null)[]>([null, null, null, null]);
    const [designPhoto, setDesignPhoto] = useState<UploadedImage | null>(null);
    const [uploading, setUploading] = useState(false);
    const [currentUploadIndex, setCurrentUploadIndex] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showInstructions, setShowInstructions] = useState(true);
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null, null]);

    const validateFile = (file: File): string | null => {
        if (file.size > MAX_FILE_SIZE) {
            return 'La imagen es muy grande. Máximo 5MB.';
        }
        if (!ALLOWED_TYPES.includes(file.type)) {
            return 'Formato no válido. Usa JPG, PNG o WebP.';
        }
        return null;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, type: 'hand' | 'design') => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const validationError = validateFile(selectedFile);
            if (validationError) {
                setError(validationError);
                return;
            }
            setError(null);
            const objectUrl = URL.createObjectURL(selectedFile);
            const newImage: UploadedImage = {
                file: selectedFile,
                preview: objectUrl,
                uploadedUrl: null,
                type
            };

            if (type === 'hand') {
                const updated = [...handPhotos];
                updated[index] = newImage;
                setHandPhotos(updated);
            } else {
                setDesignPhoto(newImage);
            }
        }
    };

    const removePhoto = (index: number, type: 'hand' | 'design') => {
        if (type === 'hand') {
            const updated = [...handPhotos];
            if (updated[index]?.preview) {
                URL.revokeObjectURL(updated[index]!.preview);
            }
            updated[index] = null;
            setHandPhotos(updated);
        } else {
            if (designPhoto?.preview) {
                URL.revokeObjectURL(designPhoto.preview);
            }
            setDesignPhoto(null);
        }
    };

    const uploadSingleImage = async (image: UploadedImage): Promise<string> => {
        const { signature, timestamp, folder, cloudName, apiKey } = await getCloudinarySignature();

        const formData = new FormData();
        formData.append('file', image.file);
        formData.append('api_key', apiKey || '');
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);
        formData.append('folder', folder);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const data = await response.json();
        if (data.secure_url) {
            return data.secure_url;
        }
        throw new Error('Upload failed');
    };

    const handleUploadAll = async () => {
        const handImagesToUpload = handPhotos.filter((p): p is UploadedImage => p !== null && p.uploadedUrl === null);
        const needDesignUpload = designPhoto && !designPhoto.uploadedUrl;

        if (handImagesToUpload.length === 0 && !needDesignUpload) {
            // Already all uploaded
            return;
        }

        try {
            setUploading(true);
            setError(null);

            // Upload hand photos
            const uploadedHands = [...handPhotos];
            for (let i = 0; i < handPhotos.length; i++) {
                const photo = handPhotos[i];
                if (photo && !photo.uploadedUrl) {
                    setCurrentUploadIndex(i);
                    const url = await uploadSingleImage(photo);
                    uploadedHands[i] = { ...photo, uploadedUrl: url };
                }
            }
            setHandPhotos(uploadedHands);

            // Upload design photo
            let uploadedDesign = designPhoto;
            if (designPhoto && !designPhoto.uploadedUrl) {
                setCurrentUploadIndex(4); // Index 4 for design
                const url = await uploadSingleImage(designPhoto);
                uploadedDesign = { ...designPhoto, uploadedUrl: url };
                setDesignPhoto(uploadedDesign);
            }

            setCurrentUploadIndex(null);

            // Callback with all URLs
            if (onUploadComplete) {
                onUploadComplete({
                    hands: uploadedHands.filter((p): p is UploadedImage => p !== null).map(p => p.uploadedUrl!),
                    design: uploadedDesign?.uploadedUrl || null
                });
            }

        } catch (error) {
            console.error('Error uploading:', error);
            setError('Error al subir las imágenes. Intenta de nuevo.');
        } finally {
            setUploading(false);
            setCurrentUploadIndex(null);
        }
    };

    const allHandsUploaded = handPhotos.filter(p => p !== null).length >= 4 &&
        handPhotos.every(p => p === null || p.uploadedUrl !== null);
    const designUploaded = !showDesignUpload || (designPhoto?.uploadedUrl !== null);
    const allComplete = allHandsUploaded && (showDesignUpload ? designUploaded : true);

    const hasAnyPhoto = handPhotos.some(p => p !== null) || designPhoto !== null;
    const hasUnuploadedPhotos = handPhotos.some(p => p !== null && p.uploadedUrl === null) ||
        (designPhoto !== null && designPhoto.uploadedUrl === null);

    return (
        <div className={cn("w-full", className)}>
            {/* Instructions Toggle */}
            <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="w-full flex items-center justify-between p-4 bg-[#FDE8EE] rounded-xl mb-4 text-left"
            >
                <span className="font-medium text-[#3D3D3D] flex items-center gap-2">
                    💡 Instrucciones para las fotos
                </span>
                {showInstructions ? <ChevronUp className="w-5 h-5 text-[#D4847C]" /> : <ChevronDown className="w-5 h-5 text-[#D4847C]" />}
            </button>

            {showInstructions && (
                <div className="bg-[#FFFBFC] border border-[#F5B5C8]/30 p-4 rounded-xl mb-6 text-sm text-[#6B6B6B]">
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                            <span>📏</span>
                            <span>Coloca una <strong>moneda de 1 sol</strong> junto a tu mano para referencia de tamaño</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span>📸</span>
                            <span>Usa un <strong>fondo claro y plano</strong> (mesa o papel blanco)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span>🖐️</span>
                            <span>Extiende bien los dedos y mantén la mano relajada</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span>💡</span>
                            <span>Asegúrate de tener <strong>buena iluminación</strong></span>
                        </li>
                    </ul>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
                    {error}
                </div>
            )}

            {/* Hand Photos Section */}
            <div className="mb-6">
                <h3 className="font-semibold text-[#3D3D3D] mb-4 flex items-center gap-2">
                    <Hand className="w-5 h-5 text-[#D4847C]" />
                    Fotos de tus manos (4 requeridas)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {handPositions.map((position, index) => (
                        <div key={position.id} className="relative">
                            <input
                                type="file"
                                ref={el => { fileInputRefs.current[index] = el; }}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, index, 'hand')}
                            />

                            {!handPhotos[index] ? (
                                <div
                                    onClick={() => fileInputRefs.current[index]?.click()}
                                    className="aspect-square border-2 border-dashed border-[#F5B5C8] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#D4847C] hover:bg-[#FDE8EE]/50 transition-all"
                                >
                                    <span className="text-2xl mb-2">{position.emoji}</span>
                                    <Camera className="w-6 h-6 text-[#D4847C] mb-2" />
                                    <span className="text-xs text-[#6B6B6B] text-center px-2">{position.label}</span>
                                </div>
                            ) : (
                                <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-[#F5B5C8]">
                                    <Image
                                        src={handPhotos[index]!.preview}
                                        alt={position.label}
                                        fill
                                        className="object-cover"
                                    />

                                    {/* Upload status overlay */}
                                    {handPhotos[index]!.uploadedUrl ? (
                                        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                                            <div className="bg-green-500 text-white p-2 rounded-full">
                                                <Check className="w-5 h-5" />
                                            </div>
                                        </div>
                                    ) : currentUploadIndex === index ? (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                                        </div>
                                    ) : null}

                                    {/* Remove button */}
                                    <button
                                        onClick={() => removePhoto(index, 'hand')}
                                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Design Reference Section */}
            {showDesignUpload && (
                <div className="mb-6">
                    <h3 className="font-semibold text-[#3D3D3D] mb-4 flex items-center gap-2">
                        <Palette className="w-5 h-5 text-[#D4847C]" />
                        Diseño de referencia (opcional)
                    </h3>
                    <p className="text-sm text-[#6B6B6B] mb-4">
                        Sube una imagen del diseño que te gustaría. Puede ser de Pinterest, Instagram o una foto propia.
                    </p>

                    <input
                        type="file"
                        ref={el => { fileInputRefs.current[4] = el; }}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 4, 'design')}
                    />

                    {!designPhoto ? (
                        <div
                            onClick={() => fileInputRefs.current[4]?.click()}
                            className="border-2 border-dashed border-[#7EC8E3] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#5BB5D5] hover:bg-[#7EC8E3]/10 transition-all"
                        >
                            <div className="bg-[#7EC8E3]/20 p-4 rounded-full mb-4">
                                <Palette className="w-8 h-8 text-[#5BB5D5]" />
                            </div>
                            <span className="font-medium text-[#3D3D3D]">Sube tu diseño de referencia</span>
                            <span className="text-sm text-[#6B6B6B] mt-1">JPG, PNG o WebP (máx. 5MB)</span>
                        </div>
                    ) : (
                        <div className="relative aspect-video max-w-md rounded-xl overflow-hidden border-2 border-[#7EC8E3]">
                            <Image
                                src={designPhoto.preview}
                                alt="Diseño de referencia"
                                fill
                                className="object-cover"
                            />

                            {/* Upload status overlay */}
                            {designPhoto.uploadedUrl ? (
                                <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                                    <div className="bg-green-500 text-white p-2 rounded-full">
                                        <Check className="w-5 h-5" />
                                    </div>
                                </div>
                            ) : currentUploadIndex === 4 ? (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                                </div>
                            ) : null}

                            {/* Remove button */}
                            <button
                                onClick={() => removePhoto(4, 'design')}
                                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Upload Button */}
            {hasAnyPhoto && (
                <div className="space-y-3">
                    {hasUnuploadedPhotos && (
                        <button
                            onClick={handleUploadAll}
                            disabled={uploading}
                            className="w-full bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#D4847C]/20 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Subiendo fotos...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    Confirmar y Subir Fotos
                                </>
                            )}
                        </button>
                    )}

                    {allComplete && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3">
                            <div className="bg-green-500 text-white p-1 rounded-full">
                                <Check className="w-4 h-4" />
                            </div>
                            <span className="font-medium">¡Todas las fotos subidas correctamente!</span>
                        </div>
                    )}
                </div>
            )}

            {/* Progress indicator */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#6B6B6B]">
                <span>{handPhotos.filter(p => p !== null).length}/4 fotos de manos</span>
                {showDesignUpload && (
                    <>
                        <span>•</span>
                        <span>{designPhoto ? '1' : '0'}/1 diseño</span>
                    </>
                )}
            </div>
        </div>
    );
}
