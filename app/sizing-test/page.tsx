'use client';

import { SizingUploader } from "@/components/sizing/sizing-uploader";


export default function SizingTestPage() {
    return (
        <main className="min-h-screen p-8 md:p-24 bg-white">
            <div className="max-w-xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Sizing Tool</h1>
                    <p className="text-slate-500">
                        Upload a reference photo to ensure perfect fit for your Press-on Nails.
                    </p>
                </div>

                <SizingUploader
                    onUploadComplete={(url) => {
                        console.log("Uploaded Image URL:", url);
                        // Here you would save this URL to the cart line item properties
                    }}
                />

                <div className="mt-12 border-t pt-8">
                    <h2 className="text-lg font-semibold mb-4">Debug Info</h2>
                    <p className="text-sm text-slate-500">
                        Check browser console for the uploaded URL.
                    </p>
                </div>
            </div>
        </main>
    );
}
