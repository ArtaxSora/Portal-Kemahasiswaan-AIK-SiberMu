import { useState, useEffect, useRef } from 'react'
import {
  ShieldCheck, ChevronRight, MapPin, Mail, Globe, Menu, X, ArrowUpRight,
  Activity, ExternalLink
} from 'lucide-react'

function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-visible'); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

function Reveal({ children, delay = 0, className = '', id, ...rest }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }} id={id} {...rest}>{children}</div>
}

const HERO_SLIDES = [
  { img: '/hero/quran.jpg', alt: 'Al-Quran terbuka dengan tasbih di atas meja kayu' },
  { img: '/hero/laptop-meja.jpg', alt: 'Laptop coding di atas meja kerja' },
  { img: '/hero/masjid.jpg', alt: 'Interior masjid dengan kaligrafi Islami' }
]

function AccordionCard({ title, desc, items, badge, photo }) {
  const [openIdx, setOpenIdx] = useState(null)
  // Cek apakah photo adalah key dari EVENT_IMAGES atau URL langsung
  const imgUrl = EVENT_IMAGES[photo] || photo
  
  return (
    <article className="card accordion-card">
      <div className="card-img-wrap">
        <img src={imgUrl} alt={title} />
        <span className="card-badge">{badge}</span>
      </div>
      <div className="card-body">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div className="card-footer accordion-list">
        {items.map(([label, detail], i) => (
          <div key={label} className={`accordion-item${openIdx === i ? ' is-open' : ''}`}>
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="accordion-trigger">
              <ChevronRight size={14} className={`accordion-arrow${openIdx === i ? ' rotated' : ''}`} />
              <span>{label}</span>
            </button>
            <div className="accordion-content">
              <p>{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

const PHRASES = ['Mahasiswa aktif di 34 provinsi', '6 program studi PJJ', 'BEM & DPM ranah digital', 'Baitul Arqam wajib S1']

function Typewriter() {
  const [i, setI] = useState(0)
  const [n, setN] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const full = PHRASES[i].length
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(full); return }
    if (!del && n === full) {
      const t = setTimeout(() => setDel(true), 1800)
      return () => clearTimeout(t)
    }
    if (del && n === 0) { setDel(false); setI(v => (v + 1) % PHRASES.length); return }
    const t = setTimeout(() => setN(n + (del ? -1 : 1)), del ? 35 : 75)
    return () => clearTimeout(t)
  }, [i, n, del])

  return <span className="typewriter" aria-live="polite">{PHRASES[i].slice(0, n)}<i className="tw-cursor" aria-hidden="true" /></span>
}

const KEMAHASISWAAN = [
  ['Organisasi Mahasiswa', 'Pusat kepemimpinan mahasiswa PJJ. Mengelola aspirasi, kebijakan strategis, dan program kerja lintas daerah secara virtual maupun hybrid.', [['Kabinet Eksekutif Mahasiswa', 'Mengkoordinasikan seluruh unit kegiatan dan eksekusi program kerja tahunan.'], ['Sidang Pleno DPM SiberMu', 'Forum legislatif mahasiswa untuk pengawasan dan penetapan kebijakan.']], 'BEM & DPM', '/hero/organisasi.jpg'],
  ['Unit Kegiatan Mahasiswa', 'Wadah hobi, riset teknologi siber, kewirausahaan, seni, dan pengembangan skill praktis bagi mahasiswa PJJ.', [['UKM Cyber Security & Coding', 'Kompetisi CTF, workshop coding, dan riset keamanan jaringan.'], ['UKM Bisnis & E-Commerce', 'Inkubator bisnis digital dan pelatihan kewirausahaan syariah.']], 'Minat & Bakat', '/hero/ukm.jpg'],
  ['Prestasi & Rekognisi', 'Apresiasi tinggi atas pencapaian mahasiswa SiberMu dalam kompetisi tingkat nasional maupun internasional.', [['Juara Hackathon Nasional', 'Rekor medali emas dalam ajang kompetisi programming bergengsi.'], ['Hibah Program Kreativitas', 'Pendanaan riset inovatif dari Kementerian Pendidikan.']], 'Rekognisi', '/hero/prestasi.jpg'],
  ['Layanan Holistik', 'Dukungan akademik, konseling psikologi online, beasiswa, serta bimbingan karier terpadu bagi seluruh mahasiswa.', [['Konseling & Bimbingan PJJ', 'Layanan kesehatan mental dan mentoring akademik 24/7.'], ['Beasiswa Kader & Prestasi', 'Skema bantuan biaya kuliah untuk mahasiswa berprestasi dan aktif.']], 'Support Center', '/hero/layanan.jpg']
]

const AIK = [
  ['Kajian Tematik & Cyber Dakwah', 'Menghidupkan risalah Islam rahmatan lil alamin melalui medium digital. Kultum siber, diskusi kitab, dan pelatihan content creator dakwah Islami.', 'Agenda Jumat Berkah', 'Online Live', 'Syiar Digital', '/hero/kajian.jpg'],
  ['Program Baitul Arqam Online', 'Pembinaan ideologi Muhammadiyah untuk menanamkan militansi kader, pemahaman nilai Islam berkemajuan, serta etika mulia dalam teknologi.', 'Wajib Kelulusan S1', 'Sertifikat Resmi', 'Ideologi Kader', '/hero/dakwah.jpg'],
  ['Bayani, Burhani, & Irfani', 'Kerangka berpikir integratif: teks suci (Bayani), sains dan empiris (Burhani), serta intuisi spiritual (Irfani) dalam merancang peradaban siber.', 'Pondasi Etika Digital', 'Khas SiberMu', 'Epistemologi', '/hero/prestasi.jpg']
]

const GALERI = [
  ['Webinar', 'Kuliah Umum Cyber Security Nasional', 'tag-webinar', 'hero/layanan.jpg'],
  ['Baitul Arqam', 'Baitul Arqam Mahasiswa Baru PJJ', 'tag-aik', 'quran-study'],
  ['Ormawa', 'Sidang Paripurna BEM & DPM SiberMu', 'tag-ormawa', 'hero/ormawa.jpg'],
  ['KKN', 'Pemberdayaan UMKM Digital oleh Mahasiswa', 'tag-kkn', 'hero/prestasi.jpg']
]

// Helper untuk map nama event ke URL gambar Pexels (bebas hak cipta, nuansa Islami & Akademis)
const EVENT_IMAGES = {
  'hijab-study': 'https://images.pexels.com/photos/9383055/pexels-photo-9383055.jpeg?auto=compress&cs=tinysrgb&w=800', // Muslim girls in hijab studying
  'hijab-group': 'https://images.pexels.com/photos/4004206/pexels-photo-4004206.jpeg?auto=compress&cs=tinysrgb&w=800', // Group of muslim students
  'mosque-interior': 'https://images.pexels.com/photos/1176115/pexels-photo-1176115.jpeg?auto=compress&cs=tinysrgb&w=800', // Mosque interior
  'quran-study': 'https://images.pexels.com/photos/32668051/pexels-photo-32668051.jpeg?auto=compress&cs=tinysrgb&w=800', // Woman in hijab classroom/study
  'campus-muslim': 'https://images.pexels.com/photos/6084279/pexels-photo-6084279.jpeg?auto=compress&cs=tinysrgb&w=800' // Muslim female student laptop
}

const PRODI = [
  { title: 'S1 Informatika', img: '/hero/prodi-informatika.jpg' },
  { title: 'S1 Sistem Informasi', img: '/hero/prodi-si.jpg' },
  { title: 'S1 Administrasi Kesehatan', img: '/hero/prodi-kesehatan.jpg' },
  { title: 'S1 Akuntansi', img: '/hero/prodi-akuntansi.jpg' },
  { title: 'S1 Manajemen', img: '/hero/prodi-manajemen.jpg' },
  { title: 'S1 Hukum', img: '/hero/prodi-hukum.jpg' }
]

const SINERGI = [
  ['01', 'Etika & Keamanan Siber', 'Mahasiswa IT tidak hanya belajar coding & penetration testing, tetapi juga dibekali etika digital Islami untuk menjaga keamanan data umat dan bangsa.'],
  ['02', 'KKN PJJ Berkemajuan', 'Program pengabdian masyarakat menerapkan keahlian digital mahasiswa untuk memberdayakan UMKM, masjid, dan ranting Muhammadiyah di seluruh Indonesia.'],
  ['03', 'Kepemimpinan Transformatif', 'BEM dan DPM dilandasi nilai musyawarah mufakat serta semangat fastabiqul khairat, menciptakan pemimpin masa depan yang cerdas teknologi dan spiritual.']
]

const FINDER = {
  tech: ['UKM Cyber Security & Riset Informatika', 'Sangat cocok untuk mahasiswa yang ingin menguasai penetesting, secure coding, dan etika riset siber Islami.'],
  social: ['BEM SiberMu & Dewan Perwakilan Mahasiswa', 'Wadah kepemimpinan nasional, diplomasi mahasiswa PJJ lintas provinsi, dan advokasi hak mahasiswa.'],
  business: ['UKM Bisnis Digital & Inkubator Startup', 'Mengembangkan jiwa entrepreneurship digital, e-commerce syariah, dan manajemen inovasi bisnis.'],
  dakwah: ['Kajian Tematik AIK & Cyber Dakwah', 'Menggabungkan semangat spiritualitas dalam memproduksi konten dakwah kreatif yang mencerahkan umat.']
}

const FAQ = [
  ['Bagaimana sistem perkuliahan dan kegiatan kemahasiswaan di SiberMu?', 'Perkuliahan diselenggarakan 100% secara daring melalui LMS modern. Kegiatan kemahasiswaan seperti BEM, DPM, dan UKM berjalan secara virtual kolaboratif serta pertemuan hybrid berkala di kota-kota strategis.'],
  ['Apakah mahasiswa PJJ tetap mendapatkan bimbingan karier dan beasiswa?', 'Tentu. SiberMu menyediakan unit bimbingan karier terpadu, job fair online, inkubator bisnis, serta akses berbagai beasiswa seperti Beasiswa Kader Persyarikatan dan Beasiswa Prestasi.'],
  ['Apa itu Program Baitul Arqam Mahasiswa di SiberMu?', 'Baitul Arqam adalah kegiatan orientasi ideologi dan pembinaan karakter khas Muhammadiyah secara online interaktif, wajib bagi seluruh mahasiswa sebagai syarat kelulusan jenjang S1.'],
  ['Berapa biaya kuliah di Universitas Siber Muhammadiyah?', 'Biaya kuliah di SiberMu sangat terjangkau mulai dari Rp1.000.000,- per semester dengan fleksibilitas cicilan bulanan untuk mendukung pemerataan akses pendidikan tinggi berkualitas.']
]

const NAV_ITEMS = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Kemahasiswaan', href: '#kemahasiswaan' },
  { label: 'AIK & Dakwah', href: '#aik' },
  {
    label: 'Program Studi', href: '#prodi',
    children: [
      { label: 'S1 Informatika', href: '#prodi' },
      { label: 'S1 Sistem Informasi', href: '#prodi' },
      { label: 'S1 Administrasi Kesehatan', href: '#prodi' },
      { label: 'S1 Akuntansi', href: '#prodi' },
      { label: 'S1 Manajemen', href: '#prodi' },
      { label: 'S1 Hukum', href: '#prodi' }
    ]
  },
  { label: 'Galeri Kegiatan', href: '#galeri' },
  { label: 'Sinergi Nilai', href: '#sinergi' },
  { label: 'FAQ', href: '#faq' }
]

function NavDropdown({ item }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const timer = useRef(null)

  const enter = () => { clearTimeout(timer.current); setOpen(true) }
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 150) }

  useEffect(() => {
    return () => clearTimeout(timer.current)
  }, [])

  if (!item.children) {
    return <a href={item.href}>{item.label}</a>
  }

  return (
    <div className={`nav-dropdown${open ? ' is-open' : ''}`} ref={ref} onMouseEnter={enter} onMouseLeave={leave}>
      <a href={item.href} className="nav-dropdown-trigger">
        {item.label}
        <ChevronRight size={12} className="nav-dropdown-caret" aria-hidden="true" />
      </a>
      {open && (
        <ul className="nav-dropdown-menu">
          {item.children.map((child) => (
            <li key={child.label}>
              <a href={child.href} onClick={() => setOpen(false)}>{child.label}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ProdiCarousel() {
  const wrapRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const currentTranslate = useRef(0)
  const prevTranslate = useRef(0)
  const rafId = useRef(0)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    
    let pos = 0
    let speed = 0.5 // px per frame
    let dragging = false
    let lastX = 0
    let velocity = 0

    const animate = () => {
      if (!dragging) {
        pos -= speed
        // Reset silently when we've scrolled past the first set width
        const halfWidth = el.scrollWidth / 2
        if (Math.abs(pos) >= halfWidth) {
          pos += halfWidth
        }
        el.scrollLeft = Math.abs(pos)
      }
      rafId.current = requestAnimationFrame(animate)
    }

    const onPointerDown = (e) => {
      dragging = true
      lastX = e.clientX
      cancelAnimationFrame(rafId.current)
      el.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e) => {
      if (!dragging) return
      const dx = e.clientX - lastX
      lastX = e.clientX
      el.scrollLeft -= dx
      pos = -el.scrollLeft
    }

    const onPointerUp = () => {
      dragging = false
      rafId.current = requestAnimationFrame(animate)
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerup', onPointerUp)
    el.addEventListener('pointercancel', onPointerUp)

    rafId.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId.current)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerup', onPointerUp)
      el.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  return (
    <div className="prodi-carousel-wrap" ref={wrapRef}>
      <div className="prodi-carousel-track">
        {[...PRODI, ...PRODI].map((p, i) => (
          <a key={`${p.title}-${i}`} href="#pendaftaran" className="prodi-card" draggable={false}>
            <img src={p.img} alt={p.title} draggable={false} />
            <div className="prodi-overlay">
              <h3>{p.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

const TAB_OPTIONS = [
  ['all', 'Semua Bagian'],
  ['kemahasiswaan', 'Bidang Kemahasiswaan'],
  ['aik', 'Al-Islam & Kemuhammadiyahan'],
]

/* Custom dropdown: button + same-page menu (no native select popout,
   so it never leaks past the viewport edge). Keyboard: Enter/Space
   toggle, Esc close, arrows move focus. Tap target: 44px min. */
function TabDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const active = TAB_OPTIONS.find(([v]) => v === value)?.[1] ?? TAB_OPTIONS[0][1]

  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!rootRef.current?.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open ])

  const pick = (v) => { onChange(v); setOpen(false) }

  return (
    <div className={`tab-dd${open ? ' is-open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="tab-dd-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span>{active}</span>
        <ChevronRight size={16} className="tab-dd-caret" aria-hidden="true" />
      </button>
      {open && (
        <ul className="tab-dd-menu" role="listbox" aria-label="Pilih bagian konten">
          {TAB_OPTIONS.map(([v, l]) => (
            <li key={v} role="option" aria-selected={v === value}>
              <button
                type="button"
                className={`tab-dd-item${v === value ? ' is-active' : ''}`}
                onClick={() => pick(v)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(v) }
                }}
              >
                {v === value && <ChevronRight size={14} aria-hidden="true" />}
                <span>{l}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Loader({ done }) {
  return (
    <div className={`boot${done ? ' boot-done' : ''}`} role="status" aria-live="polite">
      <div className="boot-inner">
        <div className="boot-mark">
          <img src="/logo-sibermu.png" alt="SiberMu" className="boot-logo" />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [booted, setBooted] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 1700)
    return () => clearTimeout(timer)
  }, [])
  const [slideIdx, setSlideIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % HERO_SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])
  const [tab, setTab] = useState('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const [interest, setInterest] = useState('tech')
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    const fill = document.querySelector('.progress-fill')
    const mast = document.querySelector('.masthead')
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        if (fill) fill.style.transform = `scaleX(${max > 0 ? y / max : 0})`
        if (mast) mast.classList.toggle('scrolled', y > 24)

        if (!mql.matches) {
          for (const el of document.querySelectorAll('[data-parallax]')) {
            const r = el.getBoundingClientRect()
            if (r.bottom < -100 || r.top > window.innerHeight + 100) continue
            // distance of this element's centre from viewport centre, in px
            const off = r.top + r.height / 2 - window.innerHeight / 2
            el.style.transform = `translate3d(0, ${(-off * parseFloat(el.dataset.parallax)).toFixed(2)}px, 0)`
          }
        }
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const [recTitle, recBody] = FINDER[interest]

  return (
    <>
      <div className="progress-track" aria-hidden="true"><div className="progress-fill" /></div>
      <Loader done={booted} />



      <header className="masthead">
        <div className="wrap masthead-inner">
          <a className="brand" href="#beranda">
            <img className="brand-logo" src="/logo-sibermu.png" alt="Universitas Siber Muhammadiyah" width={168} height={51} />
          </a>
          <nav className="primary-nav">
            {NAV_ITEMS.map((item) => (
              <NavDropdown key={item.label} item={item} />
            ))}
          </nav>
          <div className="head-cta">
            <a className="btn btn-outline-white" href="https://sibermu.ac.id" target="_blank" rel="noreferrer">Portal Resmi</a>
            <a className="btn btn-gold" href="#pendaftaran">PMB Online</a>
          </div>
          <button className="menu-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="menu-overlay" role="dialog" aria-modal="true">
          <nav className="menu-nav">
            {NAV_ITEMS.map((item, i) => (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{ animationDelay: `${80 + i * 70}ms` }}>
                <span className="menu-item-num">0{i + 1}</span>
                <span className="menu-item-label">{item.label}</span>
              </a>
            ))}
          </nav>
          <div className="menu-footer">
            <a className="btn btn-gold" href="#pendaftaran" onClick={() => setMenuOpen(false)}>Daftar Sekarang <ArrowUpRight size={17} /></a>
            <p className="menu-deadline">PMB 2026/2027 — Universitas Siber Muhammadiyah</p>
          </div>
        </div>
      )}

      <main>
        <section id="beranda" className="hero-carousel">
          <div className="carousel-track">
            {HERO_SLIDES.map((s, i) => (
              <div key={i} className={`carousel-slide${i === slideIdx ? ' is-active' : ''}`}>
                <img src={s.img} alt={s.alt} />
              </div>
            ))}
          </div>
          <div className="carousel-overlay" aria-hidden="true" />
          <div className="wrap carousel-content">
            <Reveal delay={80}>
              <h1>Membangun Peradaban Siber Berlandaskan <em>Islam Berkemajuan</em>.</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="hero-status"><span className="tw-dot" /> <Typewriter /></p>
            </Reveal>
            <Reveal delay={200}>
              <p className="hero-lead">Pusat kolaborasi digital mahasiswa Pendidikan Jarak Jauh (PJJ). Menghubungkan kreativitas organisasi mahasiswa, riset teknologi mutakhir, dengan kedalaman spiritual Al-Islam &amp; Kemuhammadiyahan.</p>
            </Reveal>
            <Reveal delay={280}>
              <div className="hero-actions">
                <a className="btn btn-gold" href="#kemahasiswaan">Jelajahi Kemahasiswaan <ArrowUpRight size={17} /></a>
                <a className="btn btn-outline-white" href="#galeri">Lihat Aktivitas &amp; Galeri</a>
              </div>
            </Reveal>
          </div>
          <div className="carousel-dots" role="tablist" aria-label="Hero slides">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} role="tab" aria-selected={i === slideIdx} aria-label={`Slide ${i + 1}`} className={i === slideIdx ? 'active' : ''} onClick={() => setSlideIdx(i)} />
            ))}
          </div>
          <div className="wrap hero-stats-bar">
            {[['6 Prodi', 'Informatika, Sistem Informasi, dan lainnya'], ['BEM & DPM', 'Ormawa & UKM Mahasiswa Siber'], ['Baitul Arqam', 'Pembinaan Karakter & AIK'], ['Cyber Dakwah', 'Syiar Islam Rahmatan Lil Alamin']].map(([n, d]) => (
              <div key={n} className="hero-stat-num"><strong>{n}</strong><span>{d}</span></div>
            ))}
          </div>
        </section>

        <section className="tab-bar">
          <div className="wrap tab-inner">
            <span className="tab-label"><Activity size={18} /> Navigasi Konten</span>
            <TabDropdown value={tab} onChange={setTab} />
            <div className="tab-btns">
              {[['all', 'Semua Bagian'], ['kemahasiswaan', 'Bidang Kemahasiswaan'], ['aik', 'Al-Islam &amp; Kemuhammadiyahan']].map(([v, l]) => (
                <button key={v} onClick={() => setTab(v)} className={tab === v ? 'active' : ''} dangerouslySetInnerHTML={{ __html: l }} />
              ))}
            </div>
          </div>
        </section>

        <div className="content-area">
          <div className="wrap space-y-28">

            {(tab === 'all' || tab === 'kemahasiswaan') && (
              <Reveal id="kemahasiswaan">
                <div className="section-label">
                  <h2>Kehidupan &amp; Layanan Kemahasiswaan</h2>
                  <p>Wadah pengembangan diri mahasiswa SiberMu yang dinamis: organisasi mahasiswa, unit kegiatan minat bakat, prestasi nasional, dan layanan holistik berbasis digital.</p>
                </div>
                <div className="grid-auto">
                  {KEMAHASISWAAN.map(([title, desc, items, badge, photo]) => (
                    <AccordionCard key={title} title={title} desc={desc} items={items} badge={badge} photo={photo} />
                  ))}
                </div>
                <div className="section-cta">
                  <a href="#pendaftaran" className="btn btn-outline">Lihat Semua</a>
                </div>
              </Reveal>
            )}

            {(tab === 'all' || tab === 'aik') && (
              <Reveal id="aik">
                <div className="section-label">
                  <h2>Al-Islam &amp; Kemuhammadiyahan (AIK)</h2>
                  <p>Fondasi moral dan spiritual civitas akademika SiberMu — pencerahan nilai Islam berkemajuan yang adaptif di era digital.</p>
                </div>
                <div className="grid-auto">
                  {AIK.map(([title, desc, t1, t2, badge, photo]) => (
                    <article key={title} className="card">
                      <div className="card-img-wrap card-img-tall">
                        <img src={photo.startsWith('/') ? photo : (EVENT_IMAGES[photo] || photo)} alt={title} />
                        <span className="card-badge card-badge-top">{badge}</span>
                      </div>
                      <div className="card-body">
                        <h3>{title}</h3>
                        <p>{desc}</p>
                      </div>
                      <div className="card-footer card-footer-split">
                        <span>{t1}</span>
                        <span className="tag-plain">{t2}</span>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="section-cta">
                  <a href="#pendaftaran" className="btn btn-outline">Lihat Semua</a>
                </div>
              </Reveal>
            )}

            <Reveal id="prodi" data-parallax="0.03">
              <div className="section-label">
                <span>Pendidikan Jarak Jauh</span>
                <h2>6 Program Studi Unggulan</h2>
                <p>Kurikulum terintegrasi teknologi mutakhir dan nilai Islam berkemajuan, dirancang fleksibel untuk mahasiswa PJJ.</p>
              </div>
              <ProdiCarousel />
            </Reveal>

            <Reveal id="galeri" data-parallax="0.03">
              <div className="section-label">
                <span>Dokumentasi Nyata</span>
                <h2>Galeri Kegiatan &amp; Aktivitas Mahasiswa</h2>
                <p>Potret/entusiasme mahasiswa SiberMu dalam kegiatan belajar jarak jauh, webinar nasional, kolaborasi riset, dan pengabdian masyarakat.</p>
              </div>
              <div className="grid-auto" data-parallax="0.04">
                {GALERI.map(([tag, title, cls, photoKey]) => {
                  const imgUrl = EVENT_IMAGES[photoKey] || photoKey
                  return (
                    <figure key={title} className="galery-card">
                      <img src={imgUrl} alt={title} />
                      <figcaption className="galery-overlay">
                        <span className={`galery-tag ${cls}`}>{tag}</span>
                        <h4>{title}</h4>
                      </figcaption>
                    </figure>
                  )
                })}
              </div>
            </Reveal>

            <Reveal id="sinergi" className="sinergi-box" data-parallax="0.05">
              <div className="sinergi-inner">
                <h2>Bagaimana Kemahasiswaan &amp; AIK Melebur?</h2>
                <p>Teknologi tinggi dan akhlak mulia berjalan beriringan membentuk lulusan yang kompeten dan berintegritas.</p>
              </div>
              <div className="grid-auto">
                {SINERGI.map(([num, title, desc]) => (
                  <article key={num} className="sinergi-card">
                    <div className="sinergi-num">{num}</div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal className="finder-box">
              <h2>Temukan Jalur Aktivitas Kampusmu</h2>
              <p>Pilih minat utama untuk melihat rekomendasi UKM dan program AIK yang paling cocok dengan potensimu.</p>
              <div className="finder-grid">
                <div className="finder-options">
                  {[['tech', 'Teknologi & Coding'], ['social', 'Organisasi & Sosial'], ['business', 'Bisnis & Startup'], ['dakwah', 'Dakwah & Kajian AIK']].map(([v, l]) => (
                    <button key={v} onClick={() => setInterest(v)} className={interest === v ? 'active' : ''}>{l}</button>
                  ))}
                </div>
                <div className="finder-result">
                  <div>
                    <div className="finder-result-label">Rekomendasi Aktivitas</div>
                    <h3>{recTitle}</h3>
                    <p>{recBody}</p>
                  </div>
                  <a href="#pendaftaran">Daftar &amp; Gabung Program Ini <ArrowUpRight size={16} /></a>
                </div>
              </div>
            </Reveal>

            <Reveal id="faq" data-parallax="0.04">
              <div className="section-label">
                <h2>Pertanyaan yang Sering Diajukan</h2>
                <p>Informasi penting seputar fleksibilitas PJJ, kegiatan organisasi, dan keunggulan AIK di SiberMu.</p>
              </div>
              <div className="faq-list">
                {FAQ.map(([q, a], i) => (
                  <div key={q} className="faq-item">
                    <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="faq-q" aria-expanded={openFaq === i}>
                      <span>{q}</span>
                      <span className={`faq-plus${openFaq === i ? ' rotated' : ''}`}>+</span>
                    </button>
                    <div className="faq-a" data-open={openFaq === i}><div className="faq-a-inner"><p>{a}</p></div></div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal id="pendaftaran" className="cta-box">
              <div className="cta-inner">
                <div>
                  <h2>Siap Bergabung dengan Kampus Siber Pertama?</h2>
                  <p>Kuliah fleksibel berkualitas tinggi dengan biaya terjangkau (mulai Rp1 juta/semester), didukung penuh jaringan Persyarikatan Muhammadiyah.</p>
                </div>
                <div className="cta-actions">
                  <a className="btn btn-gold" href="https://sibermu.ac.id/pendaftaran" target="_blank" rel="noreferrer">Daftar Online Sekarang</a>
                  <a className="btn btn-outline" href="https://sibermu.ac.id" target="_blank" rel="noreferrer">Info Lebih Lanjut <ExternalLink size={15} /></a>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="footer-bg-word" aria-hidden="true">SIBERMU</div>
        <div className="wrap footer-grid">
          <div className="footer-col footer-brand-col">
            <p className="footer-muted">Perguruan tinggi Siber pertama di lingkungan PTMA dengan modus tunggal PJJ.</p>
            <p className="footer-muted footer-copy">© 2026 Universitas Siber Muhammadiyah</p>
          </div>
          <div className="footer-col">
            <h4>Kampus Pusat</h4>
            <a href="#beranda"><MapPin size={14} />Jl. HOS Cokroaminoto No. 17, Yogyakarta, DIY 55253</a>
            <a href="#beranda"><Mail size={14} />humas@sibermu.ac.id</a>
            <a href="https://sibermu.ac.id" target="_blank" rel="noreferrer"><Globe size={14} />sibermu.ac.id</a>
          </div>
          <div className="footer-col">
            <h4>Menu Utama</h4>
            <a href="#kemahasiswaan">Bidang Kemahasiswaan</a>
            <a href="#aik">Al-Islam &amp; Kemuhammadiyahan</a>
            <a href="#galeri">Galeri Kegiatan</a>
            <a href="#sinergi">Sinergi Nilai</a>
            <a href="#pendaftaran">Pendaftaran PMB</a>
          </div>
          <div className="footer-col">
            <h4>Program Studi PJJ</h4>
            {['S1 Informatika', 'S1 Sistem Informasi', 'S1 Administrasi Kesehatan', 'S1 Akuntansi', 'S1 Manajemen', 'S1 Hukum'].map(p => (
              <p key={p} className="footer-prodi">{p}</p>
            ))}
          </div>
        </div>
        <div className="wrap footer-bottom">
          <p>Kemahasiswaan &amp; AIK — Universitas Siber Muhammadiyah</p>
        </div>
      </footer>
    </>
  )
}
