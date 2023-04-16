# Uppsetning  

`createdb vef2-2023-einstaklings`  
`npm install`  
`npm run setup`  
`npm run start` # eða `npm run dev`  

# Hýsing:

https://gvg8-vef2-2023-einstaklings.onrender.com/  
https://gvg8-vef2-2023-einstaklings.onrender.com/stats  

# Skýrsla

## Hvað er verkefnið mitt?

Verkefnið mitt er Choose Your Own Adventure leikur með nokkra endi, og það sem þú gerir í ævintýrinnu ákveður hvaða endir þú færð  

## Hvernig tengist þetta vefforritun?

Þetta sýnir að með fríum þjónustum er hægt að búa til leik á netinu fyrir vinahóp.  
Ég notaði Render til að hýsa vefþjónustuna og gagnagrunninn.  
 - Seinast þegar ég athugaði er ég búinn að nota 3% af mínum mánaðarlegum kvóta fyrir vefþjónustuna og 6.5% af mínu 1.0 GB fyrir gagnagrunninn  
 
Ég notaði Cloudinary til að hýsa myndirnar sem vefþjónustan þarf.
 - Af mínum 25 mánaðarlegum Credits er ég búinn að nota 0.09. Þetta þýðir að Cloudinary getur þjónustað circa 300 sinnum meira en hún er búin að gera.  

## Kröfur sem ég uppfylli
 - Notendaumsjón. Bæði upp á það að geta haldið áfram þó þú aftengist leiknum og til að passa að spilari fer rétt í gegnum ævintýrið og getur ekki svindlað með fölsuð requests (fjalla meira um seinna)
 - EJS framenda framework (notað til að forðast endurtekningar. Allir kaflar eru með sömu uppsetningu í ævintýrinnu en mismunandi lýsingar, ákvarðarnir og mismunandi mynd. Gott tól til að fylgja DRY regluni: Don't Repeat Yourself)
 - Gagnagrunnur (Nauðsynlegt fyrir notendaumsjón. Líka gaman að sjá hversu margir hafa komist að ákveðnum enda)
 - UML Skrá (Gott að skipuleggja fyrir fram og skrifa niður söguna. Gefur betri yfirsýn yfir Scope af verkefninu)

UML Skráin: https://app.diagrams.net/?src=about#G1EciFmpaA_1p22NwlBQYmXGVKQGeTZ-tF

## Notendaumsjón

Vill ekki að notandi þurfi að ákveða Username og Password, vill að hann geti farið og spilað strax.  
Ákvað að auto-generated Token væri lausnin sem er ID + 4 bókstafir af handahófi  
 - Dæmi: 1TARP, 29FART  
 - Talan tryggir að þetta Token sé einstakt og 4 bókstafirnir tryggja að enginn getur giskað og komist inn í ævintýri annara  

## Forðast endurtekningar (DRY: Don't Repeat Yourself)

(Sýna kóða)  
Router tekur '/adventure/:adventure', skoðar hvaða upplýsingar eru tengdar við :adventure breytunni í AdventureLibrary.js og sendir það inn í adventure.ejs  
Þetta tryggir að upplýsingarnar fyrir hvern kafla í ævintýrinnu eru settar upp á snyrtilegan máta og að ég þarf ekki að gera HTML skjal fyrir hvern einasta kafla.  

## Brot á staðli

Ég reyndi að nota <form method="patch"... > fyrir valkostina á hverjum kafla þar sem að aðgerðin er að uppfæra stöðu leikmanns, en það var að senda GET beiðni.  
Kemur í ljós að <form> styður bara method="get"|"post".  
Ég sá að method=post myndi virka, þannig ég ákvað að gera það.

## Vitaðir veikleikar

 - Engin vörn gegn því ef einhver myndi setja upp botta sem byrjar stöðugt nýtt ævintýri  
    - Í professional umhverfi myndi maður setja upp kerfi sem sér að einhver er búinn að senda sama requestið 10 sinnum á einni sekúndu og myndi þá hunsa hann í einhvern tíma
      - Mín lausn var að biðja ykkur fallega að ekki stress testa leikinn, og mér sýnist þið hafa verið dugleg í því :)  

 - Frí þjónusta = takmörkuð þjónusta  
    - Cloudinary fría þjónustan bíður upp á 25 'Credits' hverja 30 daga. Kominn upp í 0.09 seinast þegar ég checkaði.  
      - Ef einhver finnur leið til að nýta þjónustuna mína hjá Cloudinary 300 sinnum meira en hann er að gera, þá mun þjónustan hökkta og Cloudinary biðja mig um að gefa þeim pening  
  - Render: max 750 klukkutíma runtime, 100 GB egress bandwidth eða 1 GB gagnageymsla  
    - Ef 750 klukkutíma runtime eða 100 GB egress bandwidth er búið, þá slekkur þjónustan á sér þar til næsta mánuð  
    - Ef 1 GB gagnageymslan er full, þá hökktar þjónustan og Render biður mig um að gefa þeim pening  


