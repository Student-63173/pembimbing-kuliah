/**
 * Pembimbing Skripsi
 * Mode: Dosen Pembimbing Metodologi Penelitian
 *
 * Sistem audit skripsi berbasis AI.
 * Fokus:
 * - Pemeriksaan substansi
 * - Pemeriksaan metodologi
 * - Pemeriksaan data dan analisis
 * - Pemeriksaan bahasa akademik
 * - Pemeriksaan sitasi dan referensi
 * - Pemeriksaan format dan konsistensi
 *
 * Catatan:
 * Sistem ini TIDAK boleh mengarang data, hasil penelitian,
 * sumber, teori, kutipan, statistik, atau fakta akademik.
 */

const SKILL_CONFIG = {
  mode: "Dosen Pembimbing Metodologi Penelitian",

  tujuan: [
    "Memeriksa skripsi secara menyeluruh dari awal hingga akhir",
    "Menilai konsistensi logika penelitian",
    "Menilai ketepatan metodologi",
    "Memeriksa kesesuaian data, hasil, pembahasan, dan kesimpulan",
    "Memeriksa bahasa akademik, sitasi, referensi, dan format",
    "Mengidentifikasi kelemahan yang dapat memengaruhi kelayakan akademik"
  ],

  prinsip: {
    objektif: true,
    kritis: true,
    tidakMengarangData: true,
    tidakMengubahMaknaPenelitian: true,
    tidakMencariCariKesalahan: true,
    verifikasiDataYangTidakCukup: true
  },

  alurPemeriksaan: [
    "Judul",
    "Latar belakang",
    "Identifikasi masalah",
    "Batasan masalah",
    "Rumusan masalah",
    "Tujuan penelitian",
    "Manfaat penelitian",
    "Kajian teori",
    "Penelitian terdahulu",
    "Research gap",
    "Kerangka berpikir",
    "Hipotesis",
    "Metode penelitian",
    "Desain penelitian",
    "Populasi dan sampel/informan",
    "Teknik sampling",
    "Teknik pengumpulan data",
    "Instrumen penelitian",
    "Validitas dan reliabilitas",
    "Teknik analisis data",
    "Hasil penelitian",
    "Pembahasan",
    "Kesimpulan",
    "Saran",
    "Daftar pustaka",
    "Tabel",
    "Gambar",
    "Lampiran",
    "Konsistensi antarbagian"
  ],

  rantaiLogika: [
    "Rumusan Masalah",
    "Tujuan",
    "Metode",
    "Data",
    "Hasil",
    "Pembahasan",
    "Kesimpulan"
  ],

  kategoriTemuan: [
    "A. Masalah Substansi",
    "B. Masalah Metodologi",
    "C. Masalah Analisis Data",
    "D. Masalah Bahasa Akademik",
    "E. Masalah Sitasi dan Referensi",
    "F. Masalah Format dan Konsistensi"
  ],

  prioritas: {
    sangatPenting: {
      nama: "Sangat Penting",
      definisi:
        "Kesalahan substansial atau metodologis yang dapat mengganggu validitas penelitian."
    },

    penting: {
      nama: "Penting",
      definisi:
        "Kelemahan yang berpengaruh terhadap kualitas akademik penelitian."
    },

    penyempurnaan: {
      nama: "Penyempurnaan",
      definisi:
        "Perbaikan bahasa, format, dan detail teknis yang tidak mengubah substansi."
    }
  },

  aturanData: {
    jikaDataTidakCukup: {
      tindakan: "Jangan membuat asumsi",
      label:
        "Belum dapat dinilai karena informasi/data yang diperlukan belum tersedia."
    },

    dilarangMengarang: [
      "Data penelitian",
      "Hasil penelitian",
      "Responden",
      "Angka statistik",
      "Sumber referensi",
      "Teori",
      "Kutipan",
      "Fakta akademik"
    ]
  },

  pemeriksaanPlagiarisme: {
    pendekatan: "Identifikasi indikasi berdasarkan pola redaksi",

    larangan:
      "Jangan menyatakan pasti plagiarisme hanya berdasarkan kemiripan teks",

    rekomendasi:
      "Verifikasi menggunakan perangkat similarity/plagiarism checker"
  },

  outputAkhir: [
    "Ringkasan kelemahan utama",
    "Daftar revisi wajib",
    "Daftar revisi yang disarankan",
    "Data/informasi yang masih diperlukan",
    "Risiko jika tidak diperbaiki",
    "Rekomendasi sebelum konsultasi dengan dosen pembimbing",
    "Penilaian kesiapan skripsi"
  ]
};


/* =========================================================
   1. UTILITAS DASAR
   ========================================================= */

function normalizeText(text) {
  if (!text || typeof text !== "string") {
    return "";
  }

  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}


function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}


function containsText(text, keywords = []) {
  const normalized = normalizeText(text).toLowerCase();

  return keywords.some((keyword) =>
    normalized.includes(keyword.toLowerCase())
  );
}


function getSection(document, sectionName) {
  if (!document || typeof document !== "object") {
    return null;
  }

  return document[sectionName] || null;
}


function createFinding({
  lokasi,
  kategori,
  tingkatPrioritas,
  temuan,
  alasan,
  dampak,
  perbaikan,
  contohRevisi = null,
  status = "Perlu diperiksa"
}) {
  return {
    lokasi,
    kategori,
    tingkatPrioritas,
    status,
    temuan,
    alasan,
    dampak,
    perbaikan,
    contohRevisi
  };
}


/* =========================================================
   2. VALIDASI INPUT
   ========================================================= */

function validateInput(input) {
  const errors = [];

  if (!input) {
    errors.push("Dokumen skripsi belum diberikan.");
  }

  if (typeof input !== "object") {
    errors.push("Input harus berupa object.");
  }

  if (input && !input.document) {
    errors.push("Bagian 'document' belum tersedia.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}


/* =========================================================
   3. PEMERIKSAAN KETERSEDIAAN DATA
   ========================================================= */

function checkDataAvailability(document) {
  const missing = [];

  for (const section of SKILL_CONFIG.alurPemeriksaan) {
    const value = getSection(document, section);

    if (isEmpty(value)) {
      missing.push(section);
    }
  }

  return {
    missingSections: missing,
    lengkap: missing.length === 0
  };
}


function createInsufficientInformationFinding(lokasi, informasi) {
  return createFinding({
    lokasi,
    kategori: "F. Masalah Format dan Konsistensi",
    tingkatPrioritas: "Penting",
    status: "Belum dapat dinilai",
    temuan:
      "Informasi yang diperlukan untuk melakukan pemeriksaan belum tersedia.",
    alasan:
      `Bagian yang diperlukan untuk pemeriksaan: ${informasi}.`,
    dampak:
      "Penilaian terhadap bagian tersebut belum dapat dilakukan secara objektif.",
    perbaikan:
      "Berikan dokumen atau informasi yang diperlukan sebelum membuat kesimpulan.",
    contohRevisi: null
  });
}


/* =========================================================
   4. PEMERIKSAAN JUDUL
   ========================================================= */

function checkTitle(document) {
  const findings = [];
  const title = getSection(document, "Judul");

  if (isEmpty(title)) {
    findings.push(
      createInsufficientInformationFinding("Judul", "judul penelitian")
    );

    return findings;
  }

  if (typeof title !== "string") {
    findings.push(
      createFinding({
        lokasi: "Judul",
        kategori: "A. Masalah Substansi",
        tingkatPrioritas: "Penting",
        temuan: "Format judul belum dapat dibaca sebagai teks.",
        alasan: "Judul diperlukan untuk memahami fokus penelitian.",
        dampak: "Pemeriksaan fokus penelitian menjadi terbatas.",
        perbaikan: "Berikan judul penelitian dalam bentuk teks."
      })
    );
  }

  return findings;
}


/* =========================================================
   5. PEMERIKSAAN RUMUSAN MASALAH
   ========================================================= */

function checkResearchQuestions(document) {
  const findings = [];

  const questions = getSection(document, "Rumusan masalah");
  const objectives = getSection(document, "Tujuan penelitian");

  if (isEmpty(questions)) {
    findings.push(
      createInsufficientInformationFinding(
        "Rumusan Masalah",
        "rumusan masalah penelitian"
      )
    );

    return findings;
  }

  if (isEmpty(objectives)) {
    findings.push(
      createInsufficientInformationFinding(
        "Tujuan Penelitian",
        "tujuan penelitian"
      )
    );

    return findings;
  }

  /*
   * Pemeriksaan lanjutan sebaiknya dilakukan oleh
   * model AI karena hubungan semantik tidak cukup
   * dinilai hanya menggunakan pencarian keyword.
   */

  return findings;
}


/* =========================================================
   6. PEMERIKSAAN RANTAI LOGIKA PENELITIAN
   ========================================================= */

function checkLogicChain(document) {
  const findings = [];

  const chain = {
    rumusanMasalah: getSection(document, "Rumusan masalah"),
    tujuan: getSection(document, "Tujuan penelitian"),
    metode: getSection(document, "Metode penelitian"),
    data: getSection(document, "Hasil penelitian"),
    pembahasan: getSection(document, "Pembahasan"),
    kesimpulan: getSection(document, "Kesimpulan")
  };

  const missing = [];

  if (isEmpty(chain.rumusanMasalah)) {
    missing.push("Rumusan Masalah");
  }

  if (isEmpty(chain.tujuan)) {
    missing.push("Tujuan");
  }

  if (isEmpty(chain.metode)) {
    missing.push("Metode");
  }

  if (isEmpty(chain.data)) {
    missing.push("Data/Hasil");
  }

  if (isEmpty(chain.pembahasan)) {
    missing.push("Pembahasan");
  }

  if (isEmpty(chain.kesimpulan)) {
    missing.push("Kesimpulan");
  }

  if (missing.length > 0) {
    findings.push(
      createFinding({
        lokasi: "Konsistensi antarbagian",
        kategori: "F. Masalah Format dan Konsistensi",
        tingkatPrioritas: "Penting",
        status: "Belum dapat dinilai",
        temuan:
          "Rantai logika penelitian belum dapat diperiksa secara lengkap.",
        alasan:
          `Bagian yang belum tersedia: ${missing.join(", ")}.`,
        dampak:
          "Hubungan antara pertanyaan penelitian, metode, hasil, dan kesimpulan belum dapat diverifikasi.",
        perbaikan:
          "Lengkapi bagian yang diperlukan sebelum melakukan validasi menyeluruh."
      })
    );
  }

  return findings;
}


/* =========================================================
   7. PEMERIKSAAN METODOLOGI
   ========================================================= */

function checkMethodology(document) {
  const findings = [];

  const methodologySections = [
    "Metode penelitian",
    "Desain penelitian",
    "Populasi dan sampel/informan",
    "Teknik sampling",
    "Teknik pengumpulan data",
    "Instrumen penelitian",
    "Validitas dan reliabilitas",
    "Teknik analisis data"
  ];

  const missing = methodologySections.filter((section) =>
    isEmpty(getSection(document, section))
  );

  if (missing.length > 0) {
    findings.push(
      createFinding({
        lokasi: "Metode Penelitian",
        kategori: "B. Masalah Metodologi",
        tingkatPrioritas: "Penting",
        status: "Belum dapat dinilai",
        temuan:
          "Komponen metodologi belum tersedia secara lengkap.",
        alasan:
          `Bagian yang belum tersedia: ${missing.join(", ")}.`,
        dampak:
          "Ketepatan metode terhadap tujuan dan rumusan masalah belum dapat diverifikasi.",
        perbaikan:
          "Lengkapi komponen metodologi penelitian yang diperlukan."
      })
    );
  }

  return findings;
}


/* =========================================================
   8. PEMERIKSAAN DATA DAN HASIL
   ========================================================= */

function checkResults(document) {
  const findings = [];

  const results = getSection(document, "Hasil penelitian");

  if (isEmpty(results)) {
    findings.push(
      createInsufficientInformationFinding(
        "Hasil Penelitian",
        "data dan hasil penelitian"
      )
    );

    return findings;
  }

  /*
   * Jangan menghitung ulang atau mengubah angka secara otomatis
   * tanpa data asli yang dapat diverifikasi.
   */

  return findings;
}


/* =========================================================
   9. PEMERIKSAAN PEMBAHASAN
   ========================================================= */

function checkDiscussion(document) {
  const findings = [];

  const discussion = getSection(document, "Pembahasan");

  if (isEmpty(discussion)) {
    findings.push(
      createInsufficientInformationFinding(
        "Pembahasan",
        "bagian pembahasan"
      )
    );

    return findings;
  }

  /*
   * AI perlu memeriksa apakah pembahasan:
   * 1. Menjelaskan hasil
   * 2. Menjawab rumusan masalah
   * 3. Menghubungkan hasil dengan teori
   * 4. Membandingkan dengan penelitian terdahulu
   * 5. Menjelaskan alasan atau interpretasi
   * 6. Tidak sekadar mengulang tabel
   */

  return findings;
}


/* =========================================================
   10. PEMERIKSAAN KESIMPULAN
   ========================================================= */

function checkConclusion(document) {
  const findings = [];

  const conclusion = getSection(document, "Kesimpulan");

  if (isEmpty(conclusion)) {
    findings.push(
      createInsufficientInformationFinding(
        "Kesimpulan",
        "kesimpulan penelitian"
      )
    );

    return findings;
  }

  /*
   * Kesimpulan harus dibandingkan dengan:
   * - Rumusan masalah
   * - Tujuan penelitian
   * - Hasil penelitian
   *
   * Kesimpulan tidak boleh menghasilkan klaim baru
   * yang tidak didukung oleh hasil.
   */

  return findings;
}


/* =========================================================
   11. PEMERIKSAAN SITASI DAN REFERENSI
   ========================================================= */

function checkReferences(document) {
  const findings = [];

  const references = getSection(document, "Daftar pustaka");

  if (isEmpty(references)) {
    findings.push(
      createInsufficientInformationFinding(
        "Daftar Pustaka",
        "daftar pustaka"
      )
    );

    return findings;
  }

  /*
   * Jangan membuat sumber pengganti.
   * Jika sumber tidak dapat diverifikasi:
   *
   * status = "Perlu Verifikasi"
   */

  return findings;
}


/* =========================================================
   12. PEMERIKSAAN BAHASA AKADEMIK
   ========================================================= */

function checkAcademicLanguage(document) {
  const findings = [];

  /*
   * Pemeriksaan bahasa dilakukan pada:
   * - Struktur kalimat
   * - Ejaan
   * - Tanda baca
   * - Istilah
   * - Konsistensi terminologi
   * - Paragraf
   * - Gaya akademik
   *
   * Jangan mengubah makna penelitian.
   */

  return findings;
}


/* =========================================================
   13. PEMERIKSAAN PLAGIARISME
   ========================================================= */

function checkPlagiarism(document) {
  const findings = [];

  /*
   * Sistem hanya boleh mengidentifikasi indikasi.
   *
   * Tidak boleh menyimpulkan:
   * "Ini pasti plagiarisme."
   *
   * Kemiripan harus diverifikasi menggunakan
   * perangkat similarity/plagiarism checker.
   */

  return findings;
}


/* =========================================================
   14. PEMERIKSAAN FORMAT
   ========================================================= */

function checkFormat(document) {
  const findings = [];

  /*
   * Periksa:
   * - Struktur BAB
   * - Subbab
   * - Penomoran
   * - Judul tabel
   * - Judul gambar
   * - Lampiran
   * - Daftar isi
   * - Daftar tabel
   * - Daftar gambar
   * - Nomor halaman
   *
   * Jika pedoman kampus tidak tersedia,
   * jangan menganggap satu format sebagai aturan universal.
   */

  return findings;
}


/* =========================================================
   15. PEMERIKSAAN KONSISTENSI ANTARBAGIAN
   ========================================================= */

function checkConsistency(document) {
  const findings = [];

  /*
   * Periksa hubungan:
   *
   * Judul
   *   ↓
   * Latar Belakang
   *   ↓
   * Rumusan Masalah
   *   ↓
   * Tujuan
   *   ↓
   * Metode
   *   ↓
   * Data
   *   ↓
   * Hasil
   *   ↓
   * Pembahasan
   *   ↓
   * Kesimpulan
   */

  return findings;
}


/* =========================================================
   16. PENILAIAN PRIORITAS
   ========================================================= */

function sortFindingsByPriority(findings) {
  const priorityWeight = {
    "Sangat Penting": 1,
    "Penting": 2,
    "Penyempurnaan": 3
  };

  return [...findings].sort((a, b) => {
    const weightA = priorityWeight[a.tingkatPrioritas] || 99;
    const weightB = priorityWeight[b.tingkatPrioritas] || 99;

    return weightA - weightB;
  });
}


/* =========================================================
   17. PEMERIKSAAN KELENGKAPAN
   ========================================================= */

function calculateCompleteness(document) {
  const sections = SKILL_CONFIG.alurPemeriksaan;

  const available = sections.filter((section) => {
    return !isEmpty(getSection(document, section));
  });

  const percentage =
    sections.length === 0
      ? 0
      : Math.round((available.length / sections.length) * 100);

  return {
    totalBagian: sections.length,
    tersedia: available.length,
    belumTersedia: sections.length - available.length,
    persentase: percentage
  };
}


/* =========================================================
   18. PENILAIAN KESIAPAN SKRIPSI
   ========================================================= */

function assessReadiness(findings, completeness) {
  const critical = findings.filter(
    (finding) => finding.tingkatPrioritas === "Sangat Penting"
  );

  const important = findings.filter(
    (finding) => finding.tingkatPrioritas === "Penting"
  );

  if (critical.length > 0) {
    return {
      level: "Belum Siap",
      alasan:
        "Terdapat masalah substansial atau metodologis yang perlu diperbaiki."
    };
  }

  if (important.length >= 3) {
    return {
      level: "Perlu Revisi Besar",
      alasan:
        "Masih terdapat beberapa kelemahan penting yang memengaruhi kualitas penelitian."
    };
  }

  if (important.length > 0) {
    return {
      level: "Perlu Revisi",
      alasan:
        "Masih terdapat beberapa bagian penting yang perlu diperbaiki atau diverifikasi."
    };
  }

  if (completeness.percentage < 80) {
    return {
      level: "Belum Dapat Dinilai",
      alasan:
        "Dokumen belum cukup lengkap untuk menghasilkan penilaian menyeluruh."
    };
  }

  return {
    level: "Hampir Siap",
    alasan:
      "Tidak ditemukan masalah prioritas tinggi berdasarkan informasi yang tersedia."
  };
}


/* =========================================================
   19. MEMBUAT RINGKASAN
   ========================================================= */

function generateSummary(findings, readiness, completeness) {
  const veryImportant = findings.filter(
    (f) => f.tingkatPrioritas === "Sangat Penting"
  );

  const important = findings.filter(
    (f) => f.tingkatPrioritas === "Penting"
  );

  const refinement = findings.filter(
    (f) => f.tingkatPrioritas === "Penyempurnaan"
  );

  return {
    kelemahanUtama: veryImportant.concat(important),

    revisiWajib: veryImportant,

    revisiDisarankan: important.concat(refinement),

    dataYangMasihDiperlukan: findings
      .filter((f) => f.status === "Belum dapat dinilai")
      .map((f) => ({
        lokasi: f.lokasi,
        kebutuhan: f.perbaikan
      })),

    risiko: veryImportant.map((f) => ({
      lokasi: f.lokasi,
      dampak: f.dampak
    })),

    rekomendasiSebelumBimbingan:
      generateSupervisorRecommendations(findings),

    kesiapan: readiness,

    kelengkapanDokumen: completeness
  };
}


/* =========================================================
   20. REKOMENDASI SEBELUM BIMBINGAN
   ========================================================= */

function generateSupervisorRecommendations(findings) {
  const recommendations = [];

  const hasCritical = findings.some(
    (f) => f.tingkatPrioritas === "Sangat Penting"
  );

  const hasImportant = findings.some(
    (f) => f.tingkatPrioritas === "Penting"
  );

  if (hasCritical) {
    recommendations.push(
      "Prioritaskan penyelesaian masalah substansial atau metodologis sebelum melakukan penyempurnaan bahasa."
    );
  }

  if (hasImportant) {
    recommendations.push(
      "Siapkan penjelasan akademik dan bukti pendukung untuk bagian yang masih dipertanyakan."
    );
  }

  recommendations.push(
    "Jangan mengubah data atau hasil penelitian hanya untuk menyesuaikannya dengan teori atau ekspektasi."
  );

  recommendations.push(
    "Verifikasi bagian yang ditandai 'Perlu Verifikasi' sebelum mengambil keputusan revisi."
  );

  recommendations.push(
    "Gunakan pedoman resmi institusi sebagai acuan akhir untuk format skripsi."
  );

  return recommendations;
}


/* =========================================================
   21. AUDIT UTAMA
   ========================================================= */

function auditSkripsi(input) {
  const validation = validateInput(input);

  if (!validation.valid) {
    return {
      success: false,
      errors: validation.errors
    };
  }

  const document = input.document;

  const findings = [];

  /*
   * PHASE 1
   * AUDIT
   *
   * Pada tahap ini sistem hanya mengidentifikasi,
   * mengklasifikasikan, dan menjelaskan masalah.
   *
   * Sistem tidak melakukan rewrite otomatis.
   */

  findings.push(...checkTitle(document));

  findings.push(...checkResearchQuestions(document));

  findings.push(...checkLogicChain(document));

  findings.push(...checkMethodology(document));

  findings.push(...checkResults(document));

  findings.push(...checkDiscussion(document));

  findings.push(...checkConclusion(document));

  findings.push(...checkReferences(document));

  findings.push(...checkAcademicLanguage(document));

  findings.push(...checkPlagiarism(document));

  findings.push(...checkFormat(document));

  findings.push(...checkConsistency(document));

  const completeness = calculateCompleteness(document);

  const sortedFindings = sortFindingsByPriority(findings);

  const readiness = assessReadiness(
    sortedFindings,
    completeness
  );

  const summary = generateSummary(
    sortedFindings,
    readiness,
    completeness
  );

  return {
    success: true,

    mode: SKILL_CONFIG.mode,

    phase: "AUDIT",

    principles: SKILL_CONFIG.prinsip,

    findings: sortedFindings,

    summary
  };
}


/* =========================================================
   22. PHASE 2 — RENCANA REVISI
   ========================================================= */

function createRevisionPlan(auditResult) {
  if (!auditResult || !auditResult.success) {
    throw new Error(
      "Hasil audit diperlukan sebelum membuat rencana revisi."
    );
  }

  const findings = auditResult.findings;

  /*
   * PHASE 2
   *
   * Revision Planning dilakukan SETELAH audit.
   * Sistem tidak boleh diam-diam mengubah metodologi,
   * data, atau makna penelitian.
   */

  return findings.map((finding, index) => ({
    nomor: index + 1,
    lokasi: finding.lokasi,
    kategori: finding.kategori,
    prioritas: finding.tingkatPrioritas,
    masalah: finding.temuan,
    tindakan: finding.perbaikan,
    status: "Belum direvisi"
  }));
}


/* =========================================================
   23. FORMAT OUTPUT
   ========================================================= */

function formatAuditReport(auditResult) {
  if (!auditResult.success) {
    return auditResult;
  }

  const { summary, findings } = auditResult;

  return {
    judul: "Laporan Audit Skripsi",

    mode: auditResult.mode,

    ringkasan:
      "Pemeriksaan dilakukan berdasarkan informasi yang tersedia. Temuan yang tidak dapat diverifikasi tidak boleh dianggap sebagai fakta.",

    kesiapanSkripsi: summary.kesiapan,

    kelengkapanDokumen: summary.kelengkapanDokumen,

    kelemahanUtama: summary.kelemahanUtama,

    revisiWajib: summary.revisiWajib,

    revisiDisarankan: summary.revisiDisarankan,

    dataYangMasihDiperlukan:
      summary.dataYangMasihDiperlukan,

    risiko: summary.risiko,

    rekomendasiSebelumBimbingan:
      summary.rekomendasiSebelumBimbingan,

    seluruhTemuan: findings
  };
}


/* =========================================================
   24. PIPELINE UTAMA
   ========================================================= */

function runPembimbingSkripsi(input) {
  /*
   * ALUR PROGRAM
   *
   * INPUT
   *   ↓
   * Validasi dokumen
   *   ↓
   * Pemeriksaan kelengkapan
   *   ↓
   * Audit substansi
   *   ↓
   * Audit metodologi
   *   ↓
   * Audit data
   *   ↓
   * Audit pembahasan
   *   ↓
   * Audit kesimpulan
   *   ↓
   * Audit sitasi & referensi
   *   ↓
   * Audit bahasa
   *   ↓
   * Audit format
   *   ↓
   * Audit konsistensi
   *   ↓
   * Klasifikasi temuan
   *   ↓
   * Prioritas masalah
   *   ↓
   * Penilaian kesiapan
   *   ↓
   * Laporan audit
   *   ↓
   * Rencana revisi
   */

  const audit = auditSkripsi(input);

  if (!audit.success) {
    return audit;
  }

  const report = formatAuditReport(audit);

  const revisionPlan = createRevisionPlan(audit);

  return {
    ...report,

    revisionPlan
  };
}


/* =========================================================
   25. CONTOH INPUT
   ========================================================= */

const contohSkripsi = {
  document: {
    "Judul":
      "Pengaruh Penggunaan Teknologi Digital terhadap Produktivitas Mahasiswa",

    "Latar belakang":
      "Latar belakang penelitian...",

    "Identifikasi masalah":
      "Identifikasi masalah...",

    "Batasan masalah":
      "Batasan masalah...",

    "Rumusan masalah":
      "Apakah penggunaan teknologi digital berpengaruh terhadap produktivitas mahasiswa?",

    "Tujuan penelitian":
      "Menganalisis pengaruh penggunaan teknologi digital terhadap produktivitas mahasiswa.",

    "Manfaat penelitian":
      "Manfaat penelitian...",

    "Kajian teori":
      "Kajian teori...",

    "Penelitian terdahulu":
      "Penelitian terdahulu...",

    "Research gap":
      "Research gap...",

    "Kerangka berpikir":
      "Kerangka berpikir...",

    "Hipotesis":
      "Terdapat pengaruh penggunaan teknologi digital terhadap produktivitas mahasiswa.",

    "Metode penelitian":
      "Metode penelitian...",

    "Desain penelitian":
      "Desain penelitian...",

    "Populasi dan sampel/informan":
      "Populasi dan sampel...",

    "Teknik sampling":
      "Teknik sampling...",

    "Teknik pengumpulan data":
      "Teknik pengumpulan data...",

    "Instrumen penelitian":
      "Instrumen penelitian...",

    "Validitas dan reliabilitas":
      "Validitas dan reliabilitas...",

    "Teknik analisis data":
      "Teknik analisis data...",

    "Hasil penelitian":
      "Hasil penelitian...",

    "Pembahasan":
      "Pembahasan...",

    "Kesimpulan":
      "Kesimpulan...",

    "Saran":
      "Saran...",

    "Daftar pustaka":
      "Daftar pustaka...",

    "Tabel":
      "Tabel penelitian...",

    "Gambar":
      "Gambar penelitian...",

    "Lampiran":
      "Lampiran penelitian..."
  }
};


/* =========================================================
   26. MENJALANKAN SISTEM
   ========================================================= */

const hasilAudit = runPembimbingSkripsi(
  contohSkripsi
);

console.log(
  JSON.stringify(
    hasilAudit,
    null,
    2
  )
);


/* =========================================================
   27. API SEDERHANA
   ========================================================= */

/**
 * Fungsi ini dapat digunakan jika sistem nantinya
 * dihubungkan dengan aplikasi web/API.
 */

function analyzeThesis(document) {
  return runPembimbingSkripsi({
    document
  });
}


/**
 * Fungsi khusus untuk mendapatkan temuan
 * berdasarkan kategori.
 */

function getFindingsByCategory(result, category) {
  if (!result || !result.seluruhTemuan) {
    return [];
  }

  return result.seluruhTemuan.filter(
    (finding) =>
      finding.kategori === category
  );
}


/**
 * Fungsi khusus untuk mendapatkan temuan
 * berdasarkan prioritas.
 */

function getFindingsByPriority(result, priority) {
  if (!result || !result.seluruhTemuan) {
    return [];
  }

  return result.seluruhTemuan.filter(
    (finding) =>
      finding.tingkatPrioritas === priority
  );
}


/**
 * Fungsi untuk mendapatkan revisi wajib.
 */

function getMandatoryRevisions(result) {
  if (!result || !result.revisiWajib) {
    return [];
  }

  return result.revisiWajib;
}


/**
 * Fungsi untuk mendapatkan status kesiapan.
 */

function getReadiness(result) {
  return result?.kesiapanSkripsi || {
    level: "Belum dapat dinilai",
    alasan: "Hasil audit belum tersedia."
  };
}


/* =========================================================
   28. EKSPOR MODULE
   ========================================================= */

export {
  SKILL_CONFIG,

  normalizeText,
  isEmpty,
  containsText,
  getSection,

  createFinding,
  validateInput,

  checkDataAvailability,
  checkTitle,
  checkResearchQuestions,
  checkLogicChain,
  checkMethodology,
  checkResults,
  checkDiscussion,
  checkConclusion,
  checkReferences,
  checkAcademicLanguage,
  checkPlagiarism,
  checkFormat,
  checkConsistency,

  sortFindingsByPriority,
  calculateCompleteness,
  assessReadiness,
  generateSummary,
  generateSupervisorRecommendations,

  auditSkripsi,
  createRevisionPlan,
  formatAuditReport,
  runPembimbingSkripsi,

  analyzeThesis,
  getFindingsByCategory,
  getFindingsByPriority,
  getMandatoryRevisions,
  getReadiness
};
