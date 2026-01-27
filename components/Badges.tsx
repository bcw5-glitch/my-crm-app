import React from 'react';
import { CrmObject, AttentionState } from '../types';
import { Building, Users, Target, CheckSquare, FileText } from 'lucide-react';

interface ObjectBadgeProps {
  object: CrmObject;
}

export const ObjectBadge: React.FC<ObjectBadgeProps> = ({ object }) => {
  const getIcon = () => {
    switch (object.type) {
      case 'Company': return <Building className="w-3 h-3" />;
      case 'Person': return <Users className="w-3 h-3" />;
      case 'Opportunity': return <Target className="w-3 h-3" />;
      case 'Task': return <CheckSquare className="w-3 h-3" />;
      case 'Note': return <FileText className="w-3 h-3" />;
      default: return null;
    }
  };

  const getStyles = () => {
     if (object.name === 'Spotify') return 'bg-[#1ED760] text-black';
     if (object.name === 'Figma') return 'bg-purple-600 text-white';
     return 'bg-gray-100 text-gray-700 border border-gray-200';
  };

  const getIconClass = () => {
      if (object.name === 'Spotify') return 'text-black opacity-70';
      if (object.name === 'Figma') return 'text-white opacity-80';
      return 'text-gray-400';
  };

  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-sm font-medium mr-1.5 ${getStyles()}`}>
      <span className={`mr-1.5 ${getIconClass()}`}>
        {getIcon()}
      </span>
      {object.name}
    </span>
  );
};

interface StateBadgeProps {
  state: AttentionState;
}

export const StateBadge: React.FC<StateBadgeProps> = ({ state }) => {
  let colors = '';
  switch (state) {
    case 'Action Required':
      colors = 'bg-red-50 text-red-600 border border-red-100';
      break;
    case 'Waiting':
      colors = 'bg-orange-50 text-orange-600 border border-orange-100';
      break;
    case 'Recent Change':
      colors = 'bg-yellow-50 text-yellow-700 border border-yellow-100';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${colors}`}>
      {state}
    </span>
  );
};