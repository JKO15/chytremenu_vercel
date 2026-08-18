# chytré menu

Webová aplikace pro plánování jídel, správu receptů a přípravu nákupního seznamu. Uživatel si může sestavit jídelníček na celý týden, dohledat recept podle názvu nebo suroviny a následně z plánovaných jídel vytvořit nákup.

## Hlavní funkce

### Týdenní jídelníček

- Přehled jídel pro jednotlivé dny v týdnu.
- Kategorie jídel: snídaně, dopolední svačina, oběd, odpolední svačina a večeře.
- Přidávání receptů do volných jídelních oken.
- Odebrání naplánovaného jídla.
- Nastavení počtu porcí.
- Souhrn energie, bílkovin, sacharidů a tuků.
- Přehled dnešních jídel a celkového naplnění jídelníčku.
- Akce pro sdílení jídelníčku a přechod na nákupní seznam.

### Hledání

- Rychlé hledání pomocí tlačítka **Hledat…** v horní navigaci.
- Klávesová zkratka `⌘K` na macOS nebo `Ctrl+K` na Windows/Linux.
- Hledání podle názvu receptu.
- Hledání podle suroviny.
- Hledání podle kategorie nebo štítku receptu.
- Hledání a navigace fungují také přes šipky a klávesu Enter.
- Výsledky zahrnují stránky aplikace, jednotlivé recepty i nákupní seznam.

### Knihovna receptů

- Každý recept má mít vlastní obrázek; pokud obrázek není k dispozici, může uživatel zvolit vizuální placeholder.
- Přehled dostupných receptů s fotografií, kategorií, časem přípravy a nutričními údaji.
- Filtrování podle typu jídla.
- Vyhledávání podle názvu, suroviny nebo štítku.
- Řazení podle novosti, energie, množství bílkovin nebo času přípravy.
- Otevření detailu receptu.
- Příprava na přidávání nových receptů a import receptu ze souboru.

### Detail receptu

- Fotografie nebo vizuální zástupný motiv receptu.
- Kategorie, čas přípravy, energie a bílkoviny na porci.
- Přepočet množství ingrediencí podle počtu porcí.
- Odškrtávání použitých ingrediencí.
- Postup přípravy krok za krokem.
- Nutriční rozložení receptu.
- Akce pro přidání do nákupního seznamu, naplánování a sdílení.

### Nákupní seznam

- Automatické vytvoření seznamu z naplánovaných receptů.
- Seskupení položek podle regálů nebo kategorií v obchodě.
- Odškrtávání nakoupených položek.
- Zobrazení průběhu nákupu v procentech.
- Náhled receptů, ze kterých seznam vznikl.
- Možnost obnovit stav seznamu nebo odstranit hotové položky.
- Možnost přidat vlastní položku.
- Připravené propojení s Rohlíkem pro přesun seznamu do košíku.

### Účet a nastavení

- Uživatelské menu s nastavením účtu.
- Změna e-mailu.
- Nastavení propojení s Rohlíkem.
- Odhlášení.
- Proces zrušení účtu s potvrzením přes e-mail.
- Přepínání světlého a tmavého režimu.
- Přepínání jazyka CZ/EN v navigaci.

## Veřejné demo homepage

Pro porovnání návrhů veřejné homepage jsou k dispozici tyto routy:

- `/demo/home` – produktovější varianta s hero sekcí a ukázkou funkcí.
- `/demo/home2` – obsahově bližší původní homepage chytre­menu.cz, včetně beta registrace.
- `/demo/home3` – odlehčená kombinace předchozích návrhů s beta registračním formulářem.

Demo homepage jsou určené pro anonymní návštěvníky a obsahují odkazy na registraci i přihlášení. Registrační formulář pro beta přístup zatím slouží jako prezentační prvek.

## Dostupné routy

| Routa | Popis |
| --- | --- |
| `/` | Týdenní jídelníček |
| `/recepty` | Knihovna receptů |
| `/recepty/[slug]` | Detail konkrétního receptu |
| `/nakupni-seznam` | Nákupní seznam |
| `/demo/home` | Demo homepage 1 |
| `/demo/home2` | Demo homepage 2 |
| `/demo/home3` | Demo homepage 3 |

## Stav projektu

Aplikace aktuálně používá ukázková data receptů a jídelníčku uložená v projektu. Interaktivní úpravy jídelníčku, odškrtávání ingrediencí a změna motivu probíhají v uživatelském rozhraní; trvalé ukládání dat, skutečná autentizace, odesílání beta formuláře a integrace Rohlíku jsou připravené jako další backendové kroky.

## Design a přístupnost

- Responzivní rozhraní pro mobil, tablet i desktop.
- Sémantické odkazy, tlačítka, nadpisy a popisky formulářů.
- Podpora klávesové navigace u rychlého hledání.
- Světlý i tmavý režim.
- Barevný systém založený na designových tokenech aplikace.
- Fotografie receptů jsou opatřené alternativními texty.

## Technologie

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui komponenty
- Lucide React ikony

## Spuštění projektu

Použijte package manager definovaný v `package.json` a spusťte vývojový server. Po spuštění otevřete hlavní routu `/` nebo jednu z demo homepage v `/demo/home`, `/demo/home2` a `/demo/home3`.
