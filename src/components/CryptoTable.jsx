function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value >= 1 ? 2 : 6,
  }).format(value);
}

function formatPercentage(value) {
  if (typeof value !== 'number') {
    return 'N/A';
  }

  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

function CryptoTable({ coins }) {
  if (!coins.length) {
    return <p className="state-message">No crypto data found.</p>;
  }

  return (
    <div className="table-wrap">
      <table className="crypto-table">
        <thead>
          <tr>
            <th scope="col">Asset</th>
            <th scope="col">Price</th>
            <th scope="col">24h Change</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            const isPositive = coin.price_change_percentage_24h >= 0;

            return (
              <tr key={coin.id}>
                <td>
                  <div className="asset-cell">
                    <img src={coin.image} alt="" className="coin-icon" />
                    <div>
                      <strong>{coin.name}</strong>
                      <span>{coin.symbol.toUpperCase()}</span>
                    </div>
                  </div>
                </td>
                <td>{formatCurrency(coin.current_price)}</td>
                <td>
                  <span className={isPositive ? 'change positive' : 'change negative'}>
                    {formatPercentage(coin.price_change_percentage_24h)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoTable;
