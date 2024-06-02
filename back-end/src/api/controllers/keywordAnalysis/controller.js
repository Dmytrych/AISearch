import axios from "axios";

export async function getKeywords(req, res) {
  const response = await axios.post(`${process.env.KEYWORD_ANALYZER_URL}/analyze`, req.body, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response || response.status !== 200) {
    res.json([]);
  }

  res.json(response.data?.keywords ?? []);
}