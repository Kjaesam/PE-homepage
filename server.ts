import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

// In-memory data storage (will persist as long as the server is running)
let notices = [
  { id: 1, title: "2026학년도 1학기 학사일정 안내", content: "주요 학사일정 및 공휴일을 확인하세요.", date: "2026-03-30", type: "학사" },
  { id: 2, title: "체육행사 캘린더 (4월)", content: "4월에 예정된 체육대회 및 리그 일정을 확인하세요.", date: "2026-03-29", type: "행사" },
  { id: 3, title: "요즘 매현중 체육은?", content: "학생들의 활기찬 체육 수업 현장 스케치", date: "2026-03-28", type: "소식" },
  { id: 4, title: "2026학년도 1학기 체육 수업 안내", content: "즐거운 체육 수업을 위해 준비물을 챙겨주세요.", date: "2026-03-02", type: "공지" },
  { id: 5, title: "체육관 이용 수칙 안내", content: "실내화 착용 및 음식물 반입 금지입니다.", date: "2026-03-05", type: "안내" },
];

let activities = [
  { id: 1, title: "교과수업활동", description: "다양한 종목의 기초 기능 및 전술 학습", imageUrl: "https://picsum.photos/seed/class/800/600", date: "2026-03-10" },
  { id: 2, title: "학생주도활동", description: "학생들이 직접 기획하고 운영하는 체육 활동", imageUrl: "https://picsum.photos/seed/student/800/600", date: "2026-03-12" },
  { id: 3, title: "학교스포츠클럽", description: "방과 후 및 점심시간 스포츠 클럽 활동", imageUrl: "https://picsum.photos/seed/club/800/600", date: "2026-03-15" },
  { id: 4, title: "수원시 학교스포츠클럽 대회", description: "수원시 관내 학교 대항 스포츠 대회 참여", imageUrl: "https://picsum.photos/seed/competition/800/600", date: "2026-03-20" },
  { id: 5, title: "지역체육시설 연계 수업활동", description: "수영장, 볼링장 등 지역 시설을 활용한 수업", imageUrl: "https://picsum.photos/seed/facility/800/600", date: "2026-03-25" },
  { id: 6, title: "학생심판교육", description: "공정한 경기 운영을 위한 심판 자질 함양 교육", imageUrl: "https://picsum.photos/seed/referee/800/600", date: "2026-03-28" },
];

let gallery = [
  { id: 1, title: "체육대회 현장", imageUrl: "https://picsum.photos/seed/pe-day/800/600", date: "2026-03-10" },
  { id: 2, title: "수영 수업", imageUrl: "https://picsum.photos/seed/swimming/800/600", date: "2026-03-12" },
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  console.log("Starting Maehyeon PE Server...");
  console.log("NODE_ENV:", process.env.NODE_ENV);

  app.use(cors());
  app.use(bodyParser.json());

  // API Router
  const apiRouter = express.Router();

  apiRouter.get("/notices", (req, res) => {
    console.log("API: GET /notices");
    res.json(notices);
  });

  apiRouter.post("/notices", (req, res) => {
    console.log("API: POST /notices", req.body);
    const newNotice = { id: Date.now(), ...req.body };
    notices = [newNotice, ...notices];
    res.status(201).json(newNotice);
  });

  apiRouter.get("/activities", (req, res) => {
    console.log("API: GET /activities");
    res.json(activities);
  });

  apiRouter.post("/activities", (req, res) => {
    console.log("API: POST /activities", req.body);
    const newActivity = { id: Date.now(), ...req.body };
    activities = [newActivity, ...activities];
    res.status(201).json(newActivity);
  });

  apiRouter.get("/gallery", (req, res) => {
    console.log("API: GET /gallery");
    res.json(gallery);
  });

  apiRouter.post("/gallery", (req, res) => {
    console.log("API: POST /gallery", req.body);
    const newGalleryItem = { id: Date.now(), ...req.body };
    gallery = [newGalleryItem, ...gallery];
    res.status(201).json(newGalleryItem);
  });

  app.use("/api", apiRouter);

  // Vite middleware for development
  const isProd = process.env.NODE_ENV === "production";
  
  if (!isProd) {
    console.log("Starting in DEVELOPMENT mode with Vite middleware");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in PRODUCTION mode serving static files");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: "Not Found" });
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
