import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Fetch major indices and commodities data
    // Using Yahoo Finance API (no key required)
    const symbols = [
      '^GSPC', // S&P 500
      '^DJI',  // Dow Jones
      '^IXIC', // NASDAQ
      'GC=F',  // Gold
      'CL=F',  // Crude Oil
      '^TNX',  // 10-Year Treasury
    ];

    const promises = symbols.map(async (symbol) => {
      try {
        const response = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
          {
            headers: {
              'User-Agent': 'Mozilla/5.0',
            },
          }
        );
        
        if (!response.ok) {
          console.error(`Failed to fetch ${symbol}: ${response.status}`);
          return null;
        }

        const data = await response.json();
        const result = data?.chart?.result?.[0];
        
        if (!result) return null;

        const meta = result.meta;
        const quote = result.indicators?.quote?.[0];
        
        return {
          symbol: meta.symbol,
          price: meta.regularMarketPrice || quote?.close?.[0],
          change: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose * 100).toFixed(2),
          previousClose: meta.previousClose,
        };
      } catch (error) {
        console.error(`Error fetching ${symbol}:`, error);
        return null;
      }
    });

    const results = await Promise.all(promises);
    const marketData = results.filter(item => item !== null);

    return new Response(
      JSON.stringify({ data: marketData }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in fetch-market-data:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});