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

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      
      const results = await Promise.all([noticesRes, activitiesRes, galleryRes]);
      
      for (const res of results) {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error("Expected JSON but received:", text.substring(0, 100));
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
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll for updates every 5 seconds to simulate real-time
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
    const response = await fetch('/api/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newNotice, date: new Date().toISOString().split('T')[0] })
    });
    if (response.ok) {
      setNewNotice({ title: '', content: '', type: '공지' });
      fetchData();
    }
  };

  const addActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newActivity, date: new Date().toISOString().split('T')[0] })
    });
    if (response.ok) {
      setNewActivity({ title: '', description: '', imageUrl: '' });
      fetchData();
    }
  };

  const addGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newGallery, date: new Date().toISOString().split('T')[0] })
    });
    if (response.ok) {
      setNewGallery({ title: '', imageUrl: '' });
      fetchData();
    }
  };

  const NavItem = ({ view, label, icon: Icon }: { view: View; label: string; icon?: any }) => (
    <button 
      onClick={() => setCurrentView(view)}
      className={`flex items-center gap-2 hover:text-white transition-colors ${currentView === view ? 'text-blue-400' : 'text-slate-400'}`}
    >
      {Icon && <Icon size={18} />}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto backdrop-blur-md sticky top-0">
        <button onClick={() => setCurrentView('home')} className="text-xl font-black tracking-tighter flex items-center gap-2">
          매현중 <span className="text-blue-500">PE</span>
        </button>
        <div className="hidden md:flex gap-10 text-sm font-medium">
          <NavItem view="home" label="홈" />
          <NavItem view="notices" label="공지사항" />
          <NavItem view="activities" label="체육활동" />
          <NavItem view="gallery" label="갤러리" />
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView('admin')}
            className={`p-2 rounded-lg transition-all ${currentView === 'admin' ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
          >
            <Settings size={20} />
          </button>
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-all">
            로그인
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.main 
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-blue-500/30 px-4 py-1.5 rounded-full mb-12 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
                LIVE: 2026 매현 체육 수업 진행 중
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              매현중은 지금 <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-500 bg-clip-text text-transparent">
                에너지 충전 중
              </span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-14 leading-relaxed font-light">
              땀방울이 만드는 매현의 열정! <br />
              학생들의 건강한 성장과 즐거운 도전이 가득한 현장을 만나보세요.
            </p>

            <div className="flex flex-wrap justify-center gap-5 w-full max-w-4xl">
              <button onClick={() => setCurrentView('notices')} className="flex-1 min-w-[200px] group relative overflow-hidden bg-blue-600 px-8 py-6 rounded-3xl transition-all hover:scale-105 active:scale-95">
                <div className="relative flex flex-col items-center gap-3">
                  <Bell className="text-white/80" />
                  <span className="text-xl font-bold">공지사항</span>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                </div>
              </button>

              <button onClick={() => setCurrentView('activities')} className="flex-1 min-w-[200px] group bg-white/5 border border-white/10 backdrop-blur-md px-8 py-6 rounded-3xl transition-all hover:bg-white/10 hover:border-blue-500/50 hover:scale-105">
                <div className="flex flex-col items-center gap-3">
                  <Dumbbell className="text-blue-400" />
                  <span className="text-xl font-bold">체육활동</span>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 text-blue-400" />
                </div>
              </button>

              <button onClick={() => setCurrentView('gallery')} className="flex-1 min-w-[200px] group bg-white/5 border border-white/10 backdrop-blur-md px-8 py-6 rounded-3xl transition-all hover:bg-white/10 hover:border-pink-500/50 hover:scale-105">
                <div className="flex flex-col items-center gap-3">
                  <ImageIcon className="text-pink-400" />
                  <span className="text-xl font-bold">갤러리</span>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 text-pink-400" />
                </div>
              </button>
              
              <button className="flex-1 min-w-[200px] group bg-white/5 border border-white/10 backdrop-blur-md px-8 py-6 rounded-3xl transition-all hover:bg-white/10 hover:border-emerald-500/50 hover:scale-105">
                <div className="flex flex-col items-center gap-3">
                  <LayoutGrid className="text-emerald-400" />
                  <span className="text-xl font-bold">Apps</span>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 text-emerald-400" />
                </div>
              </button>
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
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
              <Bell className="text-blue-500" /> 공지사항
            </h2>
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold px-2 py-1 bg-blue-500/20 text-blue-400 rounded uppercase">{notice.type}</span>
                    <span className="text-slate-500 text-sm">{notice.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{notice.title}</h3>
                  <p className="text-slate-400">{notice.content}</p>
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
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
              <Dumbbell className="text-blue-500" /> 체육활동
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity) => (
                <div key={activity.id} className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={activity.imageUrl} 
                      alt={activity.title} 
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs text-blue-400 font-bold">{activity.date}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                    <p className="text-slate-400 text-sm">{activity.description}</p>
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
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
              <ImageIcon className="text-pink-500" /> 갤러리
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
                    <p className="text-sm font-bold">{item.title}</p>
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
              <div className="bg-white/5 border border-white/10 p-12 rounded-3xl text-center">
                <h2 className="text-3xl font-bold mb-8">관리자 로그인</h2>
                <form onSubmit={handleAdminLogin} className="max-w-xs mx-auto space-y-4">
                  <input 
                    type="password" 
                    placeholder="비밀번호를 입력하세요" 
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all"
                  />
                  <button type="submit" className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
                    접속하기
                  </button>
                  <p className="text-xs text-slate-500 mt-4">초기 비밀번호: maehyeon123</p>
                </form>
              </div>
            ) : (
              <div className="space-y-12">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold">콘텐츠 관리</h2>
                  <button onClick={() => setIsAdminAuthenticated(false)} className="text-slate-400 hover:text-white">로그아웃</button>
                </div>

                {/* Notice Form */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Bell size={20} /> 공지사항 등록</h3>
                  <form onSubmit={addNotice} className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="제목" 
                      value={newNotice.title}
                      onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <textarea 
                      placeholder="내용" 
                      value={newNotice.content}
                      onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 h-32"
                      required
                    />
                    <button type="submit" className="bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                      <Plus size={20} /> 등록하기
                    </button>
                  </form>
                </div>

                {/* Activity Form */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Dumbbell size={20} /> 체육활동 등록</h3>
                  <form onSubmit={addActivity} className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="활동명" 
                      value={newActivity.title}
                      onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="설명" 
                      value={newActivity.description}
                      onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="이미지 URL (예: https://picsum.photos/800/600)" 
                      value={newActivity.imageUrl}
                      onChange={(e) => setNewActivity({...newActivity, imageUrl: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <button type="submit" className="bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                      <Plus size={20} /> 등록하기
                    </button>
                  </form>
                </div>

                {/* Gallery Form */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><ImageIcon size={20} /> 갤러리 등록</h3>
                  <form onSubmit={addGallery} className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="사진 제목" 
                      value={newGallery.title}
                      onChange={(e) => setNewGallery({...newGallery, title: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="이미지 URL" 
                      value={newGallery.imageUrl}
                      onChange={(e) => setNewGallery({...newGallery, imageUrl: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <button type="submit" className="bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                      <Plus size={20} /> 등록하기
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <footer className="relative z-10 border-t border-white/10 py-12 text-center text-slate-500 text-sm">
        <p>© 2026 Maehyeon Middle School Physical Education. All rights reserved.</p>
      </footer>
    </div>
  );
}

