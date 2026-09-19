import requests

# Botingiz sozlamalari
TELEGRAM_BOT_TOKEN = "8942664865:AAEmQFsx0lGLkfXfYfgtJYtMxEdLESb-wC8"  # BotFather bergan token
MY_CHAT_ID = "7489693239"       # Userinfobot bergan ID

def send_telegram_notification(cafe_name, phone_number, current_venue_count, max_venues=850):
    """
    Yangi kafe tizimga qo'shilganda faqat sizning Telegram'ingizga
    real-time bildirishnoma yuboruvchi funksiya.
    """
    message = (
        f"🔔 <b>YANGI KAFE QO'SHILDI!</b>\n\n"
        f"📍 <b>Kafe nomi:</b> {cafe_name}\n"
        f"📱 <b>Telefon:</b> {phone_number}\n"
        f"📊 <b>Aktiv kafelar:</b> {current_venue_count} / {max_venues}\n"
        f"💰 <b>Potensial MRR:</b> ${current_venue_count * 35}/oy\n\n"
        f"🚀 <i>Mehmon•AI masshtablashda davom etmoqda!</i>"
    )
    
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": MY_CHAT_ID,
        "text": message,
        "parse_mode": "HTML"
    }
    
    try:
        response = requests.post(url, json=payload, timeout=5)
        if response.status_code == 200:
            print("Telegram xabarnoma muvaffaqiyatli yuborildi!")
        else:
            print(f"Xatolik yuz berdi: {response.text}")
    except Exception as e:
        print(f"Telegram API ulanishda xato: {e}")

# === SINOB UCHUN (Tekshirib ko'rish): ===
# Yangi kafe ulanganda kodingiz ichida shu funksiya chaqiriladi:
send_telegram_notification(
    cafe_name="Sogdiana Cafe",
    phone_number="+998979260008",
    current_venue_count=1
)
