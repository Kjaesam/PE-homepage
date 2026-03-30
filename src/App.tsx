import React from 'react';
import { ArrowRight, Bell, Dumbbell, Image as ImageIcon, LayoutGrid } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        
        {/* Radial Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-xl font-black tracking-tighter flex items-center gap-2">
          매현중 <span className="text-blue-500">PE</span>
        </div>
        <div className="hidden md:flex gap-10 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors text-blue-400">홈</a>
          <a href="#" className="hover:text-white transition-colors">공지사항</a>
          <a href="#" className="hover:text-white transition-colors">체육활동</a>
          <a href="#" className="hover:text-white transition-colors">갤러리</a>
        </div>
        <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-all">
          로그인
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center">
        {/* LIVE Badge */}
        <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-blue-500/30 px-4 py-1.5 rounded-full mb-12 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
            LIVE: 2024 매현 체육 수업 진행 중
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
          매현중은 지금 <br />
          <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500 bg-clip-text text-transparent">
            에너지 충전 중
          </span>
        </h1>

        {/* Description */}
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-14 leading-relaxed font-light">
          땀방울이 만드는 매현의 열정! <br />
          학생들의 건강한 성장과 즐거운 도전이 가득한 현장을 만나보세요.
        </p>

        {/* Quick Access Buttons */}
        <div className="flex flex-wrap justify-center gap-5 w-full max-w-4xl">
          {/* Button 1 */}
          <button className="flex-1 min-w-[200px] group relative overflow-hidden bg-blue-600 px-8 py-6 rounded-3xl transition-all hover:scale-105 active:scale-95">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] group-hover:animate-[shimmer_2s_infinite]"></div>
            <div className="relative flex flex-col items-center gap-3">
              <Bell className="text-white/80" />
              <span className="text-xl font-bold">공지사항</span>
              <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
            </div>
          </button>

          {/* Button 2 */}
          <button className="flex-1 min-w-[200px] group bg-white/5 border border-white/10 backdrop-blur-md px-8 py-6 rounded-3xl transition-all hover:bg-white/10 hover:border-blue-500/50 hover:scale-105">
            <div className="flex flex-col items-center gap-3">
              <Dumbbell className="text-blue-400" />
              <span className="text-xl font-bold">체육활동</span>
              <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 text-blue-400" />
            </div>
          </button>

          {/* Button 3 */}
          <button className="flex-1 min-w-[200px] group bg-white/5 border border-white/10 backdrop-blur-md px-8 py-6 rounded-3xl transition-all hover:bg-white/10 hover:border-pink-500/50 hover:scale-105">
            <div className="flex flex-col items-center gap-3">
              <ImageIcon className="text-pink-400" />
              <span className="text-xl font-bold">갤러리</span>
              <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 text-pink-400" />
            </div>
          </button>
          
          {/* Button 4 */}
          <button className="flex-1 min-w-[200px] group bg-white/5 border border-white/10 backdrop-blur-md px-8 py-6 rounded-3xl transition-all hover:bg-white/10 hover:border-emerald-500/50 hover:scale-105">
            <div className="flex flex-col items-center gap-3">
              <LayoutGrid className="text-emerald-400" />
              <span className="text-xl font-bold">Apps</span>
              <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 text-emerald-400" />
            </div>
          </button>
        </div>
      </main>

      {/* CSS for Shimmer Animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
