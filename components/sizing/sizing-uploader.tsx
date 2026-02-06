'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, X, Check, Loader2, Camera, Palette, Hand, ChevronDown, ChevronUp, Sparkles, Info, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCloudinarySignature } from '@/lib/cloudinary/actions';
import { compressImage } from '@/lib/utils/image-compression';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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
    initialPhotos?: string[];
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

const handPositions = [
    {
        id: 'left-nails',
        label: 'Vista de uñas',
        hand: 'Mano Izquierda',
        emoji: '💅',
        shortLabel: 'Uñas',
        instruction: 'Coloca tu mano izquierda sobre la mesa con las uñas hacia arriba. Incluye la moneda de 1 sol.',
        index: 0
    },
    {
        id: 'left-back',
        label: 'Vista del dorso',
        hand: 'Mano Izquierda',
        emoji: '🤚',
        shortLabel: 'Dorso',
        instruction: 'Voltea la mano para mostrar el dorso (parte trasera). Incluye la moneda.',
        index: 1
    },
    {
        id: 'right-nails',
        label: 'Vista de uñas',
        hand: 'Mano Derecha',
        emoji: '💅',
        shortLabel: 'Uñas',
        instruction: 'Coloca tu mano derecha sobre la mesa con las uñas hacia arriba. Incluye la moneda de 1 sol.',
        index: 2
    },
    {
        id: 'right-back',
        label: 'Vista del dorso',
        hand: 'Mano Derecha',
        emoji: '🤚',
        shortLabel: 'Dorso',
        instruction: 'Voltea la mano para mostrar el dorso (parte trasera). Incluye la moneda.',
        index: 3
    },
];

export function SizingUploader({ onUploadComplete, className, showDesignUpload = false, initialPhotos = [] }: SizingUploaderProps) {
    const [handPhotos, setHandPhotos] = useState<(UploadedImage | null)[]>(() => {
        if (initialPhotos && initialPhotos.length > 0) {
            const initial: (UploadedImage | null)[] = [null, null, null, null];
            initialPhotos.forEach((url, i) => {
                if (i < 4) {
                    initial[i] = {
                        file: new File([], "existing_image"),
                        preview: url,
                        uploadedUrl: url,
                        type: 'hand'
                    };
                }
            });
            return initial;
        }
        return [null, null, null, null];
    });
    const [designPhoto, setDesignPhoto] = useState<UploadedImage | null>(null);
    const [uploading, setUploading] = useState(false);
    const [currentUploadIndex, setCurrentUploadIndex] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showCelebration, setShowCelebration] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [showExample, setShowExample] = useState(false);
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null, null]);
    const multiUploadRef = useRef<HTMLInputElement | null>(null);

    // Calculate progress
    const completedCount = handPhotos.filter(p => p !== null).length;
    const nextEmptySlot = handPhotos.findIndex(p => p === null);
    const allHandsComplete = completedCount === 4;

    // Auto-focus next slot when a photo is added
    useEffect(() => {
        if (nextEmptySlot !== -1 && completedCount > 0) {
            const timer = setTimeout(() => {
                const nextSlotElement = fileInputRefs.current[nextEmptySlot]?.parentElement;
                nextSlotElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [completedCount, nextEmptySlot]);

    // Celebration effect
    useEffect(() => {
        if (allHandsComplete && completedCount === 4 && !showCelebration) {
            setShowCelebration(true);
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
            setTimeout(() => setShowCelebration(false), 3000);
        }
    }, [allHandsComplete, completedCount, showCelebration]);

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
        e.target.value = '';
    };

    const handleMultipleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (files.length > 4) {
            setError('Máximo 4 fotos. Por favor selecciona solo las fotos de tus manos.');
            return;
        }

        setError(null);
        const filesArray = Array.from(files);

        filesArray.sort((a, b) => a.lastModified - b.lastModified);

        const updated = [...handPhotos];
        filesArray.forEach((file, i) => {
            if (i < 4) {
                const validationError = validateFile(file);
                if (!validationError) {
                    updated[i] = {
                        file,
                        preview: URL.createObjectURL(file),
                        uploadedUrl: null,
                        type: 'hand'
                    };
                }
            }
        });

        setHandPhotos(updated);
        e.target.value = '';
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
        // Compress image before upload for better mobile performance
        const compressedFile = await compressImage(image.file, {
            maxWidth: 1200,
            maxHeight: 1200,
            quality: 0.85,
        });

        const { signature, timestamp, folder, cloudName, apiKey } = await getCloudinarySignature();

        const formData = new FormData();
        formData.append('file', compressedFile);
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
            return;
        }

        try {
            setUploading(true);
            setError(null);

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

            let uploadedDesign = designPhoto;
            if (designPhoto && !designPhoto.uploadedUrl) {
                setCurrentUploadIndex(4);
                const url = await uploadSingleImage(designPhoto);
                uploadedDesign = { ...designPhoto, uploadedUrl: url };
                setDesignPhoto(uploadedDesign);
            }

            setCurrentUploadIndex(null);

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

    // Group photos by hand
    const leftHandPhotos = handPositions.slice(0, 2);
    const rightHandPhotos = handPositions.slice(2, 4);

    return (
        <div className={cn("w-full", className)}>
            {/* Progress Indicator */}
            <AnimatePresence>
                {completedCount > 0 && !allHandsComplete && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 bg-gradient-to-r from-[#FDE8EE] to-white rounded-2xl border border-pink-200 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-bold text-[#D4847C]">Progreso de Fotos</span>
                            <span className="text-sm font-semibold text-[#D4847C] bg-white px-3 py-1 rounded-full">{completedCount}/4</span>
                        </div>
                        <div className="flex gap-1.5 mb-3">
                            {[0, 1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    className={`h-2.5 flex-1 rounded-full ${i < completedCount ? 'bg-gradient-to-r from-[#D4847C] to-[#E8A0B0]' : 'bg-gray-200'
                                        }`}
                                    initial={false}
                                    animate={{
                                        scale: i === completedCount ? [1, 1.05, 1] : 1
                                    }}
                                    transition={{ repeat: i === completedCount ? Infinity : 0, duration: 1.5 }}
                                />
                            ))}
                        </div>
                        {nextEmptySlot !== -1 && (
                            <div className="flex items-center gap-2 text-xs">
                                <ArrowRight className="w-4 h-4 text-[#D4847C]" />
                                <span className="text-gray-600">
                                    Siguiente: <span className="font-bold text-[#D4847C]">{handPositions[nextEmptySlot].hand} - {handPositions[nextEmptySlot].label}</span>
                                </span>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Celebration */}
            <AnimatePresence>
                {showCelebration && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="mb-6 p-5 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 rounded-2xl border-2 border-green-300 flex items-center gap-4 shadow-lg"
                    >
                        <motion.div
                            animate={{ rotate: [0, 15, -15, 15, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.6 }}
                            className="bg-green-500 p-3 rounded-full"
                        >
                            <Sparkles className="w-7 h-7 text-white" />
                        </motion.div>
                        <div className="flex-1">
                            <p className="font-bold text-lg text-green-900">¡Excelente! 🎉</p>
                            <p className="text-sm text-green-700">Las 4 fotos están listas para subir</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Instructions Toggle */}
            <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-[#FDE8EE] to-[#FFF5F8] rounded-xl mb-4 text-left hover:from-[#fce0e9] hover:to-[#FFEEF4] transition-all shadow-sm border border-pink-100"
            >
                <span className="font-semibold text-[#3D3D3D] flex items-center gap-2">
                    <Info className="w-5 h-5 text-[#D4847C]" />
                    Instrucciones para tomar las fotos
                </span>
                {showInstructions ? <ChevronUp className="w-5 h-5 text-[#D4847C]" /> : <ChevronDown className="w-5 h-5 text-[#D4847C]" />}
            </button>

            {showInstructions && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white border-2 border-[#F5B5C8]/40 p-5 rounded-xl mb-6 shadow-sm"
                >
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-3">
                            <h4 className="font-bold text-[#3D3D3D] flex items-center gap-2">
                                <span className="bg-[#D4847C] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                                Prepara el espacio
                            </h4>
                            <ul className="space-y-2 text-sm text-[#6B6B6B] ml-8">
                                <li className="flex items-start gap-2">
                                    <span className="text-base">💡</span>
                                    <span>Busca un lugar con <strong>buena iluminación natural</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-base">📋</span>
                                    <span>Coloca una <strong>superficie blanca o clara</strong> (papel, mesa)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-base">🪙</span>
                                    <span>Ten lista una <strong>moneda de 1 sol</strong> para referencia de tamaño</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-bold text-[#3D3D3D] flex items-center gap-2">
                                <span className="bg-[#D4847C] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                                Toma las fotos
                            </h4>
                            <ul className="space-y-2 text-sm text-[#6B6B6B] ml-8">
                                <li className="flex items-start gap-2">
                                    <span className="text-base">🖐️</span>
                                    <span><strong>Extiende bien los dedos</strong> y mantén la mano relajada</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-base">📸</span>
                                    <span>Toma la foto <strong>desde arriba</strong> (perpendicular a la mesa)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-base">✨</span>
                                    <span>Asegúrate que las <strong>uñas se vean nítidas</strong></span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowExample(!showExample)}
                        className="w-full mt-4 p-3 bg-[#7EC8E3]/10 hover:bg-[#7EC8E3]/20 border border-[#7EC8E3] rounded-lg text-sm font-medium text-[#5BB5D5] transition-colors flex items-center justify-center gap-2"
                    >
                        <Camera className="w-4 h-4" />
                        {showExample ? 'Ocultar ejemplo' : 'Ver ejemplo de foto correcta'}
                    </button>

                    {showExample && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                        >
                            <p className="text-xs text-gray-500 text-center mb-2">Ejemplo de foto correcta:</p>
                            <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                <div className="text-center text-gray-400">
                                    <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">Ejemplo de referencia</p>
                                    <p className="text-xs mt-1">Mano extendida + moneda de 1 sol</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}

            {/* Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm flex items-center gap-3 shadow-sm"
                >
                    <X className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                </motion.div>
            )}

            {/* Multi-Upload Button */}
            {completedCount < 4 && (
                <div className="mb-6">
                    <input
                        type="file"
                        ref={multiUploadRef}
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleMultipleUpload}
                    />
                    <button
                        onClick={() => multiUploadRef.current?.click()}
                        className="w-full border-2 border-dashed border-[#D4847C] rounded-xl p-4 hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-50/50 transition-all flex items-center justify-center gap-3 text-[#D4847C] font-semibold group"
                    >
                        <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>¿Ya tienes las 4 fotos? Súbelas todas de una vez</span>
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-2">El sistema las ordenará automáticamente</p>
                </div>
            )}

            {/* Hand Photos Section - Grouped by hand */}
            <div className="mb-6 space-y-6">
                <h3 className="font-bold text-[#3D3D3D] text-lg flex items-center gap-2">
                    <Hand className="w-6 h-6 text-[#D4847C]" />
                    Fotos de tus manos (4 requeridas)
                </h3>

                {/* Left Hand Group */}
                <div className="bg-gradient-to-br from-white to-pink-50/30 p-5 rounded-2xl border-2 border-pink-100 shadow-sm">
                    <h4 className="font-semibold text-[#3D3D3D] mb-4 flex items-center gap-2">
                        <span className="bg-[#D4847C] text-white px-3 py-1 rounded-full text-sm">Mano Izquierda</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                        {leftHandPhotos.map((position) => {
                            const index = position.index;
                            const isNext = index === nextEmptySlot;

                            return (
                                <div key={position.id} className="relative">
                                    <input
                                        type="file"
                                        ref={el => { fileInputRefs.current[index] = el; }}
                                        className="hidden"
                                        accept="image/*"
                                        capture="environment"
                                        onChange={(e) => handleFileChange(e, index, 'hand')}
                                    />

                                    {/* Instruction Label */}
                                    <div className="mb-2 text-xs font-medium text-gray-600 flex items-center gap-1">
                                        <span className="text-base">{position.emoji}</span>
                                        {position.label}
                                    </div>

                                    {!handPhotos[index] ? (
                                        <motion.div
                                            onClick={() => fileInputRefs.current[index]?.click()}
                                            className={`aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden ${isNext
                                                ? 'border-[#D4847C] bg-[#FDE8EE] ring-4 ring-[#D4847C]/30 shadow-lg'
                                                : 'border-gray-300 hover:border-[#D4847C] hover:bg-[#FDE8EE]/30 hover:shadow-md'
                                                }`}
                                            animate={isNext ? { scale: [1, 1.02, 1] } : {}}
                                            transition={{ repeat: isNext ? Infinity : 0, duration: 2 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {isNext && (
                                                <div className="absolute top-2 right-2 bg-[#D4847C] text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                                                    SIGUIENTE
                                                </div>
                                            )}
                                            <Camera className={`w-10 h-10 mb-2 ${isNext ? 'text-[#D4847C]' : 'text-gray-400'}`} />
                                            <span className={`text-xs text-center px-3 font-medium ${isNext ? 'text-[#D4847C]' : 'text-gray-500'}`}>
                                                Toca para tomar foto
                                            </span>
                                        </motion.div>
                                    ) : (
                                        <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-green-300 shadow-md group">
                                            <Image
                                                src={handPhotos[index]!.preview}
                                                alt={position.label}
                                                fill
                                                className="object-cover"
                                            />

                                            {handPhotos[index]!.uploadedUrl ? (
                                                <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                                                    <div className="bg-green-500 text-white p-3 rounded-full shadow-lg">
                                                        <Check className="w-6 h-6" />
                                                    </div>
                                                </div>
                                            ) : currentUploadIndex === index ? (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                                                    <div className="text-center">
                                                        <Loader2 className="w-10 h-10 text-white animate-spin mx-auto mb-2" />
                                                        <p className="text-white text-xs font-medium">Subiendo...</p>
                                                    </div>
                                                </div>
                                            ) : null}

                                            <button
                                                onClick={() => removePhoto(index, 'hand')}
                                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>

                                            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                                <Check className="w-3 h-3" />
                                                {position.shortLabel}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Hand Group */}
                <div className="bg-gradient-to-br from-white to-blue-50/30 p-5 rounded-2xl border-2 border-blue-100 shadow-sm">
                    <h4 className="font-semibold text-[#3D3D3D] mb-4 flex items-center gap-2">
                        <span className="bg-[#7EC8E3] text-white px-3 py-1 rounded-full text-sm">Mano Derecha</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                        {rightHandPhotos.map((position) => {
                            const index = position.index;
                            const isNext = index === nextEmptySlot;

                            return (
                                <div key={position.id} className="relative">
                                    <input
                                        type="file"
                                        ref={el => { fileInputRefs.current[index] = el; }}
                                        className="hidden"
                                        accept="image/*"
                                        capture="environment"
                                        onChange={(e) => handleFileChange(e, index, 'hand')}
                                    />

                                    <div className="mb-2 text-xs font-medium text-gray-600 flex items-center gap-1">
                                        <span className="text-base">{position.emoji}</span>
                                        {position.label}
                                    </div>

                                    {!handPhotos[index] ? (
                                        <motion.div
                                            onClick={() => fileInputRefs.current[index]?.click()}
                                            className={`aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden ${isNext
                                                ? 'border-[#7EC8E3] bg-[#E3F5FB] ring-4 ring-[#7EC8E3]/30 shadow-lg'
                                                : 'border-gray-300 hover:border-[#7EC8E3] hover:bg-[#E3F5FB]/30 hover:shadow-md'
                                                }`}
                                            animate={isNext ? { scale: [1, 1.02, 1] } : {}}
                                            transition={{ repeat: isNext ? Infinity : 0, duration: 2 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {isNext && (
                                                <div className="absolute top-2 right-2 bg-[#7EC8E3] text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                                                    SIGUIENTE
                                                </div>
                                            )}
                                            <Camera className={`w-10 h-10 mb-2 ${isNext ? 'text-[#7EC8E3]' : 'text-gray-400'}`} />
                                            <span className={`text-xs text-center px-3 font-medium ${isNext ? 'text-[#7EC8E3]' : 'text-gray-500'}`}>
                                                Toca para tomar foto
                                            </span>
                                        </motion.div>
                                    ) : (
                                        <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-green-300 shadow-md group">
                                            <Image
                                                src={handPhotos[index]!.preview}
                                                alt={position.label}
                                                fill
                                                className="object-cover"
                                            />

                                            {handPhotos[index]!.uploadedUrl ? (
                                                <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                                                    <div className="bg-green-500 text-white p-3 rounded-full shadow-lg">
                                                        <Check className="w-6 h-6" />
                                                    </div>
                                                </div>
                                            ) : currentUploadIndex === index ? (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                                                    <div className="text-center">
                                                        <Loader2 className="w-10 h-10 text-white animate-spin mx-auto mb-2" />
                                                        <p className="text-white text-xs font-medium">Subiendo...</p>
                                                    </div>
                                                </div>
                                            ) : null}

                                            <button
                                                onClick={() => removePhoto(index, 'hand')}
                                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>

                                            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                                <Check className="w-3 h-3" />
                                                {position.shortLabel}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
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
                            className="w-full bg-gradient-to-r from-[#D4847C] to-[#E8A0B0] text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[#D4847C]/30 disabled:opacity-50 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Subiendo fotos...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-6 h-6" />
                                    Confirmar y Subir Fotos
                                </>
                            )}
                        </button>
                    )}

                    {allComplete && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 text-green-800 px-5 py-4 rounded-xl flex items-center gap-3 shadow-md">
                            <div className="bg-green-500 text-white p-2 rounded-full">
                                <Check className="w-5 h-5" />
                            </div>
                            <span className="font-bold">¡Todas las fotos subidas correctamente!</span>
                        </div>
                    )}
                </div>
            )}

            {/* Progress indicator */}
            <div className="mt-6 flex items-center justify-center gap-3 text-sm text-[#6B6B6B] bg-gray-50 py-3 rounded-lg">
                <Hand className="w-4 h-4" />
                <span className="font-medium">{handPhotos.filter(p => p !== null).length}/4 fotos de manos</span>
                {showDesignUpload && (
                    <>
                        <span>•</span>
                        <Palette className="w-4 h-4" />
                        <span className="font-medium">{designPhoto ? '1' : '0'}/1 diseño</span>
                    </>
                )}
            </div>
        </div>
    );
}
