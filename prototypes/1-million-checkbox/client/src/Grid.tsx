import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { fetchGridState } from './api';
import { socketManager } from './socket';

const COLS = 1000;
const ROWS = 1000;

interface GridProps {
  onRateLimit: (msg: string) => void;
  user: any;
}

export const Grid: React.FC<GridProps> = ({ onRateLimit, user }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [gridData, setGridData] = useState<Uint8Array | null>(null);
  const [loading, setLoading] = useState(true);

  // Parse binary state
  const isChecked = (id: number, data: Uint8Array) => {
    const byteIndex = Math.floor(id / 8);
    const bitIndex = id % 8;
    return (data[byteIndex] & (1 << (7 - bitIndex))) !== 0;
  };

  const toggleLocalBit = (id: number, val: number) => {
    setGridData((prev) => {
      if (!prev) return prev;
      const newData = new Uint8Array(prev);
      const byteIndex = Math.floor(id / 8);
      const bitIndex = id % 8;
      if (val) {
        newData[byteIndex] |= (1 << (7 - bitIndex));
      } else {
        newData[byteIndex] &= ~(1 << (7 - bitIndex));
      }
      return newData;
    });
  };

  useEffect(() => {
    let mounted = true;
    
    // Load initial state
    fetchGridState().then((data) => {
      if (mounted) {
        setGridData(data);
        setLoading(false);
        socketManager.connect();
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const handleUpdate = (data: any) => {
      toggleLocalBit(data.id, data.val);
    };

    const handleRateLimit = (data: any) => {
      onRateLimit(data.message);
    };

    socketManager.on('checkbox:updated', handleUpdate);
    socketManager.on('rate_limit:blocked', handleRateLimit);
    socketManager.on('auth:required', handleRateLimit); // Reuse rate limit toast for auth msg

    return () => {
      socketManager.off('checkbox:updated', handleUpdate);
      socketManager.off('rate_limit:blocked', handleRateLimit);
      socketManager.off('auth:required', handleRateLimit);
    };
  }, [onRateLimit]);

  const rowVirtualizer = useVirtualizer({
    count: ROWS,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 24, // 24px height per row
    overscan: 5,
  });

  const colVirtualizer = useVirtualizer({
    horizontal: true,
    count: COLS,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 24, // 24px width per col
    overscan: 5,
  });

  const handleToggle = (id: number) => {
    if (!gridData) return;
    
    if (!user) {
      onRateLimit("You must be logged in to toggle checkboxes.");
      return;
    }

    const current = isChecked(id, gridData);
    const newVal = current ? 0 : 1;
    
    // Optimistic update
    toggleLocalBit(id, newVal);

    // Send to server
    socketManager.toggle(id, newVal);
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-xl font-semibold tracking-widest text-primary animate-pulse">
          INITIALIZING 1M GRID...
        </div>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="w-full h-full overflow-auto glass rounded-xl shadow-2xl relative custom-scrollbar"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: `${colVirtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <React.Fragment key={virtualRow.index}>
            {colVirtualizer.getVirtualItems().map((virtualCol) => {
              const id = virtualRow.index * COLS + virtualCol.index;
              const checked = gridData ? isChecked(id, gridData) : false;

              return (
                <div
                  key={id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${virtualCol.size}px`,
                    height: `${virtualRow.size}px`,
                    transform: `translateX(${virtualCol.start}px) translateY(${virtualRow.start}px)`,
                  }}
                  className="p-[2px]"
                >
                  <div className="cb-wrapper">
                    <input
                      type="checkbox"
                      className="cb-input"
                      checked={checked}
                      onChange={() => handleToggle(id)}
                    />
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
