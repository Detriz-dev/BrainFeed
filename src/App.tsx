import { useState, useEffect } from 'react';
import './App.css';
import { queryDatabase, getDatabaseInfo } from './services/notionService';
import { testConnection } from './notion-client';

function App() {
  const [connected, setConnected] = useState(false);
  const [databaseName, setDatabaseName] = useState('');
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initNotion() {
      try {
        // Test connection
        const isConnected = await testConnection();
        setConnected(isConnected);

        if (isConnected) {
          // Get database info
          const dbInfo = await getDatabaseInfo();
          setDatabaseName(dbInfo.title?.[0]?.plain_text || 'Untitled');

          // Query pages
          const results = await queryDatabase();
          setPages(results);
        }
      } catch (error) {
        console.error('Failed to initialize Notion:', error);
      } finally {
        setLoading(false);
      }
    }

    initNotion();
  }, []);

  if (loading) {
    return <div>Loading Notion data...</div>;
  }

  return (
    <div className="App">
      <h1>Notion Integration Demo</h1>
      
      <div className="status">
        <p>Connection Status: {connected ? '✅ Connected' : '❌ Not Connected'}</p>
        {databaseName && <p>Database: {databaseName}</p>}
      </div>

      <div className="pages">
        <h2>Pages ({pages.length})</h2>
        <ul>
          {pages.map((page: any) => (
            <li key={page.id}>
              <pre>{JSON.stringify(page.properties, null, 2)}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;