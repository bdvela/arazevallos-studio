import { NextResponse } from 'next/server';
import { analyzeNailDesign } from '@/lib/ai/analysis-service';

export async function POST(request: Request) {
    try {
        const { imageUrl } = await request.json();

        if (!imageUrl) {
            return NextResponse.json(
                { error: 'Image URL is required' },
                { status: 400 }
            );
        }

        const result = await analyzeNailDesign(imageUrl);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Analysis API Error:', error);
        return NextResponse.json(
            { error: 'Failed to process design analysis' },
            { status: 500 }
        );
    }
}
