/**
 * Image Compression Utility
 * Compresses images before upload to improve mobile data performance
 */

export interface CompressionOptions {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    mimeType?: 'image/jpeg' | 'image/webp';
}

const DEFAULT_OPTIONS: Required<CompressionOptions> = {
    maxWidth: 1200,
    maxHeight: 1200,
    quality: 0.8,
    mimeType: 'image/jpeg',
};

/**
 * Compresses an image file using canvas
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns A promise that resolves to the compressed file
 */
export async function compressImage(
    file: File,
    options: CompressionOptions = {}
): Promise<File> {
    const opts = { ...DEFAULT_OPTIONS, ...options };

    // Skip compression for already small files (< 500KB)
    if (file.size < 500 * 1024) {
        return file;
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();

            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    if (!ctx) {
                        resolve(file); // Fallback to original if canvas not supported
                        return;
                    }

                    // Calculate new dimensions maintaining aspect ratio
                    let { width, height } = img;

                    if (width > opts.maxWidth) {
                        height = (height * opts.maxWidth) / width;
                        width = opts.maxWidth;
                    }

                    if (height > opts.maxHeight) {
                        width = (width * opts.maxHeight) / height;
                        height = opts.maxHeight;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    // Draw image with white background (for transparency)
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, width, height);
                    ctx.drawImage(img, 0, 0, width, height);

                    // Convert to blob
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                resolve(file); // Fallback to original
                                return;
                            }

                            // Create new file with same name but compressed
                            const compressedFile = new File(
                                [blob],
                                file.name.replace(/\.[^/.]+$/, '.jpg'),
                                { type: opts.mimeType, lastModified: Date.now() }
                            );

                            // Only use compressed if it's actually smaller
                            if (compressedFile.size < file.size) {
                                console.log(
                                    `Image compressed: ${(file.size / 1024).toFixed(0)}KB → ${(compressedFile.size / 1024).toFixed(0)}KB`
                                );
                                resolve(compressedFile);
                            } else {
                                resolve(file);
                            }
                        },
                        opts.mimeType,
                        opts.quality
                    );
                } catch (error) {
                    console.error('Compression error:', error);
                    resolve(file); // Fallback to original on any error
                }
            };

            img.onerror = () => {
                resolve(file); // Fallback to original if image can't be loaded
            };

            img.src = event.target?.result as string;
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsDataURL(file);
    });
}

/**
 * Compresses multiple image files
 * @param files - Array of files to compress
 * @param options - Compression options
 * @returns A promise that resolves to an array of compressed files
 */
export async function compressImages(
    files: File[],
    options: CompressionOptions = {}
): Promise<File[]> {
    return Promise.all(files.map(file => compressImage(file, options)));
}
