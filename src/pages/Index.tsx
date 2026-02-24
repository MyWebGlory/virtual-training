import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Monitor, Users, BarChart3, Wrench, ClipboardCheck, UserCheck,
  CheckCircle2, XCircle, Star, Phone, Mail, Linkedin, ChevronDown,
  Zap, Shield, Layers, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import austinPhoto from "@/assets/austin-talley-founder.png";
import vmLogo from "@/assets/vm-logo-white.png";
import heroBg from "@/assets/hero-bg.webp";
import controlRoom from "@/assets/virtual-events-control-room.webp";
import videoProduction from "@/assets/video-production.webp";
import meetingProsVideo from "@/assets/meeting-pros-video.mp4";
import logoNike from "@/assets/logos/nike.png";
import logoHp from "@/assets/logos/hp.png";
import logoAdidas from "@/assets/logos/adidas.png";
import logoChevrolet from "@/assets/logos/chevrolet.png";
import logoAngryOrchard from "@/assets/logos/angry-orchard.png";
import logoAtlantaUnited from "@/assets/logos/atlanta-united.png";
import logoNokia from "@/assets/logos/nokia.png";
import logoOracle from "@/assets/logos/oracle.png";
import logoSamsung from "@/assets/logos/samsung.png";
import logoSecureworks from "@/assets/logos/secureworks.png";

const clientLogos = [
  { src: logoNike, alt: "Nike" },
  { src: logoSamsung, alt: "Samsung" },
  { src: logoHp, alt: "HP" },
  { src: logoOracle, alt: "Oracle" },
  { src: logoAdidas, alt: "Adidas" },
  { src: logoNokia, alt: "Nokia" },
  { src: logoChevrolet, alt: "Chevrolet" },
  { src: logoAngryOrchard, alt: "Angry Orchard" },
  { src: logoAtlantaUnited, alt: "Atlanta United" },
  { src: logoSecureworks, alt: "Secureworks" },
];

const CALENDLY = "https://calendly.com/austin-vmproducers";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

// ─── Floating Background Blobs ───
const FloatingBlobs = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div
      className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 animate-float-slow"
      style={{ background: "radial-gradient(circle, hsl(38 90% 55% / 0.25), transparent 70%)" }}
    />
    <div
      className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full opacity-15 animate-float"
      style={{ background: "radial-gradient(circle, hsl(24 85% 48% / 0.2), transparent 70%)", animationDelay: "2s" }}
    />
    <div
      className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-10 animate-float-slow"
      style={{ background: "radial-gradient(circle, hsl(38 90% 55% / 0.15), transparent 70%)", animationDelay: "4s" }}
    />
  </div>
);

// ─── Connecting Line SVG ───
const ConnectingLine = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="flex justify-center py-4">
      <svg width="2" height="80" viewBox="0 0 2 80" className="overflow-visible">
        <motion.line
          x1="1" y1="0" x2="1" y2="80"
          stroke="hsl(216, 90%, 58%)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength }}
          className="drop-shadow-[0_0_8px_hsl(216,90%,58%)]"
        />
      </svg>
    </div>
  );
};

// ─── Sticky Top Bar ───
const StickyBar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <img src={vmLogo} alt="Virtual Producers" className="h-8" />
      <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-[0_0_20px_hsl(38,90%,55%/0.3)]">
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
          Book Your Free Strategy Call
        </a>
      </Button>
    </div>
  </header>
);

// ─── Hero ───
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center px-6 pt-16 overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={heroBg} alt="" className="h-[120%] w-full object-cover opacity-30" />
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      <div
        className="absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(38 90% 55% / 0.12), transparent 60%)" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl text-center"
        initial="hidden"
        animate="visible"
        variants={stagger}
        style={{ opacity }}
      >
        <motion.div
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          Production Partners for Enterprise Training
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Your Facilitators
          <br />
          Shouldn't Be Managing{" "}
          <span className="gradient-text">Breakout Rooms.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed"
        >
          For corporate cohorts of 50+ participants, we handle every technical detail — so your training team can focus entirely on delivery.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-12">
          <Button
            asChild
            size="lg"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-7 text-lg font-bold shadow-[0_0_30px_hsl(38,90%,55%/0.4)] hover:shadow-[0_0_50px_hsl(38,90%,55%/0.6)] transition-shadow"
          >
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              Book a Free Strategy Call
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>

        {/* Glass Stats */}
        <motion.div
          variants={fadeUp}
          className="mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {[
            { num: "2,000+", label: "Successful Events" },
            { num: "100%", label: "Success Rate" },
            { num: "350K+", label: "Global Attendees" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl px-6 py-4 text-center min-w-[140px]"
            >
              <div className="text-2xl font-extrabold gradient-text-accent">{stat.num}</div>
              <div className="mt-1 text-xs text-muted-foreground tracking-wide uppercase">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6 text-primary/60" />
      </motion.div>

      {/* Glowing accent line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-line-accent/50 glow-line" />
    </section>
  );
};

// ─── Logo Marquee ───
const LogoMarquee = () => (
  <section className="overflow-hidden border-y border-border/20 py-12">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-10 text-center text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground"
    >
      They trusted us to run their highest-stakes programs
    </motion.p>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
      <div className="flex animate-marquee items-center gap-20">
        {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt}
            className="h-12 w-auto shrink-0 brightness-0 invert opacity-40 grayscale hover:opacity-70 transition-opacity duration-300"
          />
        ))}
      </div>
    </div>
  </section>
);

// ─── Problem Cards ───
const problems = [
  {
    icon: Zap,
    num: "01",
    title: "Facilitator Overload",
    text: "Your instructors are juggling teaching, chat, polls, breakout rooms, and troubleshooting — all at once. Teaching always suffers.",
  },
  {
    icon: Shield,
    num: "02",
    title: "Credibility at Risk",
    text: "One technical glitch in a high-stakes cohort erodes professional trust. In corporate training, trust = future contracts.",
  },
  {
    icon: Layers,
    num: "03",
    title: "Interactivity Chaos",
    text: "You want polls, breakout rooms, and smooth transitions. Without a dedicated producer, complexity becomes chaos.",
  },
];

const ProblemSection = () => (
  <section className="px-6 py-28 relative">
    <motion.div
      className="mx-auto max-w-6xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-center text-4xl font-extrabold sm:text-5xl">
        The Hidden Cost of <span className="gradient-text-accent">DIY Production</span>
      </motion.h2>
      <div className="mt-16 grid gap-8 md:grid-cols-3 relative">
        {/* Connecting line between cards (desktop) */}
        <div className="hidden md:block absolute top-1/2 left-[16.67%] right-[16.67%] h-[2px] -translate-y-1/2 z-0">
           <motion.div
            className="h-full bg-gradient-to-r from-transparent via-line-accent/30 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
        </div>
        {problems.map((p) => (
          <motion.div
            key={p.title}
            variants={fadeUp}
            className="relative group glass rounded-2xl p-8 transition-all duration-500 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_0_40px_hsl(38,90%,55%/0.15)] z-10"
          >
            {/* Large step number */}
            <span className="absolute top-4 right-6 text-7xl font-extrabold text-primary/[0.07] select-none">{p.num}</span>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-icon-accent/10 border border-icon-accent/20 mb-6 group-hover:scale-110 group-hover:bg-icon-accent/20 transition-all duration-300">
              <p.icon className="h-7 w-7 text-icon-accent" />
            </div>
            <h3 className="mb-3 text-xl font-bold">{p.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{p.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

// ─── The Shift ───
const ShiftSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-28">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={controlRoom} alt="" className="h-[120%] w-full object-cover opacity-10" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background" />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div>
            <motion.p variants={fadeUp} className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-primary">
              The Shift
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-extrabold sm:text-5xl leading-tight">
              What If Technology Was Never a{" "}
              <span className="gradient-text-accent">Barrier</span> to Learning?
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground leading-relaxed">
              When a dedicated production team handles the platform, your facilitators do what they do best — teach, engage, and lead.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-8 h-1 w-24 rounded-full bg-line-accent glow-line"
            />
          </div>
          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-2xl border border-primary/20 shadow-[0_0_30px_hsl(38,90%,55%/0.15)]"
          >
            <video
              src={meetingProsVideo}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// ─── Services ───
const services = [
  { icon: Monitor, label: "Platform Management", desc: "Zoom, Teams, Webex" },
  { icon: Users, label: "Breakout Room Orchestration", desc: "Seamless group work" },
  { icon: BarChart3, label: "Polling & Interactivity", desc: "Engagement tools managed" },
  { icon: Wrench, label: "Real-Time Troubleshooting", desc: "Zero downtime" },
  { icon: ClipboardCheck, label: "Pre-Session Rehearsals", desc: "Alignment & preparation" },
  { icon: UserCheck, label: "Consistent Team", desc: "Same crew every session" },
];

const ServicesSection = () => (
  <section className="px-6 py-28">
    <motion.div
      className="mx-auto max-w-6xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-center text-4xl font-extrabold sm:text-5xl">
        What We <span className="gradient-text-accent">Handle</span>
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-4 text-center text-muted-foreground text-lg">
        One reliable team. Every session. No surprises.
      </motion.p>
      <motion.div variants={fadeUp} className="mt-12 overflow-hidden rounded-2xl border border-border/20 shadow-[0_0_40px_hsl(38,90%,55%/0.1)]">
        <img src={videoProduction} alt="Virtual Producers video production setup" className="w-full h-72 object-cover" loading="lazy" />
      </motion.div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className="group glass rounded-2xl p-6 transition-all duration-500 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_30px_hsl(38,90%,55%/0.1)]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-icon-accent/10 border border-icon-accent/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <s.icon className="h-6 w-6 text-icon-accent" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{s.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

// ─── Qualifier ───
const QualifierSection = () => (
  <section className="px-6 py-28">
    <motion.div
      className="mx-auto max-w-4xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-center text-4xl font-extrabold sm:text-5xl">
        Is This <span className="gradient-text-accent">For You?</span>
      </motion.h2>
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <motion.div variants={fadeUp} className="rotating-border p-8">
          <h3 className="mb-6 text-lg font-bold text-primary">This is for you if…</h3>
          <ul className="space-y-4">
            {[
              "You run cohort-based training with 50–150+ participants",
              "Your programs span 6–12+ sessions",
              "You operate in medical, financial, or enterprise environments",
              "Professional credibility is non-negotiable",
            ].map((item, i) => (
              <motion.li
                key={item}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-foreground/90">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={fadeUp} className="glass rounded-xl p-8">
          <h3 className="mb-6 text-lg font-bold text-muted-foreground">This is NOT for…</h3>
          <ul className="space-y-4">
            {[
              "Solo coaches or individual presenters",
              "Small webinars under 30 participants",
              "One-off workshops or single events",
            ].map((item, i) => (
              <motion.li
                key={item}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground/50" />
                <span className="text-muted-foreground">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

// ─── Social Proof ───
const SocialProofSection = () => (
  <section className="relative overflow-hidden px-6 py-28">
    <div
      className="absolute inset-0 opacity-30"
      style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(38 90% 55% / 0.08), transparent 60%)" }}
    />
    <motion.div
      className="relative z-10 mx-auto max-w-5xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-center text-4xl font-extrabold sm:text-5xl">
        Trusted by <span className="gradient-text-accent">Industry Leaders</span>
      </motion.h2>

      {/* Testimonial */}
      <motion.div variants={fadeUp} className="relative mx-auto mt-16 max-w-3xl glass rounded-2xl p-10 md:p-12">
        {/* Large quotation mark */}
        <span className="absolute top-4 left-6 text-8xl font-extrabold text-primary/[0.06] select-none leading-none">"</span>

        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <Star className="h-5 w-5 fill-primary text-primary" />
            </motion.div>
          ))}
        </div>
        <blockquote className="text-lg leading-relaxed text-foreground/90 italic">
          "I have been so blessed to work with Virtual Producers!!! They are ALWAYS on time, professional, detail-oriented and committed to excellence. This team works alongside our team to produce high-quality events."
        </blockquote>
        <div className="mt-8">
          <p className="font-bold text-lg">Jeanette McCullough</p>
          <p className="text-sm text-muted-foreground">BirthSwell — Director of Virtual Events</p>
        </div>
      </motion.div>

      {/* Review Badges */}
      <motion.div variants={fadeUp} className="mt-14 flex flex-wrap items-center justify-center gap-8">
        {["Capterra", "Trustpilot", "Google"].map((platform) => (
          <div key={platform} className="glass rounded-lg px-5 py-3 flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm font-semibold text-muted-foreground">{platform}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

// ─── Meet Austin ───
const FounderSection = () => (
  <section className="px-6 py-28">
    <motion.div
      className="mx-auto max-w-4xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-14">
        <motion.div variants={fadeUp} className="shrink-0">
          <div className="relative">
            <img
              src={austinPhoto}
              alt="Austin Talley, Founder of Virtual Producers"
              className="h-64 w-64 rounded-2xl object-cover"
            />
            {/* Gradient border frame */}
            <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 shadow-[0_0_30px_hsl(38,90%,55%/0.2)]" />
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-primary">Meet the Founder</p>
          <h2 className="text-4xl font-extrabold sm:text-5xl">Austin Talley</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
            With over 2,000 successful virtual events produced globally, Austin built Virtual Producers to solve one problem: facilitators shouldn't double as tech support. Based in New York, he and his team provide the calm, invisible production backbone that high-stakes cohort programs demand.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a href="tel:4043371539" className="flex items-center gap-2 hover:text-primary transition-colors glass rounded-lg px-4 py-2">
              <Phone className="h-4 w-4" /> 404.337.1539
            </a>
            <a href="mailto:austin@vproducers.com" className="flex items-center gap-2 hover:text-primary transition-colors glass rounded-lg px-4 py-2">
              <Mail className="h-4 w-4" /> austin@vproducers.com
            </a>
            <a href="https://www.linkedin.com/in/talley-austin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors glass rounded-lg px-4 py-2">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

// ─── FAQ ───
const faqs = [
  {
    q: "We can handle production internally.",
    a: "Most teams think they can — until session three of a 12-week cohort. Your facilitators are already managing content, engagement, and participant dynamics. Adding technical production to their plate degrades teaching quality exactly when it matters most.",
  },
  {
    q: "What about budget?",
    a: "Consider the alternative: what does one failed cohort session cost you in participant trust, program renewals, and brand credibility? Our service pays for itself by protecting the investment you've already made in your program.",
  },
  {
    q: "Our facilitators don't know your team.",
    a: "That's exactly why we integrate early. We join pre-session rehearsals, align on the run of show, and assign a consistent production team across all cohort sessions. By session two, we're an extension of your training team.",
  },
  {
    q: "What platforms do you support?",
    a: "Zoom, Microsoft Teams, Webex, and mixed environments. We also handle transitions between platforms when programs require it. If your cohort uses it, we produce on it.",
  },
];

const FAQSection = () => (
  <section className="px-6 py-28">
    <motion.div
      className="mx-auto max-w-3xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-center text-4xl font-extrabold sm:text-5xl">
        Common <span className="gradient-text-accent">Questions</span>
      </motion.h2>
      <motion.div variants={fadeUp} className="mt-14">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl glass px-6 border-l-2 border-l-line-accent/40 data-[state=open]:border-l-line-accent data-[state=open]:shadow-[0_0_20px_hsl(216,90%,58%/0.1)]"
            >
              <AccordionTrigger className="text-left font-bold hover:no-underline text-base py-5">
                "{faq.q}"
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </motion.div>
  </section>
);

// ─── Final CTA ───
const FinalCTA = () => (
  <section className="relative overflow-hidden px-6 py-32">
    {/* Animated gradient mesh background */}
    <div
      className="absolute inset-0 animate-gradient-shift"
      style={{
        background: "linear-gradient(135deg, hsl(38 90% 55% / 0.08), hsl(24 85% 48% / 0.04), hsl(38 90% 55% / 0.06))",
        backgroundSize: "200% 200%",
      }}
    />
    <div
      className="absolute inset-0"
      style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(38 90% 55% / 0.08), transparent 60%)" }}
    />

    <motion.div
      className="relative z-10 mx-auto max-w-3xl text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-4xl font-extrabold sm:text-5xl md:text-6xl leading-tight">
        Stop Risking Your Program's{" "}
        <span className="gradient-text">Credibility.</span>
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-8 text-lg text-muted-foreground">
        Book a free strategy call. Let's make technology invisible.
      </motion.p>
      <motion.div variants={fadeUp} className="mt-12">
        <Button
          asChild
          size="lg"
          className="group bg-primary hover:bg-primary/90 text-primary-foreground px-14 py-7 text-lg font-bold shadow-[0_0_40px_hsl(38,90%,55%/0.4)] hover:shadow-[0_0_60px_hsl(38,90%,55%/0.6)] transition-all duration-300 animate-pulse-glow"
        >
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
            Book Your Free Strategy Call
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </motion.div>
      <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
        <a href="tel:4043371539" className="flex items-center gap-2 hover:text-primary transition-colors">
          <Phone className="h-4 w-4" /> 404.337.1539
        </a>
        <a href="mailto:austin@vproducers.com" className="flex items-center gap-2 hover:text-primary transition-colors">
          <Mail className="h-4 w-4" /> austin@vproducers.com
        </a>
      </motion.div>
    </motion.div>
  </section>
);

// ─── Footer ───
const Footer = () => (
  <footer className="border-t border-border/20 px-6 py-10">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
      <span>© {new Date().getFullYear()} Virtual Producers · New York, NY</span>
      <div className="flex items-center gap-6">
        <a href="mailto:austin@vproducers.com" className="hover:text-primary transition-colors">austin@vproducers.com</a>
        <a href="tel:4043371539" className="hover:text-primary transition-colors">404.337.1539</a>
        <a href="https://www.linkedin.com/in/talley-austin" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </div>
  </footer>
);

// ─── Main Page ───
const Index = () => (
  <div className="min-h-screen bg-background text-foreground noise-overlay">
    <FloatingBlobs />
    <StickyBar />
    <main className="relative z-[2]">
      <Hero />
      <LogoMarquee />
      <ConnectingLine />
      <ProblemSection />
      <ConnectingLine />
      <ShiftSection />
      <ConnectingLine />
      <ServicesSection />
      <ConnectingLine />
      <QualifierSection />
      <ConnectingLine />
      <SocialProofSection />
      <ConnectingLine />
      <FounderSection />
      <ConnectingLine />
      <FAQSection />
      <ConnectingLine />
      <FinalCTA />
    </main>
    <Footer />
  </div>
);

export default Index;
