# Capodanno 2025 🥂

Un'applicazione web collaborativa per organizzare il menu del Cenone di Capodanno tra amici.

## 🚀 Funzionalità

- **Aggiunta Piatti**: Ogni partecipante può aggiungere il proprio piatto specificando nome, categoria ed esigenze alimentari.
- **Riepilogo in Tempo Reale**: Visualizza cosa portano gli altri e monitora il bilanciamento del menu (Antipasti, Primi/Secondi, Dolci).
- **Esigenze Alimentari**: Badge chiari per piatti Vegani, Vegetariani e Senza Glutine, con contatori automatici.
- **Progress Tracker**: Barre di avanzamento per visualizzare il riempimento delle varie categorie rispetto ai target ideali.
- **Mobile First**: Design responsive ottimizzato per smartphone.

## 🛠 Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Icons**: FontAwesome

## 📦 Installazione e Setup

### 1. Clona il repository

```bash
git clone https://github.com/nannipy/capodanno2025.git
cd capodanno2025
```

### 2. Installa le dipendenze

Usa `bun` (consigliato) o `npm`:

```bash
bun install
# oppure
npm install
```

### 3. Configura Supabase

Questo progetto utilizza Supabase come backend.

1.  Crea un nuovo progetto su [Supabase](https://supabase.com/).
2.  Vai nell'**SQL Editor** del tuo progetto Supabase.
3.  Esegui lo script contenuto nel file `supabase_schema.sql` (trovi questo file nella root del progetto) per creare la tabella `dishes` e configurare le policy di sicurezza.

### 4. Configura le Variabili d'Ambiente

Crea un file `.env.local` nella root del progetto e aggiungi le tue credenziali Supabase (trovale in *Project Settings > API*):

```env
VITE_SUPABASE_URL=latua_project_url
VITE_SUPABASE_ANON_KEY=la_tua_anon_key
```

### 5. Avvia l'applicazione

```bash
bun run dev
```

Apri `http://localhost:3000` nel tuo browser.

## 🤝 Contribuire

Sentiti libero di aprire issue o pull request per migliorare l'applicazione!
