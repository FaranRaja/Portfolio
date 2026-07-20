import { lazy, Suspense } from 'react';
import Cursor from './components/Cursor';

const MarketingLayout = lazy(() => import('./components/MarketingLayout'));
const Chatbot = lazy(() => import('./components/Chatbot'));

const SectionFallback = () => (
  <div className="py-32 flex items-center justify-center min-h-screen bg-bg">
    <div className="w-8 h-8 rounded-full border-4 border-accent/30 border-t-accent animate-spin" />
  </div>
);

export default function App() {
  return (
    <div className="bg-bg min-h-screen">
      <Cursor />
      <Suspense fallback={<SectionFallback />}>
        <MarketingLayout />
      </Suspense>
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  );
}
