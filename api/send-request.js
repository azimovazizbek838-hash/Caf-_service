export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { cafeName, city, yourName, phone, date, guests } = req.body;

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const messageText = `
🔥 **Mehmon•AI — Yangi Bron So'rovi!**

🏢 **Kafe:** ${cafeName || 'Tanlanmagan'}
📍 **Hudud:** ${city || 'Kiritilmagan'}
👤 **Mijoz:** ${yourName}
📞 **Tel:** ${phone}
📅 **Sana/Vaqt:** ${date || 'Ko\'rsatilmagan'}
👥 **Kishilar soni:** ${guests || 1} ta
  `;

  try {
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: messageText,
          parse_mode: 'Markdown',
        }),
      }
    );

    if (telegramRes.ok) {
      return res.status(200).json({ success: true, message: 'Bron muvaffaqiyatli yuborildi!' });
    } else {
      return res.status(500).json({ success: false, message: 'Botga yuborishda xatolik.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server xatoligi.' });
  }
}
