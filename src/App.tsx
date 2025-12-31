/**
 * 【油糕品牌标识】
 * 本原型是油糕（Yougao）的思想作品，非产品原型。
 * 所有视觉/交互是"油糕对未来金融的内心感知"的具象化载体。
 * 这是一个概念性创新原型，可自动适应PC WEB和APP。
 */

import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { ServicePage } from './components/ServicePage';
import { FeedbackPage } from './components/FeedbackPage';
import { FloatingCTA } from './components/FloatingCTA';
import { VersionBadge } from './components/VersionBadge';
import { GoatCounterStats } from './components/GoatCounterStats';

export type Page = 'home' | 'service' | 'feedback';

export interface ServiceResult {
  query: string;
  analysis: string;
  suggestions: string[];
  actions: Array<{
    title: string;
    description: string;
    status: 'completed' | 'pending' | 'recommended';
  }>;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [serviceResult, setServiceResult] = useState<ServiceResult | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartService = () => {
    setCurrentPage('service');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceComplete = (result: ServiceResult) => {
    setServiceResult(result);
    setCurrentPage('feedback');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setServiceResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewService = () => {
    setCurrentPage('service');
    setServiceResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Version Badge */}
      <VersionBadge version={currentPage === 'service' ? 'v2' : 'v1'} />
      
      {/* GoatCounter Statistics */}
      <GoatCounterStats siteCode="ahua2020" />
      
      {/* Floating CTA Button - visible on home page when scrolled */}
      {currentPage === 'home' && scrollY > 600 && (
        <FloatingCTA onClick={handleStartService} />
      )}

      {/* Page Router */}
      {currentPage === 'home' && (
        <HomePage scrollY={scrollY} onStartService={handleStartService} />
      )}
      
      {currentPage === 'service' && (
        <ServicePage 
          onComplete={handleServiceComplete}
          onBack={handleBackToHome}
        />
      )}
      
      {currentPage === 'feedback' && serviceResult && (
        <FeedbackPage 
          result={serviceResult}
          onBackToHome={handleBackToHome}
          onNewService={handleNewService}
        />
      )}
    </div>
  );
}