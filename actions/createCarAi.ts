"use server";
import { handleActionError, serverActionResponse } from "@/lib/action-utils";
import { createUserContent, GoogleGenAI } from "@google/genai";
import { stripNumericUnits } from "@/lib/utils";

async function fileToBase64(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return buffer.toString("base64");
}

export async function processCarImageWithAI(file: File) {
  // Ensure API key is set
  if (!process.env.GEMINI_API_KEY) {
    return serverActionResponse(
      "Gemini API key is not configured",
      false,
      500,
      null
    );
  }

  try {
    // Initialize Gemini API
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const prompt = `
      Analyze this car image and extract the following details (generate a listing description up to 6 sentences):
      - Company (manufacturer name, e.g. Toyota, BMW, Honda)
      - Model (model name, e.g. Camry, 3 Series, Civic)
      - Approximate year (4-digit number only, e.g. 2023)
      - Color (primary color name, e.g. Black, White, Silver)
      - Body type (must be one of: SUV, Sedan, Hatchback, Convertible, Coupe, Wagon, Pickup)
      - Mileage (plain integer number of miles ONLY, strictly NO units like "miles" or "mi", NO commas, e.g. 15000, not 15000 miles)
      - Fuel type (must be one of: Petrol, Diesel, Electric, Hybrid, Plug-in Hybrid)
      - Transmission type (must be one of: Automatic, Manual, Semi-Automatic)
      - Estimated price (plain number ONLY, strictly NO currency symbols like $, NO commas, NO words, e.g. 28999, not $28,999)
      - Short description for a car listing

      **Format the response as JSON only (no extra text), like this:**
      {
        "company": "Toyota",
        "model": "Camry",
        "year": 2023,
        "color": "White",
        "price": 28999,
        "mileage": 15000,
        "bodyType": "Sedan",
        "fuelType": "Petrol",
        "transmission": "Automatic",
        "description": "Well-maintained vehicle with premium features and clean condition.",
        "confidence": 0.95
      }

      CRITICAL RULES:
      - Never include units or currency symbols in numerical fields:
        * "price" must be a pure number without "$" or currency symbol (e.g. 25000, not $25,000)
        * "mileage" must be a pure integer number without "miles", "mi", or "km" (e.g. 15000, not 15000 miles)
        * "year" must be a 4-digit integer (e.g. 2023)
      - Ensure confidence is a number between 0 and 1.
      - Respond with JSON only, no markdown wrapping, no extra text.
    `;

    const base64Image = await fileToBase64(file);

    // Create image part for the model
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: file.type,
      },
    };
    // Get response from Gemini
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [createUserContent([prompt, imagePart])],
    });

    // Extract response text safely
    const textResponse = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResponse) {
      return serverActionResponse("Invalid response from AI", false, 500, null);
    }

    // Clean JSON response
    const cleanedText = textResponse.replace(/```json|```/g, "").trim();

    // Parse JSON safely
    let carDetails;
    try {
      carDetails = JSON.parse(cleanedText);
    } catch (parseError) {
      return serverActionResponse(
        "Failed to parse AI response as JSON",
        false,
        500,
        null
      );
    }

    // Validate response fields
    const requiredFields = [
      "company",
      "model",
      "year",
      "color",
      "bodyType",
      "price",
      "mileage",
      "fuelType",
      "transmission",
      "description",
      "confidence",
    ];

    const missingFields = requiredFields.filter(
      (field) => !(field in carDetails)
    );

    if (missingFields.length > 0) {
      return serverActionResponse(
        `AI response missing required fields: ${missingFields.join(", ")}`,
        false,
        400,
        carDetails
      );
    }

    if (carDetails.price !== undefined && carDetails.price !== null) {
      carDetails.price = stripNumericUnits(carDetails.price);
    }
    if (carDetails.mileage !== undefined && carDetails.mileage !== null) {
      carDetails.mileage = stripNumericUnits(carDetails.mileage, { integerOnly: true });
    }
    if (carDetails.year !== undefined && carDetails.year !== null) {
      carDetails.year = stripNumericUnits(carDetails.year, { integerOnly: true });
    }
    if (carDetails.seats !== undefined && carDetails.seats !== null) {
      carDetails.seats = stripNumericUnits(carDetails.seats, { integerOnly: true });
    }

    return serverActionResponse(
      "Car details extracted successfully",
      true,
      200,
      carDetails
    );
  } catch (error) {
    return handleActionError(error);
  }
}
