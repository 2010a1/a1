let leaderboard = []; // lưu tạm (RAM)

// ===== API =====
export default function handler(req, res) {
  // ===== POST: LƯU =====
  if (req.method === "POST") {
    const data = req.body;

    if (!data?.name) {
      return res.status(400).json({ error: "Thiếu dữ liệu" });
    }

    leaderboard.push({
      name: data.name,
      subject: data.subject,
      mode: data.mode,
      score: Number(data.score),
      correct: Number(data.correct),
      total: Number(data.total),
      timeSeconds: Number(data.timeSeconds),
      createdAt: Date.now()
    });

    return res.status(200).json({ status: "saved" });
  }

  // ===== GET: LẤY BXH =====
  if (req.method === "GET") {
    const subject = req.query.subject;

    let results = leaderboard;

    if (subject) {
      results = results.filter(r => r.subject === subject);
    }

    // sort: điểm ↓ rồi thời gian ↑
    results.sort((a, b) =>
      b.score - a.score || a.timeSeconds - b.timeSeconds
    );

    return res.status(200).json({ results });
  }

  return res.status(405).end();
}
