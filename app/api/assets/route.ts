import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// Force dynamic to prevent caching stale JSON
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Determine the path to the JSON file
    // In local dev, process.cwd() is the project root.
    const filePath = path.join(process.cwd(), 'archive-data.json');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
        console.error(`[API] archive-data.json not found at: ${filePath}`);
        return NextResponse.json({ 
            error: 'Archive data file not found',
            path: filePath
        }, { status: 404 });
    }

    // Read and parse
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    try {
        const assets = JSON.parse(fileContent);
        // Basic validation
        if (!Array.isArray(assets)) {
             throw new Error("Data is not an array");
        }
        return NextResponse.json(assets);
    } catch (parseError: any) {
        console.error("[API] JSON Parse Error:", parseError);
        return NextResponse.json({ error: 'Invalid JSON data' }, { status: 500 });
    }

  } catch (error: any) {
    console.error("[API] General Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
