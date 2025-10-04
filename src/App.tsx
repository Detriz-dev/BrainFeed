import { useState, useEffect } from "react";
import "./App.css";
import { queryDatabase, getDatabaseInfo, testConnection } from "./services/notionService";

function App() {
  const [connected, setConnected] = useState(false);
  const [databaseName, setDatabaseName] = useState("");
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initNotion() {
      try {
        // Test connection
        const isConnected = await testConnection();
        setConnected(isConnected);

        if (isConnected) {
          // Get database info
          const dbInfo = await getDatabaseInfo();
          setDatabaseName(dbInfo.title?.[0]?.plain_text || "Untitled");

          // Query pages
          const results = await queryDatabase();
          setPages(results);
        }
      } catch (err) {
        console.error("Failed to initialize Notion:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    initNotion();
  }, []);

  if (loading) {
    return <div>Loading Notion data...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
        <p>Check console for more details</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Notion Integration Demo</h1>

      <div className="status">
        <p>
          Connection Status: {connected ? "✅ Connected" : "❌ Not Connected"}
        </p>
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