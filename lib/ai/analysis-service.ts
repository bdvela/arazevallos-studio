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
    isValid: boolean;
    validationError?: string;
}

/**
 * IMPORTANT: FIXED PRICES PER TIER
 * This ensures consistency. The AI only decides the TIER, not the exact price.
 * The price is determined by this map, guaranteeing the same tier = same price.
 */
const TIER_PRICES: Record<DesignTier, number> = {
    BASIC: 55,
    INTERMEDIATE: 70,
    PRO: 85
};

// Mapping for Shopify Variants
const TIER_VARIANT_KEYS: Record<DesignTier, string> = {
    BASIC: 'SHOPIFY_VARIANT_ID_55',
    INTERMEDIATE: 'SHOPIFY_VARIANT_ID_70',
    PRO: 'SHOPIFY_VARIANT_ID_85'
};

export async function analyzeNailDesign(imageUrl: string): Promise<AnalysisResult> {
    if (!apiKey) {
        throw new Error("API Key configuration missing");
    }

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: {
                temperature: 0.0,
                topK: 1
            }
        });

        // Fetch image and convert to base64
        const imageResponse = await fetch(imageUrl);
        const mimeType = imageResponse.headers.get("content-type") || "image/jpeg";
        const arrayBuffer = await imageResponse.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString("base64");

        const prompt = `
You are an expert nail art pricing assistant for a press-on nail studio.
Your task is to classify a nail design image into ONE of three price tiers: BASIC, INTERMEDIATE, or PRO.

--- STEP 1: VALIDATE ---
First, determine if this image shows nails, hands with nails, or nail art.
If NOT (e.g., a landscape, pet, document, selfie without hand focus), return:
{"isValid": false, "validationError": "No detectamos un diseño de uñas. Por favor sube una referencia de un diseño.", "tier": null, "reason": null, "confidence": 0}

--- STEP 2: CLASSIFY (If Valid) ---
Use the "HIGHEST ELEMENT" RULE: If a design contains ANY technique from a higher tier, it MUST be classified in that higher tier. Do not average or downgrade.

=== TIER DEFINITIONS ===

**BASIC (S/ 55)**
- Solid single color (no effects).
- Traditional French Tip (painted polish only, any color).
- French with Cat-Eye powder line (just the tip line has cat-eye).
- Minimalist: 1-2 small rhinestones per hand, simple glitter accent.
EXAMPLES:
- Red French tip -> BASIC
- Nude with shimmer top coat -> BASIC
- French with cat-eye line on the smile line -> BASIC

**INTERMEDIATE (S/ 70)**
- Full Cat-Eye effect (magnet effect covers the whole nail, not just a line).
- Chrome / Glazed / Aurora / Pearl (entire nail or significant coverage).
- Ombré / Baby Boomer / Aura / Gradient.
- Simple hand-painted art (lines, swirls, minimal flowers).
- Stickers / Stamps / Decals.
- Marble / Blooming gel / Tortoise shell.
- Velvet effect.
EXAMPLES:
- Full velvet cat-eye on all nails -> INTERMEDIATE
- Chrome French (French tip with chrome powder) -> INTERMEDIATE
- Baby boomer with shimmer -> INTERMEDIATE
- Simple flower doodle on accent nail -> INTERMEDIATE

**PRO (S/ 85)**
- Complex hand-painted art (characters, detailed portraits, intricate patterns, realistic flowers).
- 3D elements (charms, heavy crystal arrangements, raised gel art).
- Mix & Match (each nail has a DIFFERENT complex design).
- Encapsulated elements (dried flowers, foil inside the gel).
EXAMPLES:
- Sanrio characters painted on each nail -> PRO
- Large 3D bows or charms -> PRO
- Detailed lace pattern across all nails -> PRO

--- STEP 3: OUTPUT ---
Return ONLY a raw JSON object (no markdown, no backticks) with this structure:
{
    "isValid": true,
    "tier": "BASIC" | "INTERMEDIATE" | "PRO",
    "reason": "1-sentence explanation IN SPANISH, focusing on the KEY element that determined the tier.",
    "confidence": 0.8 to 1.0
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

        // Validation Check
        if (data.isValid === false || data.tier === null) {
            return {
                isValid: false,
                validationError: data.validationError || 'No se detectaron uñas en la imagen.',
                tier: 'BASIC',
                price: 0,
                reason: '',
                confidence: data.confidence || 0,
            };
        }

        const tierKey = data.tier as DesignTier;

        // FIXED PRICE from tier - NO AI VARIANCE
        const finalPrice = TIER_PRICES[tierKey];

        // Get variant ID from env, or use a fallback for development
        const variantId = process.env[TIER_VARIANT_KEYS[tierKey]] || 'gid://shopify/ProductVariant/placeholder';

        return {
            isValid: true,
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
