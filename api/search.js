export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    
    const q = req.query.q;
    const count = req.query.count || 10;
    if (!q) return res.status(400).json({ error: 'Query wajib diisi' });
    
    try {
        const url = `https://api.synoxcloud.xyz/search/tiktok?q=${encodeURIComponent(q)}&count=${count}&apikey=FREE`;
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36',
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
