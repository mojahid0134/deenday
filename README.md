# Deen Day

An Islamic content feed app (Quran, Hadith, Duas, Names of Allah, Tasbih counter) —
built on Firebase + a WebView wrapper (Sketchware Pro), matching the design and
functionality of the reference NoorFeed build.

## Before deploying
1. Create a **new** Firebase project for Deen Day (do not reuse another app's project).
2. Enable **Firestore** and **Google Sign-In (Authentication)**.
3. Replace the `firebaseConfig` placeholder in `admin.html`, `bulk-import.html`,
   `index.html`, and `view.html` with your new project's config.
4. Set `ADMIN_EMAIL` in `admin.html` / `bulk-import.html` to your own Gmail.
5. (Optional push notifications) Create a new OneSignal app and replace the
   `ONESIGNAL_APP_ID` / `ONESIGNAL_REST_KEY` placeholders in `admin.html`.
6. Replace the bKash/Rocket/Nagad numbers in `index.html` with your own.
7. Add your own `banner-bg.jpg` (1280x563) to the repo root.
8. Run `bulk-import.html` once (signed in as admin) to populate Hadith/Quran/Playlist data.
