// Vercel serverless function.
// Deploy path: /api/send-request.js  ->  available at POST /api/send-request

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { cafeId, cafeName, cafeEmail, yourName, phone, city, when, party, day, time } = req.body || {};

  // Basic validation — reject if required fields are missing
  if (!cafeEmail || !yourName || !phone) {
    return res.status(400).json({ error: 'Majburiy maydonlar to\'ldirilmagan' });
  }

  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // While your domain isn't verified in Resend yet, use 'onboarding@resend.dev' here instead.
        from: 'Mehmon AI <[email protected]>',
        to: cafeEmail,
        reply_to: undefined,
        subject: `Yangi so'rov — ${cafeName || 'Mehmon AI'}`,
        text: [
          `Yangi bron/demo so'rovi keldi:`,
          ``,
          `Ism: ${yourName}`,
          `Telefon: ${phone}`,
          `Shahar: ${city || '-'}`,
          party ? `Odam soni: ${party}` : null,
          day ? `Kun: ${day}` : null,
          time ? `Vaqt: ${time}` : null,
          when ? `Qulay bog'lanish vaqti: ${when}` : null,
          ``,
          `Tanlangan joy ID: ${cafeId || '-'}`
        ].filter(Boolean).join('\n')
      })
    });

    if (!emailResponse.ok) {
      const detail = await emailResponse.text();
      return res.status(502).json({ error: 'Email yuborilmadi', detail });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Server xatosi', detail: String(err) });
  }
}
