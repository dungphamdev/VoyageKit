import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("GEMINI_API_KEY is not defined in the environment.");
            return NextResponse.json({ error: "Server missing Gemini API configuration" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        console.log("Gemini SDK initialized with API key (length):", apiKey.length);

        const modelName = "gemini-flash-latest";
        console.log("Using model:", modelName);

        const model = genAI.getGenerativeModel({ model: modelName });

        const formData = await req.formData();
        const image = formData.get("image") as File;

        if (!image) {
            console.error("No image found in form data");
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString("base64");

        const prompt = "Analyze this image. You are an AI assistant helping a user find objects they might be missing. Identify the objects currently in the scene, and based on the context of the room/objects, suggest 3 highly specific things that are missing or would complement the scene. Format the response as a clear, concise bulleted list.";

        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: image.type || "image/jpeg",
            },
        };

        console.log("Sending request to Gemini AI...");
        const result = await model.generateContent([prompt, imagePart]);
        const responseText = result.response.text();
        console.log("Gemini AI analysis complete.");

        const response = NextResponse.json({ success: true, suggestions: responseText }, { status: 200 });

        // Add CORS headers
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type, Accept");

        return response;

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Error analyzing image:", error);

        // Return a more descriptive error if possible
        const status = (error && typeof error === 'object' && 'status' in error) ? (error as { status: number }).status : 500;

        return NextResponse.json(
            { error: "Failed to analyze image", details: errorMessage },
            { status: status }
        );
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Accept",
        },
    });
}
