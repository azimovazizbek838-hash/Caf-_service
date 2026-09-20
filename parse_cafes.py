import requests
import pandas as pd

def fetch_uzbekistan_cafes():
    print("O'zbekiston bo'yicha kafe va restoranlar bazasi yuklanmoqda...")
    
    # Overpass API so'rovi (O'zbekiston chegarasi ichidagi tumon amenity=cafe/restaurant/fast_food)
    overpass_url = "http://overpass-api.de/api/interpreter"
    overpass_query = """
    [out:json][timeout:60];
    area["ISO3166-1"="UZ"]->.searchArea;
    (
      node["amenity"~"cafe|restaurant|fast_food"](area.searchArea);
      way["amenity"~"cafe|restaurant|fast_food"](area.searchArea);
    );
    out tags;
    """
    
    try:
        response = requests.get(overpass_url, params={'data': overpass_query})
        data = response.json()
        
        places = []
        for element in data.get('elements', []):
            tags = element.get('tags', {})
            name = tags.get('name', tags.get('name:en', 'Noma\'lum Kafe'))
            phone = tags.get('phone', tags.get('contact:phone', tags.get('contact:mobile', 'Yo\'q')))
            city = tags.get('addr:city', tags.get('addr:region', 'O\'zbekiston'))
            street = tags.get('addr:street', '')
            amenity_type = tags.get('amenity', 'kafe')
            
            # Faqat nomi bor joylarni olamiz
            if name != 'Noma\'lum Kafe':
                places.append({
                    'Nomi': name,
                    'Turi': amenity_type,
                    'Telefon': phone,
                    'Shahar/Viloyat': city,
                    'Ko\'cha': street
                })
        
        df = pd.DataFrame(places)
        # Natijani Excel faylga saqlash
        df.to_excel("Uzbekistan_Cafes_Base.xlsx", index=False)
        print(f"\n Muvaffaqiyatli yakunlandi! Jami {len(df)} ta kafe va restoran saqlandi: 'Uzbekistan_Cafes_Base.xlsx'")
        
    except Exception as e:
        print(f"Xatolik yuz berdi: {e}")

if __name__ == "__main__":
    fetch_uzbekistan_cafes()
