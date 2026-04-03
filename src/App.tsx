import React, { useState, useEffect } from 'react';
import { ArrowRight, Bell, Dumbbell, Image as ImageIcon, LayoutGrid, Home, Settings, Plus, Trash2, X, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type View = 'home' | 'notices' | 'activities' | 'gallery' | 'admin';

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  type: string;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  date: string;
}

const colors = {
  primary: 'indigo-600', // 매현중 상징색 (신뢰, 미래)
  secondary: 'emerald-500', // 지역연계, 건강
  accent: 'amber-400', // 오아시스, 활력
  bg: 'slate-50',
  text: 'slate-900',
};

const DashboardCard = ({ title, subtitle, icon, children, className = '' }: { title: string; subtitle?: string; icon: any; children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-3xl p-7 shadow-sm border border-slate-100 ${className}`}>
    <div className="flex items-center gap-4 mb-6">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${className.includes('bg-indigo') || className.includes('bg-emerald') ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
        {icon}
      </div>
      <div>
        <h3 className={`text-xl font-bold ${className.includes('bg-indigo') || className.includes('bg-emerald') ? 'text-white' : 'text-slate-950'}`}>{title}</h3>
        {subtitle && <p className={`text-sm ${className.includes('bg-indigo') || className.includes('bg-emerald') ? 'opacity-80 text-white' : 'text-slate-500'}`}>{subtitle}</p>}
      </div>
    </div>
    {children}
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('maehyeon_notices');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "2026학년도 1학기 학사일정 안내", content: "주요 학사일정 및 공휴일을 확인하세요.", date: "2026-03-30", type: "학사" },
      { id: 2, title: "체육행사 캘린더 (4월)", content: "4월에 예정된 체육대회 및 리그 일정을 확인하세요.", date: "2026-03-29", type: "행사" },
      { id: 3, title: "요즘 매현중 체육은?", content: "학생들의 활기찬 체육 수업 현장 스케치", date: "2026-03-28", type: "소식" },
      { id: 4, title: "2026학년도 1학기 체육 수업 안내", content: "즐거운 체육 수업을 위해 준비물을 챙겨주세요.", date: "2026-03-02", type: "공지" },
      { id: 5, title: "체육관 이용 수칙 안내", content: "실내화 착용 및 음식물 반입 금지입니다.", date: "2026-03-05", type: "안내" },
    ];
  });
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('maehyeon_activities');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "교과수업활동", description: "다양한 종목의 기초 기능 및 전술 학습", imageUrl: "https://picsum.photos/seed/class/800/600", date: "2026-03-10" },
      { id: 2, title: "학생주도활동", description: "학생들이 직접 기획하고 운영하는 체육 활동", imageUrl: "https://picsum.photos/seed/student/800/600", date: "2026-03-12" },
      { id: 3, title: "학교스포츠클럽", description: "오아시스, 방과 후 및 점심시간 학교스포츠클럽 활동", imageUrl: "https://picsum.photos/seed/club/800/600", date: "2026-03-15" },
      { id: 4, title: "수원시 학교스포츠클럽 대회", description: "수원시 관내 학교 대항 스포츠 대회 참여", imageUrl: "https://picsum.photos/seed/competition/800/600", date: "2026-03-20" },
      { id: 5, title: "지역체육시설 연계 수업활동", description: "1학년 스포츠클라이밍, 2학년 복싱, 3학년 유도 종목 선택학생 지역 시설을 활용한 수업", imageUrl: "https://picsum.photos/seed/facility/800/600", date: "2026-03-25" },
      { id: 6, title: "학생심판교육", description: "공정한 경기 운영을 위한 심판 자질 함양 교육", imageUrl: "https://picsum.photos/seed/referee/800/600", date: "2026-03-28" },
    ];
  });
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('maehyeon_gallery');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "체육대회 현장", imageUrl: "https://picsum.photos/seed/pe-day/800/600", date: "2026-03-10" },
      { id: 2, title: "깊이있는 수업", imageUrl: "https://picsum.photos/seed/swimming/800/600", date: "2026-03-12" },
    ];
  });
  const [isLoading, setIsLoading] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('maehyeon_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('maehyeon_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('maehyeon_gallery', JSON.stringify(gallery));
  }, [gallery]);

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'maehyeon_notices' && e.newValue) setNotices(JSON.parse(e.newValue));
      if (e.key === 'maehyeon_activities' && e.newValue) setActivities(JSON.parse(e.newValue));
      if (e.key === 'maehyeon_gallery' && e.newValue) setGallery(JSON.parse(e.newValue));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Admin states
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', type: '공지' });
  const [newActivity, setNewActivity] = useState({ title: '', description: '', imageUrl: '' });
  const [newGallery, setNewGallery] = useState({ title: '', imageUrl: '' });

  const fetchData = async () => {
    try {
      const [noticesRes, activitiesRes, galleryRes] = await Promise.all([
        fetch('/api/notices'),
        fetch('/api/activities'),
        fetch('/api/gallery')
      ]);
      
      const results = [noticesRes, activitiesRes, galleryRes];
      
      for (const res of results) {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response from server");
        }
      }

      const [noticesData, activitiesData, galleryData] = await Promise.all(
        results.map(res => res.json())
      );

      setNotices(noticesData);
      setActivities(activitiesData);
      setGallery(galleryData);
    } catch (error) {
      // Silently fail to initial state if API is not available (e.g. static hosting)
      console.log("API not available, using local state.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'maehyeon123') {
      setIsAdminAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const addNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    const notice = { ...newNotice, id: Date.now(), date: new Date().toISOString().split('T')[0] };
    
    // Try API first
    try {
      const response = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notice)
      });
      if (response.ok) {
        fetchData();
      } else {
        setNotices(prev => [notice, ...prev]);
      }
    } catch (error) {
      setNotices(prev => [notice, ...prev]);
    }
    
    setNewNotice({ title: '', content: '', type: '공지' });
  };

  const addActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    const activity = { ...newActivity, id: Date.now(), date: new Date().toISOString().split('T')[0] };
    
    try {
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
      });
      if (response.ok) {
        fetchData();
      } else {
        setActivities(prev => [activity, ...prev]);
      }
    } catch (error) {
      setActivities(prev => [activity, ...prev]);
    }
    
    setNewActivity({ title: '', description: '', imageUrl: '' });
  };

  const addGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    const item = { ...newGallery, id: Date.now(), date: new Date().toISOString().split('T')[0] };
    
    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (response.ok) {
        fetchData();
      } else {
        setGallery(prev => [item, ...prev]);
      }
    } catch (error) {
      setGallery(prev => [item, ...prev]);
    }
    
    setNewGallery({ title: '', imageUrl: '' });
  };

  const deleteNotice = (id: number) => {
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const deleteActivity = (id: number) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  const deleteGallery = (id: number) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const leagueStandings = [
    { rank: 1, team: '3학년 2반', oasis: 120, league: '승점 24' },
    { rank: 2, team: '2학년 5반', oasis: 115, league: '승점 21' },
    { rank: 3, team: '3학년 1반', oasis: 110, league: '승점 19' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* 2. 상단 연구학교 알림 바 (최상단 고정) */}
      <div className="bg-indigo-950 text-white py-2.5 px-4 text-center sticky top-0 z-[60]">
        <p className="text-sm font-medium tracking-tight">
          <span className="bg-amber-400 text-indigo-950 px-2.5 py-0.5 rounded-full text-xs font-bold mr-2">연구학교</span>
          [경기도교육청 지정] 학생선택중심 교육과정 기반 학교체육 일상화 및 지역 연계 스포츠 플랫폼 구축
        </p>
      </div>

      {/* 3. 네비게이션 헤더 */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-[40px] z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentView('home')} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic text-xl">M</div>
              <h1 className="text-2xl font-black text-slate-950 tracking-tighter uppercase">
                Maehyeon <span className="text-indigo-600">PE</span>
              </h1>
            </button>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-bold text-slate-600 uppercase">
            <button onClick={() => setCurrentView('home')} className={currentView === 'home' ? 'text-indigo-600' : 'hover:text-slate-950'}>HOME</button>
            <button onClick={() => setCurrentView('notices')} className={currentView === 'notices' ? 'text-indigo-600' : 'hover:text-slate-950'}>Notices</button>
            <button onClick={() => setCurrentView('activities')} className={currentView === 'activities' ? 'text-indigo-600' : 'hover:text-slate-950'}>Activities</button>
            <button onClick={() => setCurrentView('gallery')} className={currentView === 'gallery' ? 'text-indigo-600' : 'hover:text-slate-950'}>Gallery</button>
            <button onClick={() => setCurrentView('admin')} className={currentView === 'admin' ? 'text-indigo-600' : 'hover:text-slate-950'}>Admin</button>
          </nav>
          <button className="p-2 bg-slate-100 rounded-xl md:hidden">
            <LayoutGrid size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.main 
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto px-6 py-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* A. 환영 섹션 & 오늘의 주요 소식 (2칸 차지) */}
              <div className="md:col-span-2 bg-indigo-600 rounded-[2rem] p-10 text-white shadow-xl shadow-indigo-600/10">
                <span className="inline-block bg-white/10 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-white/20">
                  Maehyeon Middle School Physical Education
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tighter">
                  학생이 주인 되는 <br />
                  즐거운 <span className="text-amber-400">체육 일상</span>을 만듭니다.
                </h2>
                <p className="text-xl text-indigo-100 font-medium max-w-2xl mb-10 leading-relaxed">
                  매현중학교 연구학교 홈페이지에 오신 것을 환영합니다. <br />
                  오늘의 오아시스 활동과 교내 리그 소식을 확인하세요.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-lg hover:bg-slate-50 transition shadow-lg">
                    오늘의 경기 결과
                  </button>
                  <button className="bg-white/10 text-white border-2 border-white/20 px-8 py-4 rounded-2xl font-black text-lg hover:bg-white/20 transition">
                    주도성 프로젝트 제안
                  </button>
                </div>
              </div>

              {/* B. O.A.SIS (오아시스) 활동 모습 */}
              <DashboardCard title="O.A.SIS" subtitle="오늘 아침 시작은 스포츠로!" icon="☀️" className="bg-amber-400 text-yellow-950">
                <div className="text-center py-6">
                  <p className="text-sm font-bold opacity-80 mb-2">현재 참여 인원</p>
                  <p className="text-6xl font-black italic">1,240 <span className="text-3xl">명</span></p>
                  <button className="w-full mt-6 bg-yellow-950 text-white py-3.5 rounded-xl font-bold hover:bg-yellow-900 transition">
                    활동 인증하기 +
                  </button>
                </div>
              </DashboardCard>

              {/* C. 학기말 수업연계 학급별 반대항 리그전 순위 (1칸) */}
              <DashboardCard title="Maehyeon League" subtitle="교내 반대항 리그전" icon="🏆">
                <ul className="space-y-4 text-sm font-bold">
                  {leagueStandings.map((team) => (
                    <li key={team.rank} className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-indigo-600">{team.rank}</span>
                        <span className="italic">{team.team}</span>
                      </div>
                      <span className="text-slate-500">{team.league}</span>
                    </li>
                  ))}
                </ul>
              </DashboardCard>

              {/* D. 핵심 메뉴 그리드 (4칸 모두 차지) */}
              <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                
                {/* D-1. 학생선택중심 수업 */}
                <DashboardCard title="학생선택 중심수업" icon="📝" className="hover:border-indigo-200 hover:shadow-lg transition">
                  <p className="text-sm text-slate-500 font-medium mb-4">직접 선택한 종목별 수업 일정 및 자료실</p>
                  <div className="flex gap-2 text-xs font-bold text-indigo-600">
                    <span className="bg-indigo-50 px-3 py-1 rounded-full">축구</span>
                    <span className="bg-indigo-50 px-3 py-1 rounded-full">농구</span>
                    <span className="bg-indigo-50 px-3 py-1 rounded-full">배구</span>
                    <span className="bg-indigo-50 px-3 py-1 rounded-full">탁구</span>
                    <span className="bg-indigo-50 px-3 py-1 rounded-full">배드민턴</span>
                    <span className="bg-indigo-50 px-3 py-1 rounded-full">뉴스포츠</span>
                    <span className="bg-indigo-50 px-3 py-1 rounded-full">피구발야구</span>
                    <span className="bg-indigo-50 px-3 py-1 rounded-full">댄스</span>
                  </div>
                </DashboardCard>
                
                {/* D-2. 지역연계 스포츠 플랫폼 */}
                <DashboardCard title="지역연계 플랫폼" icon="🗺️" className="bg-emerald-500 text-white">
                  <p className="text-sm text-emerald-100 font-medium mb-4">우리 마을 체육 시설 및 프로그램 지도</p>
                  <button className="w-full bg-white text-emerald-600 py-3 rounded-xl font-bold hover:bg-slate-50 transition">시설 찾기</button>
                </DashboardCard>

                {/* D-3. 교내 스포츠클럽 */}
                <DashboardCard title="교내 스포츠클럽" icon="⚽" className="hover:border-indigo-200 hover:shadow-lg transition">
                  <p className="text-sm text-slate-500 font-medium mb-4">사제동행 배드민턴 및 학급 리그 일정</p>
                  <span className="text-2xl font-black italic text-indigo-600">사제동행전 항상 대기중!</span>
                </DashboardCard>

                {/* D-4. 주도성 프로젝트 */}
                <DashboardCard title="주도성 프로젝트" icon="💡" className="hover:border-indigo-200 hover:shadow-lg transition">
                  <p className="text-sm text-slate-500 font-medium mb-4">학생 기획 체육 이벤트 제안 및 투표</p>
                  <div className="flex -space-x-3 mt-3">
                    {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs text-slate-400">P{i}</div>)}
                  </div>
                </DashboardCard>

              </div>

              {/* E. 학생 서포터즈 & 대회 소식 (2칸씩 차지) */}
              <DashboardCard title="매현 스포츠 서포터즈" icon="🎤" className="md:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-100 p-5 rounded-xl">
                    <h4 className="font-bold mb-2">학생 심판 교육</h4>
                    <p className="text-sm text-slate-500">축구 규칙 퀴즈 및 심판 배정 현황</p>
                  </div>
                  <div className="bg-slate-100 p-5 rounded-xl">
                    <h4 className="font-bold mb-2">스포츠 기자단</h4>
                    <p className="text-sm text-slate-500">교내 리그 취재 기사 및 사진 게시판</p>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard title="수원시 대회 소식" icon="🏆" className="md:col-span-2">
                <ul className="space-y-3 text-sm font-bold">
                  <li className="flex justify-between border-b border-slate-100 pb-3 hover:text-indigo-600">
                    <span>[교육장배] 학교스포츠클럽 농구 대회</span>
                    <span className="text-slate-400">03.30</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-100 pb-3 hover:text-indigo-600">
                    <span>[시장배] 축구 대회 대표팀 모집</span>
                    <span className="text-slate-400">03.28</span>
                  </li>
                </ul>
              </DashboardCard>

            </div>
          </motion.main>
        )}

        {currentView === 'notices' && (
          <motion.section 
            key="notices"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="relative z-10 max-w-5xl mx-auto px-8 py-20"
          >
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4 text-slate-950">
              <Bell className="text-indigo-600" /> 공지사항
            </h2>
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice.id} className="bg-white border border-slate-100 p-6 rounded-2xl hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold px-2 py-1 bg-indigo-50 text-indigo-600 rounded uppercase">{notice.type}</span>
                    <span className="text-slate-400 text-sm">{notice.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-950">{notice.title}</h3>
                  <p className="text-slate-600">{notice.content}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {currentView === 'activities' && (
          <motion.section 
            key="activities"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="relative z-10 max-w-7xl mx-auto px-8 py-20"
          >
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4 text-slate-950">
              <Dumbbell className="text-indigo-600" /> 체육활동
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity) => (
                <div key={activity.id} className="group bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={activity.imageUrl} 
                      alt={activity.title} 
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs text-white font-bold">{activity.date}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-slate-950">{activity.title}</h3>
                    <p className="text-slate-600 text-sm">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {currentView === 'gallery' && (
          <motion.section 
            key="gallery"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="relative z-10 max-w-7xl mx-auto px-8 py-20"
          >
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4 text-slate-950">
              <ImageIcon className="text-indigo-600" /> 갤러리
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="group relative aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-sm font-bold text-white">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {currentView === 'admin' && (
          <motion.section 
            key="admin"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 max-w-4xl mx-auto px-8 py-20"
          >
            {!isAdminAuthenticated ? (
              <div className="bg-white border border-slate-100 p-12 rounded-3xl text-center shadow-sm">
                <h2 className="text-3xl font-bold mb-8 text-slate-950">관리자 로그인</h2>
                <form onSubmit={handleAdminLogin} className="max-w-xs mx-auto space-y-4">
                  <input 
                    type="password" 
                    placeholder="비밀번호를 입력하세요" 
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                  <button type="submit" className="w-full bg-indigo-600 py-3 rounded-xl font-bold text-white hover:bg-indigo-700 transition-all">
                    접속하기
                  </button>
                  <p className="text-xs text-slate-500 mt-4">초기 비밀번호: maehyeon123</p>
                </form>
              </div>
            ) : (
              <div className="space-y-12">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-slate-950">콘텐츠 관리</h2>
                  <button onClick={() => setIsAdminAuthenticated(false)} className="text-slate-500 hover:text-slate-950">로그아웃</button>
                </div>

                {/* Notice Form */}
                <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-950"><Bell size={20} /> 공지사항 관리</h3>
                  <form onSubmit={addNotice} className="space-y-4 mb-8">
                    <input 
                      type="text" 
                      placeholder="제목" 
                      value={newNotice.title}
                      onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500"
                      required
                    />
                    <textarea 
                      placeholder="내용" 
                      value={newNotice.content}
                      onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 h-32"
                      required
                    />
                    <button type="submit" className="bg-indigo-600 px-6 py-3 rounded-xl font-bold text-white hover:bg-indigo-700 transition-all flex items-center gap-2">
                      <Plus size={20} /> 등록하기
                    </button>
                  </form>
                  <div className="space-y-2">
                    {notices.map(n => (
                      <div key={n.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <span className="text-sm font-medium truncate max-w-md">{n.title}</span>
                        <button onClick={() => deleteNotice(n.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Form */}
                <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-950"><Dumbbell size={20} /> 체육활동 관리</h3>
                  <form onSubmit={addActivity} className="space-y-4 mb-8">
                    <input 
                      type="text" 
                      placeholder="활동명" 
                      value={newActivity.title}
                      onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="설명" 
                      value={newActivity.description}
                      onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="이미지 URL" 
                      value={newActivity.imageUrl}
                      onChange={(e) => setNewActivity({...newActivity, imageUrl: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500"
                      required
                    />
                    <button type="submit" className="bg-indigo-600 px-6 py-3 rounded-xl font-bold text-white hover:bg-indigo-700 transition-all flex items-center gap-2">
                      <Plus size={20} /> 등록하기
                    </button>
                  </form>
                  <div className="space-y-2">
                    {activities.map(a => (
                      <div key={a.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <span className="text-sm font-medium truncate max-w-md">{a.title}</span>
                        <button onClick={() => deleteActivity(a.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gallery Form */}
                <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-950"><ImageIcon size={20} /> 갤러리 관리</h3>
                  <form onSubmit={addGallery} className="space-y-4 mb-8">
                    <input 
                      type="text" 
                      placeholder="사진 제목" 
                      value={newGallery.title}
                      onChange={(e) => setNewGallery({...newGallery, title: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="이미지 URL" 
                      value={newGallery.imageUrl}
                      onChange={(e) => setNewGallery({...newGallery, imageUrl: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500"
                      required
                    />
                    <button type="submit" className="bg-indigo-600 px-6 py-3 rounded-xl font-bold text-white hover:bg-indigo-700 transition-all flex items-center gap-2">
                      <Plus size={20} /> 등록하기
                    </button>
                  </form>
                  <div className="space-y-2">
                    {gallery.map(g => (
                      <div key={g.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <span className="text-sm font-medium truncate max-w-md">{g.title}</span>
                        <button onClick={() => deleteGallery(g.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <footer className="bg-white border-t border-slate-100 py-16 px-6 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="font-black italic text-indigo-600">MAEHYEON PE</h4>
            <p className="text-xs text-slate-400 mt-2">매현중학교 온라인 체육 플랫폼</p>
            <p className="text-xs text-slate-400 mt-1">연구 과제: 학생 주도성 강화 및 학교체육일상화의 지역연계 스포츠 플랫폼 구축</p>
          </div>
          <div className="flex flex-col gap-2 text-sm font-medium text-slate-500">
            <button onClick={() => setCurrentView('home')} className="hover:text-slate-950 text-left">Home</button>
            <button onClick={() => setCurrentView('notices')} className="hover:text-slate-950 text-left">Notices</button>
            <button onClick={() => setCurrentView('activities')} className="hover:text-slate-950 text-left">Activities</button>
          </div>
          <div className="text-xs text-slate-400">
            <p>경기도 수원시 영통구 매영로 123</p>
            <p>© 2026 Maehyeon Middle School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

