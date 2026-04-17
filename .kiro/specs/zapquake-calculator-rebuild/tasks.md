# Tasks: Zapquake Calculator Rebuild

## Task List

- [x] 1. Setup Tailwind CSS dan Struktur Dasar HTML
  - [x] 1.1 Buat file HTML baru dengan struktur dasar (DOCTYPE, head, body)
  - [x] 1.2 Tambahkan Tailwind CSS via CDN Play dengan inline `tailwind.config` (custom colors, font)
  - [x] 1.3 Tambahkan Font Awesome via CDN
  - [x] 1.4 Tambahkan `@font-face` untuk font SVN-SupercellMagic di inline `<style>`
  - [x] 1.5 Tambahkan favicon links (salin dari file lama)
  - [x] 1.6 Tambahkan CSS compatibility layer di inline `<style>` untuk class Bootstrap yang digunakan oleh file JS backend (`d-none`, `d-flex`, `collapse`, dll.)

- [~] 2. Implementasi i18n Module
  - [ ] 2.1 Buat objek `i18n` inline dengan semua translation keys untuk English dan Indonesian (sesuai tabel di design.md)
  - [ ] 2.2 Implementasikan fungsi `t(key)` yang mengembalikan terjemahan berdasarkan `currentLang`
  - [ ] 2.3 Implementasikan fungsi `i18n.setLang(lang)` yang memperbarui `currentLang`, menyimpan ke localStorage, dan memperbarui semua elemen `data-i18n`
  - [ ] 2.4 Implementasikan fungsi `i18n.init()` yang memuat preferensi bahasa dari localStorage (default: `'en'`)
  - [ ] 2.5 Tambahkan atribut `data-i18n` pada semua elemen teks statis di HTML

- [~] 3. Header dan Language Switcher
  - [ ] 3.1 Buat elemen `<header>` dengan judul "ZapQuake Calculator" menggunakan font SupercellMagic
  - [ ] 3.2 Tambahkan dropdown language switcher (English / Indonesian) di header
  - [ ] 3.3 Hubungkan dropdown ke `i18n.setLang()`

- [~] 4. Section Offense — Spell Cards
  - [ ] 4.1 Buat section `#offenses` dengan judul "Select Offense Level"
  - [ ] 4.2 Buat subsection Spell dengan tombol "Set All Spells to Max/Min Level"
  - [ ] 4.3 Tambahkan checkbox "Use donated lightning spell" dengan label `data-i18n`
  - [ ] 4.4 Buat card Lightning Spell (`data-id="lightning_spell"`, `data-donated="false"`) dengan gambar, level overlay, dan slider
  - [ ] 4.5 Buat card Donated Lightning Spell (`data-id="lightning_spell"`, `data-donated="true"`) dengan gambar, level overlay, slider, input jumlah, dan pesan warning — default hidden
  - [ ] 4.6 Buat card Earthquake Spell (`data-id="earthquake_spell"`, `data-donated="false"`) dengan gambar, level overlay, dan slider
  - [ ] 4.7 Pastikan semua card memiliki atribut `aria-label` yang sesuai

- [~] 5. Section Offense — Equipment Cards
  - [ ] 5.1 Buat subsection Hero Equipment dengan tombol "Set All Equipments to Max/Min Level"
  - [ ] 5.2 Tambahkan dropdown Earthquake Order dengan dua opsi
  - [ ] 5.3 Buat card Earthquake Boots (`data-id="earthquake_boots"`) dengan gambar, level overlay, dan slider
  - [ ] 5.4 Buat card Spiky Ball (`data-id="spiky_ball"`) dengan gambar, level overlay, slider, dan indikator visual epic
  - [ ] 5.5 Buat card Giant Arrow (`data-id="giant_arrow"`) dengan gambar, level overlay, dan slider
  - [ ] 5.6 Buat card Fireball (`data-id="fireball"`) dengan gambar, level overlay, slider, dan indikator visual epic
  - [ ] 5.7 Buat card Seeking Shield (`data-id="seeking_shield"`) dengan gambar, level overlay, dan slider
  - [ ] 5.8 Pastikan semua card equipment memiliki atribut `aria-label` yang sesuai

- [~] 6. Section Instruksi (Collapsible)
  - [ ] 6.1 Buat section instruksi dengan tombol Show/Hide menggunakan vanilla JS (tanpa Bootstrap collapse)
  - [ ] 6.2 Isi konten instruksi langkah demi langkah (Step 1, Step 2, Step 3, Note) dengan atribut `data-i18n`
  - [ ] 6.3 Implementasikan toggle visibility menggunakan class `hidden` Tailwind

- [~] 7. Section Defense List
  - [ ] 7.1 Buat section Defense List dengan judul dan search box (`id="searchDefense"`)
  - [ ] 7.2 Tambahkan tombol "Set All Defenses to Max/Min Level"
  - [ ] 7.3 Tambahkan elemen `#defenseCount` untuk menampilkan jumlah defense
  - [ ] 7.4 Buat container `#defenses` dengan grid layout responsif (1 kolom mobile, 2 kolom tablet, 3 kolom desktop)
  - [ ] 7.5 Buat elemen `#emptySearchStatus` untuk status pencarian kosong (default hidden)

- [~] 8. Override HTMLUtil dan Bootstrap Dependencies
  - [ ] 8.1 Override `HTMLUtil.showDiv()` dan `HTMLUtil.hideDiv()` untuk menggunakan class `hidden` Tailwind (bukan `d-none`)
  - [ ] 8.2 Override `HTMLUtil.isDivHidden()` untuk menggunakan class `hidden`
  - [ ] 8.3 Override `HTMLUtil.toggleBSCollapse()` dengan implementasi vanilla JS
  - [ ] 8.4 Pastikan override dilakukan setelah `htmlUtil.js` dimuat tapi sebelum script lain yang bergantung padanya

- [~] 9. Load Semua Script JS Backend
  - [ ] 9.1 Tambahkan semua `<script>` tag untuk utility files (`localStorageUtils.js`, `numberUtil.js`, `htmlUtil.js`, `scrollManager.js`, `setAllObjectsLevel.js`, `toggleCollapseBtnText.js`)
  - [ ] 9.2 Tambahkan semua `<script>` tag untuk class files (offense, defense, action, spell_count, damage_log)
  - [ ] 9.3 Tambahkan semua `<script>` tag untuk zapquake_calc files (`calculate.js`, `htmlUtil.js`, `searchDefenses.js`, `setAllObjectsLevel.js`, `update.js`, `init.js`)
  - [ ] 9.4 Tambahkan `<script>` tag untuk `js/util/json.js` di posisi terakhir (trigger init event)
  - [ ] 9.5 Tambahkan inline script untuk HTMLUtil overrides (Task 8) setelah `htmlUtil.js` dimuat

- [~] 10. Footer dan Scroll Buttons
  - [ ] 10.1 Buat `<footer>` dengan informasi pembuat, tanggal update, dan link media sosial (Reddit, Discord, GitHub, Buy Me a Coffee)
  - [ ] 10.2 Tambahkan atribut `data-i18n` pada teks footer yang perlu diterjemahkan
  - [ ] 10.3 Buat tombol scroll-up (`#scrollUpBtn`) fixed position, default hidden
  - [ ] 10.4 Buat tombol scroll-down (`#scrollDownBtn`) fixed position, default hidden
  - [ ] 10.5 Pastikan scroll buttons memiliki atribut `aria-label`

- [~] 11. Styling Tailwind untuk Defense Cards (Generated JS)
  - [ ] 11.1 Tambahkan CSS compatibility layer yang lengkap untuk semua class Bootstrap yang digunakan oleh `ZapquakeHTMLUtil.createDefenseDiv()` dan `ZapquakeHTMLUtil.createEquipmentDiv()`
  - [ ] 11.2 Tambahkan styling untuk class custom yang digunakan JS backend: `card-custom`, `card-custom__main`, `card-custom__stat`, `object-container`, `object-container--epic`, `object-container--immune`, `overlay`, `overlay--bottom-left`, `overlay--top-left`, `overlay__number`, `overlay__number--level-maxed`, `status-container`, `status-container__text--success`, `status-container__text--fail`, `slider`, dll.
  - [ ] 11.3 Pastikan defense cards yang di-generate JS tampil dengan benar (gambar, level, HP, slider, status)

- [~] 12. Responsivitas dan Visual Polish
  - [ ] 12.1 Verifikasi layout offense cards responsif (1 kolom mobile, grid multi-kolom desktop)
  - [ ] 12.2 Verifikasi layout defense grid responsif (1 kolom mobile, 2 kolom tablet, 3+ kolom desktop)
  - [ ] 12.3 Tambahkan styling untuk status "Destroyed" (warna hijau) dan "Not Destroyed" (warna merah)
  - [ ] 12.4 Tambahkan styling untuk indikator epic equipment (warna ungu/gold)
  - [ ] 12.5 Pastikan slider memiliki styling yang konsisten di semua browser

- [~] 13. Aksesibilitas
  - [ ] 13.1 Tambahkan `aria-label` atau `aria-labelledby` pada semua slider offense dan defense
  - [ ] 13.2 Tambahkan `aria-label` pada semua tombol (Set Max/Min, Show/Hide, Scroll)
  - [ ] 13.3 Tambahkan `aria-label` pada dropdown (Earthquake Order, Language Switcher)
  - [ ] 13.4 Tambahkan `aria-label` pada checkbox "Use donated lightning spell"
  - [ ] 13.5 Tambahkan atribut `alt` yang deskriptif pada semua gambar statis
  - [ ] 13.6 Pastikan struktur HTML menggunakan elemen semantik (`<header>`, `<main>`, `<section>`, `<footer>`)

- [~] 14. Integrasi i18n dengan Semua Teks UI
  - [ ] 14.1 Verifikasi semua teks statis di HTML memiliki atribut `data-i18n` yang benar
  - [ ] 14.2 Update fungsi `i18n.setLang()` untuk juga memperbarui teks yang di-generate oleh JS (status messages, equipment titles, spell needed titles) — ini memerlukan re-render atau callback
  - [ ] 14.3 Pastikan placeholder search box diperbarui saat bahasa berubah
  - [ ] 14.4 Pastikan pesan warning donated count diperbarui saat bahasa berubah

- [~] 15. Testing dan Verifikasi
  - [ ] 15.1 Buka file di browser, verifikasi semua defense card ter-render dengan benar
  - [ ] 15.2 Verifikasi slider offense memperbarui gambar dan kalkulasi secara real-time
  - [ ] 15.3 Verifikasi slider defense memperbarui HP dan kalkulasi
  - [ ] 15.4 Verifikasi checkbox donated spell toggle card visibility
  - [ ] 15.5 Verifikasi validasi input donated count (0-3)
  - [ ] 15.6 Verifikasi search defense memfilter dengan benar
  - [ ] 15.7 Verifikasi tombol Set All Max/Min berfungsi untuk spell, equipment, dan defense
  - [ ] 15.8 Verifikasi state tersimpan di localStorage dan ter-restore saat refresh
  - [ ] 15.9 Verifikasi language switcher memperbarui semua teks tanpa reload
  - [ ] 15.10 Verifikasi scroll buttons muncul/hilang sesuai posisi scroll
  - [ ] 15.11 Verifikasi instruksi collapsible berfungsi
  - [ ] 15.12 Verifikasi tidak ada error di browser console
