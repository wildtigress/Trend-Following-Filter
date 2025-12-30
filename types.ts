
export interface Candle {
  time: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Trade {
  id: string;
  timestamp: number;
  symbol: string;
  direction: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice?: number;
  pnl?: number;
  source: 'backtest' | 'live';
  status: 'OPEN' | 'CLOSED';
}

export interface LogEntry {
  id: string;
  timestamp: number;
  level: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  message: string;
  source: 'DATA' | 'SIGNAL' | 'ORDER' | 'FILL';
}

export enum Timeframe {
  M15 = '15m',
  H1 = '1h'
}

export interface StrategyParams {
  emaFast: number;
  emaSlow: number;
  rsiPeriod: number;
  rsiOverbought: number;
  rsiOversold: number;
}
