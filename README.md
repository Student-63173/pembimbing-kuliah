# 🎓 Pembimbing Pendidikan

> AI Skill untuk membantu mahasiswa dan peneliti memahami, mengevaluasi, dan mengembangkan penelitian secara kritis dan sistematis.

**Pembimbing Skripsi** adalah proyek open-source yang berisi kumpulan **AI Skill** untuk membantu proses pengerjaan skripsi dan penelitian.

Proyek ini bukan sekadar kumpulan prompt untuk menghasilkan teks akademik. Tujuannya adalah membantu pengguna **berpikir, menganalisis, mengevaluasi, dan memperbaiki penelitian** dengan lebih terstruktur.

---

## 🎯 Tujuan

Penggunaan AI dalam pengerjaan skripsi sering kali hanya berfokus pada:

> "Tolong perbaiki kalimat ini."

atau:

> "Buatkan BAB II."

Masalahnya, teks yang terlihat akademis belum tentu memiliki **logika penelitian yang kuat**.

Pembimbing Skripsi menggunakan pendekatan yang berbeda:

**Pahami → Analisis → Pertanyakan → Evaluasi → Perbaiki**

AI diarahkan untuk membantu pengguna memahami penelitiannya sendiri, menemukan kemungkinan masalah, menguji argumen, dan menentukan bagian yang perlu diperbaiki.

Tujuan akhirnya bukan membuat pengguna semakin bergantung kepada AI, tetapi membantu pengguna menjadi **lebih kritis dan mandiri dalam melakukan penelitian.**

---

## ✨ Apa yang Bisa Dilakukan?

Repository ini dikembangkan untuk mendukung berbagai kebutuhan akademik, seperti:

- 📚 Memahami konsep dan tugas penelitian
- 🧠 Mengembangkan ide penelitian
- 📝 Mengevaluasi proposal
- 🎓 Mereview skripsi
- 🔬 Menganalisis metodologi penelitian
- 📊 Membantu memahami data dan hasil penelitian
- 🔗 Memeriksa konsistensi antarbagian
- 💬 Mengevaluasi argumentasi dan pembahasan
- 📖 Memeriksa sitasi dan referensi
- ✍️ Membantu memperbaiki bahasa akademik
- 🔎 Menemukan kelemahan penelitian
- 🎯 Mempersiapkan bimbingan
- 🔄 Membantu merencanakan revisi
- 🧑‍🏫 Mempersiapkan penelitian sebelum konsultasi dengan dosen

Kemampuan tersebut akan terus berkembang melalui penambahan Skill baru.

---

## 🧠 Bukan AI yang Selalu Mengiyakan

Salah satu prinsip utama proyek ini adalah:

> **AI tidak harus selalu setuju dengan pengguna.**

Jika terdapat masalah, AI diharapkan menunjukkannya.

Jika terdapat asumsi yang lemah, AI diharapkan mempertanyakannya.

Jika informasi tidak cukup, AI tidak boleh menebak.

Jika sebuah kesimpulan tidak didukung oleh data atau argumen, AI harus menjelaskan alasannya.

Dengan pendekatan ini, AI berfungsi sebagai **academic thinking partner**, bukan sekadar text generator.

---

## 🔍 Prinsip Utama

### Critical Thinking

Tidak menerima argumen begitu saja. Setiap klaim perlu dilihat dasar, bukti, dan logikanya.

### Academic Integrity

Tidak mengarang data, sumber, hasil penelitian, referensi, atau fakta akademik.

### Evidence-Based

Analisis dan rekomendasi didasarkan pada informasi serta bukti yang tersedia dan dapat diverifikasi.

### Consistency

Bagian-bagian penelitian harus saling berhubungan dan tidak bertentangan.

### Transparency

Jika informasi belum cukup untuk membuat penilaian, AI harus menyatakan keterbatasannya.

### Human Oversight

AI membantu proses akademik, tetapi keputusan akhir tetap berada pada mahasiswa, peneliti, dosen pembimbing, dan institusi terkait.

---

## 📦 Struktur Repository

```text
pembimbing-skripsi/
│
├── Bimbingan-metodologi-penelitian/
│   ├── Skill-01.md
│   └── Skill-01.yaml
│
├── README.md
└── LICENSE
```

Repository menggunakan pendekatan **modular**.

Setiap Skill memiliki fokus dan fungsi tertentu sehingga dapat dikembangkan secara terpisah.

Ke depannya, struktur repository dapat berkembang menjadi:

```text
pembimbing-skripsi/
│
├── Bimbingan-metodologi-penelitian/
│   ├── Skill-01.md
│   └── Skill-01.yaml
│
├── Review-skripsi/
│   ├── Skill-01.md
│   └── Skill-01.yaml
│
├── Academic-writing/
│   ├── Skill-01.md
│   └── Skill-01.yaml
│
├── Analisis-data/
│   ├── Skill-01.md
│   └── Skill-01.yaml
│
├── Research-review/
│   ├── Skill-01.md
│   └── Skill-01.yaml
│
├── Research-planning/
│   ├── Skill-01.md
│   └── Skill-01.yaml
│
├── README.md
└── LICENSE
```

Struktur tersebut dapat berubah mengikuti perkembangan proyek.

---

## 🚀 Cara Menggunakan

Pilih Skill yang sesuai dengan kebutuhan.

Kemudian:

1. Baca instruksi Skill.
2. Berikan konteks atau dokumen yang diperlukan.
3. Jelaskan tujuan yang ingin dicapai.
4. Jalankan Skill pada AI yang mendukungnya.
5. Tinjau hasil analisis.
6. Verifikasi informasi penting.
7. Gunakan hasilnya sebagai dasar revisi atau diskusi dengan pembimbing.

Secara umum:

```text
Pilih Skill
     ↓
Berikan konteks
     ↓
AI melakukan analisis
     ↓
Tinjau hasil
     ↓
Verifikasi
     ↓
Lakukan revisi
     ↓
Validasi kembali
```

Untuk hasil yang lebih baik, berikan konteks yang relevan seperti:

- bidang penelitian
- jenjang pendidikan
- topik penelitian
- pedoman akademik
- dokumen penelitian
- data yang tersedia
- arahan dosen pembimbing

---

## 📚 Skill yang Tersedia

| Skill | Fokus | Status |
|---|---|---|
| [Skill-01](./Bimbingan-metodologi-penelitian/Skill-01.md) | Bimbingan Metodologi Penelitian | 🟢 Available |
| Skill berikutnya | Akan ditambahkan | 🚧 Coming Soon |

Skill baru akan ditambahkan secara bertahap sesuai kebutuhan dan hasil pengembangan proyek.

---

## 🛡️ Anti-Hallucination

Salah satu prinsip penting dalam proyek ini adalah:

> **Tidak tahu lebih baik daripada mengarang.**

AI tidak boleh membuat informasi akademik yang tidak tersedia, termasuk:

- data penelitian
- jumlah responden
- hasil penelitian
- nilai statistik
- nilai validitas
- nilai reliabilitas
- sumber ilmiah
- jurnal
- DOI
- kutipan
- teori
- nama penulis
- tahun publikasi
- referensi
- hasil wawancara
- hasil observasi

Jika informasi tidak tersedia, AI harus menyatakan bahwa informasi tersebut belum tersedia.

Jika informasi membutuhkan pemeriksaan lebih lanjut, AI harus menandainya sebagai **perlu diverifikasi**, bukan menyajikannya sebagai fakta.

---

## ⚠️ Disclaimer

**Pembimbing Skripsi adalah alat bantu berbasis AI.**

Proyek ini bukan pengganti:

- dosen pembimbing
- dosen penguji
- institusi pendidikan
- ahli metodologi
- ahli statistik
- reviewer akademik

Hasil AI tetap harus diperiksa dan disesuaikan dengan:

1. pedoman institusi
2. bidang penelitian
3. data sebenarnya
4. sumber akademik yang dapat diverifikasi
5. arahan dosen pembimbing

AI dapat membantu menemukan kemungkinan masalah, tetapi **tidak dapat menjamin bahwa suatu penelitian pasti benar, diterima, atau lulus dari proses akademik.**

---

## 🛠️ Pengembangan

Repository ini masih dalam tahap pengembangan.

Pengembangan diarahkan untuk membangun sistem Skill yang semakin:

- kritis
- akurat
- transparan
- modular
- mudah digunakan
- tahan terhadap hallucination
- relevan dengan kebutuhan penelitian

### Roadmap

```text
AI Skill Foundation
        ↓
Metodologi Penelitian
        ↓
Research Review
        ↓
Academic Writing
        ↓
Analisis Data
        ↓
Cross-Document Validation
        ↓
Research Reasoning
        ↓
Academic Research Assistant
```

Roadmap dapat berubah sesuai perkembangan proyek.

---

## 🤝 Kontribusi

Kontribusi terbuka untuk siapa saja yang ingin membantu mengembangkan proyek ini.

Kamu dapat berkontribusi dengan:

- menemukan kesalahan
- melaporkan bug
- mengusulkan Skill baru
- memperbaiki instruksi
- menambahkan contoh penggunaan
- menemukan potensi hallucination
- meningkatkan struktur Skill
- memberikan masukan akademik
- membuat Pull Request

Sebelum melakukan kontribusi, pastikan perubahan tetap mengikuti prinsip utama proyek:

> **AI harus membantu pengguna berpikir, bukan menggantikan proses berpikir pengguna.**

---

## 🌱 Filosofi Proyek

Skripsi bukan hanya dokumen yang harus diselesaikan.

Skripsi merupakan proses belajar untuk:

**Menemukan masalah → Menyusun pertanyaan → Mencari bukti → Menganalisis → Menarik kesimpulan → Mempertanggungjawabkan hasil**

Karena itu, tujuan Pembimbing Skripsi bukan membuat mahasiswa menyerahkan seluruh proses berpikir kepada AI.

Justru sebaliknya:

> **AI digunakan untuk membantu mahasiswa menjadi peneliti yang lebih kritis, mandiri, dan mampu mempertanggungjawabkan penelitiannya.**

---

## 📜 License

This project is released under the **Unlicense**.

See [`LICENSE`](./LICENSE) for details.

---

<p align="center">
  🎓 <strong>Pembimbing Skripsi</strong>
  <br>
  AI-assisted academic research and thesis guidance.
</p>
