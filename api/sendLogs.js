export default function handler(req, res) {
    if (req.method === 'POST') {
      const { message } = req.body;
      console.log('Log:', message);
      return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: 'Método no permitido' });
  }