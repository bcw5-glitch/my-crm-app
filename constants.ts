import { InboxItem } from './types';

export const MOCK_INBOX_ITEMS: InboxItem[] = [
  {
    id: '1',
    signal: 'Daniel requested the latest SLA document from you',
    isUnread: true,
    objects: [
      { id: 'o2', name: 'Opportunity', type: 'Opportunity' }
    ],
    attentionState: 'Action Required',
    lastActivityTime: '1 min ago',
    lastActivityDescription: 'Incoming email request',
    messagePreview: "Hi Kevin, hope you're doing well. Could you please send over the latest SLA document? Our legal team needs to review the service level terms before we can finalize the contract.",
    aiInsight: "Delayed response will impact deal timeline. Legal has already approved the required documents."
  },
  {
    id: '2',
    signal: 'Waiting on response from Brian',
    isUnread: false,
    objects: [
      { id: 'p1', name: 'People', type: 'Person' }
    ],
    attentionState: 'Waiting',
    lastActivityTime: '2 days ago',
    lastActivityDescription: 'Email sent',
    messagePreview: "Hi Brian, following up on our conversation regarding the enterprise integration. Have you had a chance to review the proposal I sent on Tuesday?",
    aiInsight: "Engagement remains high. Brian typically replies within 48 hours. Recommended action: Wait until Friday before bumping."
  },
  {
    id: '3',
    signal: 'Task "Send NDA" marked complete',
    isUnread: false,
    objects: [
      { id: 't1', name: 'Task', type: 'Task' }
    ],
    attentionState: 'Recent Change',
    lastActivityTime: '1hr ago',
    lastActivityDescription: 'Completed by System',
    aiInsight: "Task auto-completed via DocuSign integration. The executed document has been automatically saved to the account records.",
    messagePreview: "System: Document 'Mutual NDA - Stripe' was signed by both parties."
  },
  {
    id: '4',
    signal: 'New note added to Figma',
    isUnread: false,
    objects: [
      { id: 'n1', name: 'Note', type: 'Note' }
    ],
    attentionState: 'Recent Change',
    lastActivityTime: '1hr ago',
    lastActivityDescription: 'Added by Sarah',
    messagePreview: "Met with the design ops team. They are looking to consolidate tools. VP of Design will be the final decision maker. Budget approval expected next week.",
    aiInsight: "Positive sentiment detected. Mention of 'Budget Approval' increases predictive close probability by 15%."
  }
];

export const MOCK_ITEM_DETAILS: Record<string, any> = {
    '1': {
        title: "Finalize SLA contract",
        createdSubtitle: "Created 4 hours ago",
        createdBy: "Elena Fisher",
        amount: "$120,000 ARR",
        closeDate: "Jan 30, 2026",
        stage: "Legal",
        lastUpdate: "1 hour ago",
        company: "Spotify",
        owner: "Daniel Ek",
        poc: "Daniel Ek",
        updatedBy: "Tanisha Park (Legal)",
        status: "All required documents are approved. Delivery to Daniel pending.",
        emailSender: "Daniel Ek",
        emailSubject: "Enterprise license latest SLA",
        emailBody: "Hi Kevin,\n\nHope you're doing well. Could you please send over the latest SLA document? Our legal team needs to review the service level terms before we can finalize the contract.\n\nCheers,\nDaniel",
        draftResponse: "Hi Daniel,\n\nI've attached the latest SLA document for you and your team to review and sign via DocuSign. If you have any questions, don't hesitate to reach out!\n\nThanks,\nKevin",
        pocInitials: "D"
    },
    '2': {
        title: "Airbnb Enterprise Partnership",
        createdSubtitle: "Active since Nov 2025",
        createdBy: "Nathan Drake",
        amount: "$850,000 ARR",
        closeDate: "Feb 15, 2026",
        stage: "Proposal",
        lastUpdate: "2 days ago",
        company: "Airbnb",
        owner: "Brian Chesky",
        poc: "Brian Chesky",
        updatedBy: "Kevin Chen",
        status: "Proposal sent. Waiting on stakeholder review.",
        emailSender: "Kevin Chen",
        emailSubject: "Partnership Proposal - Airbnb",
        emailBody: "Hi Brian,\n\nFollowing up on our conversation regarding the enterprise integration. Have you had a chance to review the proposal I sent on Tuesday?\n\nBest,\nKevin",
        pocInitials: "B"
    },
    '3': {
        title: "Send NDA - Stripe",
        createdSubtitle: "Due Yesterday",
        createdBy: "System",
        amount: "-",
        closeDate: "-",
        stage: "Completed",
        lastUpdate: "1 hour ago",
        company: "Stripe",
        owner: "Patrick Collison",
        poc: "Lisa Hamilton",
        updatedBy: "Automation",
        status: "NDA Signed and Executed.",
        emailSender: "DocuSign",
        emailSubject: "Completed: Mutual NDA - Stripe",
        emailBody: "All parties have signed 'Mutual NDA - Stripe'.\n\nThe final document is attached for your records.",
        pocInitials: "L"
    },
    '4': {
        title: "Figma Account Expansion",
        createdSubtitle: "Renewal: Dec 2026",
        createdBy: "Chloe Frazer",
        amount: "$450,000 ARR",
        closeDate: "Q3 2026",
        stage: "Discovery",
        lastUpdate: "1 hour ago",
        company: "Figma",
        owner: "Dylan Field",
        poc: "Jamal Brown",
        updatedBy: "Sarah Jones",
        status: "Expansion opportunity qualified via QBR.",
        emailSender: "Sarah Jones",
        emailSubject: "Note: QBR Summary",
        emailBody: "Met with the design ops team. They are looking to consolidate tools. VP of Design will be the final decision maker. Budget approval expected next week.",
        pocInitials: "J"
    }
};