
import React from 'react';
import { LogEntry } from '../types';

interface LogTerminalProps {
  logs: LogEntry[];
}

const LogTerminal: React.FC<LogTerminalProps> = ({ logs }) => {
  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex flex-col h-[400px]">
      <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Execution Trace Logs</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-rose-500"></div>
          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 mono text-xs">
        {logs.length === 0 && <div className="text-slate-600 italic">Waiting for simulation execution...</div>}
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3">
            <span className="text-slate-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
            <span className={`font-bold w-16 ${
              log.source === 'DATA' ? 'text-sky-400' : 
              log.source === 'SIGNAL' ? 'text-amber-400' :
              log.source === 'ORDER' ? 'text-purple-400' : 'text-emerald-400'
            }`}>
              {log.source}
            </span>
            <span className={
              log.level === 'SUCCESS' ? 'text-emerald-400' :
              log.level === 'ERROR' ? 'text-rose-400' :
              log.level === 'WARNING' ? 'text-amber-400' : 'text-slate-300'
            }>
              {log.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogTerminal;
