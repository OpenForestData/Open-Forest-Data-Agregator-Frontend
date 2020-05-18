# Open Forest Data Agregator - Frontend

-   [Open Forest Data Agregator - Frontend](#open-forest-data-agregator---frontend)
    -   [Instalacja](#instalacja)
    -   [Skrypty](#skrypty)
        -   [Serwer developerski](#serwer-developerski)
        -   [Serwer produkcyjny (pod SEO)](#serwer-produkcyjny-pod-seo)
        -   [Zbudowanie aplikacji w wersji deweloperskiej](#zbudowanie-aplikacji-w-wersji-deweloperskiej)
        -   [Zbudowanie aplikacji w wersji produkcyjnej](#zbudowanie-aplikacji-w-wersji-produkcyjnej)
        -   [Linting](#linting)
        -   [Testy jednostkowe](#testy-jednostkowe)
        -   [Generowanie dokumentacji](#generowanie-dokumentacji)
    -   [Aktualni autorzy](#aktualni-autorzy)
    -   [Licencja](#licencja)

## Instalacja

Upewnij się że masz zainstalowanego [Node](https://nodejs.org/en/ 'Node') oraz [Angular CLI](https://github.com/angular/angular-cli#installation 'Angular CLI')

Po pobraniu repozytorium uruchom komendę `npm install` w katalogu z aplikacją w celu zainstalowania zależności

## Skrypty

### Serwer developerski

`npm start`

Aplikacja zostanie uruchomiona pod adresem: http://localhost:4200

### Serwer produkcyjny (pod SEO)

`npm run build:ssr && npm run serve:ssr`

Aplikacja zostanie zbudowana oraz wystawiona przez serwer Express pod adresem http://localhost:4000

### Zbudowanie aplikacji w wersji deweloperskiej

`npm run build`

Kod docelowy po zbudowaniu zostanie umieszczony w katalogu `dist/apps/open-forest-data/`

### Zbudowanie aplikacji w wersji produkcyjnej

`npm run build:prod`

Kod docelowy po zbudowaniu zostanie umieszczony w katalogu `dist/apps/open-forest-data/`


### Linting

`npm run lint`

### Testy jednostkowe

`npm run test`

### Generowanie dokumentacji

`npm run compodoc`

Dokumentacja zostanie wygenerowana w katalogu `documentation`

## Aktualni autorzy

-   **Maciej Syguła** - _frontend_
-   **Mateusz Gorczycki** - _frontend_
-   **Daniel Pasoń** - _frontend_

## Licencja
