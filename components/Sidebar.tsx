import React from 'react';
import { 
  Search, 
  Settings, 
  Inbox, 
  Bell, 
  Hourglass, 
  RefreshCcw, 
  Building, 
  Users, 
  Target, 
  CheckSquare, 
  FileText, 
  Workflow, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { AttentionState } from '../types';

export type FilterType = 'all' | AttentionState;

interface SidebarProps {
  totalCount: number;
  actionRequiredCount: number;
  waitingCount: number;
  recentChangeCount: number;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  totalCount, 
  actionRequiredCount, 
  waitingCount, 
  recentChangeCount,
  activeFilter,
  onFilterChange
}) => {
  
  const getNavItemClass = (filter: FilterType) => {
    const isActive = activeFilter === filter;
    const baseClass = "flex items-center px-3 py-1.5 rounded-md cursor-pointer transition-colors";
    
    // Sub-items styling
    return isActive 
        ? "bg-blue-50 text-blue-700 font-medium " + baseClass
        : "text-gray-600 hover:bg-gray-200 " + baseClass;
  };

  return (
    <div className="w-64 h-screen bg-[#F9FAFB] border-r border-gray-200 flex flex-col flex-shrink-0 text-sm">
      {/* Header / Company Switcher */}
      <div className="h-14 flex items-center px-4 hover:bg-gray-200 cursor-pointer transition-colors">
        <div className="w-5 h-5 bg-black rounded flex items-center justify-center mr-2 text-white text-xs font-bold">
           K
        </div>
        <span className="font-medium text-gray-700">Kevin Chen</span>
        <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
      </div>

      {/* Primary Nav */}
      <div className="px-2 py-2 space-y-0.5">
        <div className="flex items-center px-3 py-1.5 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer group">
          <Search className="w-4 h-4 mr-3 text-gray-500" />
          <span>Search</span>
          <span className="ml-auto text-xs text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded border border-gray-300 group-hover:bg-gray-300">/</span>
        </div>
        <div className="flex items-center px-3 py-1.5 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
          <Settings className="w-4 h-4 mr-3 text-gray-500" />
          <span>Settings</span>
        </div>
      </div>

      {/* Inbox Section */}
      <div className="px-2 mt-4 space-y-0.5">
        <div 
            onClick={() => onFilterChange('all')}
            className={`flex items-center px-3 py-1.5 rounded-md cursor-pointer font-medium ${activeFilter === 'all' ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          <Inbox className="w-4 h-4 mr-3 text-gray-700" />
          <span>Inbox</span>
          <span className="ml-auto bg-blue-600 text-white text-[10px] font-bold px-1.5 rounded-full min-w-[1.25rem] text-center">{totalCount}</span>
        </div>
        
        <div className="ml-4 pl-3 border-l border-gray-200 space-y-0.5 mt-1">
          <div 
            onClick={() => onFilterChange('Action Required')}
            className={getNavItemClass('Action Required')}
          >
            <Bell className={`w-4 h-4 mr-3 ${activeFilter === 'Action Required' ? 'text-blue-500' : 'text-gray-400'}`} />
            <span className="flex-1">Action Required</span>
            {actionRequiredCount > 0 && (
              <span className={`${activeFilter === 'Action Required' ? 'text-blue-600' : 'text-gray-400'} text-xs`}>{actionRequiredCount}</span>
            )}
          </div>
          <div 
            onClick={() => onFilterChange('Waiting')}
            className={getNavItemClass('Waiting')}
          >
            <Hourglass className={`w-4 h-4 mr-3 ${activeFilter === 'Waiting' ? 'text-blue-500' : 'text-gray-400'}`} />
            <span className="flex-1">Waiting</span>
            {waitingCount > 0 && (
              <span className={`${activeFilter === 'Waiting' ? 'text-blue-600' : 'text-gray-400'} text-xs`}>{waitingCount}</span>
            )}
          </div>
          <div 
            onClick={() => onFilterChange('Recent Change')}
            className={getNavItemClass('Recent Change')}
          >
            <RefreshCcw className={`w-4 h-4 mr-3 ${activeFilter === 'Recent Change' ? 'text-blue-500' : 'text-gray-400'}`} />
            <span className="flex-1">Recently Changed</span>
            {recentChangeCount > 0 && (
              <span className={`${activeFilter === 'Recent Change' ? 'text-blue-600' : 'text-gray-400'} text-xs`}>{recentChangeCount}</span>
            )}
          </div>
        </div>
      </div>

      {/* Workspace Section */}
      <div className="px-2 mt-6">
        <div className="px-3 text-xs font-semibold text-gray-400 mb-2">Workspace</div>
        <div className="space-y-0.5">
            <div className="flex items-center px-3 py-1.5 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
              <Building className="w-4 h-4 mr-3 text-gray-500" />
              <span>Companies</span>
            </div>
            <div className="flex items-center px-3 py-1.5 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
              <Users className="w-4 h-4 mr-3 text-gray-500" />
              <span>People</span>
            </div>
            <div className="flex items-center px-3 py-1.5 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
              <Target className="w-4 h-4 mr-3 text-gray-500" />
              <span>Opportunities</span>
            </div>
            <div className="flex items-center px-3 py-1.5 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
              <CheckSquare className="w-4 h-4 mr-3 text-gray-500" />
              <span>Tasks</span>
            </div>
            <div className="flex items-center px-3 py-1.5 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
              <FileText className="w-4 h-4 mr-3 text-gray-500" />
              <span>Notes</span>
            </div>
            <div className="flex items-center px-3 py-1.5 text-gray-600 hover:bg-gray-200 rounded-md cursor-pointer">
              <Workflow className="w-4 h-4 mr-3 text-gray-500" />
              <span>Workflows</span>
            </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto px-2 pb-4">
        <div className="flex items-center px-3 py-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-md cursor-pointer transition-colors">
          <HelpCircle className="w-4 h-4 mr-3" />
          <span>Support</span>
        </div>
      </div>
    </div>
  );
};