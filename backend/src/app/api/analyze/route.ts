import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure the API Key is supplied via the environment
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined in the environment.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: NextRequest) {
    try {
        if (!apiKey) {
            return NextResponse.json({ error: "Server missing Gemini API configuration" }, { status: 500 });
        }

        const formData = await req.formData();
        const image = formData.get("image") as File;

        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString("base64");

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Analyze this image. You are an AI assistant helping a user find objects they might be missing. Identify the objects currently in the scene, and based on the context of the room/objects, suggest 3 highly specific things that are missing or would complement the scene. Format the response as a clear, concise bulleted list.";

        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: image.type || "image/jpeg",
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const responseText = result.response.text();

        return NextResponse.json({ success: true, suggestions: responseText }, { status: 200 });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Error analyzing image:", error);
        return NextResponse.json(
            { error: "Failed to analyze image", details: errorMessage },
            { status: 500 }
        );
    }
}
