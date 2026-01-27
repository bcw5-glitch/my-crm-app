import React from 'react';
import { 
  Wifi, 
  Battery, 
  Search, 
  Workflow,
  MessageSquare,
  Terminal,
  Folder,
  Settings,
  Globe
} from 'lucide-react';

interface MacDesktopProps {
  onNotificationClick: () => void;
}

export const MacDesktop: React.FC<MacDesktopProps> = ({ onNotificationClick }) => {
  // Hardcoded time as requested
  const timeDisplay = "4:55 PM";
  const dateDisplay = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="w-full h-screen bg-cover bg-center relative overflow-hidden font-sans select-none"
         style={{ backgroundImage: 'linear-gradient(108deg, #5b9bd5 0%, #4a6fa5 30%, #303a7a 100%)' }}>
      
      {/* Menu Bar */}
      <div className="h-8 bg-black/20 backdrop-blur-md flex items-center justify-between px-4 text-white/90 text-[13px] font-medium z-50 absolute top-0 w-full shadow-sm">
        <div className="flex items-center space-x-4">
          <span className="text-lg pb-0.5"></span>
          <span className="font-bold">Finder</span>
          <span className="opacity-90 hover:opacity-100 cursor-default hidden sm:inline">File</span>
          <span className="opacity-90 hover:opacity-100 cursor-default hidden sm:inline">Edit</span>
          <span className="opacity-90 hover:opacity-100 cursor-default hidden sm:inline">View</span>
          <span className="opacity-90 hover:opacity-100 cursor-default hidden sm:inline">Go</span>
          <span className="opacity-90 hover:opacity-100 cursor-default hidden sm:inline">Window</span>
          <span className="opacity-90 hover:opacity-100 cursor-default hidden sm:inline">Help</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block opacity-80"><Battery className="w-5 h-5" /></div>
          <div className="hidden sm:block opacity-80"><Wifi className="w-4 h-4" /></div>
          <div className="hidden sm:block opacity-80"><Search className="w-4 h-4" /></div>
          <span className="flex items-center space-x-2">
            <span className="hidden sm:inline">{dateDisplay}</span>
            <span>{timeDisplay}</span>
          </span>
        </div>
      </div>

      {/* Desktop Content Area - Notification */}
      <div className="absolute top-10 right-4 flex flex-col items-end pointer-events-none z-40">
        <div 
          onClick={onNotificationClick}
          className="pointer-events-auto mt-2 w-80 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 overflow-hidden cursor-pointer hover:bg-white transition-all duration-200 animate-in slide-in-from-right-10 fade-in duration-500"
        >
          <div className="p-3.5 flex items-start space-x-3.5">
             <div className="flex-shrink-0 pt-0.5">
               <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-md overflow-hidden group">
                 {/* Stylized 20 Icon */}
                 <div className="font-bold text-lg tracking-tighter leading-none pr-0.5 group-hover:scale-110 transition-transform duration-300">20</div>
               </div>
             </div>
             <div className="flex-1 min-w-0">
               <div className="flex items-center justify-between mb-0.5">
                 <h4 className="text-[13px] font-semibold text-gray-900">Twenty</h4>
                 <span className="text-xs text-gray-500">now</span>
               </div>
               <p className="text-[13px] font-medium text-gray-900 truncate">New High Priority Signal</p>
               <p className="text-[13px] text-gray-600 leading-snug mt-0.5">
                 Daniel from Spotify has requested SLA document.
               </p>
             </div>
          </div>
        </div>
      </div>

      {/* Dock */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-auto max-w-full overflow-x-auto px-4">
        <div className="flex items-end space-x-3 bg-white/20 backdrop-blur-2xl px-3 pb-3 pt-3 rounded-2xl border border-white/20 shadow-2xl relative">
           
           <DockItem 
             color="bg-gradient-to-b from-blue-400 to-blue-600" 
             icon={<div className="text-white text-2xl">☺︎</div>} 
             label="Finder" 
           />
           
           <DockItem 
             color="bg-gradient-to-b from-gray-700 to-gray-900" 
             icon={<Terminal className="text-white w-6 h-6" />} 
             label="Terminal" 
           />
           
           <DockItem 
             color="bg-gradient-to-b from-green-400 to-green-600" 
             icon={<MessageSquare className="text-white w-6 h-6" />} 
             label="Messages" 
           />
           
           <DockItem 
             color="bg-white" 
             icon={<Globe className="text-blue-500 w-7 h-7" />} 
             label="Safari" 
             isActive={true}
           />
           
           <div className="w-px h-10 bg-white/20 mx-1 self-center"></div>

           <DockItem 
             color="bg-gradient-to-b from-blue-300 to-blue-400" 
             icon={<Folder className="text-white w-7 h-7" />} 
             label="Downloads" 
           />
           
           <DockItem 
             color="bg-gradient-to-b from-gray-200 to-gray-400" 
             icon={<Settings className="text-gray-700 w-7 h-7" />} 
             label="System Settings" 
           />
        </div>
      </div>
    </div>
  );
};

const DockItem = ({ color, icon, label, isActive }: { color: string, icon: React.ReactNode, label: string, isActive?: boolean }) => (
  <div className="relative group cursor-pointer">
    <div className={`w-14 h-14 ${color} rounded-2xl shadow-lg flex items-center justify-center transform transition-all duration-200 hover:-translate-y-2 hover:scale-110 active:scale-95 border border-white/10`}>
      {icon}
    </div>
    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/80 backdrop-blur text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">{label}</div>
    <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/80 rounded-full ${isActive ? 'opacity-100' : 'opacity-40'}`}></div>
  </div>
);