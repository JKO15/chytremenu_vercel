# chytré menu — design systém

## 1. Produktový charakter

**chytré menu** je klidný, praktický plánovač jídelníčku, receptů, maker a nákupů. Vizuální jazyk kombinuje přesnost kuchyňského nástroje s přívětivostí jídla: tmavý grafitový základ, teal jako živý signál a meruňková jako teplý protějšek.

Design má působit:

- prakticky a rychle čitelně;
- svěže, ale ne dětsky;
- přesně u dat, maker a plánování;
- teple u receptů, ingrediencí a nákupů.

## 2. Barevný systém

Používej pouze tematické tokeny z `app/globals.css`. Přímé barvy v komponentách nepřidávej bez dobrého důvodu.

### Brand barvy

| Role | Hex | Token | Použití |
| --- | --- | --- | --- |
| Primární teal | `#4FD1C5` | `brand`, `primary` | logo, primární akce, aktivní navigace, progres, fotkové štítky |
| Sekundární apricot | `#F6AD55` | `brand-2` | sdílení, nákup, upozornění, teplý sekundární signál |

Primární teal `#4FD1C5` se používá přímo v obou režimech přes token `primary`; text v popředí používá kontrastní tmavý token. `brand` zůstává aliasem stejné barvy pro logo a fotkové štítky.

### Neutrály

- `background` — hlavní plátno, v dark mode grafit s modro-tealovým nádechem;
- `card` — zvýšené panely a karty;
- `muted` / `secondary` — sekundární plochy;
- `foreground` — hlavní text;
- `muted-foreground` — podpůrný text;
- `border` — jemné oddělení, nikoli dekorativní rámečky všude.

### Sémantika

- teal = primární akce, aktivní navigace, progres, bílkoviny, pozitivní stav;
- apricot = sekundární akce, nákupní kontext, sdílení, sacharidy, upozornění;
- destructive = pouze skutečně destruktivní akce;
- neutrály = struktura, čitelnost a prostor.

## 3. Typografie

Použité fonty jsou maximálně dvě:

- `Instrument Sans` — běžný text, nadpisy a UI;
- `JetBrains Mono` — mikroštítky, makra, čísla, kategorie a technické údaje.

Pravidla:

- nadpisy používají výraznou váhu, ale krátké řádky;
- dlouhé texty mají pohodlný řádkový proklad;
- čísla maker používají tabulární číslice přes třídu `.num`;
- mikroštítky používají třídu `.tag`, uppercase a rozšířený tracking;
- text v JSX musí správně escapovat apostrofy a speciální znaky.

## 4. Layout a hierarchie

### App shell

Aplikace má výrazný shell s boční navigací na desktopu a kompaktní horní/mobilní navigací na menších obrazovkách. Obsah je rozdělen na:

1. navigační kontext;
2. stránkový header s titulkem a krátkým vysvětlením;
3. hlavní pracovní plochu;
4. sekundární akce, filtry nebo souhrny.

Preferuj flexbox. Grid používej pro skutečné dvourozměrné struktury, například týdenní jídelníček nebo galerii receptů.

### Týdenní jídelníček

Týden je hlavní pracovní plocha. Karty receptů musí být rychle skenovatelné, s jasným dnem, slotem jídla, názvem, časem a makry. Prázdný slot je příležitost k akci, nikoli vizuální chyba.

### Detail receptu

Hero receptu je široký obdélník, ne čtverec. Fotografie nebo placeholder vyplňuje hero plochu, text se opírá o jednotný scrim a metadata jsou umístěna do jasných štítků.

## 5. Recepty bez fotografie

Recept bez fotografie nikdy nezobrazuj jako rozbitý obrázek nebo neutrální šedý blok. Použij komponentu `RecipeVisual` a tematickou variantu:

- `plate` — vidlička vlevo, talíř uprostřed, nůž vpravo;
- `bowl` — miska s barevnými ingrediencemi;
- `kitchen` — hrnec a příbor jako kuchyňský motiv.

Placeholder musí:

- vizuálně souviset s jídlem;
- jasně říct `BEZ FOTKY`;
- fungovat v malém thumbnailu i ve velkém hero formátu;
- mít přístupný `role="img"` a popis přes `aria-label`;
- zachovat stejnou barevnou logiku jako zbytek produktu.

Na detailu receptu se navíc zobrazuje výrazná informace **„Tento recept zatím nemá fotografii“** pod názvem receptu.

Demo všech variant je na `/demo/placeholder`.

## 6. Komponentové principy

- Používej existující tokeny `bg-background`, `text-foreground`, `bg-primary`, `bg-accent`, `bg-brand` a jejich foreground varianty.
- Karty mají používat zaoblení z tokenu `--radius`, nikoli nahodile mnoho různých radiusů.
- Stíny jsou střídmé a mají podporovat hierarchii, ne vytvářet dekorativní hluk.
- Ikony používají Lucide, konzistentní velikost 16/20/24 px podle kontextu.
- Každý obrázek má smysluplný alt text; dekorativní ilustrace nesmí duplikovat text pro screen readery.
- Interaktivní prvky musí mít viditelný focus stav a dostatečnou klikací plochu.

## 7. Přístupnost

- Text a pozadí musí mít dostatečný kontrast; přesné světlé brand hexy nepoužívej jako text na bílém pozadí.
- Barva nesmí být jediný nositel významu — doplň ji textem, ikonou nebo stavem.
- Formuláře musí mít labely a srozumitelné chybové stavy.
- Dynamické a modalní prvky musí respektovat klávesnici a focus management.
- Responzivní layout musí fungovat od mobilu po široký desktop.

## 8. Co nedělat

- Nepřidávat další barvy mimo systém bez explicitního důvodu.
- Nepoužívat abstraktní gradientové koule jako dekoraci bez vztahu k jídlu.
- Nepoužívat emoji jako ikony.
- Nevytvářet placeholdery, které vypadají jako rozbitý nebo nedokončený UI stav.
- Nepřeplňovat obrazovku kartami, statistikami nebo dekorativními čísly.
- Neměnit poměr hero obrázků na čtverec; detail receptu používá široký obdélníkový hero.

## 9. Rychlý checklist před změnou UI

- Je změna v souladu s teal/apricot hierarchií?
- Zůstává hlavní akce jednoznačná?
- Je layout čitelný na mobilu i desktopu?
- Má každý vizuální stav textový nebo ikonový ekvivalent?
- Neopakujeme stejný název nebo štítek zbytečně dvakrát?
- Funguje fallback bez obrázku stejně dobře jako fotografie?
- Jsou zachované tokeny, focus stavy, alt texty a kontrast?

## 10. Zdroj pravdy

- Design tokeny: `app/globals.css`
- Typografie a metadata: `app/layout.tsx`
- Shell a navigace: `components/app-shell.tsx`
- Placeholdery receptů: `components/recipe-visual.tsx`
- Demo placeholderů: `app/demo/placeholder/page.tsx`
- Data receptů a týdenního plánování: `lib/data.ts`

Při další úpravě nejdříve hledej existující token nebo komponentu. Nový vizuální pattern přidávej pouze tehdy, když současné komponenty nedokážou reprezentovat nový stav čistě a přístupně.
