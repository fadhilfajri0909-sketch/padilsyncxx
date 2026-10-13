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
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                'Referer': 'https://api.synoxcloud.xyz/',
                'Origin': 'https://api.synoxcloud.xyz',
                'Connection': 'keep-alive'
            }
        });
        
        if (!response.ok) {
            const text = await response.text();
            return res.status(response.status).json({ 
                error: 'Upstream error: ' + response.status,
                detail: text.substring(0, 200)
            });
        }
        
        const data = await response.json();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
