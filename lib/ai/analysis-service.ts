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
    BASIC: { min: 50, max: 60, default: 55 },
    INTERMEDIATE: { min: 60, max: 75, default: 65 },
    PRO: { min: 75, max: 90, default: 80 }
};

// Supported price points for Shopify Variants (increments of 5)
const SUPPORTED_PRICES = [50, 55, 60, 65, 70, 75, 80, 85, 90];

function findNearestPrice(price: number): number {
    return SUPPORTED_PRICES.reduce((prev, curr) => {
        return (Math.abs(curr - price) < Math.abs(prev - price) ? curr : prev);
    });
}

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
        Act as a professional nail art pricing expert. Analyze this nail design image and classify it into one of these 3 distinct tiers based on its complexity:

        1. BASIC (S/ 50 - S/ 60): Solid colors, classic French, cat-eye French, minimalist rhinestones, simple glitter.
        2. INTERMEDIATE (S/ 60 - S/ 75): Chrome effects, cat-eye, simple line art, stickers, medium-level crystal placement, ombré, sweater effect, blooming effect, encapsulated designs.
        3. PROFESSIONAL (S/ 75 - S/ 90): Complex hand-drawn art (characters, intricate patterns), 3D crystals/charms, pronounced reliefs, mirror effect, different complex designs on each nail.

        CRITICAL PRICING RULES:
        1. "The Weakest Link": If the design is simple but contains even ONE element from a higher tier (e.g., one 3D charm on a Basic set), you MUST classify it in the higher tier or the very top price of the current tier.
        2. Price Precision: Do not just pick the average price. 
           - Use the lower end (e.g., S/ 60) for sparse/simple execution of that tier.
           - Use the higher end (e.g., S/ 75) for dense/complex execution (all nails have designs).

        Analyze strictly based on visual evidence.
        
        Return ONLY a raw JSON object (no markdown formatting) with this structure:
        {
            "tier": "BASIC" | "INTERMEDIATE" | "PRO",
            "suggested_price": number, // Specific price based on complexity within the tier range.
            "reason": "Brief explanation of why this level is appropriate (maximum 20 words). In Spanish.",
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
        let finalPrice = data.suggested_price;

        // Fallback or Sanity Check for price
        if (!finalPrice || typeof finalPrice !== 'number') {
            finalPrice = PRICING[tierKey]?.default || 55;
        }

        // Snap to nearest supported Shopify variant price
        finalPrice = findNearestPrice(finalPrice);

        // Construct Variant ID Env Key (e.g., SHOPIFY_VARIANT_ID_55)
        // Since we likely don't have all env vars set up yet, we'll try to look it up
        // For now, we fall back to the main tier variants if specific ones aren't found, 
        // OR we just perform the logic assuming the user will create them.
        const variantIdKey = `SHOPIFY_VARIANT_ID_${finalPrice}`;
        const variantId = process.env[variantIdKey] || process.env[`SHOPIFY_VARIANT_ID_${tierKey}`];

        return {
            tier: tierKey,
            price: finalPrice,
            reason: data.reason,
            confidence: data.confidence,
            variantId: variantId
        };

    } catch (error) {
        console.error("Error analyzing design:", error);
        throw new Error("Failed to analyze image");
    }
}
