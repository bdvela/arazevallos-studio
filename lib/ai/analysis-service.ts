import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
    console.error("Missing GOOGLE_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export type DesignTier = 'BASIC' | 'INTERMEDIATE' | 'PRO';

export interface AnalysisResult {
    tier: DesignTier;
    price: number;
    reason: string;
    variantId?: string;
    confidence: number;
}

const PRICING = {
    BASIC: { price: 50, variantIdEnv: 'SHOPIFY_VARIANT_ID_BASIC' },
    INTERMEDIATE: { price: 70, variantIdEnv: 'SHOPIFY_VARIANT_ID_INTERMEDIATE' },
    PRO: { price: 90, variantIdEnv: 'SHOPIFY_VARIANT_ID_PRO' }
};

export async function analyzeNailDesign(imageUrl: string): Promise<AnalysisResult> {
    if (!apiKey) {
        throw new Error("API Key configuration missing");
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Fetch image and convert to base64
        const imageResponse = await fetch(imageUrl);
        const mimeType = imageResponse.headers.get("content-type") || "image/jpeg";
        const arrayBuffer = await imageResponse.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString("base64");

        const prompt = `
        Act as a professional nail artist pricing expert. Analyze this nail design image and classify it into one of these 3 distinct tiers based on complexity:

        1. BASIC (S/ 50): Solid colors, classic french, minimal stones, simple glitter.
        2. INTERMEDIATE (S/ 70): Chrome effects, cat eye, simple line art, stickers, medium crystal placement, ombré.
        3. PRO (S/ 90): Complex hand-drawn art (characters, intricate patterns), 3D crystals/charms, heavy reliefs, encapsulations, different complex designs on each uña.

        Analyze strictly based on visual evidence.
        
        Return ONLY a raw JSON object (no markdown formatting) with this structure:
        {
            "tier": "BASIC" | "INTERMEDIATE" | "PRO",
            "reason": "Short explanation of why it fits this tier (max 20 words). In Spanish.",
            "confidence": 0.1 to 1.0
        }
        `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Image,
                    mimeType
                }
            }
        ]);

        const responseText = result.response.text();
        const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleanedText);

        const tierKey = data.tier as DesignTier;
        const tierInfo = PRICING[tierKey];
        const variantId = process.env[tierInfo.variantIdEnv];

        return {
            tier: tierKey,
            price: tierInfo.price,
            reason: data.reason,
            confidence: data.confidence,
            variantId: variantId
        };

    } catch (error) {
        console.error("Error analyzing design:", error);
        throw new Error("Failed to analyze image");
    }
}
