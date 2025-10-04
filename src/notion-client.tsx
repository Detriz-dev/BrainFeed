typescript// src/notion-client.ts
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_TOKEN,
});

export default notion;

// Test function (optional)
export async function testConnection() {
  try {
    const response = await notion.users.me();
    console.log("Connected as:", response.name);
    return true;
  } catch (error) {
    console.error("Notion connection failed:", error);
    return false;
  }
}