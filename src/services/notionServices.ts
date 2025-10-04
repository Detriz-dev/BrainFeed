import notion from '../notion-client';

const DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID;

export interface NotionPage {
  id: string;
  properties: any;
  created_time: string;
  last_edited_time: string;
}

// Query database
export async function queryDatabase() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
    });
    return response.results;
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
}

// Get database info
export async function getDatabaseInfo() {
  try {
    const response = await notion.databases.retrieve({
      database_id: DATABASE_ID,
    });
    return response;
  } catch (error) {
    console.error('Error retrieving database:', error);
    throw error;
  }
}

// Create a new page
export async function createPage(properties: any) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: properties,
    });
    return response;
  } catch (error) {
    console.error('Error creating page:', error);
    throw error;
  }
}