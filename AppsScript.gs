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
  
  // vrácení HTML stránky 
  function doGet() {
    return HtmlService.createTemplateFromFile('Index').evaluate();
  }
   
  /**
   * načte data ze zadané oblasti google tabulky
   * vrací jako dvourozměrné pole (řádky, sloupce)
   */
  function getData(){
   
    var range   = Sheets.Spreadsheets.Values.get(config.sheetId,config.dataRange);
    var values  = range.values;
  
    // projít všechny řádky a načíst z nich data
    var items = [];
    range.values.forEach(row => {
      if (row[config.fields.coords]) {
        
        // načíst souřadnice a rozdělit je na zem. šířku a délku 
        var coords = row[config.fields.coords].split(",");
        var lat = Number.parseFloat(coords[0]);
        var lon = Number.parseFloat(coords[1]);
        var item = {
          lat: lat,
          lon: lon
        }
  
        // přidat obsah dalších sloupců dle konfigurace
        for (key in config.fields) {
          var fieldIndex = config.fields[key];
          item[key] = row[fieldIndex];
        }
        items.push(item);
      }
    });
  
    return items;
  }
  
  /**
   * import externích souborů do HTML - umožňuje oddělení HTML, JavaScriptu a CSS
   * viz https://developers.google.com/apps-script/guides/html/best-practices#separate_html_css_and_javascript
   */
  function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
  }