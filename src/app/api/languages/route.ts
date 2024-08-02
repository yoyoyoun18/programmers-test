import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface LanguageData {
  languages: string[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.toLowerCase();

  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "programming-languages.json"
    );
    const fileContents = await fs.readFile(filePath, "utf8");
    const data: LanguageData = JSON.parse(fileContents);

    if (query) {
      const filteredLanguages = data.languages.filter((lang) =>
        lang.toLowerCase().includes(query)
      );
      return NextResponse.json({ languages: filteredLanguages });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
