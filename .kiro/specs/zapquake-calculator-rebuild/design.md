# Design Document: Zapquake Calculator Rebuild

## Overview

Zapquake Calculator Rebuild adalah penulisan ulang total antarmuka pengguna dari `html/zapquake-calculator.html`. Tujuannya adalah mengganti Bootstrap dengan Tailwind CSS, menambahkan sistem multi-bahasa (English & Indonesian), dan menjadikan file tersebut sebagai standalone single-page HTML yang tidak bergantung pada halaman lain.

**Prinsip utama:**
- Semua logika backend (class JS, kalkulasi, JSON data) **dipertahankan tanpa perubahan**
- Hanya lapisan UI/HTML yang diubah
- Tailwind CSS dimuat via CDN (Play CDN untuk development, atau build output untuk production)
- Sistem i18n diimplementasikan sebagai modul JavaScript inline di dalam file HTML
- State management tetap menggunakan `LocalStorageUtils` yang sudah ada

---

## Architecture

```
html/zapquake-calculator.html  (file utama — standalone)
│
├── <head>
│   ├── Tailwind CSS (CDN)
│   ├── Font Awesome (CDN)
│   ├── Custom font: SVN-SupercellMagic
│   └── Inline <style> untuk custom CSS yang tidak bisa dilakukan Tailwind
│
├── <body>
│   ├── Header (judul + language switcher)
│   ├── <main>
│   │   ├── Section: Offense Selection
│   │   │   ├── Spell cards (Lightning, Donated Lightning, Earthquake)
│   │   │   ├── Equipment cards (EQ Boots, Spiky Ball, Giant Arrow, Fireball, Seeking Shield)
│   │   │   └── Instructions (collapsible)
│   │   ├── Section: Defense List (search + controls + grid)
│   │   └── Defense cards (generated dinamis via JS)
│   └── Footer
│
├── Scroll buttons (fixed position)
│
└── <script> (inline + external)
    ├── Inline: i18n module (translations + language switcher logic)
    ├── External: semua file JS yang sudah ada (tidak berubah)
    └── External: js/util/json.js (tetap di akhir untuk trigger init event)
```

### Keputusan Arsitektur

1. **Tailwind via CDN Play**: Untuk standalone HTML, Tailwind Play CDN (`https://cdn.tailwindcss.com`) digunakan agar tidak perlu build step. Config Tailwind (custom colors, fonts) didefinisikan inline via `tailwind.config`.

2. **i18n sebagai inline module**: Sistem terjemahan diimplementasikan sebagai objek JavaScript inline di dalam `<script>` tag di HTML. Tidak ada file eksternal tambahan. Fungsi `t(key)` mengembalikan string terjemahan berdasarkan bahasa aktif.

3. **Bootstrap dihapus sepenuhnya**: Semua class Bootstrap (`d-none`, `d-flex`, `btn`, `card`, dll.) diganti dengan Tailwind equivalents. Fungsi `HTMLUtil.showDiv()` / `HTMLUtil.hideDiv()` yang menggunakan `d-none` perlu di-override agar menggunakan class Tailwind (`hidden`).

4. **Bootstrap JS dihapus**: Fungsi `HTMLUtil.toggleBSCollapse()` yang bergantung pada Bootstrap JS perlu diganti dengan implementasi collapse vanilla JS.

5. **Semua class JS backend tidak berubah**: `Defense`, `Offense`, `Spell`, `Equipment`, `LocalStorageUtils`, `OffenseListManager`, `DefenseListManager`, dll. tetap digunakan tanpa modifikasi.

---

## Components and Interfaces

### 1. i18n Module (inline JS)

```javascript
const i18n = {
  currentLang: 'en',
  translations: {
    en: { /* semua string bahasa Inggris */ },
    id: { /* semua string bahasa Indonesia */ }
  },
  t(key) { return this.translations[this.currentLang][key] ?? key; },
  setLang(lang) { /* update currentLang, re-render teks, simpan ke localStorage */ },
  init() { /* load dari localStorage atau default 'en' */ }
};
```

**Translation keys yang diperlukan:**

| Key | English | Indonesian |
|-----|---------|------------|
| `title` | ZapQuake Calculator | Kalkulator ZapQuake |
| `selectOffenseLevel` | Select Offense Level | Pilih Level Offense |
| `spell` | Spell | Mantra |
| `heroEquipment` | Hero Equipment | Perlengkapan Hero |
| `setting` | Setting | Pengaturan |
| `setAllSpellsMax` | Set All Spells to Max Level | Atur Semua Mantra ke Level Maks |
| `setAllSpellsMin` | Set All Spells to Min Level | Atur Semua Mantra ke Level Min |
| `useDonatedLightning` | Use donated lightning spell | Gunakan mantra petir donasi |
| `lightningSpell` | Lightning Spell | Mantra Petir |
| `lightningSpellDonated` | Lightning Spell (Donated) | Mantra Petir (Donasi) |
| `earthquakeSpell` | Earthquake Spell | Mantra Gempa |
| `setAllEquipmentsMax` | Set All Equipments to Max Level | Atur Semua Perlengkapan ke Level Maks |
| `setAllEquipmentsMin` | Set All Equipments to Min Level | Atur Semua Perlengkapan ke Level Min |
| `earthquakeOrder` | Earthquake order | Urutan Gempa |
| `eqSpellFirst` | Earthquake Spell first | Mantra Gempa lebih dulu |
| `eqBootsFirst` | Earthquake Boots first | Sepatu Gempa lebih dulu |
| `earthquakeBoots` | Earthquake Boots | Sepatu Gempa |
| `spikyBall` | Spiky Ball | Bola Berduri |
| `giantArrow` | Giant Arrow | Panah Raksasa |
| `fireball` | Fireball | Bola Api |
| `seekingShield` | Seeking Shield | Perisai Pencari |
| `instruction` | Instruction | Instruksi |
| `show` | Show | Tampilkan |
| `hide` | Hide | Sembunyikan |
| `defenseList` | Defense List | Daftar Pertahanan |
| `searchDefense` | Search a defense | Cari pertahanan |
| `setAllDefensesMax` | Set All Defenses to Max Level | Atur Semua Pertahanan ke Level Maks |
| `setAllDefensesMin` | Set All Defenses to Min Level | Atur Semua Pertahanan ke Level Min |
| `donateCountLabel` | Number of spell in clan castle: | Jumlah mantra di clan castle: |
| `inputWarning` | Input must be a number between 0 and 3! | Input harus angka antara 0 dan 3! |
| `heroesEquipmentUsed` | Heroes Equipment used: | Perlengkapan Hero yang digunakan: |
| `spellNeeded` | Spell needed: | Mantra yang dibutuhkan: |
| `showMore` | Show More | Tampilkan Lebih |
| `showLess` | Show Less | Tampilkan Lebih Sedikit |
| `destroyedMsg` | That heroes equipment setup is enough to destroy this defense without any spells needed. Huzzah! 🎉 | Setup perlengkapan hero ini cukup untuk menghancurkan pertahanan ini tanpa mantra. Hore! 🎉 |
| `impossibleMsg` | It's impossible to destroy this defense with setup. Womp womp! 😔 | Tidak mungkin menghancurkan pertahanan ini dengan setup ini. Sayang sekali! 😔 |
| `emptySearchMsg` | Uh oh! It looks like our Barbarian couldn't find any defenses that match your search. Maybe try broadening your search filter? | Aduh! Sepertinya Barbarian kita tidak menemukan pertahanan yang cocok. Coba perluas filter pencarianmu? |
| `defenseCount` | Defense Count | Jumlah Pertahanan |
| `defensesCount` | Defenses Count | Jumlah Pertahanan |
| `madeBy` | Made by Kienlabadao | Dibuat oleh Kienlabadao |
| `lastUpdated` | Last Updated | Terakhir Diperbarui |
| `instrStep1Title` | Step 1: Select Spell Level | Langkah 1: Pilih Level Mantra |
| `instrStep2Title` | Step 2: Select Equipment Level | Langkah 2: Pilih Level Perlengkapan |
| `instrStep3Title` | Step 3: Calculate | Langkah 3: Hitung |
| `instrNote` | Note: | Catatan: |
| `instrExclude` | To exclude an offense from the calculation, set its level to 0. | Untuk mengecualikan offense dari kalkulasi, atur levelnya ke 0. |
| `instrSaved` | All of your options are saved for future use. | Semua pilihan Anda tersimpan untuk penggunaan berikutnya. |

### 2. HTMLUtil Override

Karena `HTMLUtil.showDiv()` dan `HTMLUtil.hideDiv()` menggunakan class `d-none` (Bootstrap), perlu di-override setelah file `htmlUtil.js` dimuat:

```javascript
// Override setelah htmlUtil.js dimuat
HTMLUtil.showDiv = (div) => div.classList.remove('hidden');
HTMLUtil.hideDiv = (div) => div.classList.add('hidden');
HTMLUtil.isDivHidden = (div) => div.classList.contains('hidden');
```

### 3. Bootstrap Collapse Replacement

`HTMLUtil.toggleBSCollapse()` bergantung pada `bootstrap.Collapse`. Perlu diganti dengan implementasi vanilla:

```javascript
HTMLUtil.toggleBSCollapse = (collapseDiv, state) => {
  if (state) {
    collapseDiv.classList.remove('hidden');
  } else {
    collapseDiv.classList.add('hidden');
  }
};
```

### 4. Defense Card (ZapquakeHTMLUtil)

`ZapquakeHTMLUtil.createDefenseDiv()` menggunakan class Bootstrap. Karena file ini tidak diubah, class-class Bootstrap yang digunakan di sana perlu di-map ke Tailwind equivalents melalui CSS custom atau dengan menambahkan Tailwind config aliases.

**Strategi**: Tambahkan CSS compatibility layer di `<style>` tag yang mendefinisikan class Bootstrap yang digunakan oleh `htmlUtil.js` dan `zapquake_calc/htmlUtil.js` sebagai Tailwind utilities:

```css
/* Compatibility layer untuk class yang digunakan JS backend */
.d-none { display: none !important; }
.d-flex { display: flex !important; }
.d-inline-block { display: inline-block !important; }
/* ... dst */
```

Ini memungkinkan semua file JS backend tetap berjalan tanpa modifikasi.

### 5. Language Switcher Component

```html
<div class="language-switcher">
  <select id="languageSelect" onchange="i18n.setLang(this.value)">
    <option value="en">🇬🇧 English</option>
    <option value="id">🇮🇩 Indonesia</option>
  </select>
</div>
```

Elemen yang perlu diperbarui saat bahasa berubah ditandai dengan atribut `data-i18n="key"`. Fungsi `i18n.setLang()` akan melakukan query semua elemen dengan atribut tersebut dan memperbarui `textContent`-nya.

---

## Data Models

### LocalStorage Keys (tidak berubah)

| Key | Tipe | Deskripsi |
|-----|------|-----------|
| `simple_offense_{id}_pos` | number | Level position spell/equipment |
| `simple_offense_{id}_pos_donated` | number | Level position donated spell |
| `simple_defense_{id}_pos` | number | Level position defense |
| `simple_earthquakeOrder` | string | `"earthquake_spell"` atau `"earthquake_boots"` |
| `donatedZapSpellCount` | number | Jumlah donated lightning spell (0–3) |
| `useDonatedZapSpell` | boolean | Status checkbox donated spell |
| `lang` | string | Bahasa aktif (`"en"` atau `"id"`) |

### i18n State

```javascript
{
  currentLang: string,       // 'en' | 'id'
  translations: {
    en: Record<string, string>,
    id: Record<string, string>
  }
}
```

### Tailwind Config (inline)

```javascript
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        supercell: ['SupercellMagic', 'sans-serif']
      },
      colors: {
        'coc-gold': '#f0c040',
        'coc-blue': '#4a90d9',
        'coc-brown': '#8b5e3c',
        'epic': '#9b59b6',
        'destroyed': '#27ae60',
        'not-destroyed': '#e74c3c'
      }
    }
  }
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: i18n Translation Completeness

*For any* translation key used in the UI, both the English (`en`) and Indonesian (`id`) translation objects SHALL contain a non-empty string value for that key.

**Validates: Requirements 10.2, 10.3, 10.6**

### Property 2: LocalStorage Round-trip untuk Level

*For any* valid level position value saved via `LocalStorageUtils.saveNumber(key, value)`, loading it back via `LocalStorageUtils.loadNumber(key, defaultValue)` SHALL return the same numeric value.

**Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5, 11.6**

### Property 3: LocalStorage Round-trip untuk Boolean

*For any* boolean value saved via `LocalStorageUtils.saveBoolean(key, value)`, loading it back via `LocalStorageUtils.loadBoolean(key, defaultValue)` SHALL return the same boolean value.

**Validates: Requirements 11.5**

### Property 4: Validasi Input Donated Spell

*For any* integer input `n`, jika `n < 0` atau `n > 3` maka sistem SHALL menampilkan pesan peringatan; jika `0 ≤ n ≤ 3` maka sistem SHALL menyembunyikan pesan peringatan dan menerima nilai tersebut.

**Validates: Requirements 4.4, 4.5, 4.6**

### Property 5: Defense Search Filter

*For any* search string `s` dan daftar defense yang ada, semua defense yang ditampilkan setelah filter SHALL memiliki nama yang mengandung `s` (case-insensitive), dan semua defense yang namanya tidak mengandung `s` SHALL disembunyikan.

**Validates: Requirements 7.3**

---

## Error Handling

### JSON Load Failure
- `js/util/json.js` sudah menangani fetch error dengan redirect ke error page
- Tidak ada perubahan diperlukan

### LocalStorage Corruption
- `LocalStorageUtils.loadNumber/loadString/loadBoolean` sudah menangani nilai invalid dengan fallback ke default
- Requirement 11.8 terpenuhi oleh implementasi yang sudah ada

### Invalid Donated Count Input
- Fungsi `updateDonatedCount()` sudah memvalidasi input dan menampilkan `warningDiv`
- Di rebuild, `warningDiv` menggunakan class Tailwind (`hidden`) bukan Bootstrap (`d-none`)

### Language Key Not Found
- Fungsi `t(key)` mengembalikan `key` itu sendiri jika tidak ditemukan, sehingga UI tidak rusak meski ada key yang hilang

### Bootstrap Collapse Tidak Tersedia
- `HTMLUtil.toggleBSCollapse()` di-override dengan implementasi vanilla JS sebelum script backend dijalankan

---

## Testing Strategy

### Unit Tests (Example-based)

Karena ini adalah UI rebuild dengan logika backend yang tidak berubah, fokus testing adalah pada:

1. **i18n module**:
   - `t('title')` dengan lang `'en'` mengembalikan `'ZapQuake Calculator'`
   - `t('title')` dengan lang `'id'` mengembalikan `'Kalkulator ZapQuake'`
   - `t('nonexistent_key')` mengembalikan `'nonexistent_key'` (fallback)
   - `setLang('id')` memperbarui `currentLang` dan menyimpan ke localStorage

2. **HTMLUtil overrides**:
   - `HTMLUtil.hideDiv(el)` menambahkan class `hidden`
   - `HTMLUtil.showDiv(el)` menghapus class `hidden`
   - `HTMLUtil.toggleBSCollapse(el, false)` menambahkan class `hidden`
   - `HTMLUtil.toggleBSCollapse(el, true)` menghapus class `hidden`

3. **Donated count validation**:
   - Input `0` → valid, warning tersembunyi
   - Input `3` → valid, warning tersembunyi
   - Input `-1` → invalid, warning tampil
   - Input `4` → invalid, warning tampil
   - Input `"abc"` → invalid (NaN), warning tampil

### Property-Based Tests

Menggunakan library **fast-check** (JavaScript) dengan minimum 100 iterasi per property.

**Property 1: i18n Translation Completeness**
```javascript
// Feature: zapquake-calculator-rebuild, Property 1: i18n Translation Completeness
fc.assert(fc.property(
  fc.constantFrom(...Object.keys(i18n.translations.en)),
  (key) => {
    return typeof i18n.translations.en[key] === 'string' && i18n.translations.en[key].length > 0
        && typeof i18n.translations.id[key] === 'string' && i18n.translations.id[key].length > 0;
  }
), { numRuns: 100 });
```

**Property 2: LocalStorage Round-trip untuk Level**
```javascript
// Feature: zapquake-calculator-rebuild, Property 2: LocalStorage Round-trip untuk Level
fc.assert(fc.property(
  fc.string(), fc.integer({ min: 0, max: 100 }),
  (key, value) => {
    LocalStorageUtils.saveNumber(key, value);
    return LocalStorageUtils.loadNumber(key, 0) === value;
  }
), { numRuns: 100 });
```

**Property 3: LocalStorage Round-trip untuk Boolean**
```javascript
// Feature: zapquake-calculator-rebuild, Property 3: LocalStorage Round-trip untuk Boolean
fc.assert(fc.property(
  fc.string(), fc.boolean(),
  (key, value) => {
    LocalStorageUtils.saveBoolean(key, value);
    return LocalStorageUtils.loadBoolean(key, !value) === value;
  }
), { numRuns: 100 });
```

**Property 4: Validasi Input Donated Spell**
```javascript
// Feature: zapquake-calculator-rebuild, Property 4: Validasi Input Donated Spell
fc.assert(fc.property(
  fc.integer({ min: -100, max: 100 }),
  (n) => {
    const isValid = n >= 0 && n <= 3;
    // Simulasikan logika updateDonatedCount
    const result = validateDonatedCount(n);
    return result.valid === isValid;
  }
), { numRuns: 100 });
```

**Property 5: Defense Search Filter**
```javascript
// Feature: zapquake-calculator-rebuild, Property 5: Defense Search Filter
fc.assert(fc.property(
  fc.string(),
  (searchStr) => {
    const results = searchDefenses(allDefenseNodes, searchStr);
    return results.every(node => {
      const name = getDefenseName(node).toLowerCase();
      return name.includes(searchStr.toLowerCase());
    });
  }
), { numRuns: 100 });
```

### Integration Tests

- Halaman dimuat di browser → semua defense card ter-render
- Mengubah slider spell → kalkulasi diperbarui di semua defense card
- Refresh halaman → state tersimpan di localStorage ter-restore
- Ganti bahasa → semua teks UI berubah tanpa reload halaman
