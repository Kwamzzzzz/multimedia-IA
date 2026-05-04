import { useEffect, useState } from 'react';
import CryptoTable from '../components/CryptoTable.jsx';
import { getCryptoMarkets } from '../services/api.js';

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadCoins() {
      try {
        setLoading(true);
        setError('');

        const data = await getCryptoMarkets(controller.signal);
        setCoins(data);
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        setError('Failed to load data');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadCoins();

    return () => controller.abort();
  }, []);

  return (
    <section className="page dashboard-page">
      <div className="hero-panel">
        <div>
          <p className="eyebrow">Live market demo</p>
          <h1>Student Crypto Dashboard</h1>
          <p>
            Track current cryptocurrency prices and 24-hour market movement in a clean
            demo interface built for learning.
          </p>
        </div>
        <div className="hero-stat">
          <span>Assets shown</span>
          <strong>{coins.length}</strong>
        </div>
      </div>

      <section className="market-section" aria-labelledby="market-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Market overview</p>
            <h2 id="market-title">Top cryptocurrencies</h2>
          </div>
          <span className="data-source">Source: CoinGecko</span>
        </div>

        {loading && (
          <div className="loading-state" role="status" aria-live="polite">
            <span className="spinner" aria-hidden="true" />
            <span>Loading...</span>
          </div>
        )}
        {!loading && error && <p className="state-message error">{error}</p>}
        {!loading && !error && <CryptoTable coins={coins} />}
      </section>
    </section>
  );
}

export default Dashboard;
