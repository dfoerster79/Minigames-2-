const IMPOSTER_DATA = {
  alltag: [
    { word: 'Zahnbürste',    hint: 'Bürsten' },
    { word: 'Kühlschrank',    hint: 'Frischhalten' },
    { word: 'Wecker',          hint: 'Aufwachen' },
    { word: 'Einkaufstasche',  hint: 'Tragen' },
    { word: 'Schlüssel',       hint: 'Öffnen' },
    { word: 'Kaffeetasse',     hint: 'Heiß' },
    { word: 'Haustür',         hint: 'Eingang' },
    { word: 'Briefkasten',     hint: 'Post' },
    { word: 'Regenschirm',     hint: 'Nass' },
    { word: 'Lichtschalter',   hint: 'Wand' },
    { word: 'Handtuch',        hint: 'Trocknen' },
    { word: 'Spülmaschine',    hint: 'Geschirr' },
    { word: 'Mülleimer',       hint: 'Abfall' },
    { word: 'Fernbedienung',   hint: 'Klicken' },
    { word: 'Kopfkissen',      hint: 'Schlafen' },
    { word: 'Geldbörse',       hint: 'Bezahlen' },
    { word: 'Fahrradhelm',     hint: 'Schutz' },
    { word: 'Joghurt',         hint: 'Milch' },
    { word: 'Waschmaschine',   hint: 'Drehen' },
    { word: 'Hausschuhe',      hint: 'Drinnen' },
    { word: 'Klopapier',       hint: 'Bad' },
    { word: 'Balkon',          hint: 'Draußen' },
    { word: 'Parkplatz',       hint: 'Auto' },
    { word: 'Supermarkt',      hint: 'Einkaufen' },
    { word: 'Bushaltestelle',  hint: 'Warten' },
    { word: 'Rezept',          hint: 'Kochen' },
    { word: 'Trinkflasche',    hint: 'Wasser' },
    { word: 'Lunchbox',        hint: 'Mittag' },
    { word: 'Terminkalender',  hint: 'Planen' },
    { word: 'Handy',           hint: 'Tippen' },
    { word: 'Brotdose',        hint: 'Schule' },
    { word: 'Kaffeemaschine',  hint: 'Morgen' },
    { word: 'Toaster',         hint: 'Knusprig' },
    { word: 'Mikrowelle',      hint: 'Aufwärmen' },
    { word: 'Schneidebrett',   hint: 'Messer' },
    { word: 'Pfanne',          hint: 'Braten' },
    { word: 'Kochtopf',        hint: 'Kochen' },
    { word: 'Gewürze',         hint: 'Würzen' },
    { word: 'Tiefkühlpizza',   hint: 'Eingefroren' },
    { word: 'Apfelsaft',       hint: 'Obst' },
    { word: 'Fahrrad',         hint: 'Radeln' },
    { word: 'Tankstelle',      hint: 'Benzin' },
    { word: 'Bahnsteig',       hint: 'Zug' },
    { word: 'Navi',            hint: 'Richtung' },
    { word: 'Koffer',          hint: 'Reise' },
    { word: 'Rucksack',        hint: 'Rücken' },
    { word: 'Laptop',          hint: 'Tippen' },
    { word: 'Drucker',         hint: 'Papier' },
    { word: 'Kugelschreiber',  hint: 'Schreiben' },
    { word: 'Haftnotiz',       hint: 'Kleben' },
    { word: 'Feierabend',      hint: 'Schluss' },
    { word: 'Krankenhaus',     hint: 'Krank' },
    { word: 'Apotheke',        hint: 'Medikamente' },
    { word: 'Post',            hint: 'Pakete' },
    { word: 'Bank',            hint: 'Geld' },
    { word: 'Sofa',            hint: 'Sitzen' },
    { word: 'Schreibtisch',    hint: 'Arbeiten' },
    { word: 'Regal',           hint: 'Bücher' },
    { word: 'Badewanne',       hint: 'Baden' },
    { word: 'Dusche',          hint: 'Waschen' },
    { word: 'Spiegel',         hint: 'Spiegeln' },
    { word: 'Vorhang',         hint: 'Fenster' },
    { word: 'Teppich',         hint: 'Boden' },
    { word: 'Blumentopf',      hint: 'Pflanze' },
    { word: 'Nachttisch',      hint: 'Bett' },
    { word: 'Spielkarten',     hint: 'Mischen' },
    { word: 'Brettspiel',      hint: 'Spielen' },
    { word: 'Kopfhörer',       hint: 'Musik' },
    { word: 'Fernseher',       hint: 'Schauen' },
    { word: 'Buch',            hint: 'Lesen' },
    { word: 'Kino',            hint: 'Film' },
    { word: 'Restaurant',      hint: 'Essen' },
    { word: 'Café',            hint: 'Kaffee' },
    { word: 'Einkaufszentrum', hint: 'Shoppen' },
    { word: 'Sonnencreme',     hint: 'Sonne' },
    { word: 'Gummistiefel',    hint: 'Regen' },
    { word: 'Thermometer',     hint: 'Messen' },
    { word: 'Pflaster',        hint: 'Wunde' },
    { word: 'Brille',          hint: 'Sehen' },
    { word: 'Sportschuhe',     hint: 'Laufen' },
    { word: 'Fitnessstudio',   hint: 'Muskeln' },
    { word: 'Spaziergang',     hint: 'Gehen' },
    { word: 'Mülltrennung',    hint: 'Recyceln' },
    { word: 'Gartenschlauch',  hint: 'Gießen' },
    { word: 'Gartenmöbel',     hint: 'Terrasse' },
    { word: 'Arzttermin',      hint: 'Warten' },
    { word: 'Tablette',        hint: 'Schlucken' },
    { word: 'Zeitschrift',     hint: 'Blättern' },
    { word: 'Konferenzraum',   hint: 'Meeting' },
    { word: 'Stempel',         hint: 'Abdruck' },
    { word: 'Autoparkschein',  hint: 'Parkuhr' },
    { word: 'Haltestelle',     hint: 'Bus' }
  ],

  tiere: [
    { word: 'Elefant',         hint: 'Groß' },
    { word: 'Giraffe',         hint: 'Hals' },
    { word: 'Löwe',            hint: 'Mähne' },
    { word: 'Pinguin',         hint: 'Eis' },
    { word: 'Delfin',          hint: 'Springen' },
    { word: 'Krokodil',        hint: 'Schnappen' },
    { word: 'Gorilla',         hint: 'Klettern' },
    { word: 'Zebra',           hint: 'Streifen' },
    { word: 'Koala',           hint: 'Schlafen' },
    { word: 'Känguru',         hint: 'Hüpfen' },
    { word: 'Flamingo',        hint: 'Rosa' },
    { word: 'Hai',             hint: 'Flosse' },
    { word: 'Oktopus',         hint: 'Arme' },
    { word: 'Schildkröte',     hint: 'Panzer' },
    { word: 'Papagei',         hint: 'Sprechen' },
    { word: 'Pferd',           hint: 'Reiten' },
    { word: 'Kuh',             hint: 'Milch' },
    { word: 'Schwein',         hint: 'Schlamm' },
    { word: 'Schaf',           hint: 'Wolle' },
    { word: 'Ziege',           hint: 'Meckern' },
    { word: 'Huhn',            hint: 'Ei' },
    { word: 'Ente',            hint: 'Quaken' },
    { word: 'Hund',            hint: 'Bellen' },
    { word: 'Katze',           hint: 'Schnurren' },
    { word: 'Hase',            hint: 'Hoppeln' },
    { word: 'Hamster',         hint: 'Backen' },
    { word: 'Meerschweinchen', hint: 'Quietschen' },
    { word: 'Goldfisch',       hint: 'Aquarium' },
    { word: 'Adler',           hint: 'Fliegen' },
    { word: 'Eule',            hint: 'Nacht' },
    { word: 'Schwan',          hint: 'Weiß' },
    { word: 'Storch',          hint: 'Baby' },
    { word: 'Specht',          hint: 'Klopfen' },
    { word: 'Schmetterling',   hint: 'Flügel' },
    { word: 'Biene',           hint: 'Honig' },
    { word: 'Ameise',          hint: 'Tragen' },
    { word: 'Spinne',          hint: 'Netz' },
    { word: 'Frosch',          hint: 'Quaken' },
    { word: 'Schlange',        hint: 'Züngeln' },
    { word: 'Eidechse',        hint: 'Schwanz' },
    { word: 'Chamäleon',       hint: 'Farbe' },
    { word: 'Igel',            hint: 'Stacheln' },
    { word: 'Maulwurf',        hint: 'Graben' },
    { word: 'Fuchs',           hint: 'Schlau' },
    { word: 'Wolf',            hint: 'Heulen' },
    { word: 'Bär',             hint: 'Honig' },
    { word: 'Reh',             hint: 'Wald' },
    { word: 'Wildschwein',     hint: 'Hauer' },
    { word: 'Dachs',           hint: 'Streifen' },
    { word: 'Biber',           hint: 'Dämme' },
    { word: 'Otter',           hint: 'Schwimmen' },
    { word: 'Seehund',         hint: 'Klatschen' },
    { word: 'Walross',         hint: 'Zähne' },
    { word: 'Eisbär',          hint: 'Arktis' },
    { word: 'Polarfuchs',      hint: 'Weiß' },
    { word: 'Rentier',         hint: 'Weihnachten' },
    { word: 'Nashorn',         hint: 'Horn' },
    { word: 'Flusspferd',      hint: 'Wasser' },
    { word: 'Gepard',          hint: 'Schnell' },
    { word: 'Leopard',         hint: 'Flecken' },
    { word: 'Tiger',           hint: 'Streifen' },
    { word: 'Puma',            hint: 'Springen' },
    { word: 'Luchs',           hint: 'Pinselohren' },
    { word: 'Kamel',           hint: 'Höcker' },
    { word: 'Lama',            hint: 'Spucken' },
    { word: 'Alpaka',          hint: 'Wolle' },
    { word: 'Strauß',          hint: 'Laufen' },
    { word: 'Pelikan',         hint: 'Schnabel' },
    { word: 'Tukan',           hint: 'Bunt' },
    { word: 'Kolibri',         hint: 'Klein' },
    { word: 'Karpfen',         hint: 'Teich' },
    { word: 'Lachs',           hint: 'Springen' },
    { word: 'Wal',             hint: 'Riesig' },
    { word: 'Tintenfisch',     hint: 'Tinte' },
    { word: 'Seepferdchen',    hint: 'Aufrecht' },
    { word: 'Krabbe',          hint: 'Seitlich' },
    { word: 'Hummer',          hint: 'Rot' },
    { word: 'Qualle',          hint: 'Durchsichtig' },
    { word: 'Muschel',         hint: 'Strand' },
    { word: 'Nashornkäfer',    hint: 'Gehörnt' },
    { word: 'Marienkäfer',     hint: 'Punkte' },
    { word: 'Libelle',         hint: 'Leuchten' },
    { word: 'Grille',          hint: 'Zirpen' },
    { word: 'Schnecke',        hint: 'Haus' },
    { word: 'Regenwurm',       hint: 'Erde' },
    { word: 'Fledermaus',      hint: 'Echolot' },
    { word: 'Orang-Utan',      hint: 'Rot' },
    { word: 'Schimpanse',      hint: 'Werkzeug' },
    { word: 'Erdmännchen',     hint: 'Aufrecht' },
    { word: 'Tapir',           hint: 'Rüssel' },
    { word: 'Axolotl',         hint: 'Kiemen' },
    { word: 'Koi',             hint: 'Bunt' }
  ],

  sehenswuerdigkeiten: [
    { word: 'Eiffelturm',          hint: 'Eisen' },
    { word: 'Kolosseum',           hint: 'Gladiatoren' },
    { word: 'Chinesische Mauer',   hint: 'Lang' },
    { word: 'Taj Mahal',           hint: 'Marmor' },
    { word: 'Alhambra',            hint: 'Mosaik' },
    { word: 'Machu Picchu',        hint: 'Berge' },
    { word: 'Pyramiden',           hint: 'Wüste' },
    { word: 'Akropolis',           hint: 'Hügel' },
    { word: 'Stonehenge',          hint: 'Steine' },
    { word: 'Big Ben',             hint: 'Tick' },
    { word: 'Freiheitsstatue',     hint: 'Fackel' },
    { word: 'Golden Gate',         hint: 'Brücke' },
    { word: 'Burj Khalifa',        hint: 'Höchste' },
    { word: 'Sagrada Familia',     hint: 'Baustelle' },
    { word: 'Vatikan',             hint: 'Papst' },
    { word: 'Notre-Dame',          hint: 'Feuer' },
    { word: 'Louvre',              hint: 'Gemälde' },
    { word: 'Brandenburger Tor',   hint: 'Berlin' },
    { word: 'Neuschwanstein',      hint: 'Märchen' },
    { word: 'Reichstag',           hint: 'Glas' },
    { word: 'Kölner Dom',          hint: 'Spitzen' },
    { word: 'Frauenkirche',        hint: 'München' },
    { word: 'Schwarzwald',         hint: 'Kirsch' },
    { word: 'Zugspitze',           hint: 'Gipfel' },
    { word: 'Heidelberger Schloss',hint: 'Ruine' },
    { word: 'Sylt',                hint: 'Insel' },
    { word: 'Bodensee',            hint: 'Grenze' },
    { word: 'Rheinfall',           hint: 'Wasserfall' },
    { word: 'Matterhorn',          hint: 'Spitz' },
    { word: 'Jungfrau',            hint: 'Gletscher' },
    { word: 'Wiener Staatsoper',   hint: 'Oper' },
    { word: 'Schönbrunn',          hint: 'Kaiser' },
    { word: 'Prater',              hint: 'Riesenrad' },
    { word: 'Pantheon',            hint: 'Kuppel' },
    { word: 'Petersdom',           hint: 'Vatikan' },
    { word: 'Trevi-Brunnen',       hint: 'Münze' },
    { word: 'Schiefer Turm Pisa',  hint: 'Schief' },
    { word: 'Venedig',             hint: 'Gondel' },
    { word: 'Santorini',           hint: 'Blau' },
    { word: 'Parthenon',           hint: 'Säulen' },
    { word: 'Hagia Sophia',        hint: 'Kuppel' },
    { word: 'Topkapi-Palast',      hint: 'Sultan' },
    { word: 'Petra',               hint: 'Fels' },
    { word: 'Angkor Wat',          hint: 'Tempel' },
    { word: 'Fuji',                hint: 'Vulkan' },
    { word: 'Verbotene Stadt',     hint: 'Kaiser' },
    { word: 'Potala-Palast',       hint: 'Tibet' },
    { word: 'Sydney Opera',        hint: 'Segel' },
    { word: 'Ayers Rock',          hint: 'Rot' },
    { word: 'Niagara',             hint: 'Wasserfall' },
    { word: 'Grand Canyon',        hint: 'Tief' },
    { word: 'Yellowstone',         hint: 'Geysir' },
    { word: 'Times Square',        hint: 'Reklame' },
    { word: 'Central Park',        hint: 'Stadtpark' },
    { word: 'Empire State',        hint: 'Wolkenkratzer' },
    { word: 'Buckingham Palast',   hint: 'Königin' },
    { word: 'Tower Bridge',        hint: 'Klappen' },
    { word: 'London Eye',          hint: 'Riesenrad' },
    { word: 'Disneyland',          hint: 'Mäuse' },
    { word: 'Versailles',          hint: 'Garten' },
    { word: 'Moulin Rouge',        hint: 'Rot' },
    { word: 'Arc de Triomphe',     hint: 'Bogen' },
    { word: 'Atomium',             hint: 'Atom' },
    { word: 'Windmühlen',          hint: 'Holland' },
    { word: 'Kilimandscharo',      hint: 'Afrika' },
    { word: 'Serengeti',           hint: 'Safari' },
    { word: 'Kapstadt',            hint: 'Küste' },
    { word: 'Amazon',              hint: 'Dschungel' },
    { word: 'Iguazu',              hint: 'Wasserfälle' },
    { word: 'Galapagos',           hint: 'Inseln' },
    { word: 'Christusstatue',      hint: 'Rio' },
    { word: 'Chichen Itza',        hint: 'Maya' },
    { word: 'Teotihuacan',         hint: 'Azteken' },
    { word: 'Hallstatt',           hint: 'Salz' },
    { word: 'Plitvice',            hint: 'Seen' },
    { word: 'Dubrovnik',           hint: 'Mauern' },
    { word: 'Cinque Terre',        hint: 'Farbig' },
    { word: 'Loch Ness',           hint: 'Monster' },
    { word: 'Nordkap',             hint: 'Ende' }
  ],

  essen: [
    { word: 'Lasagne',        hint: 'Schichten' },
    { word: 'Sushi',          hint: 'Rollen' },
    { word: 'Tiramisu',       hint: 'Kaffee' },
    { word: 'Fondue',         hint: 'Schmelzen' },
    { word: 'Döner',          hint: 'Drehen' },
    { word: 'Schnitzel',      hint: 'Klopfen' },
    { word: 'Brötchen',       hint: 'Aufschnitt' },
    { word: 'Croissant',      hint: 'Butter' },
    { word: 'Guacamole',      hint: 'Avocado' },
    { word: 'Hummus',         hint: 'Kichererbsen' },
    { word: 'Tacos',          hint: 'Mexiko' },
    { word: 'Burger',         hint: 'Fleisch' },
    { word: 'Pommes',         hint: 'Frittiert' },
    { word: 'Pizza',          hint: 'Ofen' },
    { word: 'Pasta',          hint: 'Nudeln' },
    { word: 'Risotto',        hint: 'Reis' },
    { word: 'Paella',         hint: 'Safran' },
    { word: 'Tapas',          hint: 'Spanien' },
    { word: 'Ramen',          hint: 'Brühe' },
    { word: 'Dim Sum',        hint: 'Dämpfen' },
    { word: 'Currywurst',     hint: 'Sauce' },
    { word: 'Bratwurst',      hint: 'Grillen' },
    { word: 'Leberkäse',      hint: 'Bayern' },
    { word: 'Weißwurst',      hint: 'Süß' },
    { word: 'Knödel',         hint: 'Rund' },
    { word: 'Sauerkraut',     hint: 'Säuerlich' },
    { word: 'Bretzel',        hint: 'Salz' },
    { word: 'Pflaumenkuchen', hint: 'Blech' },
    { word: 'Schwarzwälder',  hint: 'Kirschen' },
    { word: 'Apfelstrudel',   hint: 'Wien' },
    { word: 'Kaiserschmarrn', hint: 'Zerrissen' },
    { word: 'Palatschinke',   hint: 'Dünn' },
    { word: 'Waffel',         hint: 'Gitter' },
    { word: 'Pancakes',       hint: 'Stapeln' },
    { word: 'Smoothie',       hint: 'Mixen' },
    { word: 'Limonade',       hint: 'Zitronen' },
    { word: 'Eiskaffee',      hint: 'Kalt' },
    { word: 'Milchshake',     hint: 'Eis' },
    { word: 'Espresso',       hint: 'Klein' },
    { word: 'Cappuccino',     hint: 'Schaum' },
    { word: 'Latte Macchiato',hint: 'Schichten' },
    { word: 'Tee',            hint: 'Aufgießen' },
    { word: 'Glühwein',       hint: 'Winter' },
    { word: 'Sangria',        hint: 'Wein' },
    { word: 'Mojito',         hint: 'Minze' },
    { word: 'Marmelade',      hint: 'Einkochen' },
    { word: 'Nutella',        hint: 'Aufstreichen' },
    { word: 'Honig',          hint: 'Biene' },
    { word: 'Käsefondue',     hint: 'Schweiz' },
    { word: 'Raclette',       hint: 'Schmelzen' },
    { word: 'Grillplatte',    hint: 'Kohle' },
    { word: 'Buffet',         hint: 'Auswahl' },
    { word: 'Suppe',          hint: 'Schlurfen' },
    { word: 'Salat',          hint: 'Grün' },
    { word: 'Steak',          hint: 'Blutig' },
    { word: 'Garnelen',       hint: 'Schalen' },
    { word: 'Tofu',           hint: 'Soja' },
    { word: 'Falafel',        hint: 'Frittiert' },
    { word: 'Couscous',       hint: 'Nordafrika' },
    { word: 'Quinoa',         hint: 'Südamerika' },
    { word: 'Avocado',        hint: 'Kern' },
    { word: 'Mango',          hint: 'Tropisch' },
    { word: 'Ananas',         hint: 'Stachelig' },
    { word: 'Wassermelone',   hint: 'Kerne' },
    { word: 'Erdbeere',       hint: 'Rot' },
    { word: 'Granatapfel',    hint: 'Körner' },
    { word: 'Kokos',          hint: 'Palme' },
    { word: 'Macaron',        hint: 'Farbe' },
    { word: 'Eclair',         hint: 'Creme' },
    { word: 'Muffin',         hint: 'Papier' },
    { word: 'Brownie',        hint: 'Schokolade' },
    { word: 'Cheesecake',     hint: 'Käse' },
    { word: 'Sorbet',         hint: 'Gefroren' },
    { word: 'Chips',          hint: 'Knabbern' },
    { word: 'Popcorn',        hint: 'Kino' },
    { word: 'Gummibärchen',   hint: 'Gummi' },
    { word: 'Schokolade',     hint: 'Kakao' },
    { word: 'Karamell',       hint: 'Verbrennen' },
    { word: 'Marzipan',       hint: 'Mandeln' },
    { word: 'Lebkuchen',      hint: 'Weihnachten' },
    { word: 'Plätzchen',      hint: 'Backen' },
    { word: 'Donut',          hint: 'Loch' },
    { word: 'Bagel',          hint: 'Ring' },
    { word: 'Wrap',           hint: 'Einrollen' }
  ],

  sport: [
    { word: 'Elfmeter',          hint: 'Strafe' },
    { word: 'Freistoß',          hint: 'Mauer' },
    { word: 'Dribbling',         hint: 'Ball' },
    { word: 'Aufschlag',         hint: 'Tennis' },
    { word: 'Slalom',            hint: 'Stangen' },
    { word: 'Abseits',           hint: 'Linie' },
    { word: 'Hattrick',          hint: 'Drei' },
    { word: 'Schiedsrichter',    hint: 'Pfeifen' },
    { word: 'Gelbe Karte',       hint: 'Warnung' },
    { word: 'Rote Karte',        hint: 'Raus' },
    { word: 'Eckball',           hint: 'Ecke' },
    { word: 'Einwurf',           hint: 'Seitenlinie' },
    { word: 'Kopfball',          hint: 'Stirn' },
    { word: 'Fallrückzieher',    hint: 'Akrobatik' },
    { word: 'Torwart',           hint: 'Hände' },
    { word: 'Sprinter',          hint: 'Schnell' },
    { word: 'Staffel',           hint: 'Stab' },
    { word: 'Weitsprung',        hint: 'Grube' },
    { word: 'Hochsprung',        hint: 'Latte' },
    { word: 'Diskus',            hint: 'Werfen' },
    { word: 'Speerwurf',         hint: 'Speer' },
    { word: 'Hammerwerfen',      hint: 'Kreis' },
    { word: 'Marathon',          hint: '42km' },
    { word: 'Triathlon',         hint: 'Drei' },
    { word: 'Schwimmen',         hint: 'Bahn' },
    { word: 'Radsport',          hint: 'Pedale' },
    { word: 'Rudern',            hint: 'Riemen' },
    { word: 'Kanu',              hint: 'Paddel' },
    { word: 'Surfen',            hint: 'Welle' },
    { word: 'Tauchen',           hint: 'Flasche' },
    { word: 'Klettern',          hint: 'Griffe' },
    { word: 'Bouldern',          hint: 'Abstürzen' },
    { word: 'Ski alpin',         hint: 'Piste' },
    { word: 'Langlauf',          hint: 'Loipe' },
    { word: 'Biathlon',          hint: 'Schießen' },
    { word: 'Eiskunstlauf',      hint: 'Pirouette' },
    { word: 'Eishockey',         hint: 'Scheibe' },
    { word: 'Curling',           hint: 'Schrubben' },
    { word: 'Bobsport',          hint: 'Kanal' },
    { word: 'Rodeln',            hint: 'Hang' },
    { word: 'Basketball',        hint: 'Korb' },
    { word: 'Volleyball',        hint: 'Netz' },
    { word: 'Handball',          hint: 'Tor' },
    { word: 'Rugby',             hint: 'Oval' },
    { word: 'American Football', hint: 'Helm' },
    { word: 'Baseball',          hint: 'Schlagstock' },
    { word: 'Cricket',           hint: 'England' },
    { word: 'Golf',              hint: 'Loch' },
    { word: 'Tennis',            hint: 'Netz' },
    { word: 'Tischtennis',       hint: 'Platte' },
    { word: 'Badminton',         hint: 'Feder' },
    { word: 'Squash',            hint: 'Wand' },
    { word: 'Boxen',             hint: 'Handschuhe' },
    { word: 'Ringen',            hint: 'Matte' },
    { word: 'Judo',              hint: 'Wurf' },
    { word: 'Karate',            hint: 'Kata' },
    { word: 'Taekwondo',         hint: 'Fuß' },
    { word: 'Fechten',           hint: 'Klinge' },
    { word: 'Bogenschießen',     hint: 'Pfeil' },
    { word: 'Reiten',            hint: 'Sattel' },
    { word: 'Turnen',            hint: 'Reck' },
    { word: 'Trampolinspringen', hint: 'Federn' },
    { word: 'Wasserball',        hint: 'Becken' },
    { word: 'Leichtathletik',    hint: 'Stadion' },
    { word: 'Crossfit',          hint: 'Intensiv' },
    { word: 'Yoga',              hint: 'Dehnen' },
    { word: 'Pilates',           hint: 'Rumpf' },
    { word: 'Zumba',             hint: 'Tanzen' },
    { word: 'Spinning',          hint: 'Rad' },
    { word: 'Krafttraining',     hint: 'Hanteln' },
    { word: 'Wandern',           hint: 'Berge' },
    { word: 'Joggen',            hint: 'Schuhe' },
    { word: 'Nordic Walking',    hint: 'Stöcke' },
    { word: 'Inlineskaten',      hint: 'Rollen' },
    { word: 'Skateboard',        hint: 'Tricks' },
    { word: 'BMX',               hint: 'Sprung' },
    { word: 'Motocross',         hint: 'Schlamm' },
    { word: 'Formel 1',          hint: 'Rennstrecke' },
    { word: 'Dart',              hint: 'Scheibe' },
    { word: 'Billard',           hint: 'Queue' },
    { word: 'Bowling',           hint: 'Kegel' },
    { word: 'Minigolf',          hint: 'Hindernis' },
    { word: 'Schach',            hint: 'König' },
    { word: 'Tauziehen',         hint: 'Seil' }
  ],

  filme: [
    { word: 'Cliffhanger',       hint: 'Spannung' },
    { word: 'Trailer',           hint: 'Vorschau' },
    { word: 'Staffel',           hint: 'Serie' },
    { word: 'Regie',             hint: 'Klappe' },
    { word: 'Soundtrack',        hint: 'Musik' },
    { word: 'Blockbuster',       hint: 'Kasse' },
    { word: 'Sequel',            hint: 'Fortsetzung' },
    { word: 'Prequel',           hint: 'Vorher' },
    { word: 'Reboot',            hint: 'Neustart' },
    { word: 'Spinoff',           hint: 'Ableger' },
    { word: 'Cameo',             hint: 'Kurzauftritt' },
    { word: 'Stuntman',          hint: 'Sprung' },
    { word: 'CGI',               hint: 'Computer' },
    { word: 'Greenscreen',       hint: 'Hintergrund' },
    { word: 'Oscar',             hint: 'Statue' },
    { word: 'Regisseur',         hint: 'Klappe' },
    { word: 'Drehbuch',          hint: 'Text' },
    { word: 'Kulisse',           hint: 'Bühnenbild' },
    { word: 'Kameramann',        hint: 'Linse' },
    { word: 'Schnitt',           hint: 'Schere' },
    { word: 'Premiere',          hint: 'Roter Teppich' },
    { word: 'Kino',              hint: 'Leinwand' },
    { word: 'Popcorn',           hint: 'Knabbern' },
    { word: 'Streaming',         hint: 'Online' },
    { word: 'Netflix',           hint: 'Abo' },
    { word: 'Binge-Watching',    hint: 'Durchschauen' },
    { word: 'Spoiler',           hint: 'Verderben' },
    { word: 'Plot Twist',        hint: 'Überraschung' },
    { word: 'Antagonist',        hint: 'Böse' },
    { word: 'Protagonist',       hint: 'Held' },
    { word: 'Actionfilm',        hint: 'Explosion' },
    { word: 'Horrorfilm',        hint: 'Angst' },
    { word: 'Komödie',           hint: 'Lachen' },
    { word: 'Romanze',           hint: 'Liebe' },
    { word: 'Thriller',          hint: 'Nervös' },
    { word: 'Dokumentation',     hint: 'Wahr' },
    { word: 'Animation',         hint: 'Gezeichnet' },
    { word: 'Musical',           hint: 'Singen' },
    { word: 'Western',           hint: 'Cowboys' },
    { word: 'Science-Fiction',   hint: 'Zukunft' },
    { word: 'Fantasy',           hint: 'Magie' },
    { word: 'Krimi',             hint: 'Mörder' },
    { word: 'Biopic',            hint: 'Lebensgeschichte' },
    { word: 'Kurzfilm',          hint: 'Kurz' },
    { word: 'Serienfinale',      hint: 'Ende' },
    { word: 'Pilotfolge',        hint: 'Anfang' },
    { word: 'Cliffhanger',       hint: 'Offen' },
    { word: 'Flashback',         hint: 'Rückblende' },
    { word: 'Monolog',           hint: 'Allein' },
    { word: 'Dialogszene',       hint: 'Gespräch' },
    { word: 'Einstellung',       hint: 'Kamera' },
    { word: 'Nahaufnahme',       hint: 'Gesicht' },
    { word: 'Totale',            hint: 'Weit' },
    { word: 'Überblende',        hint: 'Wechsel' },
    { word: 'Zeitlupe',          hint: 'Langsam' },
    { word: 'Zeitraffer',        hint: 'Schnell' },
    { word: 'Voiceover',         hint: 'Stimme' },
    { word: 'Untertitel',        hint: 'Text' },
    { word: 'Synchronisation',   hint: 'Stimme' },
    { word: 'Outtakes',          hint: 'Panne' },
    { word: 'Behind the Scenes', hint: 'Hinter' },
    { word: 'Fantheorie',        hint: 'Spekulation' },
    { word: 'Easter Egg',        hint: 'Versteckt' },
    { word: 'Mid-Credits',       hint: 'Warten' },
    { word: 'Remake',            hint: 'Nochmal' },
    { word: 'Franchise',         hint: 'Universum' },
    { word: 'Crossover',         hint: 'Treffen' },
    { word: 'Miniserie',         hint: 'Kurz' },
    { word: 'Docusoap',          hint: 'Reality' },
    { word: 'Late Night Show',   hint: 'Nacht' },
    { word: 'Talkshow',          hint: 'Sofa' },
    { word: 'Gameshow',          hint: 'Gewinnen' },
    { word: 'Casting Show',      hint: 'Jury' },
    { word: 'Soap Opera',        hint: 'Drama' },
    { word: 'Anime',             hint: 'Japan' },
    { word: 'Sitcom',            hint: 'Lachen' },
    { word: 'Mockumentary',      hint: 'Falsch' },
    { word: 'True Crime',        hint: 'Mord' },
    { word: 'Krimiserie',        hint: 'Detektiv' },
    { word: 'Mindfuck',          hint: 'Verwirrend' },
    { word: 'Weltuntergang',     hint: 'Ende' },
    { word: 'Zeitreise',         hint: 'Vergangenheit' },
    { word: 'Roboter',           hint: 'Maschine' },
    { word: 'Alien',             hint: 'Außerirdisch' },
    { word: 'Zombie',            hint: 'Untot' },
    { word: 'Superheld',         hint: 'Kräfte' },
    { word: 'Vampir',            hint: 'Blut' },
    { word: 'Detektiv',          hint: 'Lupe' }
  ],

  urlaub: [
    { word: 'Handgepäck',        hint: 'Gewicht' },
    { word: 'Sonnenbrand',       hint: 'Rot' },
    { word: 'Hotelzimmer',       hint: 'Schlüsselkarte' },
    { word: 'Jetlag',            hint: 'Müde' },
    { word: 'Reisepass',         hint: 'Stempel' },
    { word: 'Visum',             hint: 'Erlaubnis' },
    { word: 'Flughafen',         hint: 'Terminal' },
    { word: 'Check-in',          hint: 'Schalter' },
    { word: 'Boarding',          hint: 'Einsteigen' },
    { word: 'Sicherheitskontrolle', hint: 'Scanner' },
    { word: 'Duty-Free',         hint: 'Steuerfrei' },
    { word: 'Abfluggate',        hint: 'Warten' },
    { word: 'Landung',           hint: 'Aufsetzen' },
    { word: 'Gepäckband',        hint: 'Drehen' },
    { word: 'Koffer',            hint: 'Rollen' },
    { word: 'Reiseversicherung', hint: 'Schutz' },
    { word: 'Buchungsbestätigung',hint: 'Email' },
    { word: 'Reisebüro',         hint: 'Katalog' },
    { word: 'All-inclusive',     hint: 'Alles' },
    { word: 'Halbpension',       hint: 'Frühstück' },
    { word: 'Strandliege',       hint: 'Reservieren' },
    { word: 'Sonnenschirm',      hint: 'Schatten' },
    { word: 'Sandburg',          hint: 'Strand' },
    { word: 'Schnorcheln',       hint: 'Maske' },
    { word: 'Wasserrutsche',     hint: 'Nass' },
    { word: 'Poolbar',           hint: 'Wasser' },
    { word: 'Buffet',            hint: 'Auswahl' },
    { word: 'Ausflug',           hint: 'Bus' },
    { word: 'Stadtführung',      hint: 'Guide' },
    { word: 'Souvenirs',         hint: 'Mitbringen' },
    { word: 'Postkarte',         hint: 'Grüße' },
    { word: 'Währung',           hint: 'Wechseln' },
    { word: 'Trinkgeld',         hint: 'Kellner' },
    { word: 'Mietwagen',         hint: 'Kaution' },
    { word: 'Tanken',            hint: 'Voll' },
    { word: 'Autobahn',          hint: 'Rasen' },
    { word: 'Rastplatz',         hint: 'Pause' },
    { word: 'Fähre',             hint: 'Übersetzen' },
    { word: 'Kreuzfahrt',        hint: 'Schiff' },
    { word: 'Kabinenkoffer',     hint: 'Bett' },
    { word: 'Landausflug',       hint: 'Hafen' },
    { word: 'Zelten',            hint: 'Zelt' },
    { word: 'Campingplatz',      hint: 'Stellplatz' },
    { word: 'Schlafsack',        hint: 'Warm' },
    { word: 'Wanderung',         hint: 'Gipfel' },
    { word: 'Bergbahn',          hint: 'Gondel' },
    { word: 'Skipass',           hint: 'Piste' },
    { word: 'Après-Ski',         hint: 'Hütte' },
    { word: 'Winterurlaub',      hint: 'Schnee' },
    { word: 'Sommerurlaub',      hint: 'Sonne' },
    { word: 'Stadtreise',        hint: 'Museum' },
    { word: 'Rucksackreise',     hint: 'Hostel' },
    { word: 'Backpacker',        hint: 'Günstig' },
    { word: 'Luxusresort',       hint: 'Teuer' },
    { word: 'Wellnesshotel',     hint: 'Spa' },
    { word: 'Massagen',          hint: 'Entspannen' },
    { word: 'Sauna',             hint: 'Heiß' },
    { word: 'Reiseführer',       hint: 'Buch' },
    { word: 'Offline-Karte',     hint: 'Roaming' },
    { word: 'Adapter',           hint: 'Stecker' },
    { word: 'Mückenschutz',      hint: 'Spray' },
    { word: 'Reiseapotheke',     hint: 'Tabletten' },
    { word: 'Reisekrankenheit',  hint: 'Übelkeit' },
    { word: 'Zeitzone',          hint: 'Uhr' },
    { word: 'Heimweh',           hint: 'Zuhause' },
    { word: 'Urlaubsfotos',      hint: 'Kamera' },
    { word: 'Selfie',            hint: 'Arm' },
    { word: 'Rückreise',         hint: 'Heimflug' },
    { word: 'Urlaub',            hint: 'Erholen' },
    { word: 'Abreise',           hint: 'Koffer' },
    { word: 'Anreise',           hint: 'Ankommen' },
    { word: 'Pension',           hint: 'Familie' },
    { word: 'Airbnb',            hint: 'Privat' },
    { word: 'Hostel',            hint: 'Schlafsaal' },
    { word: 'Jugendherberge',    hint: 'Günstig' },
    { word: 'Stornierung',       hint: 'Absagen' },
    { word: 'Umbuchung',         hint: 'Ändern' },
    { word: 'Verspätung',        hint: 'Warten' },
    { word: 'Streik',            hint: 'Flugausfall' },
    { word: 'Überbuchung',       hint: 'Voll' },
    { word: 'Upgread',           hint: 'Besser' },
    { word: 'Lounge',            hint: 'VIP' },
    { word: 'Fensterplatz',      hint: 'Aussicht' },
    { word: 'Mittelplatz',       hint: 'Eingeklemmt' },
    { word: 'Turbulenzen',       hint: 'Wackeln' }
  ]
};

let state = {
  players: 4,
  names: [],
  gameMins: 3,
  selectedCats: ['alltag'],
  word: '',
  hint: '',
  imposterIndex: -1,
  currentDealing: 0,
  timerInterval: null,
  timerSeconds: 0,
  totalSeconds: 0,
  hintEnabled: false
};

function renderNameInputs() {
  const container = document.getElementById('name-inputs');
  container.innerHTML = '';
  for (let i = 0; i < state.players; i++) {
    const row = document.createElement('div');
    row.className = 'name-row';
    row.innerHTML = `<label>Spieler ${i+1}</label><input type="text" id="name-${i}" placeholder="Name eingeben" maxlength="20" />`;
    container.appendChild(row);
  }
  state.names.forEach((n, i) => { const el = document.getElementById('name-'+i); if (el) el.value = n; });
}

function changeCount(delta) {
  state.players = Math.max(3, Math.min(12, state.players + delta));
  document.getElementById('player-count').textContent = state.players;
  renderNameInputs();
}

function changeTime(delta) {
  state.gameMins = Math.max(1, Math.min(15, state.gameMins + delta));
  document.getElementById('game-time').textContent = state.gameMins;
}

function toggleCat(cat) {
  const cb = document.getElementById('cat-' + cat);
  if (cb.checked) {
    if (state.selectedCats.length >= 3) { cb.checked = false; return; }
    if (!state.selectedCats.includes(cat)) state.selectedCats.push(cat);
  } else {
    if (state.selectedCats.length <= 1) { cb.checked = true; return; }
    state.selectedCats = state.selectedCats.filter(c => c !== cat);
  }
}

function startImposter() {
  state.names = [];
  for (let i = 0; i < state.players; i++) {
    const el = document.getElementById('name-' + i);
    state.names.push(el && el.value.trim() ? el.value.trim() : 'Spieler ' + (i+1));
  }
  state.hintEnabled = document.getElementById('hint-toggle').checked;
  let pool = [];
  state.selectedCats.forEach(cat => { pool = pool.concat(IMPOSTER_DATA[cat]); });
  const entry = pool[Math.floor(Math.random() * pool.length)];
  state.word = entry.word;
  state.hint = entry.hint;
  state.imposterIndex = Math.floor(Math.random() * state.players);
  state.currentDealing = 0;
  show('imposter-deal'); hide('imposter-setup'); hide('imposter-play'); hide('imposter-reveal');
  showDealWaiting();
}

function showDealWaiting() {
  document.getElementById('deal-player-name').textContent = state.names[state.currentDealing];
  show('deal-waiting'); hide('deal-card');
}

function showCard() {
  const i = state.currentDealing;
  const isImposter = i === state.imposterIndex;
  const card = document.getElementById('player-card');
  const roleEl = document.getElementById('card-role');
  const wordEl = document.getElementById('card-word');
  const hintEl = document.getElementById('card-hint');
  const catEl  = document.getElementById('card-cat');
  if (isImposter) {
    card.className = 'card imposter-card';
    roleEl.textContent = '🕵️ Du bist der Imposter!';
    wordEl.textContent = '???';
    catEl.textContent  = state.selectedCats.map(c => catLabel(c)).join(', ');
    if (state.hintEnabled) { hintEl.innerHTML = '💡 Tipp: <span>' + state.hint + '</span>'; hintEl.classList.remove('hidden'); }
    else hintEl.classList.add('hidden');
  } else {
    card.className = 'card';
    roleEl.textContent = '✅ Kein Imposter';
    wordEl.textContent = state.word;
    catEl.textContent  = state.selectedCats.map(c => catLabel(c)).join(', ');
    hintEl.classList.add('hidden');
  }
  hide('deal-waiting'); show('deal-card');
}

function catLabel(cat) {
  return {
    alltag: 'Alltag',
    tiere: 'Tiere',
    sehenswuerdigkeiten: 'Sehensw.',
    essen: 'Essen & Trinken',
    sport: 'Sport',
    filme: 'Filme & Serien',
    urlaub: 'Urlaub & Reisen'
  }[cat] || cat;
}

function nextPlayer() {
  state.currentDealing++;
  if (state.currentDealing >= state.players) startPlayPhase();
  else showDealWaiting();
}

function startPlayPhase() {
  hide('imposter-deal'); show('imposter-play');
  state.totalSeconds = state.gameMins * 60;
  state.timerSeconds = state.totalSeconds;
  updateTimerDisplay();
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.timerSeconds--; updateTimerDisplay();
    if (state.timerSeconds <= 0) { clearInterval(state.timerInterval); revealImposter(); }
  }, 1000);
}

function updateTimerDisplay() {
  const s = state.timerSeconds;
  const mins = String(Math.floor(s/60)).padStart(2,'0');
  const secs = String(s%60).padStart(2,'0');
  const textEl = document.getElementById('timer-text');
  textEl.textContent = mins+':'+secs;
  if (s<=30) textEl.classList.add('urgent'); else textEl.classList.remove('urgent');
  const circ = 2*Math.PI*54;
  document.getElementById('timer-ring').style.strokeDashoffset = circ*(1-Math.max(0,s/state.totalSeconds));
  const ring = document.getElementById('timer-ring');
  if (s<=30) ring.classList.add('urgent'); else ring.classList.remove('urgent');
}

function revealImposter() {
  clearInterval(state.timerInterval);
  hide('imposter-play'); show('imposter-reveal');
  document.getElementById('reveal-word').textContent = state.word;
  document.getElementById('reveal-imposter').textContent = '🕵️ ' + state.names[state.imposterIndex];
  const list = document.getElementById('reveal-players-list');
  list.innerHTML = '';
  state.names.forEach((name, i) => {
    const row = document.createElement('div');
    const isImp = i === state.imposterIndex;
    row.className = 'player-row' + (isImp ? ' is-imposter' : '');
    row.innerHTML = `<span class="player-name">${name}</span><span class="player-tag ${isImp?'imposter-tag':''}'">${isImp?'🕵️ Imposter':'✅ Unschuldig'}</span>`;
    list.appendChild(row);
  });
}

function resetImposter() {
  clearInterval(state.timerInterval);
  hide('imposter-deal'); hide('imposter-play'); hide('imposter-reveal');
  show('imposter-setup'); renderNameInputs();
}

function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

document.addEventListener('DOMContentLoaded', renderNameInputs);
