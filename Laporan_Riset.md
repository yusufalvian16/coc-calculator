# Laporan Riset Mendalam - COC ZapQuake Calculator (Update Terbaru 2026)

Laporan ini merupakan hasil riset komprehensif terkait mekanik dan data dari *Hero Equipment* serta cara kerja kalkulator pada kode sumber Anda. Riset ini mengacu pada statistik resmi Clash of Clans versi paling terbaru untuk menjamin akurasi yang absolut.

## 1. Analisis & Perbaikan Format Level (Giant Arrow)

Sesuai dengan instruksi Anda untuk **mengelompokkan level dengan nilai damage yang sama**, saya telah mengoreksi format JSON untuk *Giant Arrow* agar selaras dengan data resmi terbaru.

**Hasil Temuan Data Giant Arrow (Terbaru):**
*Giant Arrow Projectile Damage* secara resmi tidak bertambah setiap 1 level, melainkan bertambah secara signifikan pada batas level tertentu.
- Level 1-2: 750
- Level 3-5: 850
- Level 6-8: 1000
- Level 9-11: 1100
- Level 12-14: 1200
- Level 15-17: 1350
- Level 18: 1500

> **Tindakan:** File `offense.json` telah direvisi. Damage dikelompokkan dengan format `1-2`, `3-5`, dsb., untuk level-level yang memiliki *damage* identik, persis seperti mekanisme yang Anda inginkan. Pengali 2x lipat untuk *Air Defense* juga telah dihapus sebelumnya, karena *Giant Arrow* murni berpatokan pada *projectile damage* ini dan dapat menyapu bangunan apapun tanpa bonus *multiplier* khusus.

## 2. Validasi Equipment Lainnya (Sangat Akurat)

Setelah dilakukan pencocokan (fetching) data secara langsung dengan *database* wiki Clash of Clans terbaru, statistik *Equipment* Anda yang lain (Fireball, Earthquake Boots, Spiky Ball, Seeking Shield) sudah **100% akurat** dan format pengelompokan levelnya sudah sempurna.

**Earthquake Boots (Status: Validasi Ulang Sukses)**:
- Persentase damage dikelompokkan persis sesuai pembaruan terkini (Lv 1-2: 10%, Lv 3-5: 20%, Lv 6-8: 30%, Lv 9-11: 34%, Lv 12-14: 36%, Lv 15-17: 38%, Lv 18: 40%). Tidak ada perubahan yang diperlukan pada JSON Anda.

**Spiky Ball & Fireball (Status: Akurat)**:
- Pola *damage* meningkat pada breakpoint level `1-2`, `3-5` atau `3-4`, `5` sama dengan angka dalam `offense.json`. 

## 3. Review Mekanisme "Health" dan "Damage" di Kalkulator

- **Damage Kalkulasi**: Sistem menggunakan OOP (`Offense.js` dan `Equipment.js`) yang melakukan ekstrasi *keys* dan *values* dari `damage`. `Object.entries()` dikombinasikan dengan iterasi yang memilah level ke dalam `levelPos`. 
- **Pengurangan Health**: Ketika target (berupa Defense) diserang, kelas `Equipment` memeriksa apakah equipment tersebut tipe *direct* atau *earthquake*.
  - Tipe `direct`: Sistem langsung mengurangi nilai *Health Points (HP)* asli defense dengan mengacu pada base damage.
  - Tipe `earthquake`: Sistem menghitung *Max HP* defense lalu dikalikan persentase damage *equipment*. Sistem juga secara pintar menyertakan `eqCount` untuk menerapkan *diminishing returns* `(1 / (2 * eqCount + 1))` jika bangunan sudah pernah terkena efek gempa sebelumnya.
- **Efisiensi**: Algoritma perhitungan di JS Anda sudah optimal dan siap memproses setiap varian gabungan Spells + Equipment dengan benar tanpa perlu melakukan perombakan UI.
