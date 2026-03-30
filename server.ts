import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

// In-memory data storage (will persist as long as the server is running)
let notices = [
  { id: 1, title: "2024학년도 1학기 체육 수업 안내", content: "즐거운 체육 수업을 위해 준비물을 챙겨주세요.", date: "2024-03-02", type: "공지" },
  { id: 2, title: "체육관 이용 수칙 안내", content: "실내화 착용 및 음식물 반입 금지입니다.", date: "2024-03-05", type: "안내" },
];

let activities = [
  { id: 1, title: "배드민턴 리그전", description: "점심시간을 이용한 학급별 배드민턴 대항전", imageUrl: "https://picsum.photos/seed/badminton/800/600", date: "2024-03-15" },
  { id: 2, title: "축구 동아리 모집", description: "매주 수요일 방과 후 축구 동아리 활동", imageUrl: "https://picsum.photos/seed/soccer/800/600", date: "2024-03-20" },
];

let gallery = [
  { id: 1, title: "체육대회 현장", imageUrl: "https://picsum.photos/seed/pe-day/800/600", date: "2024-03-10" },
  { id: 2, title: "수영 수업", imageUrl: "https://picsum.photos/seed/swimming/800/600", date: "2024-03-12" },
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(bodyParser.json());

  // API Routes
  app.get("/api/notices", (req, res) => {
    res.json(notices);
  });

  app.post("/api/notices", (req, res) => {
    const newNotice = { id: Date.now(), ...req.body };
    notices = [newNotice, ...notices];
    res.status(201).json(newNotice);
  });

  app.get("/api/activities", (req, res) => {
    res.json(activities);
  });

  app.post("/api/activities", (req, res) => {
    const newActivity = { id: Date.now(), ...req.body };
    activities = [newActivity, ...activities];
    res.status(201).json(newActivity);
  });

  app.get("/api/gallery", (req, res) => {
    res.json(gallery);
  });

  app.post("/api/gallery", (req, res) => {
    const newGalleryItem = { id: Date.now(), ...req.body };
    gallery = [newGalleryItem, ...gallery];
    res.status(201).json(newGalleryItem);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
