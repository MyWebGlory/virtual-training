import { motion, useInView } from "framer-motion";
import { useRef, useMemo, useEffect, useState } from "react";
import {
  CheckCircle2, Star, Phone, Mail, Linkedin, Clock,
  Lock, ArrowRight, ArrowLeft, Users, Monitor, BarChart3,
  Wrench, ClipboardCheck, UserCheck, Zap, Shield, Target,
  Headphones, type LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import austinPhoto from "@/assets/austin-talley-founder.png";
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
import tTony from "@/assets/testimonials/tony-susa.png";

const clientLogos = [
  { src: logoNike, alt: "Nike", brighten: true },
  { src: logoSamsung, alt: "Samsung" },
  { src: logoHp, alt: "HP" },
  { src: logoOracle, alt: "Oracle" },
  { src: logoAdidas, alt: "Adidas", brighten: true },
  { src: logoNokia, alt: "Nokia" },
  { src: logoChevrolet, alt: "Chevrolet" },
  { src: logoAngryOrchard, alt: "Angry Orchard", brighten: true },
  { src: logoAtlantaUnited, alt: "Atlanta United" },
  { src: logoSecureworks, alt: "Secureworks", brighten: true },
];

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
    <motion.div
      className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
      style={{ background: "radial-gradient(circle, hsl(142 70% 45% / 0.2), transparent 70%)" }}
      animate={{ x: [0, 30, -20, 0], y: [0, -25, 20, 0], scale: [1, 1.05, 0.98, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full opacity-15"
      style={{ background: "radial-gradient(circle, hsl(216 90% 58% / 0.15), transparent 70%)" }}
      animate={{ x: [0, -25, 15, 0], y: [0, 20, -30, 0], scale: [1, 0.97, 1.04, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
    />
    <motion.div
      className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-10"
      style={{ background: "radial-gradient(circle, hsl(216 90% 58% / 0.15), transparent 70%)" }}
      animate={{ x: [0, 20, -15, 0], y: [0, -15, 25, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 6 }}
    />
  </div>
);

// ─── Floating Section Icons ───
interface FloatingIconsProps {
  icons: LucideIcon[];
  count?: number;
  className?: string;
}

const FloatingIcons = ({ icons, count = 10, className = "" }: FloatingIconsProps) => {
  const positions = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      Icon: icons[i % icons.length],
      style: {
        top: `${8 + ((i * 73 + 17) % 84)}%`,
        left: `${3 + ((i * 47 + 13) % 94)}%`,
      },
      delay: i * 0.9,
      duration: 10 + (i % 5) * 3,
      size: 18 + (i % 4) * 8,
      initialRotate: (i * 37) % 30 - 15,
    })), [icons, count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {positions.map((p, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/[0.04]"
          style={p.style}
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            rotate: [p.initialRotate, p.initialRotate + 10, p.initialRotate],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          <p.Icon size={p.size} />
        </motion.div>
      ))}
    </div>
  );
};

// ─── Animated Counter ───
const AnimatedCounter = ({ target, className = "", delay = 0 }: { target: string; className?: string; delay?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numMatch = target.match(/[\d,]+/);
    if (!numMatch) { setDisplay(target); return; }
    const numStr = numMatch[0];
    const num = parseInt(numStr.replace(/,/g, ''));
    const prefix = target.slice(0, target.indexOf(numStr[0]));
    const suffix = target.slice(target.indexOf(numStr[0]) + numStr.length);
    const duration = 1800;
    const timer = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * num);
        setDisplay(`${prefix}${current.toLocaleString()}${suffix}`);
        if (progress < 1) requestAnimationFrame(tick);
        else setDisplay(target);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [isInView, target, delay]);

  return <span ref={ref} className={className}>{display}</span>;
};

// ─── Particle Field ───
const ParticleField = ({ count = 20 }: { count?: number }) => {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      left: `${(i * 31 + 7) % 100}%`,
      delay: (i * 0.7) % 8,
      duration: 6 + (i % 5) * 2,
      size: 2 + (i % 3),
      opacity: 0.15 + (i % 4) * 0.08,
    })), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 rounded-full bg-emerald-400"
          style={{ left: p.left, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ y: [0, -800], opacity: [0, p.opacity, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

// ─── Section Divider ───
const SectionDivider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="flex justify-center py-6">
      <motion.div
        className="h-16 w-[2px] bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};

// ─── Header ───
const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 glass-strong w-full">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <Link to="/" className="flex items-center gap-3">
        <div className="h-10 w-10 flex items-center justify-center">
          <svg preserveAspectRatio="none" viewBox="90.391 393 3142.609 2721.9" height="40" width="40" xmlns="http://www.w3.org/2000/svg" aria-label="Virtual Producers Logo">
            <g fill="white">
              <path d="M90.4 394.5c.3.8 228.5 394.2 507.2 874.2 278.7 480.1 633.1 1090.6 787.7 1356.8 154.5 266.2 281.7 485.2 282.6 486.7l1.6 2.7 84.5-147.1c46.5-80.9 84.4-147.6 84.2-148.2s-301-524.9-668.5-1165.1-670.4-1168.1-673.1-1173c-2.7-5-15.3-26.9-27.9-48.8L445.8 393h-178c-157.7 0-177.9.2-177.4 1.5" />
              <path d="M765 393.5c0 .6 443.4 773.4 486.8 848.5 29.7 51.5 751.3 1288.4 752.1 1289.2.3.4 39-66.1 85.9-147.7l85.2-148.4-325.7-567.3c-179.1-312-325.7-568.2-325.7-569.3s-51.8-90.9-115.2-199.5l-115.2-197.5 385.1-.3c211.8-.1 385.2 0 385.5.2.2.3-50.5 87.3-112.6 193.3-62.2 106.1-113.4 193.6-113.7 194.5-.4 1 31.4 57.3 87.6 155.2 75.9 132.3 88.4 153.4 89.4 151.9.7-1 131.4-223.9 290.5-495.3s291.2-496.8 293.6-500.8l4.4-7.2h-919c-505.5 0-919 .2-919 .5" />
              <path d="M2533 1024.7c-203.7 347.4-370.3 632.1-370.3 632.7 0 1.5 171 299.1 171.8 299.1.6 0 898.5-1562.1 898.5-1563.1 0-.2-74.2-.4-164.9-.4h-164.8z" />
            </g>
          </svg>
        </div>
        <div className="flex flex-col leading-none -space-y-1">
          <span className="text-lg tracking-tight">VIRTUAL</span>
          <span className="text-lg tracking-tight">PRODUCERS</span>
        </div>
      </Link>
      <Button
        asChild
        size="sm"
        variant="outline"
        className="group border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
      >
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </Button>
    </div>
  </header>
);

// ─── Parse Calendly URL params ───
// Params were captured in main.tsx before React mounted and saved to sessionStorage.
function useCalendlyParams() {
  let stored: Record<string, string> = {};
  try {
    const raw = sessionStorage.getItem("calendly_params");
    if (raw) stored = JSON.parse(raw);
  } catch {}

  const get = (key: string): string | null => stored[key] ?? null;

  const firstName = get("invitee_first_name");
  const lastName = get("invitee_last_name");
  const fullName = get("invitee_full_name") ?? (firstName || lastName ? [firstName, lastName].filter(Boolean).join(" ") : null);
  const displayName = fullName;

  const startTimeRaw = get("event_start_time");

  let formattedDate: string | null = null;
  let formattedTime: string | null = null;

  if (startTimeRaw) {
    try {
      const d = new Date(startTimeRaw);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
        formattedTime = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
      }
    } catch {}
  }

  const assignedTo = get("assigned_to");
  const hostFirstName = assignedTo ? assignedTo.split(" ")[0] : null;

  return { displayName, formattedDate, formattedTime, assignedTo, hostFirstName };
}

// ─── Hero Section ───
const ThankYouHero = () => {
  const { displayName, formattedDate, formattedTime, assignedTo, hostFirstName } = useCalendlyParams();

  const greeting = displayName ? `See you soon, ${displayName.split(" ")[0]}.` : "You're all set.";
  const headline = displayName
    ? <>You just made the best move for your{" "}<span className="shimmer-text">virtual training program.</span></>
    : <>You just made the best move for your{" "}<span className="shimmer-text">virtual training program.</span></>;

  return (
  <section className="relative px-4 sm:px-6 pt-24 sm:pt-28 pb-14 sm:pb-20 overflow-hidden">
    {/* Background effects */}
    <div
      className="absolute inset-0"
      style={{ background: "radial-gradient(ellipse at 50% 20%, hsl(142 70% 45% / 0.12), transparent 50%)" }}
    />
    <div
      className="absolute inset-0"
      style={{ background: "radial-gradient(ellipse at 20% 80%, hsl(216 90% 58% / 0.06), transparent 40%)" }}
    />
    <motion.div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />

    {/* Floating icons */}
    <FloatingIcons
      icons={[CheckCircle2, Star, Shield, Users, Target, Headphones]}
      count={10}
    />

    {/* Rising particles */}
    <ParticleField count={15} />

    {/* Content */}
    <div className="relative z-10 mx-auto max-w-4xl">
      {/* Green animated badge */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-5 sm:mb-8 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-500/60 bg-emerald-500/20 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-emerald-300"
      >
        <motion.span
          className="h-2 w-2 rounded-full bg-emerald-400 shadow shadow-emerald-300"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        Strategy Call Confirmed
      </motion.div>

      {/* Profile card + headline row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8"
      >
        {/* Profile card */}
        <div className="relative shrink-0 w-28 sm:w-36 md:w-40 self-stretch">
          <div className="relative h-full min-h-[130px] sm:min-h-[160px] rounded-xl overflow-hidden border-2 border-primary/30 shadow-[0_0_30px_hsl(216,90%,58%/0.15)] group">
            <img
              src={austinPhoto}
              alt="Austin Talley, Founder & CEO"
              className="h-full w-full object-cover"
            />
            {/* Gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 pb-3 px-3">
              <p className="text-sm font-bold text-white leading-tight">{assignedTo ?? "Austin Talley"}</p>
              <p className="text-[11px] text-white/70 leading-tight">Founder & CEO</p>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-blue-400 text-blue-400" />
                ))}
                <span className="text-[10px] text-white/60 ml-1">4.9/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Big headline */}
        <div className="flex-1 flex flex-col justify-center min-h-[100px] sm:min-h-[160px] gap-2">
          {displayName && (
            <p className="text-emerald-400 font-semibold text-base sm:text-lg tracking-tight">{greeting}</p>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight">
            {headline}
          </h1>
        </div>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-4 sm:mb-6"
      >
        Your strategy call is locked in. While most L&D teams are still trying to figure out virtual production on their own,{" "}
        <span className="text-foreground font-semibold">you just took the step</span> that separates programs that survive from programs that{" "}
        <span className="text-primary font-semibold keyword-glow">inspire.</span>
      </motion.p>



      {/* Confirmation notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-start gap-3 bg-primary/5 border border-primary/15 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 max-w-2xl"
      >
        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Clock className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold mb-0.5 flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {formattedDate
                ? `See you on ${formattedDate}${formattedTime ? ` at ${formattedTime}` : ""}`
                : "We confirm within 24 hours"}
          </p>
          <p className="text-xs text-muted-foreground">
            {hostFirstName ?? "Austin"} will personally review your event and prepare a custom strategy outline before you speak. Come ready, this call will be sharp and actionable from minute one.
          </p>
        </div>
      </motion.div>

      {/* Exclusivity notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-8 sm:mb-10"
      >
        <span className="inline-flex items-center justify-center flex-shrink-0">
          <Lock className="w-5 h-5 text-blue-400" />
        </span>
        <span>
          We only onboard <strong className="text-foreground">4 new clients per month</strong>, to ensure focus, precision, and results. You've earned your place in line.
        </span>
      </motion.div>

      {/* CTA back to landing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        <Button
          asChild
          size="lg"
          variant="outline"
          className="group border-primary/40 hover:border-primary hover:bg-primary/10 px-8 py-6 text-base font-bold transition-all duration-300 hover:shadow-[0_0_30px_hsl(216,90%,58%/0.2)]"
        >
          <Link to="/">
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Explore What We Do
          </Link>
        </Button>
      </motion.div>
    </div>
  </section>
  );
};

// ─── Logo Marquee ───
const LogoMarquee = () => (
  <section className="overflow-hidden border-y border-border/20 py-8 sm:py-12 relative">
    <div
      className="absolute inset-0 opacity-20"
      style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(216 90% 58% / 0.04), transparent 60%)" }}
    />
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-6 sm:mb-10 text-center text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground relative z-10"
    >
      You're joining the ranks of industry leaders that trust us
    </motion.p>
    <div className="relative">
      <div className="flex animate-marquee" style={{ width: "max-content" }}>
        {[0, 1].map((setIdx) => (
          <div key={setIdx} className="flex items-center gap-10 pr-10 sm:gap-16 sm:pr-16 md:gap-20 md:pr-20 flex-shrink-0">
            {clientLogos.map((logo, i) => (
              <motion.img
                key={i}
                src={logo.src}
                alt={logo.alt}
                className="h-8 sm:h-10 md:h-12 w-auto flex-shrink-0 transition-all duration-500 hover:scale-110"
                style={logo.brighten ? { filter: "brightness(0) invert(1) opacity(0.75)" } : undefined}
                whileHover={{ filter: logo.brighten ? "brightness(0) invert(1) opacity(1)" : "brightness(1.3)" }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Stats Section ───
const StatsSection = () => (
  <section className="px-4 sm:px-6 py-14 sm:py-20 relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-20"
      style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(216 90% 58% / 0.06), transparent 60%)" }}
    />
    <motion.div
      className="mx-auto max-w-4xl relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.p variants={fadeUp} className="text-center text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">
        Why you made the right call
      </motion.p>
      <motion.h2 variants={fadeUp} className="text-center text-2xl font-extrabold sm:text-3xl md:text-4xl mb-8 sm:mb-12">
        Here's What You're <span className="shimmer-text">Plugging Into</span>
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          { num: "2,000+", label: "Events Produced" },
          { num: "100%", label: "Success Rate" },
          { num: "350,000+", label: "Participants Served" },
          { num: "15+", label: "Years Experience" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="glass rounded-xl p-3 sm:p-5 text-center group cursor-default hover:border-primary/25 transition-colors duration-300"
          >
            <AnimatedCounter
              target={stat.num}
              delay={200}
              className="text-xl sm:text-2xl md:text-3xl font-extrabold gradient-text-accent"
            />
            <div className="mt-2 text-xs text-muted-foreground tracking-wide uppercase">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

// ─── What Happens Now (4 Steps) ───
const processSteps = [
  {
    num: "01",
    icon: Phone,
    title: "Strategy Call",
    desc: "We learn your program inside out, cohort size, platform, session structure, interactive elements, and what keeps you up at night.",
  },
  {
    num: "02",
    icon: ClipboardCheck,
    title: "We Build Your Playbook",
    desc: "Custom run-of-show for every session. Breakout room maps, poll sequences, media cues, backup plans, all documented before day one.",
  },
  {
    num: "03",
    icon: UserCheck,
    title: "Rehearse & Align",
    desc: "We join your facilitators for a dry run. By the time the real session starts, we're already an extension of your team.",
  },
  {
    num: "04",
    icon: Star,
    title: "We Produce. You Shine.",
    desc: "Same dedicated crew, every session, for your entire cohort. Consistent. Reliable. Invisible. Your facilitator just teaches.",
  },
];

const WhatHappensNow = () => (
  <section className="px-4 sm:px-6 py-16 sm:py-24 relative overflow-hidden">
    <FloatingIcons icons={[ClipboardCheck, Phone, Wrench, Users, Monitor, Target]} count={8} />
    <div
      className="absolute inset-0 opacity-20"
      style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(216 90% 58% / 0.06), transparent 50%)" }}
    />
    <motion.div
      className="mx-auto max-w-4xl relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.p variants={fadeUp} className="text-center text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">
        Your roadmap
      </motion.p>
      <motion.h2 variants={fadeUp} className="text-center text-2xl font-extrabold sm:text-3xl md:text-4xl lg:text-5xl mb-4">
        What Happens <span className="shimmer-text">Now</span>
      </motion.h2>
      <motion.p variants={fadeUp} className="text-center text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 sm:mb-14">
        You've taken the first step. Here's exactly how we turn your strategy call into a{" "}
        <span className="text-foreground font-medium">seamless production partnership.</span>
      </motion.p>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical connecting line (desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary/30 via-line-accent/30 to-primary/30" />

        <div className="space-y-8 md:space-y-12">
          {processSteps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col md:flex-row items-center gap-6 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Card */}
                <div className={`flex-1 glass rounded-2xl p-5 sm:p-6 md:p-8 relative group hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_hsl(216,90%,58%/0.12)] ${isLeft ? "md:text-right" : "md:text-left"}`}>
                  <span className="absolute top-4 right-6 text-6xl font-extrabold text-primary/[0.06] select-none">{step.num}</span>
                  <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.desc}</p>

                  {/* Bottom accent */}
                  <motion.div
                    className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full bg-primary/40"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                    style={{ transformOrigin: isLeft ? "right" : "left" }}
                  />
                </div>

                {/* Center dot (desktop) */}
                <div className="hidden md:flex shrink-0 h-5 w-5 rounded-full bg-primary border-4 border-background shadow-[0_0_15px_hsl(216,90%,58%/0.4)] z-10" />

                {/* Spacer for the other side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  </section>
);

// ─── Testimonial ───
const TestimonialSection = () => (
  <section className="px-4 sm:px-6 py-14 sm:py-20 relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-20"
      style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(216 90% 58% / 0.06), transparent 60%)" }}
    />
    <FloatingIcons icons={[Star, CheckCircle2, Users, Shield]} count={6} />
    <motion.div
      className="relative z-10 mx-auto max-w-2xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.p variants={fadeUp} className="text-center text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">
        From someone like you
      </motion.p>
      <motion.h2 variants={fadeUp} className="text-center text-2xl font-extrabold sm:text-3xl md:text-4xl mb-8 sm:mb-10">
        You're in <span className="shimmer-text">Great Company</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-2xl p-5 sm:p-8 hover:border-primary/25 transition-all duration-500 hover:shadow-[0_0_30px_hsl(216,90%,58%/0.1)]"
      >
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-primary text-primary" />
          ))}
        </div>
        <p className="text-foreground/85 leading-relaxed italic text-base sm:text-lg mb-4 sm:mb-6">
          "It is such a huge help as a facilitator to not have to worry about the technology, the breakouts and managing polls, and Austin and his team have done it seamlessly every time. I've worked with Austin and Olivia and both have been extremely flexible, responsive and an absolute pleasure to work with. If you are hosting a large event or a small workshop Virtual Producers are well worth the investment."
        </p>
        <div className="flex items-center gap-4">
          <img
            src={tTony}
            alt="Tony Susa"
            className="h-14 w-14 rounded-full object-cover border-2 border-primary/20"
          />
          <div>
            <p className="font-bold text-base">Tony Susa</p>
            <p className="text-sm text-muted-foreground">Executive Board Member at Institute for Contemporary Leadership</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

// ─── Contact Section ───
const ContactSection = () => (
  <section className="px-4 sm:px-6 py-16 sm:py-24 relative overflow-hidden">
    <FloatingIcons icons={[Phone, Mail, Linkedin, Star]} count={6} />
    <div
      className="absolute inset-0"
      style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(216 90% 58% / 0.08), transparent 50%)" }}
    />

    <motion.div
      className="relative z-10 mx-auto max-w-2xl text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">
        We're here for you
      </motion.p>
      <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4">
        Any Questions <span className="shimmer-text">Before the Call?</span>
      </motion.h2>
      <motion.p variants={fadeUp} className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto">
        Don't wait for the call if something's on your mind. Reach out directly, Austin responds personally.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <a
          href="tel:4043371539"
          className="flex items-center gap-3 glass rounded-xl px-6 py-4 w-full sm:w-auto hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_25px_hsl(216,90%,58%/0.15)] transition-all duration-300 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Call</p>
            <p className="font-bold text-sm">404.337.1539</p>
          </div>
        </a>

        <a
          href="mailto:austin@vproducers.com"
          className="flex items-center gap-3 glass rounded-xl px-6 py-4 w-full sm:w-auto hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_25px_hsl(216,90%,58%/0.15)] transition-all duration-300 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
            <p className="font-bold text-sm">austin@vproducers.com</p>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/in/talley-austin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 glass rounded-xl px-6 py-4 w-full sm:w-auto hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_25px_hsl(216,90%,58%/0.15)] transition-all duration-300 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
            <Linkedin className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">LinkedIn</p>
            <p className="font-bold text-sm">Connect with Austin</p>
          </div>
        </a>
      </motion.div>

      {/* Small reassurance */}
      <motion.p
        variants={fadeUp}
        className="mt-8 text-sm text-muted-foreground/60 italic"
      >
        No bots. No assistants. Just Austin, the guy who's going to make your training unstoppable.
      </motion.p>
    </motion.div>
  </section>
);

// ─── Footer ───
const Footer = () => (
  <footer className="border-t border-border/20 px-6 py-10">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8">
          <svg preserveAspectRatio="none" viewBox="90.391 393 3142.609 2721.9" height="32" width="32" xmlns="http://www.w3.org/2000/svg" aria-label="Virtual Producers Logo">
            <g>
              <path d="M90.4 394.5c.3.8 228.5 394.2 507.2 874.2 278.7 480.1 633.1 1090.6 787.7 1356.8 154.5 266.2 281.7 485.2 282.6 486.7l1.6 2.7 84.5-147.1c46.5-80.9 84.4-147.6 84.2-148.2s-301-524.9-668.5-1165.1-670.4-1168.1-673.1-1173c-2.7-5-15.3-26.9-27.9-48.8L445.8 393h-178c-157.7 0-177.9.2-177.4 1.5" />
              <path d="M765 393.5c0 .6 443.4 773.4 486.8 848.5 29.7 51.5 751.3 1288.4 752.1 1289.2.3.4 39-66.1 85.9-147.7l85.2-148.4-325.7-567.3c-179.1-312-325.7-568.2-325.7-569.3s-51.8-90.9-115.2-199.5l-115.2-197.5 385.1-.3c211.8-.1 385.2 0 385.5.2.2.3-50.5 87.3-112.6 193.3-62.2 106.1-113.4 193.6-113.7 194.5-.4 1 31.4 57.3 87.6 155.2 75.9 132.3 88.4 153.4 89.4 151.9.7-1 131.4-223.9 290.5-495.3s291.2-496.8 293.6-500.8l4.4-7.2h-919c-505.5 0-919 .2-919 .5" />
              <path d="M2533 1024.7c-203.7 347.4-370.3 632.1-370.3 632.7 0 1.5 171 299.1 171.8 299.1.6 0 898.5-1562.1 898.5-1563.1 0-.2-74.2-.4-164.9-.4h-164.8z" />
            </g>
          </svg>
        </div>
        <span className="font-bold text-lg tracking-tight">VIRTUAL PRODUCERS</span>
      </div>
      <span>© {new Date().getFullYear()} Virtual Producers · New York, NY</span>
    </div>
  </footer>
);

// ─── Main Page ───
const ThankYou = () => (
  <div className="min-h-screen bg-background text-foreground noise-overlay">
    <FloatingBlobs />
    <Header />
    <main className="relative z-[2] pt-16">
      <ThankYouHero />
      <LogoMarquee />
      <SectionDivider />
      <StatsSection />
      <SectionDivider />
      <WhatHappensNow />
      <SectionDivider />
      <TestimonialSection />
      <SectionDivider />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default ThankYou;
