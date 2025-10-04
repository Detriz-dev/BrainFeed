const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function queryDatabase() {
  try {
    const response = await fetch(`${API_URL}/api/notion/pages`);
    if (!response.ok) throw new Error('Failed to fetch pages');
    return await response.json();
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
}

export async function getDatabaseInfo() {
  try {
    const response = await fetch(`${API_URL}/api/notion/database`);
    if (!response.ok) throw new Error('Failed to fetch database');
    return await response.json();
  } catch (error) {
    console.error('Error retrieving database:', error);
    throw error;
  }
}

export async function testConnection() {
  try {
    const response = await fetch(`${API_URL}/api/notion/test`);
    if (!response.ok) throw new Error('Failed to connect');
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Notion connection failed:', error);
    return false;
  }
}