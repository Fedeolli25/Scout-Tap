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

## 2. Accessi autorizzati e salvataggio su Google Sheets

Scout Tap si apre solo sui dispositivi che autorizzi tu. Ogni persona chiede l'accesso dall'app, tu approvi dal foglio Google, e ogni staff vede solo le proprie partite e squadre.

### Preparare il foglio (una volta sola)

1. Crea un nuovo foglio Google, per esempio "Scout Tap – archivio".
2. Apri **Estensioni → Apps Script**, cancella il contenuto e incolla `apps-script/Code.gs`.
3. Se vuoi ricevere gli avvisi su un'email diversa dalla tua, scrivila in `EMAIL_AVVISI`. Lasciata vuota, usa l'email del tuo account Google.
4. **Esegui il deployment → Nuovo deployment → App web**:
   - Esegui come: **Me**
   - Chi ha accesso: **Chiunque** (serve perché l'app possa chiamare lo script; i dati restano protetti dall'autorizzazione)
5. Autorizza lo script e copia l'indirizzo che finisce con `/exec`. Poi, nell'editor, scegli la funzione **prepara** in alto e premi **Esegui**: crea la scheda *utenti* e autorizza l'invio delle email.
6. In `index.html` cerca la riga

   ```js
   const AUTH_URL='';
   ```

   incolla l'indirizzo tra gli apici e carica `index.html` su GitHub.

### Dare l'accesso

1. La persona apre l'app: compare **Richiedi l'accesso**. Inserisce nome, staff ed email.
2. Nel foglio compare la scheda **utenti** con una riga **in attesa**, e ti arriva un'email.
3. Controlla la colonna **Staff** (correggila se serve: decide quali partite vede) e scrivi **sì** in **Autorizzato**.
4. L'app della persona si sblocca da sola, oppure toccando **Controlla di nuovo**.

Anche tu fai la richiesta dal tuo iPad e la approvi.

### Gestire gli accessi

- **Revocare**: scrivi **no** in *Autorizzato*. Al controllo successivo l'app su quel dispositivo si blocca e cancella le copie locali (i dati restano nel tuo foglio).
- **Staff**: dispositivi con lo stesso valore nella colonna *Staff* condividono partite e squadre. Ogni staff ha la sua scheda `partite_<staff>`.
- **Nuovo dispositivo**: l'accesso è legato al dispositivo. Chi cambia iPad, o cancella i dati del browser, fa una nuova richiesta.
- **Senza rete**: l'app funziona offline fino a 7 giorni dall'ultimo controllo riuscito, poi chiede di collegarsi per verificare l'accesso.
- *Ultimo accesso* mostra quando ogni dispositivo si è collegato l'ultima volta.

Non modificare a mano le colonne dei dati nelle schede `partite_…`.

Quando modifichi lo script, usa **Gestisci deployment → Modifica → Nuova versione**: così l'indirizzo `/exec` resta lo stesso.

Nota: l'app è una pagina web pubblica. Chi sa programmare potrebbe copiarne il codice, ma senza la tua autorizzazione non accede mai alle partite e alle squadre salvate nel tuo foglio.

## 3. Installare sull'iPad

Apri il sito in Safari, tocca **Condividi → Aggiungi alla schermata Home**. L'app si apre a schermo intero e funziona anche offline. I dati restano sempre salvati sull'iPad e si sincronizzano con il foglio quando torna la rete.

Attenzione: per l'autorizzazione l'app installata sulla schermata Home conta come un dispositivo diverso da Safari. Fai la richiesta di accesso dall'app installata, quella che userai in partita.

## Come si usa

In alto a destra nella Home si sceglie la lingua dell'app: **Italiano** o **English** (schermate, messaggi e PDF; i codici Data Volley non cambiano).

All'apertura c'è la **Home**:

- **Nuova partita**: scegli casa e ospiti tra le squadre salvate (o crei al volo l'avversario con il solo nome), poi imposti formazioni e palleggiatori.
- **Riprendi partita**: riapre la partita in corso, anche dopo aver chiuso l'app.
- **Squadre**: roster salvati con allenatore, assistente e liberi. Le modifiche fatte durante una partita (per esempio un giocatore aggiunto) tornano anche nella squadra salvata.
- **Partite e statistiche**: tutte le partite, in corso e concluse, con statistiche, tabellino e play by play.

Quando una squadra vince 3 set compaiono due bottoni: **Chiudi la rilevazione** oppure **Amichevole: gioca il set successivo**. In amichevole la partita resta aperta e a fine di ogni set scegli se continuare o chiudere. In **Formazioni** puoi anche terminare o riaprire la partita a mano. Nell'export .dvw finiscono al massimo 5 set, come in Data Volley; tabellino e play by play li contengono tutti. Il logo in alto riporta sempre alla Home.

## Come si salva

- **Su ogni dispositivo**: sempre, a ogni azione.
- **Online**: pochi secondi dopo ogni modifica. Lo stato è in alto: "Salvato online", "Salvataggio…" o "Non salvato online".
- **Altri dispositivi dello stesso staff**: controllano gli aggiornamenti ogni 5 secondi. Conviene che una sola persona scouti e le altre guardino: se due dispositivi scrivono insieme, vince l'ultimo salvataggio.
- **File**: in **Codici** puoi scaricare i codici con l'orario (`.txt`), fare il backup della partita (`.json`) e reimportarlo.

## Aggiornare l'app

Sostituisci `index.html` su GitHub (ricordati di lasciare il tuo indirizzo in `AUTH_URL`). Se l'iPad continua a mostrare la versione vecchia, aumenta il numero di versione dentro `sw.js` (per esempio da `scout-tap-v18` a `scout-tap-v19`) e carica anche quello.

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
