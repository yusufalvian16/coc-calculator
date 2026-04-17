# Requirements Document

## Introduction

Zapquake Calculator Rebuild adalah pembangunan ulang total dari aplikasi kalkulator damage Clash of Clans yang sudah ada. Aplikasi ini akan menjadi single-page application (SPA) standalone yang menghitung damage kombinasi spell (Lightning, Earthquake) dan hero equipment (Earthquake Boots, Spiky Ball, Giant Arrow, Fireball, Seeking Shield) terhadap berbagai defense building di game Clash of Clans.

Perubahan utama dari versi sebelumnya meliputi: penggantian Bootstrap dengan Tailwind CSS, penambahan fitur multi-bahasa (English dan Indonesian), penyederhanaan struktur menjadi satu file HTML standalone, serta penyimpanan state menggunakan localStorage.

## Glossary

- **Calculator**: Aplikasi Zapquake Calculator yang dibangun ulang
- **Spell**: Item serangan berbasis sihir dalam game Clash of Clans (Lightning Spell, Earthquake Spell)
- **Equipment**: Perlengkapan hero dalam game Clash of Clans yang memberikan efek damage (Earthquake Boots, Spiky Ball, Giant Arrow, Fireball, Seeking Shield)
- **Offense**: Istilah kolektif untuk semua Spell dan Equipment yang digunakan dalam kalkulasi
- **Defense**: Bangunan pertahanan dalam game Clash of Clans yang menjadi target kalkulasi damage
- **Donated Lightning Spell**: Lightning Spell yang disumbangkan oleh anggota clan melalui Clan Castle
- **Earthquake Order**: Urutan penggunaan Earthquake Spell dan Earthquake Boots yang mempengaruhi hasil kalkulasi
- **Damage Log**: Catatan rinci urutan damage yang diterima sebuah defense
- **LocalStorage**: Mekanisme penyimpanan data di browser yang persisten antar sesi
- **i18n**: Internationalization — sistem untuk mendukung multi-bahasa dalam aplikasi
- **Level**: Tingkat upgrade suatu Spell, Equipment, atau Defense (dimulai dari 0 untuk menonaktifkan, atau 1 untuk level minimum aktif)
- **Max Level**: Level tertinggi yang tersedia untuk suatu item
- **Min Level**: Level terendah aktif (level 1) untuk suatu item
- **Destroyed**: Status defense yang total HP-nya habis oleh kombinasi damage yang dikalkulasi
- **Tailwind CSS**: Framework CSS utility-first yang digunakan untuk styling aplikasi

---

## Requirements

### Requirement 1: Struktur Aplikasi Standalone

**User Story:** Sebagai pengguna, saya ingin mengakses kalkulator melalui satu file HTML yang berdiri sendiri, sehingga saya tidak perlu berpindah halaman atau bergantung pada halaman lain.

#### Acceptance Criteria

1. THE Calculator SHALL berupa single-page application yang terdapat dalam satu file HTML utama.
2. THE Calculator SHALL memuat semua dependensi yang diperlukan (Tailwind CSS, JavaScript) tanpa bergantung pada file HTML lain seperti index, changelog, setting, atau advance-calculator.
3. THE Calculator SHALL menampilkan header berisi judul "ZapQuake Calculator" di bagian atas halaman.
4. THE Calculator SHALL menampilkan footer berisi informasi pembuat dan tautan ke media sosial di bagian bawah halaman.
5. WHEN pengguna mengakses Calculator, THE Calculator SHALL menampilkan semua section utama: Offense Selection, Defense List, dan hasil kalkulasi dalam satu halaman yang dapat di-scroll.

---

### Requirement 2: Migrasi UI ke Tailwind CSS

**User Story:** Sebagai pengguna, saya ingin tampilan antarmuka yang modern dan responsif, sehingga pengalaman penggunaan lebih nyaman di berbagai ukuran layar.

#### Acceptance Criteria

1. THE Calculator SHALL menggunakan Tailwind CSS sebagai satu-satunya CSS framework, tanpa menggunakan Bootstrap.
2. THE Calculator SHALL menampilkan layout yang responsif pada ukuran layar mobile (lebar < 640px), tablet (640px–1024px), dan desktop (> 1024px).
3. THE Calculator SHALL menampilkan card/panel untuk setiap Offense item dengan gambar, nama, level indicator, dan slider.
4. THE Calculator SHALL menampilkan card/panel untuk setiap Defense item dengan gambar, nama, level indicator, slider, dan hasil kalkulasi damage.
5. WHEN pengguna mengakses Calculator pada layar mobile, THE Calculator SHALL menampilkan layout satu kolom untuk daftar Offense dan Defense.
6. WHEN pengguna mengakses Calculator pada layar desktop, THE Calculator SHALL menampilkan layout multi-kolom (minimal 3 kolom) untuk daftar Defense.
7. THE Calculator SHALL menggunakan font kustom "SupercellMagic" untuk elemen judul utama.

---

### Requirement 3: Pemilihan Level Spell

**User Story:** Sebagai pengguna, saya ingin memilih level Lightning Spell dan Earthquake Spell, sehingga kalkulasi damage sesuai dengan level spell yang saya miliki.

#### Acceptance Criteria

1. THE Calculator SHALL menampilkan card untuk Lightning Spell dengan slider level dari 0 hingga level maksimum yang tersedia di game.
2. THE Calculator SHALL menampilkan card untuk Earthquake Spell dengan slider level dari 0 hingga level maksimum yang tersedia di game.
3. WHEN pengguna menggeser slider Lightning Spell, THE Calculator SHALL memperbarui gambar spell sesuai level yang dipilih secara real-time.
4. WHEN pengguna menggeser slider Earthquake Spell, THE Calculator SHALL memperbarui gambar spell sesuai level yang dipilih secara real-time.
5. WHEN level spell diatur ke 0, THE Calculator SHALL mengecualikan spell tersebut dari kalkulasi damage.
6. THE Calculator SHALL menampilkan tombol "Set All Spells to Max Level" yang mengatur semua spell ke level maksimum.
7. THE Calculator SHALL menampilkan tombol "Set All Spells to Min Level" yang mengatur semua spell ke level 1.
8. WHEN pengguna menekan tombol "Set All Spells to Max Level", THE Calculator SHALL mengatur level semua spell ke nilai maksimum masing-masing.
9. WHEN pengguna menekan tombol "Set All Spells to Min Level", THE Calculator SHALL mengatur level semua spell ke nilai 1.

---

### Requirement 4: Donated Lightning Spell

**User Story:** Sebagai pengguna, saya ingin menggunakan Lightning Spell yang didonasikan dari Clan Castle dalam kalkulasi, sehingga saya bisa menghitung damage yang lebih akurat saat menggunakan spell donasi.

#### Acceptance Criteria

1. THE Calculator SHALL menampilkan checkbox "Use donated lightning spell" di section Spell.
2. WHEN pengguna mencentang checkbox "Use donated lightning spell", THE Calculator SHALL menampilkan card Donated Lightning Spell dengan slider level dan input jumlah spell.
3. WHEN pengguna tidak mencentang checkbox "Use donated lightning spell", THE Calculator SHALL menyembunyikan card Donated Lightning Spell.
4. THE Calculator SHALL menampilkan input number untuk jumlah Donated Lightning Spell dengan nilai minimum 0 dan nilai maksimum 3.
5. WHEN pengguna memasukkan nilai di luar rentang 0–3 pada input jumlah Donated Lightning Spell, THE Calculator SHALL menampilkan pesan peringatan validasi.
6. WHEN pengguna memasukkan nilai yang valid pada input jumlah Donated Lightning Spell, THE Calculator SHALL menyembunyikan pesan peringatan validasi.
7. WHEN jumlah Donated Lightning Spell diatur ke 0, THE Calculator SHALL mengecualikan Donated Lightning Spell dari kalkulasi damage.

---

### Requirement 5: Pemilihan Level Hero Equipment

**User Story:** Sebagai pengguna, saya ingin memilih level untuk setiap hero equipment, sehingga kalkulasi damage mencerminkan equipment yang saya gunakan.

#### Acceptance Criteria

1. THE Calculator SHALL menampilkan card untuk masing-masing equipment: Earthquake Boots, Spiky Ball, Giant Arrow, Fireball, dan Seeking Shield.
2. WHEN pengguna menggeser slider suatu equipment, THE Calculator SHALL memperbarui gambar equipment sesuai level yang dipilih secara real-time.
3. WHEN level equipment diatur ke 0, THE Calculator SHALL mengecualikan equipment tersebut dari kalkulasi damage.
4. THE Calculator SHALL menampilkan tombol "Set All Equipments to Max Level" yang mengatur semua equipment ke level maksimum.
5. THE Calculator SHALL menampilkan tombol "Set All Equipments to Min Level" yang mengatur semua equipment ke level 1.
6. WHEN pengguna menekan tombol "Set All Equipments to Max Level", THE Calculator SHALL mengatur level semua equipment ke nilai maksimum masing-masing.
7. WHEN pengguna menekan tombol "Set All Equipments to Min Level", THE Calculator SHALL mengatur level semua equipment ke nilai 1.
8. THE Calculator SHALL menampilkan indikator visual yang membedakan equipment biasa dan equipment epic (Spiky Ball, Fireball).

---

### Requirement 6: Earthquake Order Selector

**User Story:** Sebagai pengguna, saya ingin memilih urutan penggunaan Earthquake Spell dan Earthquake Boots, sehingga kalkulasi damage akurat karena urutan earthquake mempengaruhi total damage.

#### Acceptance Criteria

1. THE Calculator SHALL menampilkan dropdown "Earthquake Order" dengan dua pilihan: "Earthquake Spell first" dan "Earthquake Boots first".
2. WHEN pengguna memilih "Earthquake Spell first", THE Calculator SHALL menghitung damage dengan asumsi Earthquake Spell digunakan sebelum Earthquake Boots.
3. WHEN pengguna memilih "Earthquake Boots first", THE Calculator SHALL menghitung damage dengan asumsi Earthquake Boots digunakan sebelum Earthquake Spell.
4. WHEN hanya salah satu dari Earthquake Spell atau Earthquake Boots yang aktif (level > 0), THE Calculator SHALL mengabaikan pengaturan Earthquake Order dan menghitung damage sesuai item yang aktif.

---

### Requirement 7: Defense List dengan Search

**User Story:** Sebagai pengguna, saya ingin melihat daftar semua defense building beserta hasil kalkulasi damage, dan dapat mencari defense tertentu, sehingga saya bisa dengan cepat menemukan informasi yang saya butuhkan.

#### Acceptance Criteria

1. THE Calculator SHALL menampilkan daftar semua defense building yang tersedia di game Clash of Clans beserta gambar, nama, dan slider level.
2. THE Calculator SHALL menampilkan search box di atas daftar defense untuk memfilter defense berdasarkan nama.
3. WHEN pengguna mengetik teks pada search box, THE Calculator SHALL memfilter daftar defense secara real-time dan hanya menampilkan defense yang namanya mengandung teks tersebut.
4. WHEN hasil pencarian kosong (tidak ada defense yang cocok), THE Calculator SHALL menampilkan pesan "tidak ada defense yang ditemukan" beserta gambar ilustrasi.
5. THE Calculator SHALL menampilkan jumlah defense yang sedang ditampilkan di atas daftar defense.
6. THE Calculator SHALL menampilkan tombol "Set All Defenses to Max Level" dan "Set All Defenses to Min Level".
7. WHEN pengguna menekan tombol "Set All Defenses to Max Level", THE Calculator SHALL mengatur level semua defense ke nilai maksimum masing-masing.
8. WHEN pengguna menekan tombol "Set All Defenses to Min Level", THE Calculator SHALL mengatur level semua defense ke nilai 1.

---

### Requirement 8: Kalkulasi Damage Real-time

**User Story:** Sebagai pengguna, saya ingin melihat hasil kalkulasi damage diperbarui secara otomatis setiap kali saya mengubah level offense atau defense, sehingga saya tidak perlu menekan tombol hitung secara manual.

#### Acceptance Criteria

1. WHEN pengguna mengubah level Spell, Equipment, atau Defense, THE Calculator SHALL memperbarui hasil kalkulasi damage untuk semua defense yang terpengaruh secara real-time tanpa memerlukan aksi tambahan dari pengguna.
2. THE Calculator SHALL menampilkan total damage yang diterima setiap defense dari kombinasi semua offense yang aktif.
3. THE Calculator SHALL menampilkan status "Destroyed" (dengan indikator visual hijau/positif) pada card defense yang total HP-nya habis oleh damage yang dikalkulasi.
4. THE Calculator SHALL menampilkan status "Not Destroyed" (dengan indikator visual merah/negatif) pada card defense yang total HP-nya tidak habis oleh damage yang dikalkulasi.
5. THE Calculator SHALL menampilkan sisa HP defense setelah menerima damage dari semua offense yang aktif.
6. WHEN semua offense diatur ke level 0, THE Calculator SHALL menampilkan damage 0 untuk semua defense.

---

### Requirement 9: Tampilan Visual Offense dan Defense

**User Story:** Sebagai pengguna, saya ingin melihat gambar yang sesuai untuk setiap offense dan defense berdasarkan level yang dipilih, sehingga tampilan kalkulator lebih informatif dan mudah dipahami.

#### Acceptance Criteria

1. WHEN pengguna mengubah level suatu Spell, THE Calculator SHALL menampilkan gambar Spell yang sesuai dengan level tersebut.
2. WHEN pengguna mengubah level suatu Equipment, THE Calculator SHALL menampilkan gambar Equipment yang sesuai dengan level tersebut.
3. WHEN pengguna mengubah level suatu Defense, THE Calculator SHALL menampilkan gambar Defense yang sesuai dengan level tersebut.
4. THE Calculator SHALL menampilkan nomor level sebagai overlay di sudut kiri bawah gambar setiap item.
5. WHEN level suatu item adalah 0, THE Calculator SHALL menampilkan gambar placeholder atau gambar level 1 dengan indikator visual bahwa item tersebut dinonaktifkan.
6. THE Calculator SHALL menampilkan ikon donasi sebagai overlay di sudut kiri atas gambar Donated Lightning Spell.

---

### Requirement 10: Fitur Multi-bahasa

**User Story:** Sebagai pengguna, saya ingin dapat mengganti bahasa antarmuka antara English dan Indonesian, sehingga saya dapat menggunakan kalkulator dalam bahasa yang saya pahami.

#### Acceptance Criteria

1. THE Calculator SHALL menampilkan dropdown atau tombol pemilih bahasa yang dapat diakses dari bagian atas halaman.
2. THE Calculator SHALL mendukung minimal dua bahasa: English (en) dan Indonesian (id).
3. WHEN pengguna memilih bahasa dari dropdown, THE Calculator SHALL memperbarui semua teks antarmuka (label, tombol, instruksi, placeholder, pesan status) ke bahasa yang dipilih tanpa memuat ulang halaman.
4. THE Calculator SHALL menyimpan preferensi bahasa yang dipilih pengguna ke LocalStorage.
5. WHEN pengguna membuka Calculator, THE Calculator SHALL memuat bahasa sesuai preferensi yang tersimpan di LocalStorage, atau menggunakan English sebagai bahasa default jika tidak ada preferensi tersimpan.
6. THE Calculator SHALL menerjemahkan semua teks berikut: judul section, label spell dan equipment, label defense, teks tombol, teks instruksi, pesan validasi, pesan status pencarian kosong, dan teks footer.
7. WHEN bahasa diubah, THE Calculator SHALL mempertahankan semua pilihan level dan pengaturan lainnya tanpa mereset state.

---

### Requirement 11: Penyimpanan State dengan LocalStorage

**User Story:** Sebagai pengguna, saya ingin pilihan level dan pengaturan saya tersimpan secara otomatis, sehingga saya tidak perlu mengatur ulang setiap kali membuka kalkulator.

#### Acceptance Criteria

1. WHEN pengguna mengubah level suatu Spell, THE Calculator SHALL menyimpan nilai level tersebut ke LocalStorage secara otomatis.
2. WHEN pengguna mengubah level suatu Equipment, THE Calculator SHALL menyimpan nilai level tersebut ke LocalStorage secara otomatis.
3. WHEN pengguna mengubah level suatu Defense, THE Calculator SHALL menyimpan nilai level tersebut ke LocalStorage secara otomatis.
4. WHEN pengguna mengubah pengaturan Earthquake Order, THE Calculator SHALL menyimpan pilihan tersebut ke LocalStorage secara otomatis.
5. WHEN pengguna mengubah status checkbox "Use donated lightning spell", THE Calculator SHALL menyimpan status tersebut ke LocalStorage secara otomatis.
6. WHEN pengguna mengubah jumlah Donated Lightning Spell, THE Calculator SHALL menyimpan nilai tersebut ke LocalStorage secara otomatis.
7. WHEN pengguna membuka Calculator, THE Calculator SHALL memuat semua nilai yang tersimpan di LocalStorage dan menerapkannya ke antarmuka sebelum menampilkan halaman.
8. IF data yang tersimpan di LocalStorage tidak valid atau rusak, THEN THE Calculator SHALL mengabaikan data tersebut dan menggunakan nilai default.

---

### Requirement 12: Instruksi Penggunaan

**User Story:** Sebagai pengguna baru, saya ingin melihat panduan cara menggunakan kalkulator, sehingga saya dapat memahami cara kerja aplikasi dengan cepat.

#### Acceptance Criteria

1. THE Calculator SHALL menampilkan section instruksi yang dapat di-expand dan di-collapse di bagian bawah section Offense.
2. WHEN pengguna menekan tombol untuk menampilkan instruksi, THE Calculator SHALL menampilkan konten instruksi langkah demi langkah.
3. WHEN pengguna menekan tombol untuk menyembunyikan instruksi, THE Calculator SHALL menyembunyikan konten instruksi.
4. THE Calculator SHALL menampilkan instruksi dalam bahasa yang sedang aktif sesuai pilihan pengguna.
5. THE Calculator SHALL menampilkan instruksi yang mencakup: cara memilih level spell, cara menggunakan donated spell, cara memilih level equipment, cara menggunakan earthquake order, dan cara membaca hasil kalkulasi.

---

### Requirement 13: Navigasi Scroll

**User Story:** Sebagai pengguna, saya ingin dapat dengan mudah berpindah ke atas atau bawah halaman, sehingga navigasi pada halaman yang panjang menjadi lebih nyaman.

#### Acceptance Criteria

1. THE Calculator SHALL menampilkan tombol scroll-up yang fixed di sudut layar untuk kembali ke bagian atas halaman.
2. THE Calculator SHALL menampilkan tombol scroll-down yang fixed di sudut layar untuk berpindah ke bagian bawah halaman.
3. WHEN pengguna sudah berada di bagian paling atas halaman, THE Calculator SHALL menyembunyikan tombol scroll-up.
4. WHEN pengguna sudah berada di bagian paling bawah halaman, THE Calculator SHALL menyembunyikan tombol scroll-down.
5. WHEN pengguna menekan tombol scroll-up, THE Calculator SHALL menggulir halaman ke atas secara smooth.
6. WHEN pengguna menekan tombol scroll-down, THE Calculator SHALL menggulir halaman ke bawah secara smooth.

---

### Requirement 14: Aksesibilitas

**User Story:** Sebagai pengguna dengan kebutuhan aksesibilitas, saya ingin antarmuka kalkulator dapat digunakan dengan keyboard dan screen reader, sehingga aplikasi dapat diakses oleh semua pengguna.

#### Acceptance Criteria

1. THE Calculator SHALL menyertakan atribut `aria-label` atau `aria-labelledby` pada semua elemen interaktif (slider, tombol, dropdown, checkbox, input).
2. THE Calculator SHALL memastikan semua gambar memiliki atribut `alt` yang deskriptif.
3. THE Calculator SHALL memastikan semua elemen interaktif dapat diakses dan dioperasikan menggunakan keyboard (Tab, Enter, Space, Arrow keys).
4. THE Calculator SHALL memastikan rasio kontras warna antara teks dan latar belakang memenuhi standar WCAG AA (minimal 4.5:1 untuk teks normal).
5. THE Calculator SHALL menggunakan elemen HTML semantik yang tepat (header, main, section, footer, nav) untuk struktur halaman.
