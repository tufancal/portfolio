---
featured: false
title: Web Components - Komponenten nativ und ohne Framework
description: Web Components bieten die Möglichkeit, benutzerdefinierte und
  wiederverwendbare Komponenten mit jeweils unabhängigen und gekapselten
  Funktionen zu erstellen.
pubDate: 2023-08-31T14:17:29.883Z
readtime: 6 mins
tags:
  - development
tldr:
  - Möglich Custom HTML Elemente zu erstellen, die man wiederverwenden kann
  - 'Shadow DOM ermöglicht es den Komponenten entkapselt zu sein - mode: "open"
    / "closed"'
  - <template>, <slot> ermöglichen eine vielseitige Funktion
  - "verschiedene Callback Funktionen wie: connectedCallback(),
    disconnectedCallback(), attributeChangedCallback() ermöglichen eine einfache
    Interaktivität"
---
## Was sind "Web Components"?

Als Entwickler kennen wir das Problem, skalierbare Anwendungen zu erstellen. Um die Übersicht zu behalten, ist es hilfreich, gekapselte Komponenten zu erstellen, die im Code häufig wiederverwendet werden. Diese Ansätze verfolgt man mit Frontend Frameworks wie React. Man kann dies aber auch mit nativem JavaScript erreichen und "Web Components" schreiben.

## Grundlegende Erstellung von "Web Components"

1. eine JavaScript Klasse erstellen
2. HTMLElement erweitern
3. im Constructor "super()" ausführen, um auf die Attribute vom erweiterten HTMLElement zuzugreifen
4. optionales Shadow DOM mit "Element.attachShadow()"
5. optional mit template, slot arbeiten

## Beispiel für eine "Web Component"

```javascript
class CustomCard extends HTMLElement {
	constructor() {
		super();
		this.root = this.attachShadow({ mode: 'closed' });
		this.root.innerHTML = `
      <style>
        .card {
          margin: 20px;
          border-radius: 5px;
          padding: 20px;
          background-color: #fff;
          color: #333;
        }
        
        .card__headline {
          margin: 0 0 16px;
        }
        
        .card__copy {
          margin: 0 0 16px;
        }
      </style>
      <div class="card">
        <h2 class="card__headline">
          Headline
        </h2>
        <p class="card__copy">
          Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod
          tempor invidunt ut labore et dolore magna
          aliquyam erat, sed diam voluptua. At vero
          eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea 
          takimata sanctus est Lorem ipsum dolor sit
          amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam
          erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum. Stet
          clita kasd gubergren, no sea takimata sanctus est
          Lorem ipsum dolor sit amet.
        </p>
      </div>
    `;
	}
}

customElements.define('custom-card', CustomCard);
```

Um es modular aufzubauen importiert man das Modul dann beispielsweise in eine index.js:

```javascript
import "./custom-card.js";
```

Im HTML sieht es dann folgendermaßen aus:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webcomponents</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <custom-card></custom-card>
  <script src="./javascript/index.js" type="module"></script>
</body>
</html>
```

und der Output wäre dann so:

![Beispiel für eine Web Component](/src/assets/images/example_webcomponent.webp "Card Modul")

## Shadow DOM

Kapselung. Ein wichtiger Aspekt von Web Components. Mit Hilfe von Kapselung kann Code geschrieben werden, der unabhängig ist und nicht mit anderem Code korreliert. Ein Vorteil, auf den aktuelle Frameworks verweisen. Shadow DOM ermöglicht es "versteckte" DOM Trees an den normalen DOM Tree anzuhängen.

*DOM: Document Object Model*

![Beispiel für Shadow DOM](/src/assets/images/shadowdom.svg "Shadow DOM Tree")

*Quelle: [Link](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM/shadowdom.svg)*

* Shadow Host: Natürliche DOM Node die den Shadow DOM enthält
* Shadow Tree: DOM Tree innerhalb des Shadow DOMs
* Shadow boundary: Die Eingrenzung des Shadow DOMs, also Anfang und Ende
* Shadow root: Root Node des Shadow DOMs

Grundlegende Nutzung:

```javascript
element.attachShadow({ mode: "open" });
element.attachShadow({ mode: "closed" });
```

Der Unterschied zwischen den Modi besteht darin, dass bei "open" von außen auf das Shadow-DOM zugegriffen werden kann und bei "closed" die Komponente vollständig gekapselt ist.

## Template und Slot

Im template-Tag können sich wiederholende Markups erstellt und an verschiedenen Stellen verwendet werden. Der Inhalt ist nicht im DOM enthalten, kann aber mit Hilfe von JavaScript angezeigt werden.

Das obige Beispiel könnte wie folgt angepasst werden:

```javascript
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .card {
      margin: 20px;
      border-radius: 5px;
      padding: 20px;
      background-color: #fff;
      color: #333;
    }

    .card__headline {
      margin: 0 0 16px;
    }

    .card__copy {
      margin: 0 0 16px;
    }

    .slot__header {
      color: green;
    }

    .slot__footer {
      display: block;
      padding: 20px;
      color: red;
    }
  </style>
  <div class="card">
    <h2 class="card__headline">
      Headline
      <slot class="slot__header" name="header"></slot>
    </h2>
    <p class="card__copy">
      Lorem ipsum dolor sit amet, 
      consetetur sadipscing elitr, 
      sed diam nonumy eirmod tempor invidunt 
      ut labore et dolore magna aliquyam erat,
      sed diam voluptua. At vero eos et accusam
      et justo duo dolores et ea rebum. Stet clita
      kasd gubergren, no sea takimata sanctus est 
      Lorem ipsum dolor sit amet. Lorem ipsum dolor 
      sit amet, consetetur sadipscing elitr, sed 
      diam nonumy eirmod tempor invidunt ut labore 
      et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata
      sanctus est Lorem ipsum dolor sit amet.
      <slot class="slot__footer" name="footer"></slot>
    </p>
  </div>
`;

class CustomCard extends HTMLElement {
	constructor() {
		super();
		this.root = this.attachShadow({ mode: 'closed' });
		this.root.appendChild(template.content.cloneNode(true));
	}
}

customElements.define('custom-card', CustomCard);
```

Hier wird der Inhalt des Templates dem Element als Child hinzugefügt. Mit cloneNode(true) erstellt man eine exakte Kopie und referenziert nicht nur den Template-Inhalt, um ihn wiederverwenden zu können. Im Code-Beispiel sieht man auch, dass slot-Tags hinzugefügt wurden. Dies ermöglicht eine gewisse Flexibilität innerhalb der Komponente. Es spielt keine Rolle, in welcher Reihenfolge die Slots im HTML stehen und man kann sogar Komponenten in Komponenten rendern.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webcomponents</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <custom-card>
    <span slot="footer">Footer</span>
    <span slot="header">Header</span>
  </custom-card>
  <script src="./javascript/index.js" type="module"></script>
</body>
</html>
```

![Beispiel für die Nutzung von Slots](/src/assets/images/example_slots.webp "Slot Example")

## Callback Funktionen

Spezielle Callback-Funktionen eröffnen eine Vielzahl von Möglichkeiten "Web Components" interaktiv zu gestalten.

* connectedCallback()

  * Aufgerufen wenn das Element im DOM platziert wird
* disconnectedCallback()

  * Aufgerufen wenn das Element vom DOM entfernt wird
* attributeChangedCallback()

  * Aufgerufen wenn das Element-Attribut geändert, hinzugefügt oder entfernt wird

## Vorteile von "Web Components"

* **Unabhängig**: "Web Components" sind ein Webstandard und plattformunabhängig. 
* **Rückwärtskompatibel:** "Web Components" sind rückwärtskompatibel somit auch zukunftssicher.
* **Isoliert:** Jede Komponente kann ihr eigenes DOM, Styles und Verhalten haben, was die Möglichkeit von Stil- oder Verhaltenskonflikten reduziert. 
* **Geringere Abstraktion:** Im Vergleich zu Frameworks sind Webkomponenten näher an nativem HTML und JavaScript. Dies kann zu einer geringeren Lernkurve führen, insbesondere für Entwickler, die bereits mit Webtechnologien vertraut sind.

## Nachteile von "Web Components"

* **Komplexität:** Die Entwicklung von Webkomponenten erfordert möglicherweise mehr Boilerplate-Code als die Verwendung eines Frameworks, insbesondere wenn du Dinge wie Datenbindung oder komplexe Eventbehandlung implementieren möchtest.
* **Gemeinschaft und Ressourcen:** Die Community und die Ressourcen rund um Webkomponenten sind möglicherweise nicht so umfangreich wie diejenigen für etablierte Frameworks.
* **Styling und Tooling:** Es kann sein, dass du Bibliotheken oder Tooling brauchst, um die Entwicklung zu erleichtern. Zum Beispiel für das Styling von Komponenten, um eine bessere Übersicht zu erhalten.

## Ausblick

In diesem Blogartikel habe ich versucht, die grundlegenden Konzepte von "Web Components" zu behandeln, aber natürlich gibt es noch viel mehr zu lesen und zu entdecken. Dazu empfehle ich diesen [Link.](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)