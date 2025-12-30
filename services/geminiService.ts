
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStrategyCode = async (params: any) => {
  const prompt = `
    Act as a Senior Quant Developer. Generate a Python class named 'NumatixMultiTimeframe' 
    that satisfies the Numatix developer assignment requirements.
    
    The strategy MUST:
    1. Define a 1-hour timeframe (EMA ${params.emaFast} and EMA ${params.emaSlow}) as a trend filter.
    2. Define a 15-minute timeframe (RSI ${params.rsiPeriod}) for entries.
    3. Use RSI thresholds: Oversold < ${params.rsiOversold} (BUY), Overbought > ${params.rsiOverbought} (SELL).
    4. Implement a Single Source of Truth: The same logic should handle 'next()' for backtesting.py 
       and 'on_tick()' for the Binance Live REST API.
    5. Include detailed logging for: Market Data -> Signal -> Order -> Fill.
    6. Include logic for position sizing (e.g., fixed % of equity).

    The code must be clean, class-based, and include type hinting. Include a README section at the bottom explaining how to match backtest vs live trades.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating code. Please check your API key.";
  }
};

export const explainParity = async () => {
  const prompt = `Provide a professional 2-page equivalent summary for a Quant Developer assignment. 
  Cover: 
  1. Multi-Timeframe Strategy Logic (1H Trend, 15m RSI).
  2. Class Architecture (Single Source of Truth).
  3. Parity mechanism (How backtest vs live execution is synchronized).
  4. Trade Matching Strategy (Handling latency and slippage).`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return response.text;
};
