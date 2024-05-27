import axios from "axios";

export async function getKeywords(req, res) {
  const response = await axios.post('http://127.0.0.1:5000/analyze', req.body, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response || response.status !== 200) {
    res.json([]);
  }

  res.json(response.data?.keywords ?? []);
}