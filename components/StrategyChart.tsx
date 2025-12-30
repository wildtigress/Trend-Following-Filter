
import React from 'react';
import { 
  ComposedChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Scatter,
  ReferenceArea
} from 'recharts';
import { Candle, Trade } from '../types';

interface StrategyChartProps {
  data: any[];
  trades: Trade[];
}

const StrategyChart: React.FC<StrategyChartProps> = ({ data, trades }) => {
  const buySignals = trades.filter(t => t.direction === 'BUY').map(t => ({
    time: new Date(t.timestamp).toLocaleTimeString(),
    price: t.entryPrice,
  }));

  const sellSignals = trades.filter(t => t.direction === 'SELL').map(t => ({
    time: new Date(t.timestamp).toLocaleTimeString(),
    price: t.entryPrice,
  }));

  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Market Dynamics & Signal Execution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 10 }} 
            stroke="#94a3b8" 
          />
          <YAxis 
            domain={['auto', 'auto']} 
            orientation="right" 
            tick={{ fontSize: 10 }} 
            stroke="#94a3b8"
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#0ea5e9" 
            strokeWidth={2} 
            dot={false} 
            animationDuration={300}
          />
          <Line 
            type="monotone" 
            dataKey="emaFast" 
            stroke="#10b981" 
            strokeWidth={1} 
            strokeDasharray="5 5"
            dot={false} 
          />
          <Line 
            type="monotone" 
            dataKey="emaSlow" 
            stroke="#ef4444" 
            strokeWidth={1} 
            strokeDasharray="5 5"
            dot={false} 
          />

          <Scatter 
            name="Buy Entry" 
            data={buySignals} 
            fill="#10b981" 
          />
          <Scatter 
            name="Sell Entry" 
            data={sellSignals} 
            fill="#ef4444" 
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StrategyChart;
