# gsheet2mapy.cz

[Google Apps Script](https://developers.google.com/apps-script) pro vytvoření mapy s bodovými značkami (pomocí [Mapy.cz API](https://api.mapy.cz)) z Google tabulky obsahující souřadnice bodů.

## Postup nasazení

- V Google Disku vytvořit tabulku (sheet) obsahující sloupec se zeměpisnými souřadnicemi ve tvaru 49.1452156N, 15.2129444E (vše v jednom poli)
- Vytvořit nový Google Apps Script z Google Disku nebo na [script.google.com](https://script.google.com)
- Vložit do skriptu obsah souborů z tohoto repository (AppsScript.gs, Index.html, JavaScript.html)
- Upravit jednotlivé soubory viz níže
- Nasadit skript - po spuštění se načte mapa z Mapy.cz s bodovými značkami dle tabulky

### AppsScript.gs

V konfiguraci nastavit id požadované tabulky, rozsah dat a indexy sloupců:

```javascript
var config = {
    /** id google tabulky obsahující data (id se zobrazuje v URL adrese při otevření tabulky) */
    sheetId: "TODO doplnit", 
    /** požadovaný rozsah dat v tabulce ve tvaru List!A2:G */
    dataRange: "List!A2:G",
    /** indexy určující pořadí klíčových sloupců v tabulce (index prvního sloupce je 0) */
    fields: {
      title: 0, // nadpis 
      link: 1, // URL odkaz
      category: 2, // sloupec podle kterého lze odlišit symboly bodů v mapě
      description: 3, // popisek, poznámka
      coords: 4 // sloupec obsahující souřadnice ve tvaru 49.1452156N, 15.2129444E
    }
}
```

### JavaScript.html

Přiřadit jednotlivým hodnotám ve sloupci category příslušnou bodovou značku.
Ikonky značek jsou zde odkazovány jako obrázky pomocí URL.
Pokud stačí jeden symbol pro všechny značky, smažte/zakomentujte část "categories".

```javascript
var config = {
    categories: {
        "category_0": "https://drive.google.com/uc?export=view&id=1cNGz-nYkVC9ievGGmnobFmcWVT7GGg8L", // šedá
        "category_1": "https://drive.google.com/uc?export=view&id=1vWJf3CRE9zXQP_fp2KlKLcLIlLAFR0GZ", // zelená
        "category_2": "https://drive.google.com/uc?export=view&id=19JEN15q8qClNFRMr91dAxhBuwVjifFCb", // červená
        "category_3": "https://drive.google.com/uc?export=view&id=1P3359cCXWkG8UHAV0BbdgOqnJryzPl_3", // žlutá
        "category_4": "https://drive.google.com/uc?export=view&id=1j-r6ZpN3ruQt6XhbczZVrbzwYVeA45fQ" // tmavě šedá
    }
}
```
