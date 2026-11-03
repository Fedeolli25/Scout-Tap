# Scout Tap

Scouting di pallavolo a tap per iPad, con codici Data Volley, statistiche, mappe delle direzioni e salvataggio online su Google Sheets.

## Cosa c'è nella cartella

| File | A cosa serve |
|---|---|
| `index.html` | L'app completa |
| `manifest.webmanifest`, `icon-*.png` | Nome e icona quando la aggiungi alla schermata Home |
| `sw.js` | Fa funzionare l'app anche senza rete in palestra |
| `apps-script/Code.gs` | Lo script per salvare le partite nel tuo foglio Google |

## 1. Pubblicare su GitHub Pages

1. Crea un nuovo repository su GitHub, per esempio `scout-tap`.
2. Carica tutti i file della cartella **tranne** la cartella `apps-script` (non serve online).
3. Vai in **Settings → Pages**, scegli **Deploy from a branch**, branch `main`, cartella `/ (root)` e salva.
4. Dopo un minuto l'app è su `https://<tuo-utente>.github.io/scout-tap/`.

## 2. Collegare Google Sheets (salvataggio tra dispositivi)

1. Crea un nuovo foglio Google, per esempio "Scout Tap – partite".
2. Apri **Estensioni → Apps Script**, cancella il contenuto e incolla `apps-script/Code.gs`.
3. Cambia `CHIAVE` in una parola tua (serve a impedire che altri leggano o scrivano le partite).
4. **Esegui il deployment → Nuovo deployment → App web**:
   - Esegui come: **Me**
   - Chi ha accesso: **Chiunque**
5. Autorizza lo script e copia l'indirizzo che finisce con `/exec`.
6. Nell'app vai in **Squadre → Salvataggio online**, incolla indirizzo e chiave, premi **Collega**.

Ripeti il punto 6 su ogni dispositivo. Per non doverlo fare, puoi scrivere indirizzo e chiave direttamente in `index.html`, nella riga:

```js
const SHEETS_DEFAULT={url:'',token:''};
```

Attenzione: in quel caso chiunque apra il sito è già collegato al tuo foglio. Se il repository è pubblico, chiunque legga il codice vede anche la chiave.

Ogni partita occupa una riga del foglio `partite`. Non modificare a mano le colonne dei dati.

Quando modifichi lo script, usa **Gestisci deployment → Modifica → Nuova versione**: così l'indirizzo `/exec` resta lo stesso.

## 3. Installare sull'iPad

Apri il sito in Safari, tocca **Condividi → Aggiungi alla schermata Home**. L'app si apre a schermo intero e funziona anche offline. I dati restano sempre salvati sull'iPad e si sincronizzano con il foglio quando torna la rete.

## Come si salva

- **Su ogni dispositivo**: sempre, a ogni azione.
- **Online**: pochi secondi dopo ogni modifica. Lo stato è in alto: "Salvato online", "Salvataggio…" o "Non salvato online".
- **Altri dispositivi**: controllano gli aggiornamenti ogni 5 secondi. Conviene che una sola persona scouti e le altre guardino: se due dispositivi scrivono insieme, vince l'ultimo salvataggio.
- **File**: in **Codici** puoi scaricare i codici con l'orario (`.txt`), fare il backup della partita (`.json`) e reimportarlo.

## Aggiornare l'app

Sostituisci `index.html` su GitHub. Se l'iPad continua a mostrare la versione vecchia, cambia `scout-tap-v1` in `scout-tap-v2` dentro `sw.js` e carica anche quello.

## Report PDF

In **Codici** (o in alto in **Statistiche**) ci sono due bottoni:

- **Tabellino (PDF)**: riepilogo statistico su una pagina A4, con gli stessi parametri del tabellino TieBreak. Contiene set con durata, parziali, cambi e risultato; per ogni giocatore la posizione di partenza nei set e i punti (Tot, BP, V-P); battuta, ricezione, attacco, muro e falli; i punti vinti per set (Bat, Att, Mur, Er.Av); allenatori e time out; cambio palla e break point con differenza punti per rotazione; attacco dopo ricezione positiva, dopo ricezione negativa e in contrattacco.
- **Play by play (PDF)**: ogni azione di ogni set in ordine, con punteggio, chi batte, rotazione, come è finita e a chi è andato il punto. Time out e cambi sono inseriti al loro posto.

I dati di intestazione (fase, città, impianto, arbitri, MVP, allenatori) si compilano in **Squadre → Dati partita**.

La prima volta che crei un PDF serve la connessione, perché l'app scarica la libreria per i PDF. Dopo funziona anche offline.

## Esportare per Data Volley (.dvw)

1. In **Codici** scrivi in quale minuto del video c'è la prima battuta della partita (per esempio `1:30`).
2. Premi **Esporta Data Volley (.dvw)**.

Ogni codice prende il suo secondo di video dall'orario in cui l'hai registrato, quindi time out, cambi e pause restano allineati. Il file contiene squadre, rose con numeri di maglia e ruoli, formazioni di partenza, parziali dei set, e per ogni riga set, posizione dei palleggiatori, tempo video e i sei in campo per squadra.

Alla prima partita apri il file in Data Volley e controlla che squadre, rose e tempi video siano corretti. Se qualcosa non viene letto, segnalalo e si corregge il formato.

## Note sui codici

- Sottozone: A avanti-sinistra, B avanti-destra, C dietro-destra, D dietro-sinistra, viste da chi riceve la palla.
- Ogni riga ha l'orario di registrazione, per allineare i codici al video.
- Errori e falli di squadra sono scritti come `*$$&H=` / `a$$&H=`, i time out come `*T` / `aT`.
