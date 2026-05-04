const COINGECKO_MARKETS_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';

export async function getCryptoMarkets(signal) {
  const response = await fetch(COINGECKO_MARKETS_URL, {
    signal,
    headers: {
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Crypto market data is unavailable right now.');
  }

  return response.json();
}
