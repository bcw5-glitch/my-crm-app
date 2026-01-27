import React, { useState } from 'react';
import { Sidebar, FilterType } from './components/Sidebar';
import { InboxView } from './components/InboxView';
import { MacDesktop } from './components/MacDesktop';
import { MOCK_INBOX_ITEMS } from './constants';
import { InboxItem } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'desktop' | 'app'>('desktop');
  const [inboxItems, setInboxItems] = useState<InboxItem[]>(MOCK_INBOX_ITEMS);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  const handleDismissItem = (id: string) => {
    setInboxItems(prev => prev.filter(item => item.id !== id));
  };

  if (view === 'desktop') {
    return <MacDesktop onNotificationClick={() => setView('app')} />;
  }

  // Calculate counts for Sidebar (based on full list)
  const totalCount = inboxItems.length;
  const actionRequiredCount = inboxItems.filter(i => i.attentionState === 'Action Required').length;
  const waitingCount = inboxItems.filter(i => i.attentionState === 'Waiting').length;
  const recentChangeCount = inboxItems.filter(i => i.attentionState === 'Recent Change').length;

  // Filter items for view
  const filteredItems = inboxItems.filter(item => {
    if (currentFilter === 'all') return true;
    return item.attentionState === currentFilter;
  });

  return (
    <div className="flex w-full h-screen bg-[#F9FAFB] text-gray-900 font-sans animate-in zoom-in-95 duration-300">
      <Sidebar 
        totalCount={totalCount}
        actionRequiredCount={actionRequiredCount}
        waitingCount={waitingCount}
        recentChangeCount={recentChangeCount}
        activeFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />
      <InboxView 
        items={filteredItems} 
        onDismissItem={handleDismissItem} 
      />
    </div>
  );
};

export default App;