# Twenty CRM Inbox Experience

A modern, React-based CRM prototype powered by the Google Gemini API. This application re-imagines the CRM inbox with intelligent signal processing, AI-driven summaries, and delightful user interactions.

![Status](https://img.shields.io/badge/status-prototype-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Smart Signal Processing**: Intelligently categorizes incoming streams (emails, tasks, notes) into actionable attention states.
- **AI Summaries & Insights**: Leverages the Google Gemini API to generate concise summaries and predictive next steps for high-priority items.
- **Desktop Simulation**: Features a unique Mac-like entry point with interactive notifications to simulate the user journey.
- **Polished UI/UX**: Built with Tailwind CSS for a clean aesthetic, featuring smooth transitions and "Inbox Zero" success animations.
- **Contextual Workflows**: Seamlessly links related entities like People, Companies, and Opportunities within the detail view.

## Tech Stack

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- NPM or Yarn
- A Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/twenty-crm-inbox.git
   cd twenty-crm-inbox
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory to enable AI features:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## Project Structure

- `src/components/`: Core UI components including `InboxView`, `DetailPanel`, and `Sidebar`.
- `src/services/`: API integration logic for Gemini.
- `src/constants.ts`: Mock data configuration for the prototype experience.
- `src/types.ts`: TypeScript definitions for the CRM data model.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
