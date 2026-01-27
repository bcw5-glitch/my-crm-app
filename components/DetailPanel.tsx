import React, { useState, useEffect } from 'react';
import { 
  X, 
  Target, 
  Clock, 
  FileText, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  FileEdit, 
  Shield, 
  ShieldCheck, 
  ChevronLeft, 
  MoreVertical, 
  Maximize2, 
  Home, 
  List, 
  CheckSquare, 
  StickyNote, 
  Paperclip, 
  Link as LinkIcon, 
  User, 
  MapPin, 
  DollarSign, 
  Linkedin, 
  Twitter, 
  ChevronDown, 
  Command, 
  ArrowUpRight, 
  Mail, 
  Plus, 
  Calendar, 
  Bot, 
  History,
  Sparkles,
  Reply,
  Send,
  Flag,
  Phone,
  MessageCircle,
  Briefcase,
  Zap,
  Layers,
  Users,
  Bell
} from 'lucide-react';
import { MOCK_ITEM_DETAILS } from '../constants';
import { InboxItem } from '../types';
import { StateBadge, ObjectBadge } from './Badges';

interface DetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  item?: InboxItem;
  onApprove?: () => void;
  onDismiss?: () => void;
  viewState?: 'initial' | 'review' | 'resolved';
  onConfirm?: () => void;
  onCancelReview?: () => void;
  // deprecated prop support
  isFinalized?: boolean;
}

const TabItem = ({ 
    icon: Icon, 
    label, 
    id, 
    activeTab, 
    onClick 
}: { 
    icon: any, 
    label: string, 
    id: string, 
    activeTab: string, 
    onClick: (id: string) => void 
}) => (
    <div 
        onClick={() => onClick(id)}
        className={`flex items-center py-3.5 px-2 cursor-pointer border-b-2 transition-all flex-shrink-0 ${activeTab === id ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
    >
        <Icon className={`w-4 h-4 mr-2 ${activeTab === id ? 'text-gray-900 stroke-[2.5px]' : 'text-gray-400'}`} />
        <span className={`text-[13px] ${activeTab === id ? 'font-semibold' : 'font-medium'}`}>{label}</span>
    </div>
);

const PropertyRow = ({ icon: Icon, label, children }: { icon: any, label: string, children?: React.ReactNode }) => (
    <div className="flex items-center min-h-[32px]">
        <div className="flex items-center text-gray-400 w-[140px] flex-shrink-0">
            <Icon className="w-4 h-4 mr-3 opacity-60" />
            <span className="text-[13px] font-normal">{label}</span>
        </div>
        <div className="text-[13px] font-normal text-gray-900 flex items-center">
            {children}
        </div>
    </div>
);

const SectionHeader = ({ label, isOpen, onToggle }: { label: string, isOpen?: boolean, onToggle?: () => void }) => {
    if (onToggle !== undefined && isOpen !== undefined) {
        return (
            <div 
                className="flex items-center justify-between cursor-pointer py-2 group select-none mb-1" 
                onClick={onToggle}
            >
                <h3 className="text-[13px] font-medium text-gray-900">{label}</h3>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`} />
            </div>
        );
    }
    return <h3 className="text-[13px] font-medium text-gray-900 mb-3">{label}</h3>;
};

export const DetailPanel: React.FC<DetailPanelProps> = ({ 
    isOpen, 
    onClose, 
    item, 
    onApprove, 
    onDismiss, 
    viewState = 'initial',
    onConfirm,
    onCancelReview,
    isFinalized
}) => {
  const [activeTab, setActiveTab] = useState('Notification');
  const [emailView, setEmailView] = useState<'list' | 'thread'>('list');
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [isRelatedOpen, setIsRelatedOpen] = useState(false);
  const [draftBody, setDraftBody] = useState('');
  const [isResolvedEmailExpanded, setIsResolvedEmailExpanded] = useState(false);

  // Compatibility with deprecated prop if passed
  const currentViewState = isFinalized ? 'resolved' : viewState;
  
  const data = MOCK_ITEM_DETAILS[item?.id || '1'] || MOCK_ITEM_DETAILS['1'];

  useEffect(() => {
      if (data.draftResponse) {
          setDraftBody(data.draftResponse);
      } else {
          setDraftBody(data.emailBody);
      }
      setIsResolvedEmailExpanded(false);
  }, [data]);
  
  if (!isOpen) return null;

  // Review Screen - shown before resolution
  if (currentViewState === 'review') {
    return (
        <div className="w-[500px] h-[calc(100%-3rem)] mt-6 mr-6 mb-6 bg-white border border-gray-200 rounded-lg flex flex-col flex-shrink-0 shadow-sm z-20 font-sans text-sm overflow-hidden animate-in slide-in-from-right-10 duration-300">
            {/* Header */}
             <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100 bg-white flex-shrink-0">
                <div className="flex items-center space-x-3">
                    <button onClick={onCancelReview} className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-gray-900">Review & Send</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                
                {/* Item Context */}
                 <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600">
                         <span className="font-bold text-xs">S</span>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">Finalize SLA Contract</div>
                        <div className="text-xs text-gray-500">Spotify Enterprise License</div>
                    </div>
                </div>

                {/* Attachment Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Attachment</h4>
                        <div className="flex items-center px-2 py-0.5 rounded bg-green-50 border border-green-100 text-green-700 text-[11px] font-medium">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            Approved by Legal
                        </div>
                    </div>
                    <div className="flex items-center p-3 border border-gray-100 rounded-md bg-gray-50">
                         <FileText className="w-8 h-8 text-red-500 mr-3" />
                         <div className="flex-1">
                             <div className="text-sm font-medium text-gray-900">SpotifySecurityDoc_v2.pdf</div>
                             <div className="text-xs text-gray-500">2.4 MB • PDF</div>
                         </div>
                         <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                </div>

                {/* Email Editor */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                             <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Draft</h4>
                             <span className="text-xs text-gray-400">Click message to edit</span>
                        </div>
                        <span className="text-xs text-gray-400">To: Daniel Ek</span>
                    </div>
                    <div className="p-4">
                        <div className="mb-3 border-b border-gray-100 pb-2">
                            <label className="block text-xs text-gray-400 mb-1">Subject</label>
                            <div className="text-sm font-medium text-gray-900">{data.emailSubject}</div>
                        </div>
                        <textarea 
                            className="w-full text-sm text-gray-800 leading-relaxed border-none focus:ring-0 p-0 resize-none h-48 bg-transparent outline-none placeholder:text-gray-300"
                            value={draftBody}
                            onChange={(e) => setDraftBody(e.target.value)}
                            placeholder="Type your message here..."
                        />
                    </div>
                    <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                         <div className="flex items-center space-x-2">
                             <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-200 transition-colors"><Paperclip className="w-4 h-4" /></button>
                             <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-200 transition-colors"><Sparkles className="w-4 h-4" /></button>
                         </div>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-end space-x-3">
                <button 
                    onClick={onCancelReview}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={onConfirm}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center"
                >
                    <Send className="w-4 h-4 mr-2" />
                    Send & Resolve
                </button>
            </div>
        </div>
    );
  }

  // Override title for the specific demo case or use item signal
  const headerTitle = data.title;
  const headerSubtitle = data.createdSubtitle;

  const getResolvedContent = (id: string) => {
    switch(id) {
      case '1':
        return {
          title: 'SLA sent to Daniel',
          description: 'Your email with the attached approved SLA document has been sent to Daniel.',
          nextStep: 'A follow-up task has been created for Thursday to check in and make sure the SLA has been signed by Daniel. You can edit or remove it anytime.',
          reason: 'Ensures we stay within the 7-day signing window.'
        };
      case '2':
        return {
          title: 'Draft saved',
          description: 'Follow-up email drafted for Brian. Scheduled for review.',
          nextStep: 'Reminders set for 9:00 AM tomorrow.',
          reason: 'Giving a 24-hour buffer allows for potential organic replies.'
        };
      case '3':
        return {
          title: 'Next task created',
          description: '"Send Contract" task added to your queue.',
          nextStep: 'Contract generation task added to "High Priority" list.',
          reason: 'Sequential workflow triggers next step.'
        };
      case '4':
        return {
          title: 'Reply posted',
          description: 'Comment added to Figma thread. Sarah notified.',
          nextStep: 'Notification set for 48 hours to check response.',
          reason: 'Monitoring for "Budget Approval" signal.'
        };
      default:
        return {
          title: 'Action completed',
          description: 'The item has been successfully processed.',
          nextStep: 'A follow-up task has been created.',
          reason: 'Standard follow-up protocol.'
        };
    }
  };

  const getWorkspaceContext = (id: string) => {
    switch(id) {
        case '1': return { type: 'Opportunity', name: 'Spotify Enterprise License', sub: '$120,000 ARR • Legal Stage', icon: Target, color: 'gray' };
        case '2': return { type: 'Opportunity', name: 'Airbnb Enterprise Partnership', sub: '$850,000 ARR • Proposal Stage', icon: Target, color: 'gray' };
        case '3': return { type: 'Task', name: 'Send NDA - Stripe', sub: 'Due Yesterday • High Priority', icon: CheckSquare, color: 'green' };
        case '4': return { type: 'Opportunity', name: 'Figma Account Expansion', sub: '$450,000 ARR • Discovery Stage', icon: Target, color: 'gray' };
        default: return { type: 'Record', name: 'Workspace Item', sub: 'View Details', icon: Layers, color: 'gray' };
    }
  };

  const getContextualFile = (id: string) => {
    switch(id) {
        case '1': return { name: 'SpotifySecurityDoc_v2.pdf', size: '2.4 MB', type: 'PDF', user: 'Elena Fisher', color: 'red' };
        case '2': return { name: 'Airbnb_Partnership_Proposal.pdf', size: '5.2 MB', type: 'PDF', user: 'Kevin Chen', color: 'red' };
        case '3': return { name: 'Stripe_Mutual_NDA_Executed.pdf', size: '1.2 MB', type: 'PDF', user: 'System', color: 'red' };
        case '4': return null; // No file for note
        default: return null;
    }
  };

  const resolvedContent = item ? getResolvedContent(item.id) : null;
  const workspaceContext = item ? getWorkspaceContext(item.id) : null;
  const contextualFile = item ? getContextualFile(item.id) : null;

  const renderHeaderIcon = () => {
    let colorClass = 'bg-gray-100 text-gray-600';
    let content = <span className="text-xs font-bold">O</span>;
    
    // Check types to render appropriate icon
    if (item?.objects.some(o => o.type === 'Company')) {
        const company = item.objects.find(o => o.type === 'Company');
        const letter = company?.name.charAt(0) || 'C';
        content = <span className="text-xs font-bold">{letter}</span>;
        
        if (company?.name === 'Spotify') colorClass = 'bg-green-100 text-green-700';
        else if (company?.name === 'Airbnb') colorClass = 'bg-red-100 text-red-700';
        else if (company?.name === 'Figma') colorClass = 'bg-purple-100 text-purple-700';
        else if (company?.name === 'Stripe') colorClass = 'bg-indigo-100 text-indigo-700';
    } else if (item?.objects.some(o => o.type === 'Task')) {
        content = <CheckSquare className="w-3.5 h-3.5" />;
        colorClass = 'bg-blue-100 text-blue-700';
    } else if (item?.objects.some(o => o.type === 'Opportunity')) {
        content = <Target className="w-3.5 h-3.5" />;
        colorClass = 'bg-blue-100 text-blue-700';
    } else if (item?.objects.some(o => o.type === 'Person')) {
        content = <Users className="w-3.5 h-3.5" />;
        colorClass = 'bg-gray-100 text-gray-700';
    } else if (item?.objects.some(o => o.type === 'Note')) {
        content = <FileText className="w-3.5 h-3.5" />;
        colorClass = 'bg-yellow-100 text-yellow-700';
    }

    return (
        <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${colorClass}`}>
            {content}
        </div>
    );
  };

  const renderQuickActions = () => {
      if (item?.id === '1') {
          return (
            <div className="flex flex-col gap-2 mt-4">
                <button 
                    onClick={onApprove}
                    className="flex items-center justify-between p-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all group text-left shadow-md hover:shadow-lg border border-transparent relative overflow-hidden"
                >
                    <div className="flex items-center relative z-10">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 text-white backdrop-blur-sm border border-white/10">
                            <Send className="w-5 h-5 ml-0.5" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">Send approved SLA</div>
                            <div className="text-xs text-blue-100 mt-0.5 font-medium">Via DocuSign integration</div>
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-200 group-hover:text-white group-hover:translate-x-1 transition-all relative z-10" />
                </button>
                
                <button className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-all group text-left shadow-sm mt-1">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-gray-500 border border-gray-200">
                            <Flag className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-700">Request legal review</div>
                            <div className="text-xs text-gray-400 mt-0.5">Flag for changes</div>
                        </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </button>
            </div>
          );
      }
      
      if (item?.id === '2') { // Brian Chesky
          return (
            <div className="flex flex-col gap-2 mt-4">
                <button 
                    onClick={onApprove}
                    className="flex items-center justify-between p-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all group text-left shadow-md hover:shadow-lg border border-transparent relative overflow-hidden"
                >
                    <div className="flex items-center relative z-10">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 text-white backdrop-blur-sm border border-white/10">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">Draft Follow-up</div>
                            <div className="text-xs text-blue-100 mt-0.5 font-medium">Use AI to draft bump email</div>
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-200 group-hover:text-white group-hover:translate-x-1 transition-all relative z-10" />
                </button>
            </div>
          );
      }

      if (item?.id === '3') { // Task Complete
        return (
            <div className="flex flex-col gap-2 mt-4">
                 <button 
                    onClick={onApprove}
                    className="flex items-center justify-between p-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all group text-left shadow-md hover:shadow-lg border border-transparent relative overflow-hidden"
                >
                    <div className="flex items-center relative z-10">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 text-white backdrop-blur-sm border border-white/10">
                            <CheckSquare className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">Create Next Task</div>
                            <div className="text-xs text-blue-100 mt-0.5 font-medium">Schedule next step</div>
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-200 group-hover:text-white group-hover:translate-x-1 transition-all relative z-10" />
                </button>
            </div>
        );
      }

       if (item?.id === '4') { // Figma Note
        return (
            <div className="flex flex-col gap-2 mt-4">
                 <button 
                    onClick={onApprove}
                    className="flex items-center justify-between p-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all group text-left shadow-md hover:shadow-lg border border-transparent relative overflow-hidden"
                >
                    <div className="flex items-center relative z-10">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 text-white backdrop-blur-sm border border-white/10">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">Reply to Note</div>
                            <div className="text-xs text-blue-100 mt-0.5 font-medium">Comment via Figma</div>
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-200 group-hover:text-white group-hover:translate-x-1 transition-all relative z-10" />
                </button>
            </div>
        );
      }

      return null;
  };

  return (
    <div className="w-[500px] h-[calc(100%-3rem)] mt-6 mr-6 mb-6 bg-white border border-gray-200 rounded-lg flex flex-col flex-shrink-0 shadow-sm z-20 font-sans text-sm overflow-hidden animate-in slide-in-from-right-10 duration-300">
      
      {/* 1. Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100 bg-white flex-shrink-0">
        <div className="flex items-center space-x-3 overflow-hidden">
            <button 
                onClick={onClose} 
                disabled={currentViewState === 'resolved'}
                className={`transition-colors p-1 rounded-md ${currentViewState === 'resolved' ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
            >
                <X className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-3 truncate">
                {renderHeaderIcon()}
                <div className="flex items-baseline space-x-2 truncate">
                    <span className="font-semibold text-gray-900 truncate text-[15px]">{headerTitle}</span>
                    <span className="text-gray-400 font-normal truncate text-xs">{headerSubtitle}</span>
                </div>
            </div>
        </div>
        <div className="flex items-center space-x-1 flex-shrink-0">
            <button className="p-1 text-gray-400 hover:bg-gray-100 rounded transition-colors">
                <MoreVertical className="w-4 h-4" />
            </button>
        </div>
      </div>

      {/* 2. Tabs */}
      <div className="flex items-center px-2 border-b border-gray-200 bg-white overflow-x-auto no-scrollbar gap-1">
          <TabItem icon={Bell} label="Notification" id="Notification" activeTab={activeTab} onClick={setActiveTab} />
          <TabItem icon={History} label="Timeline" id="Timeline" activeTab={activeTab} onClick={setActiveTab} />
          <TabItem icon={Paperclip} label="Files" id="Files" activeTab={activeTab} onClick={setActiveTab} />
          <TabItem icon={Mail} label="Emails" id="Emails" activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {/* 3. Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
          
          {activeTab === 'Notification' && item && (
            <div className="pb-5">
              
              {/* FOCUS SECTION */}
              <div className={`p-6 border-b border-gray-100 ${currentViewState === 'resolved' ? 'bg-green-50/30' : 'bg-indigo-50/30'}`}>
                   
                   {currentViewState === 'resolved' ? (
                       <div className="animate-in fade-in duration-300">
                           <div className="flex items-center space-x-2 text-green-700 mb-3">
                                <CheckCircle2 className="w-5 h-5 fill-green-100" />
                                <span className="font-semibold text-sm uppercase tracking-wide">Resolved</span>
                           </div>
                           <h2 className="text-lg font-bold text-gray-900 mb-2">{resolvedContent?.title}</h2>
                           <p className="text-gray-600 leading-relaxed mb-4">{resolvedContent?.description}</p>
                           
                           {/* Added Document & Email Previews for Item 1 */}
                           {item.id === '1' && (
                                <div className="mb-5 space-y-3">
                                    {/* Document Preview */}
                                    <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-white shadow-sm">
                                        <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                            <FileText className="w-5 h-5 text-red-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-gray-900 truncate">SpotifySecurityDoc_v2.pdf</div>
                                            <div className="text-xs text-gray-500">Sent via DocuSign • 2.4 MB</div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">Sent</span>
                                        </div>
                                    </div>
                                    
                                    {/* Email Preview */}
                                    <div 
                                        className={`bg-white border border-gray-200 rounded-lg p-3 shadow-sm relative cursor-pointer transition-all ${isResolvedEmailExpanded ? 'ring-1 ring-blue-100 shadow-md' : 'hover:border-blue-300'}`}
                                        onClick={() => setIsResolvedEmailExpanded(!isResolvedEmailExpanded)}
                                    >
                                        <div className="absolute top-3 right-3 text-xs text-gray-400 flex items-center gap-1">
                                            <span>Just now</span>
                                            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isResolvedEmailExpanded ? 'rotate-180' : ''}`} />
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-600 mr-2">
                                                K
                                            </div>
                                            <div className="text-xs font-medium text-gray-900">Kevin Chen <span className="text-gray-400 font-normal">to Daniel Ek</span></div>
                                        </div>
                                        <div className={`text-sm text-gray-600 border-l-2 border-gray-200 pl-3 transition-all ${isResolvedEmailExpanded ? 'whitespace-pre-wrap' : 'italic'}`}>
                                            {isResolvedEmailExpanded ? draftBody : `${draftBody.substring(0, 100)}...`}
                                        </div>
                                    </div>
                                </div>
                           )}
                           
                           {/* Next Step Box */}
                           <div className="bg-white border border-gray-200 rounded-md p-3 mb-4 shadow-sm">
                               <div className="flex items-start">
                                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-0.5">Next Step</div>
                                        <div className="text-sm text-gray-900 mb-2">{resolvedContent?.nextStep}</div>
                                        
                                        {/* Added Edit/Remove Buttons */}
                                        <div className="flex items-center gap-2">
                                            <button className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 text-xs font-medium rounded-md transition-all shadow-sm">
                                                Edit Task
                                            </button>
                                            <button className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-400 hover:text-red-600 text-xs font-medium rounded-md transition-all shadow-sm">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                               </div>
                           </div>

                           <button 
                                onClick={onDismiss}
                                className="w-full py-2 bg-green-600 border border-transparent text-white text-sm font-medium rounded-md shadow-sm hover:bg-green-700 transition-colors"
                           >
                               Dismiss from inbox
                           </button>
                       </div>
                   ) : (
                       <>
                        {/* Context Header */}
                        <div className="flex items-center space-x-2 mb-4">
                            <StateBadge state={item.attentionState} />
                            <div className="h-3 w-px bg-gray-300"></div>
                            <div className="flex items-center space-x-1">
                                {item.objects.map(obj => (
                                    <ObjectBadge key={obj.id} object={obj} />
                                ))}
                            </div>
                        </div>

                        {/* Signal Title */}
                        <h2 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{item.signal}</h2>

                        {/* Preview */}
                        {item.messagePreview && (
                            <div className="mb-4">
                                <p className="text-gray-600 text-[14px] leading-relaxed mb-2">
                                    "{item.messagePreview}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => setActiveTab('Emails')}
                                        className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center group py-1 transition-colors relative"
                                    >
                                        View full email
                                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </button>
                                    
                                    {item.id === '1' && (
                                        <>
                                            <span className="text-gray-300">|</span>
                                            <button 
                                                onClick={() => setActiveTab('Files')}
                                                className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center group py-1 transition-colors relative"
                                            >
                                                See document
                                                <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* AI Insight */}
                        {item.aiInsight && (
                            <div className="bg-indigo-50 border border-indigo-100 rounded-md p-3 mb-4">
                                <div className="flex items-start">
                                    <Sparkles className="w-4 h-4 text-indigo-600 mt-0.5 mr-2.5 flex-shrink-0" />
                                    <div className="text-[13px] text-indigo-900 leading-snug">
                                        {item.aiInsight}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Separator */}
                        <div className="h-px bg-gray-200 w-full my-4"></div>

                        {/* Actions Header */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Suggested Actions</h3>
                        </div>

                        {/* Action Buttons */}
                        {renderQuickActions()}
                       </>
                   )}
              </div>

              {/* Properties Section (Collapsible) */}
              <div className="px-6 py-6 border-b border-gray-100">
                  <SectionHeader 
                    label="Properties" 
                    isOpen={isPropertiesOpen} 
                    onToggle={() => setIsPropertiesOpen(!isPropertiesOpen)} 
                  />
                  
                  {isPropertiesOpen && (
                      <div className="space-y-4 pt-1 animate-in slide-in-from-top-2 duration-200">
                        <PropertyRow icon={DollarSign} label="Amount">
                            <span className="text-gray-900">{data.amount}</span>
                        </PropertyRow>

                        <PropertyRow icon={Calendar} label="Close date">
                            <span className="text-gray-900">{data.closeDate}</span>
                        </PropertyRow>

                        <PropertyRow icon={User} label="Assigned to">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center text-[9px] text-gray-600 font-bold">K</div>
                                <span className="text-gray-900">Kevin Chen</span>
                            </div>
                        </PropertyRow>

                        <PropertyRow icon={CheckCircle2} label="Deal Stage">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-sm font-medium ${currentViewState === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                                {currentViewState === 'resolved' ? "Finalizing" : data.stage}
                            </span>
                        </PropertyRow>

                        <PropertyRow icon={Calendar} label="Last update">
                            <span className="text-gray-900">{data.lastUpdate}</span>
                        </PropertyRow>
                      </div>
                  )}
              </div>

              {/* Company Section / Related (Collapsible) */}
              <div className="px-6 py-6 pb-2">
                  <SectionHeader 
                    label="Related" 
                    isOpen={isRelatedOpen} 
                    onToggle={() => setIsRelatedOpen(!isRelatedOpen)} 
                  />
                  
                  {isRelatedOpen && (
                      <div className="space-y-2 pt-1 animate-in slide-in-from-top-2 duration-200">
                           {/* Workspace Context Item */}
                           {workspaceContext && (
                            <div className="flex items-center px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors -ml-2 cursor-pointer w-fit mb-1">
                                <div className="mr-2">
                                    <ObjectBadge object={{ id: 'ctx', name: workspaceContext.type, type: workspaceContext.type as any }} />
                                </div>
                                <span className="text-sm text-gray-900 font-medium">{workspaceContext.name}</span>
                            </div>
                           )}

                          {/* Company Item */}
                          <div className="flex items-center px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors -ml-2 cursor-pointer w-fit">
                              <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center mr-2.5 overflow-hidden">
                                  {data.company === 'Spotify' ? (
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify" className="w-3.5 h-3.5" />
                                  ) : (
                                    <span className="text-[10px] font-bold text-gray-700">{data.company.charAt(0)}</span>
                                  )}
                              </div>
                              <span className="text-sm text-gray-900">{data.company}</span>
                          </div>
                          
                          {/* Person Item */}
                          <div className="flex items-center px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors -ml-2 cursor-pointer w-fit">
                              <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center mr-2.5 text-blue-700">
                                  <span className="text-[10px] font-bold">{data.pocInitials || data.poc.charAt(0)}</span>
                              </div>
                              <span className="text-sm text-gray-900">{data.poc}</span>
                          </div>
                      </div>
                  )}
              </div>

            </div>
          )}

          {activeTab === 'Files' && (
             <div className="p-6 animate-in fade-in duration-300">
                 
                 {/* System Reminder - Shows for the SLA item */}
                 {item?.id === '1' && (
                    <div className="mb-6 bg-blue-50/50 border border-blue-100/80 rounded-lg p-3 flex items-start">
                        <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                            <div className="text-[13px] font-medium text-gray-900">Legal has approved this document</div>
                            <div className="text-xs text-gray-500 mt-0.5">Verified by Tanisha Park · Today at 9:42 AM</div>
                        </div>
                    </div>
                 )}

                 <div className="flex items-center justify-between mb-4">
                     <SectionHeader label="Documents" />
                 </div>
                 
                 {/* File Item */}
                 {contextualFile ? (
                     <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all bg-white group cursor-pointer mb-3">
                         <div className="flex items-center">
                             <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center mr-4">
                                 <FileText className="w-5 h-5 text-red-600" />
                             </div>
                             <div>
                                 <div className="text-sm font-medium text-gray-900 mb-0.5 group-hover:text-blue-600 transition-colors">{contextualFile.name}</div>
                                 <div className="text-xs text-gray-500">{contextualFile.size} • {contextualFile.type} • Uploaded by {contextualFile.user}</div>
                             </div>
                         </div>
                         <div className="flex items-center">
                            <div className="p-2 text-gray-400 hover:bg-gray-100 rounded-md">
                               <MoreVertical className="w-4 h-4" />
                            </div>
                         </div>
                     </div>
                 ) : (
                     <div className="mb-6 text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                         <p className="text-xs text-gray-400">No documents attached</p>
                     </div>
                 )}

                 {/* Upload area */}
                 <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                     <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                       <Plus className="w-5 h-5 text-gray-400" />
                     </div>
                     <p className="text-sm font-medium text-gray-900">Upload new file</p>
                     <p className="text-xs text-gray-500 mt-1">Drag and drop or click to browse</p>
                 </div>
             </div>
          )}

          {activeTab === 'Emails' && (
            <div className="h-full flex flex-col relative animate-in fade-in duration-300">
                {emailView === 'list' ? (
                   <div className="p-6">
                      <div className="mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Inbox <span className="text-gray-400 font-medium ml-1">1</span></h2>
                      </div>
                      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                         {/* Email Item 1 - Dynamic based on selected item */}
                         <div onClick={() => setEmailView('thread')} className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors group">
                             <div className="flex items-center flex-1 min-w-0">
                                 <div className="flex-shrink-0 mr-3">
                                     <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-600">
                                         {data.pocInitials || data.poc.charAt(0)}
                                     </div>
                                 </div>
                                 <div className="flex-1 min-w-0 pr-4">
                                     <div className="flex items-baseline mb-0.5">
                                         <span className="text-sm font-medium text-gray-900 mr-2">{data.emailSender}</span>
                                         <span className="text-xs text-gray-400">{data.lastUpdate}</span>
                                     </div>
                                     <div className="text-sm text-gray-600 truncate">
                                        <span className="font-medium text-gray-900">{data.emailSubject}</span>
                                        <span className="mx-1 text-gray-300">-</span>
                                        {data.emailBody.substring(0, 50)}...
                                     </div>
                                 </div>
                             </div>
                         </div>
                      </div>
                   </div>
                ) : (
                   <div className="flex flex-col h-full bg-white">
                      {/* Thread Header */}
                      <div className="px-6 py-4 border-b border-gray-100 flex items-center cursor-pointer hover:bg-gray-50 transition-colors group" onClick={() => setEmailView('list')}>
                         <ChevronLeft className="w-4 h-4 text-gray-400 mr-1 group-hover:text-gray-600" />
                         <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">Email Thread</span>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-6">
                         <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{data.emailSubject}</h1>
                         <p className="text-sm text-gray-400 mb-10">Last message {data.lastUpdate}</p>
                         
                         {/* Message 3 (Latest) */}
                         <div className="mb-8 group">
                            <div className="flex items-baseline justify-between mb-2">
                               <div className="flex items-center">
                                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-700 mr-2.5">{data.pocInitials || data.poc.charAt(0)}</div>
                                  <span className="font-bold text-sm text-gray-900">{data.emailSender}</span>
                               </div>
                               <span className="text-xs text-gray-400 group-hover:text-gray-500">{data.lastUpdate}</span>
                            </div>
                            <div className="pl-[34px]">
                               <p className="text-xs text-gray-400 mb-4">to: kevin@foundry.com</p>
                               <div className="text-[15px] text-gray-800 leading-relaxed space-y-4 font-normal whitespace-pre-wrap">
                                  {data.emailBody}
                                </div>
                            </div>
                         </div>
           
                      </div>
           
                      {/* Reply Bar */}
                      <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0 flex justify-end">
                          <button className="flex items-center px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm bg-white hover:text-gray-900">
                             <Reply className="w-4 h-4 mr-2" />
                             Reply
                          </button>
                      </div>
                   </div>
                )}
            </div>
          )}
          
          {(activeTab !== 'Notification' && activeTab !== 'Files' && activeTab !== 'Emails' && activeTab !== 'Timeline') && (
             <div className="flex flex-col items-center justify-center h-64 text-gray-400 animate-in fade-in duration-300">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <CheckSquare className="w-6 h-6 opacity-20" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">No {activeTab.toLowerCase()} found</p>
                  <p className="text-xs mt-1">This section is empty for the demo.</p>
             </div>
          )}

      </div>
      
    </div>
  );
};