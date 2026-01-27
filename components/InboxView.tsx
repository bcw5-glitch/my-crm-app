import React, { useState, useEffect, useRef } from 'react';
import { 
  Inbox, 
  ListFilter, 
  ChevronDown, 
  Activity, 
  AlertCircle, 
  ArrowUpRight, 
  CheckCircle2, 
  X,
  Sparkles
} from 'lucide-react';
import { ObjectBadge, StateBadge } from './Badges';
import { DetailPanel } from './DetailPanel';
import { InboxItem } from '../types';

interface InboxViewProps {
  items: InboxItem[];
  onDismissItem: (id: string) => void;
}

const InboxZeroCelebration = () => (
    <div className="flex flex-col items-center justify-center py-24 bg-white border border-gray-200 rounded-lg shadow-sm w-full mt-4 animate-in zoom-in-95 duration-500 ease-out overflow-hidden relative">
        {/* Background ambient effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-700"></div>
        </div>

        <div className="relative mb-8 group cursor-default z-10">
            {/* Pulsing rings */}
            <div className="absolute inset-0 bg-blue-50 rounded-full animate-ping opacity-75 duration-[2000ms]"></div>
            <div className="absolute inset-2 bg-indigo-50 rounded-full animate-ping opacity-75 duration-[2000ms] delay-150"></div>
            
            {/* Main Inbox Icon */}
            <div className="relative w-28 h-28 bg-gradient-to-br from-white to-blue-50 rounded-full flex items-center justify-center shadow-lg border border-blue-100 group-hover:scale-105 transition-transform duration-300">
                <Inbox className="w-12 h-12 text-blue-500 fill-blue-500/20 animate-bounce duration-[3000ms]" />
            </div>
            
            {/* Floating Confetti Particles */}
            <div className="absolute -top-4 -right-2 text-yellow-400 animate-bounce delay-[100ms] text-xl">✨</div>
            <div className="absolute bottom-2 -left-4 text-blue-400 animate-bounce delay-[500ms] text-xl">★</div>
            <div className="absolute top-1/2 -right-8 text-indigo-400 animate-bounce delay-[200ms]">●</div>
            <div className="absolute top-0 -left-6 text-green-400 animate-bounce delay-[700ms]">▲</div>
            <div className="absolute -bottom-2 right-0 text-pink-400 animate-bounce delay-[1000ms]">✦</div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3 z-10">Inbox Zero</h3>
        <p className="text-gray-400 mb-8 max-w-sm text-center leading-relaxed text-[15px] z-10">
            Incredible focus! All signals cleared.<br/>Everything is up to date.
        </p>
    </div>
);

const EmptySpaceMotivation = ({ count }: { count: number }) => {
    // Only show motivation for 1-5 items
    if (count > 5 || count === 0) {
        return <div className="flex-1 bg-white opacity-5 min-h-[100px]"></div>;
    }

    // Dynamic styles based on count
    const isLastOne = count === 1;
    const isClose = count <= 3;

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[250px] bg-gradient-to-b from-white to-gray-50/30 pointer-events-none select-none overflow-hidden relative">
             
             {/* Motivation Content */}
             <div className="flex flex-col items-center transition-all duration-700 hover:opacity-100 opacity-60 transform translate-y-4">
                 <div className="relative mb-4">
                     <div className={`w-24 h-24 rounded-full border-[3px] border-dashed flex items-center justify-center transition-all duration-700 ${
                         isLastOne ? 'border-indigo-400 bg-indigo-50 rotate-12 scale-110' : 
                         isClose ? 'border-blue-300 bg-blue-50/40' : 'border-gray-200 bg-gray-50/20'
                     }`}>
                         <div className="text-center transform transition-transform duration-500">
                             <span className={`block text-3xl font-bold mb-0.5 transition-colors ${
                                 isLastOne ? 'text-indigo-600' : 
                                 isClose ? 'text-blue-500' : 'text-gray-300'
                             }`}>{count}</span>
                             <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400/80">Left</span>
                         </div>
                     </div>
                     
                     {/* Decorative Sparkles for low counts */}
                     {isClose && (
                        <>
                           <Sparkles className={`absolute -top-2 -right-4 w-5 h-5 text-yellow-400 animate-pulse ${isLastOne ? 'opacity-100' : 'opacity-40'}`} />
                           {isLastOne && <div className="absolute bottom-0 -left-3 text-indigo-400 animate-bounce">★</div>}
                        </>
                     )}
                 </div>
                 
                 <div className="text-center space-y-1">
                    <p className={`text-sm font-semibold transition-colors duration-500 ${
                        isLastOne ? 'text-indigo-600' : 
                        isClose ? 'text-blue-500' : 'text-gray-400'
                    }`}>
                        {isLastOne ? "One last thing!" : 
                        isClose ? "So close to Inbox Zero" : 
                        "Keep the momentum going"}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                        {isLastOne ? "Finish strong 💪" : "You're on a roll"}
                    </p>
                 </div>
             </div>
        </div>
    );
};

const DEFAULT_COLUMN_WIDTHS = [450, 220, 200, 280];
const STORAGE_KEY = 'twenty_inbox_column_widths';

export const InboxView: React.FC<InboxViewProps> = ({ items, onDismissItem }) => {
  const [selectedItemId, setSelectedItemId] = useState<string>('1');
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [viewState, setViewState] = useState<'initial' | 'review' | 'resolved'>('initial');
  const [showToast, setShowToast] = useState(false);
  
  // Column Resizing State
  // Initial widths: Signal (450), Relations (220), Attention (200), Last Activity (280)
  // Initialize with lazy state to read from storage
  const [columnWidths, setColumnWidths] = useState<number[]>(() => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to parse saved column widths', e);
    }
    return DEFAULT_COLUMN_WIDTHS;
  });

  const resizingRef = useRef<{ index: number; startX: number; startWidth: number } | null>(null);

  // Persist column widths whenever they change
  useEffect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(columnWidths));
  }, [columnWidths]);

  // Resize Handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!resizingRef.current) return;
        
        const delta = e.clientX - resizingRef.current.startX;
        const newWidth = Math.max(80, resizingRef.current.startWidth + delta); // Min width 80px
        
        setColumnWidths(prev => {
            const next = [...prev];
            next[resizingRef.current!.index] = newWidth;
            return next;
        });
    };

    const handleMouseUp = () => {
        if (resizingRef.current) {
            resizingRef.current = null;
            document.body.style.cursor = 'default';
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const startResize = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizingRef.current = {
        index,
        startX: e.clientX,
        startWidth: columnWidths[index]
    };
    document.body.style.cursor = 'col-resize';
  };
  
  // Ensure we have a valid selection and handle empty state
  useEffect(() => {
    if (items.length === 0) {
        setIsPanelOpen(false);
        return;
    }

    if (items.length > 0 && !items.find(i => i.id === selectedItemId)) {
      setSelectedItemId(items[0].id);
    }
  }, [items, selectedItemId]);

  // Handle toast timeout
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const focusedItem = items.find(i => i.id === selectedItemId) || items[0];

  const handleApprove = () => {
    // Special flow for item '1' to show preview
    if (focusedItem?.id === '1') {
        setViewState('review');
    } else {
        setViewState('resolved');
    }
    setIsPanelOpen(true);
  };

  const handleConfirm = () => {
      setViewState('resolved');
  };

  const handleDismiss = () => {
    if (focusedItem) {
        onDismissItem(focusedItem.id);
        setShowToast(true);
    }
    
    // Reset state for the next item
    setViewState('initial');
    setIsPanelOpen(true);
  };

  // Dynamic Grid Style
  const gridStyle = {
      display: 'grid',
      // Make the last column fill remaining space using minmax with 1fr
      gridTemplateColumns: columnWidths.map((w, i) => 
        i === columnWidths.length - 1 ? `minmax(${w}px, 1fr)` : `${w}px`
      ).join(' '),
      minWidth: '100%',
      width: 'fit-content' // Ensure background covers overflow if content is wider than container
  };

  const ResizeHandle = ({ index }: { index: number }) => (
      <div 
          className="absolute right-0 top-0 bottom-0 w-4 translate-x-1/2 cursor-col-resize z-20 flex justify-center group"
          onMouseDown={(e) => startResize(index, e)}
          onClick={(e) => e.stopPropagation()}
      >
          {/* Visual line only visible on hover/drag */}
          <div className="w-[1px] h-full bg-transparent group-hover:bg-blue-400 transition-colors delay-75" />
      </div>
  );

  return (
    <div className="flex-1 h-screen overflow-hidden flex flex-col bg-[#F9FAFB]">
      
      {/* Top Header */}
      <div className="h-14 border-b border-gray-200 bg-[#F9FAFB] flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center text-gray-800 font-medium">
          <Inbox className="w-4 h-4 mr-2.5 text-gray-500" />
          Inbox
        </div>
        <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">⌘K</span>
        </div>
      </div>

      {/* Main Container - Split View */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden flex flex-col min-w-0">
            
            <div className="flex-1 flex flex-col min-w-[1000px] pl-6 pr-3 py-6 relative group/container h-full">
                
                {/* Toast Notification - Positioned inside table area */}
                <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white border border-green-100 px-6 py-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center gap-4 z-50 min-w-[450px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-[15px]">Signal Resolved</h4>
                        <p className="text-[14px] text-gray-500">Dismissed. You can find this later in Recently Resolved.</p>
                    </div>
                    <button 
                        onClick={() => setShowToast(false)}
                        className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Empty State / Celebration when no items */}
                {!focusedItem && (
                    <InboxZeroCelebration />
                )}

                {/* Table Container */}
                <div className={`bg-white rounded-lg border border-gray-200 shadow-sm flex-1 flex flex-col overflow-hidden min-h-0 ${!focusedItem ? 'hidden' : ''}`}>
                    
                    {/* View Controls Header */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 flex-shrink-0 bg-white">
                        <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-md transition-colors">
                            <ListFilter className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-700 font-medium">All</span>
                            <span className="text-sm text-gray-400">·</span>
                            <span className="text-sm text-gray-400">{items.length}</span>
                            <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />
                        </div>

                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <button className="px-3 py-1.5 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">Filter</button>
                            <button className="px-3 py-1.5 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">Sort</button>
                            <button className="px-3 py-1.5 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">Option</button>
                        </div>
                    </div>

                    {/* Table Body (including sticky header for scroll alignment) */}
                    <div className="overflow-y-auto flex-1 flex flex-col">
                        
                        {/* Table Header */}
                        <div style={gridStyle} className="border-b border-gray-100 bg-white text-sm font-medium text-gray-400 sticky top-0 z-10 px-4">
                            <div className="relative flex items-center border-r border-gray-100 pr-4 py-2">
                                <Activity className="w-4 h-4 mr-2" />
                                <span className="truncate">Signal</span>
                                <ResizeHandle index={0} />
                            </div>
                            <div className="relative flex items-center border-r border-gray-100 px-4 py-2">
                                <ArrowUpRight className="w-4 h-4 mr-2" />
                                <span className="truncate">Relations</span>
                                <ResizeHandle index={1} />
                            </div>
                            <div className="relative flex items-center border-r border-gray-100 px-4 py-2">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                <span className="truncate">Attention State</span>
                                <ResizeHandle index={2} />
                            </div>
                            <div className="relative flex items-center pl-4 py-2">
                                <span className="mr-2">[..]</span>
                                <span className="truncate">Last Activity</span>
                            </div>
                        </div>

                        {items.length > 0 ? items.map((item, index) => {
                            const isFocused = selectedItemId === item.id;
                            const isResolved = isFocused && viewState === 'resolved';
                            const isBlocked = viewState === 'resolved' && !isFocused;
                            
                            return (
                                <div 
                                    key={item.id} 
                                    onClick={() => {
                                        if (isBlocked) return;
                                        setSelectedItemId(item.id);
                                        setViewState('initial'); // Reset action state when switching items
                                        setIsPanelOpen(true);
                                    }}
                                    style={gridStyle}
                                    className={`border-b border-gray-100 transition-colors group relative flex-shrink-0
                                    ${isFocused 
                                        ? (isResolved ? 'bg-green-50/30 border-l-4 border-l-green-500 pl-3 pr-4' : 'bg-indigo-50/30 border-l-4 border-l-indigo-500 pl-3 pr-4 cursor-pointer')
                                        : (isBlocked ? 'px-4 opacity-40 cursor-not-allowed bg-gray-50' : 'px-4 hover:bg-gray-50 cursor-pointer')
                                    }`}
                                >
                                    
                                    {/* Signal Column */}
                                    <div className="flex items-center pr-4 border-r border-gray-100 relative py-3 overflow-hidden">
                                        {/* Visual indicator for unread/icon */}
                                        <div className="mr-3 flex-shrink-0 self-start mt-0.5">
                                            {isFocused && isResolved ? (
                                                <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                </div>
                                            ) : (
                                                <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                                                    item.attentionState === 'Action Required' ? 'bg-red-100 text-red-700' :
                                                    item.signal.includes('Waiting') ? 'bg-yellow-100 text-yellow-700' :
                                                    item.signal.includes('Task') ? 'bg-green-100 text-green-700' :
                                                    'bg-purple-100 text-purple-700'
                                                }`}>
                                                    {item.signal.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <span className={`text-sm whitespace-normal leading-snug truncate ${isFocused ? (isResolved ? 'font-medium text-gray-500 line-through decoration-gray-300' : 'font-medium text-indigo-900') : 'text-gray-800'}`}>
                                            {item.signal}
                                        </span>
                                        
                                        {/* Expansion Arrow - Visible on Hover for all items */}
                                        {!isResolved && (
                                            <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedItemId(item.id);
                                                setIsPanelOpen(true);
                                            }}
                                            className={`ml-auto flex items-center justify-center w-7 h-7 bg-white border border-gray-200 rounded-md text-gray-400 hover:text-indigo-600 hover:border-indigo-300 shadow-sm hover:shadow transition-all mr-2 flex-shrink-0 opacity-0 group-hover:opacity-100`}
                                            title="View details"
                                            >
                                                <ArrowUpRight className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Object Column */}
                                    <div className="flex items-center flex-wrap gap-y-1 px-4 border-r border-gray-100 py-3 self-start overflow-hidden">
                                        {item.objects.map(obj => (
                                            <ObjectBadge key={obj.id} object={obj} />
                                        ))}
                                    </div>

                                    {/* State Column */}
                                    <div className="flex items-center px-4 border-r border-gray-100 py-3 self-start overflow-hidden">
                                        {isFocused && isResolved ? (
                                             <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-green-50 text-green-700 border border-green-100">
                                                Resolved
                                             </span>
                                        ) : (
                                            <StateBadge state={item.attentionState} />
                                        )}
                                    </div>

                                    {/* Last Activity Column */}
                                    <div className="flex items-center pl-4 text-sm text-gray-500 py-3 self-start overflow-hidden">
                                        <div className="truncate w-full">
                                            {isResolved ? (
                                                <span className="font-medium text-gray-700">Resolved · Just now</span>
                                            ) : (
                                                <>
                                                    <span className="font-medium text-gray-700">{item.lastActivityTime}</span>
                                                    <span className="mx-1">•</span>
                                                    <span>{item.lastActivityDescription}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : (
                             <div className="p-8 text-center text-gray-400 text-sm">No items in inbox</div>
                        )}
                        
                        {/* Motivational Empty State Filler */}
                        <EmptySpaceMotivation count={items.length} />
                    </div>
                </div>
            </div>
        </div>

        {/* Persistent Detail Panel */}
        <DetailPanel 
            isOpen={isPanelOpen} 
            onClose={() => setIsPanelOpen(false)} 
            item={focusedItem} 
            onApprove={handleApprove} 
            onDismiss={handleDismiss}
            viewState={viewState}
            onConfirm={handleConfirm}
            onCancelReview={() => setViewState('initial')}
        />
      </div>
    </div>
  );
};