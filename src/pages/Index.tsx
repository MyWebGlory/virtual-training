import { motion, useScroll, useTransform, useMotionValueEvent, useInView, useAnimationControls } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import {
  Monitor, Users, BarChart3, Wrench, ClipboardCheck, UserCheck,
  CheckCircle2, XCircle, X, Star, Phone, Mail, Linkedin, ChevronDown,
  Zap, Shield, Layers, ArrowRight, AlertTriangle, DollarSign,
  Target, Clock, Headphones, type LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import austinPhoto from "@/assets/austin-talley-founder.png";
import vmLogo from "@/assets/vm-logo-white.png";
import heroThumbnail from "@/assets/hero-video-thumbnail.png";
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
import tJeanette from "@/assets/testimonials/jeanette-mccullough.png";
import tKimR from "@/assets/testimonials/kim-ribich.png";
import tDean from "@/assets/testimonials/dean-hart.png";
import tLesley from "@/assets/testimonials/lesley-edwards.png";
import tTony from "@/assets/testimonials/tony-susa.png";
import tGeorge from "@/assets/testimonials/george-zisiadis.png";
import tVicki from "@/assets/testimonials/vicki-annecca.png";
import tJohn from "@/assets/testimonials/john-winter.png";
import tDeidra from "@/assets/testimonials/deidra-freeman.png";
import tKimR2 from "@/assets/testimonials/kim-ribich-2.png";
import tErik from "@/assets/testimonials/erik-pesner.png";
import tNatasha from "@/assets/testimonials/natasha-dolph.png";
import tMelissa from "@/assets/testimonials/melissa-dawn-simkins.png";

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

const CALENDLY = "https://calendly.com/austin-vmproducers/virtual-producer-introduction-call";

// Module-level setter — wired up by CalendlyPopup on mount
let _setCalendlyOpen: ((v: boolean) => void) | null = null;

// Intercepts the click for GTM (href stays), opens preloaded popup instead
function openCalendlyPopup(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  if (_setCalendlyOpen) {
    _setCalendlyOpen(true);
  }
}

// ─── Calendly Preloaded Popup ───
// Programmatically initialises the inline widget as soon as window.Calendly is
// available (polls every 100 ms). The overlay stays invisible (opacity-0 /
// pointer-events-none) until a button is clicked — the iframe is fully loaded
// in the background so the popup appears instantly.
function CalendlyPopup() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialised = useRef(false);

  // Wire up the module-level setter so openCalendlyPopup() can reach us
  useEffect(() => {
    _setCalendlyOpen = setOpen;
    return () => { _setCalendlyOpen = null; };
  }, []);

  // Initialise the inline widget as soon as the Calendly script is ready
  useEffect(() => {
    if (initialised.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tryInit = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Cal = (window as any).Calendly;
      if (Cal && typeof Cal.initInlineWidget === "function" && containerRef.current) {
        Cal.initInlineWidget({
          url: CALENDLY,
          parentElement: containerRef.current,
        });
        initialised.current = true;
      }
    };

    tryInit(); // Attempt immediately in case script already loaded
    const interval = setInterval(() => {
      if (initialised.current) { clearInterval(interval); return; }
      tryInit();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <div
      className="fixed inset-0 z-[9999] transition-all duration-300"
      style={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
      }}
      aria-modal={open}
      role="dialog"
      aria-label="Schedule a call"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={close} />
      {/* Panel */}
      <div className="absolute inset-3 md:inset-6 lg:inset-10 bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md transition-colors"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>
        {/* Calendly renders its iframe into this div */}
        <div
          ref={containerRef}
          className="w-full flex-1"
          style={{ minWidth: "320px", minHeight: "500px" }}
        />
      </div>
    </div>
  );
}

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
      style={{ background: "radial-gradient(circle, hsl(38 90% 55% / 0.25), transparent 70%)" }}
      animate={{ x: [0, 30, -20, 0], y: [0, -25, 20, 0], scale: [1, 1.05, 0.98, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full opacity-15"
      style={{ background: "radial-gradient(circle, hsl(24 85% 48% / 0.2), transparent 70%)" }}
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

// ─── Animated Checkbox ───
const AnimatedCheck = ({ delay = 0, color = "primary" }: { delay?: number; color?: "primary" | "destructive" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const strokeColor = color === "primary" ? "hsl(43, 65%, 50%)" : "hsl(0, 84%, 60%)";
  const bgColor = color === "primary" ? "hsl(43, 65%, 50%, 0.12)" : "hsl(0, 84%, 60%, 0.08)";

  return (
    <div ref={ref} className="relative h-6 w-6 shrink-0">
      <motion.div
        className="absolute inset-0 rounded-md border-2"
        initial={{ borderColor: "hsl(240, 4%, 16%)", backgroundColor: "transparent" }}
        animate={isInView ? { borderColor: strokeColor, backgroundColor: bgColor } : {}}
        transition={{ delay, duration: 0.3 }}
      />
      <motion.svg className="absolute inset-0 p-1" viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M4 12l6 6L20 6"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: delay + 0.2, duration: 0.4, ease: "easeOut" }}
        />
      </motion.svg>
    </div>
  );
};

// ─── Scroll-driven Checkbox ───
const ScrollCheckbox = ({ checked }: { checked: boolean }) => {
  const strokeColor = "hsl(142, 69%, 48%)";
  const bgColor = "hsl(142, 69%, 48%, 0.12)";
  const prevRef = useRef(false);
  const pulseControls = useAnimationControls();
  const scaleControls = useAnimationControls();

  useEffect(() => {
    if (checked && !prevRef.current) {
      // pulse ripple ring
      pulseControls.start({ scale: [1, 2.2], opacity: [0.6, 0], transition: { duration: 0.5, ease: "easeOut" } });
      // box scale pop
      scaleControls.start({ scale: [1, 1.22, 0.95, 1], transition: { duration: 0.45, ease: "easeOut" } });
    }
    prevRef.current = checked;
  }, [checked]);

  return (
    <div className="relative h-6 w-6 shrink-0">
      {/* Ripple ring */}
      <motion.div
        className="absolute inset-0 rounded-md border-2 pointer-events-none"
        style={{ borderColor: strokeColor }}
        initial={{ scale: 1, opacity: 0 }}
        animate={pulseControls}
      />
      {/* Box with scale pop */}
      <motion.div animate={scaleControls} style={{ position: "absolute", inset: 0 }}>
        <motion.div
          className="absolute inset-0 rounded-md border-2"
          animate={
            checked
              ? { borderColor: strokeColor, backgroundColor: bgColor }
              : { borderColor: "hsl(240, 4%, 16%)", backgroundColor: "transparent" }
          }
          transition={{ duration: 0.3 }}
        />
        <motion.svg className="absolute inset-0 p-1" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M4 12l6 6L20 6"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={checked ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

// ─── Particle Field ───
const ParticleField = ({ count = 30 }: { count?: number }) => {
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
          className="absolute bottom-0 rounded-full bg-primary"
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
        className="h-16 w-[2px] bg-gradient-to-b from-transparent via-line-accent/50 to-transparent"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};

// ConnectingLine alias (replaced by SectionDivider above)
const ConnectingLine = SectionDivider;

// ─── Header with Scroll Direction Detection ───
const StickyBar = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastYRef.current;
    if (latest > previous && latest > 100) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }
    lastYRef.current = latest;
  });

  return (
    <motion.header 
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong w-full pointer-events-auto"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center">
            <svg preserveAspectRatio="none" viewBox="90.391 393 3142.609 2721.9" height="40" width="40" xmlns="http://www.w3.org/2000/svg" aria-label="Virtual Producers Logo">
              <g fill="white">
                <path d="M90.4 394.5c.3.8 228.5 394.2 507.2 874.2 278.7 480.1 633.1 1090.6 787.7 1356.8 154.5 266.2 281.7 485.2 282.6 486.7l1.6 2.7 84.5-147.1c46.5-80.9 84.4-147.6 84.2-148.2s-301-524.9-668.5-1165.1-670.4-1168.1-673.1-1173c-2.7-5-15.3-26.9-27.9-48.8L445.8 393h-178c-157.7 0-177.9.2-177.4 1.5"></path>
                <path d="M765 393.5c0 .6 443.4 773.4 486.8 848.5 29.7 51.5 751.3 1288.4 752.1 1289.2.3.4 39-66.1 85.9-147.7l85.2-148.4-325.7-567.3c-179.1-312-325.7-568.2-325.7-569.3s-51.8-90.9-115.2-199.5l-115.2-197.5 385.1-.3c211.8-.1 385.2 0 385.5.2.2.3-50.5 87.3-112.6 193.3-62.2 106.1-113.4 193.6-113.7 194.5-.4 1 31.4 57.3 87.6 155.2 75.9 132.3 88.4 153.4 89.4 151.9.7-1 131.4-223.9 290.5-495.3s291.2-496.8 293.6-500.8l4.4-7.2h-919c-505.5 0-919 .2-919 .5"></path>
                <path d="M2533 1024.7c-203.7 347.4-370.3 632.1-370.3 632.7 0 1.5 171 299.1 171.8 299.1.6 0 898.5-1562.1 898.5-1563.1 0-.2-74.2-.4-164.9-.4h-164.8z"></path>
              </g>
            </svg>
          </div>
            <div className="flex flex-col leading-none -space-y-1">
              <span className=" text-lg tracking-tight">VIRTUAL</span>
              <span className=" text-lg tracking-tight">PRODUCERS</span>
            </div>
        </div>
        <Button
          asChild
          size="sm"
          className="group bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_0_20px_hsl(38,90%,55%/0.3)] hover:shadow-[0_0_40px_hsl(38,90%,55%/0.5)] transition-all duration-300"
        >
          <a href={CALENDLY} onClick={openCalendlyPopup}>
            Get a Dedicated Producer
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
    </motion.header>
  );
};

// ─── Social Proof Avatars ───
const socialProofAvatars = [tJeanette, tKimR, tDean, tLesley, tTony, tGeorge];

const SocialProofAvatars = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 1.95, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-center gap-3"
  >
    {/* Overlapping avatars */}
    <div className="flex items-center">
      {socialProofAvatars.map((src, i) => (
        <div
          key={i}
          className="relative h-9 w-9 rounded-full border-2 border-background overflow-hidden shadow-md"
          style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: socialProofAvatars.length - i }}
        >
          <img src={src} alt="Client" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>

    {/* Stars + label */}
    <div className="flex flex-col items-start gap-0.5">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <span className="text-xs text-muted-foreground leading-none">
        <span className="font-semibold text-foreground">200+</span> L&D leaders trust us
      </span>
    </div>
  </motion.div>
);

// ─── Hero ───
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  // Remove fading effect: keep opacity always 1
  const textOpacity = 1;

  const line1 = ["Your", "Facilitator", "Is"];
  const line2 = ["You", "Just"];
  const line3 = ["Don't", "See", "It", "Yet."];

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center px-6 overflow-hidden pt-16 pb-32">
      {/* Parallax bg with zoom */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={heroThumbnail}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="h-[130%] w-full object-cover opacity-25 pointer-events-none select-none"
        />
      </motion.div>

      {/* Multi-layer gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 20%, hsl(38 90% 55% / 0.18), transparent 50%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 20% 80%, hsl(216 90% 58% / 0.08), transparent 40%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 80% 60%, hsl(38 90% 55% / 0.06), transparent 40%)" }}
      />

      {/* Animated dot grid with parallax */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          y: useTransform(scrollYProgress, [0, 1], [0, -80]),
        }}
      />

      {/* Floating icons */}
      <FloatingIcons
        icons={[Monitor, Users, BarChart3, Zap, Shield, Layers, Wrench, ClipboardCheck, Target, Headphones]}
        count={14}
      />

      {/* Animated energy orbs */}
      <motion.div
        className="absolute top-1/4 left-[15%] w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(38 90% 55% / 0.12), transparent 60%)" }}
        animate={{ x: [0, 40, -30, 0], y: [0, -30, 40, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-[10%] w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(216 90% 58% / 0.1), transparent 60%)" }}
        animate={{ x: [0, -35, 20, 0], y: [0, 25, -20, 0], scale: [1, 0.95, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="absolute top-[60%] left-[50%] w-[300px] h-[300px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(43 65% 50% / 0.08), transparent 60%)" }}
        animate={{ x: [0, 20, -25, 0], y: [0, -35, 15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />

      {/* Rising particles */}
      <ParticleField count={20} />

      {/* Main content */}
      <motion.div
        className="relative z-10 mx-auto max-w-5xl text-center"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/60 bg-blue-500/20 px-5 py-2 text-sm font-semibold"
        >
          <motion.span
            className="h-2 w-2 rounded-full bg-green-500 shadow shadow-green-300"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          #1 Live Producer for Successfull Corporate Cohorts
        </motion.div>

        {/* Headline: word-by-word cinematic reveal */}
        <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          {line1.map((word, i) => (
            <motion.span
              key={`l1-${i}`}
              className="inline-block mr-[0.22em]"
              initial={{ opacity: 0, y: 50, rotateX: 45, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            className="inline-block shimmer-text"
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            Drowning.
          </motion.span>{" "}
          {line2.map((word, i) => (
            <motion.span
              key={`l2-${i}`}
              className="inline-block text-muted-foreground/60 mr-[0.22em]"
              initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.85 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
          <br />
          {line3.map((word, i) => (
            <motion.span
              key={`l3-${i}`}
              className="inline-block text-muted-foreground/60 mr-[0.22em]"
              initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 1.05 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtext with keyword glow */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed"
        >
          They're teaching, managing chat, launching polls, opening breakout rooms, troubleshooting audio, and watching the clock , {" "}
          <span className="text-foreground font-semibold keyword-glow">all at the same time.</span>{" "}
          Something's gotta give. Usually, it's the{" "}
          <span className="text-primary/90 font-semibold">quality of your program.</span>
        </motion.p>

        {/* CTA with pulsing rings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-1"
        >
          <div className="relative">
            {/* Pulse ring 1 */}
            <motion.div
              className="absolute -inset-4 rounded-xl bg-primary/20 blur-sm"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
            {/* Pulse ring 2 */}
            <motion.div
              className="absolute -inset-4 rounded-xl bg-primary/15 blur-md"
              animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
            />
            <Button
              asChild
              size="lg"
              className="relative group bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-7 text-lg font-bold shadow-[0_0_40px_hsl(38,90%,55%/0.5)] hover:shadow-[0_0_60px_hsl(38,90%,55%/0.7)] transition-all duration-500"
            >
              <a href={CALENDLY} onClick={openCalendlyPopup}>
                Get a Dedicated Producer
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </a>
            </Button>
          </div>
          <motion.span
            className="text-sm text-muted-foreground mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            Free strategy call · No commitment · 15 min
          </motion.span>
          <motion.div
            className="flex items-center gap-2 mt-3 text-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-red-400"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Only 4 new clients per month, spots are filling
            </span>
          </motion.div>
        </motion.div>

        {/* Social proof avatars */}
        <div className="mt-6 flex justify-center">
          <SocialProofAvatars />
        </div>

        {/* Stats with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {[
            { num: "2,000+", label: "Events Produced" },
            { num: "100%", label: "Success Rate" },
            { num: "350,000+", label: "Participants Served" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="glass rounded-xl px-6 py-4 text-center min-w-[140px] group cursor-default hover:border-primary/25 transition-colors duration-300"
            >
              <AnimatedCounter
                target={stat.num}
                delay={2100}
                className="text-2xl font-extrabold gradient-text-accent"
              />
              <div className="mt-1 text-xs text-muted-foreground tracking-wide uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
      >
        <motion.span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 font-medium">
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-primary/50" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-line-accent/60 to-transparent glow-line" />
    </section>
  );
};

// ─── Logo Marquee ───
const LogoMarquee = () => (
  <section className="overflow-hidden border-y border-border/20 py-12 relative">
    <div
      className="absolute inset-0 opacity-20"
      style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(38 90% 55% / 0.04), transparent 60%)" }}
    />
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-10 text-center text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground relative z-10"
    >
      Brands that trust us with their training programs
    </motion.p>
    <div className="relative">
      <div className="flex animate-marquee" style={{ width: "max-content" }}>
        {[0, 1].map((setIdx) => (
          <div key={setIdx} className="flex items-center gap-20 pr-20 flex-shrink-0">
            {clientLogos.map((logo, i) => (
              <motion.img
                key={i}
                src={logo.src}
                alt={logo.alt}
                className="h-12 w-auto flex-shrink-0 transition-all duration-500 hover:scale-110"
                whileHover={{ filter: "brightness(1.3)" }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── The Ugly Truth Section ───
const problems = [
  {
    icon: Zap,
    num: "01",
    title: "They're Doing 7 Jobs At Once",
    text: "Teaching. Polls. Chat. Breakouts. Audio fixes. All simultaneously. That's not a facilitator, that's a circus. And your participants feel it.",
  },
  {
    icon: Shield,
    num: "02",
    title: "One Glitch = Trust Gone",
    text: "Breakout rooms freeze. Screen share dies. In a $30K+ cohort, that's not a hiccup, that's your reputation. And in corporate training, trust IS future contracts.",
  },
  {
    icon: Layers,
    num: "03",
    title: "Complexity Kills Engagement",
    text: "Breakouts, polls, embedded videos, smooth transitions. Without a dedicated producer? That beautiful design collapses into chaos. Every time.",
  },
];

const ProblemSection = () => (
  <section className="px-6 py-28 relative overflow-hidden">
    <FloatingIcons icons={[AlertTriangle, Zap, Shield, Layers, XCircle]} count={8} />
    <div
      className="absolute inset-0 opacity-20"
      style={{ background: "radial-gradient(ellipse at 70% 30%, hsl(0 84% 60% / 0.06), transparent 50%)" }}
    />
    <motion.div
      className="mx-auto max-w-6xl relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <motion.p variants={fadeUp} className="text-center text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">
        Let's be honest
      </motion.p>
      <motion.h2 variants={fadeUp} className="text-center text-4xl font-extrabold sm:text-5xl">
        Here's What's <span className="shimmer-text">Actually Happening</span>
        <br />
        <span className="text-2xl sm:text-3xl text-muted-foreground font-bold mt-2 block">In Your Virtual Classrooms Right Now</span>
      </motion.h2>
      <div className="mt-16 grid gap-8 md:grid-cols-3 relative">
        <div className="hidden md:block absolute top-1/2 left-[16.67%] right-[16.67%] h-[2px] -translate-y-1/2 z-0">
           <motion.div
            className="h-full bg-gradient-to-r from-transparent via-line-accent/30 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
        </div>
        {problems.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 50, rotateY: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative group glass rounded-2xl p-8 transition-all duration-500 hover:border-primary/40 hover:-translate-y-3 hover:shadow-[0_0_50px_hsl(38,90%,55%/0.15)] z-10"
          >
            <span className="absolute top-4 right-6 text-7xl font-extrabold text-primary/[0.07] select-none">{p.num}</span>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-icon-accent/10 border border-icon-accent/20 mb-6 group-hover:scale-110 group-hover:bg-icon-accent/20 group-hover:shadow-[0_0_20px_hsl(216,90%,58%/0.3)] transition-all duration-400">
              <p.icon className="h-7 w-7 text-icon-accent" />
            </div>
            <h3 className="mb-3 text-xl font-bold group-hover:text-primary transition-colors duration-300">{p.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{p.text}</p>
            {/* Bottom accent bar */}
            <motion.div
              className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full bg-icon-accent/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

// ─── The Real Cost Section ───
const RealCostSection = () => (
  <section className="px-6 py-28 relative overflow-hidden">
    <FloatingIcons icons={[DollarSign, AlertTriangle, CheckCircle2, XCircle, BarChart3]} count={8} />
    <div
      className="absolute inset-0 opacity-20"
      style={{ background: "radial-gradient(ellipse at 30% 60%, hsl(38 90% 55% / 0.06), transparent 50%)" }}
    />
    <motion.div
      className="mx-auto max-w-5xl relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.p variants={fadeUp} className="text-center text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">
        The math nobody wants to do
      </motion.p>
      <motion.h2 variants={fadeUp} className="text-center text-4xl font-extrabold sm:text-5xl mb-16">
        What Does a <span className="shimmer-text">Failed Session</span> Actually Cost?
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-2xl p-8 border-l-4 border-l-destructive/60 hover:border-l-destructive transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </motion.div>
            <h3 className="text-xl font-bold text-destructive">Without a Producer</h3>
          </div>
          <ul className="space-y-4">
            {[
              "Facilitator splits focus, teaching quality drops 40%+",
              "Tech issues derail 1 in 4 sessions on average",
              "Participants lose confidence in your program",
              "Contract renewals become \"let's discuss\"",
              "Your brand becomes \"that org with the glitchy training\"",
              "Internal team burns out managing what isn't their job",
            ].map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive/60" />
                <span className="text-muted-foreground">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="rotating-border p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </motion.div>
            <h3 className="text-xl font-bold text-primary">With Virtual Producers</h3>
          </div>
          <ul className="space-y-4">
            {[
              "Facilitator is 100% locked in on delivery and engagement",
              "Every breakout, poll, and transition runs like clockwork",
              "Participants feel the professionalism instantly",
              "Renewals become \"when do we start next cohort?\"",
              "Your brand becomes the gold standard for virtual training",
              "Peace of mind from session 1 to session 12 and beyond",
            ].map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <AnimatedCheck delay={0.4 + i * 0.1} />
                <span className="text-foreground/90">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-12 text-lg text-muted-foreground"
      >
        One bad session in a $30K program doesn't cost you $2,500. It costs you the <span className="text-foreground font-bold keyword-glow">$120K renewal.</span>
      </motion.p>
    </motion.div>
  </section>
);

// ─── Bold Qualifier Section ───
// Check order: left column (items 0,2,4) first, then right column (items 1,3,5)
// Thresholds start at 0.20 so the unchecked state is visible before any check
// triggers, and all complete by 0.48 so they're done while the section is still
// comfortably centered. offset "start end" → "end start" = full entry-to-exit range.
// Order: left col (0,2,4) at 0.20/0.32/0.44, right col (1,3,5) at 0.27/0.39/0.48
const QUALIFIER_THRESHOLDS = [0.20, 0.27, 0.32, 0.39, 0.44, 0.48];

const BoldQualifierSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const [checkedItems, setCheckedItems] = useState([false, false, false, false, false, false]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setCheckedItems(QUALIFIER_THRESHOLDS.map((threshold) => progress >= threshold));
  });

  return (
  <section ref={sectionRef} className="px-6 py-28 relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-30"
      style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(38 90% 55% / 0.08), transparent 60%)" }}
    />
    <FloatingIcons icons={[Target, DollarSign, Users, Shield, Clock, Headphones]} count={10} />

    <motion.div
      className="relative z-10 mx-auto max-w-4xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.p variants={fadeUp} className="text-center text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">
        Real talk
      </motion.p>
      <motion.h2 variants={fadeUp} className="text-center text-4xl font-extrabold sm:text-5xl">
        This Is <span className="shimmer-text">Specifically</span> For You If...
      </motion.h2>
      <motion.p variants={fadeUp} className="text-center text-lg text-muted-foreground mt-4 mb-14">
        We're not for everyone. And we're cool with that. Here's who we <span className="text-foreground font-medium">thrive</span> with:
      </motion.p>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { icon: Users, text: "You're training 50 to 150+ participants per cohort" },
          { icon: Clock, text: "Your programs run 6 to 12+ sessions (not a one-off webinar)" },
          { icon: DollarSign, text: "Your program budgets are $20K+ (because quality isn't cheap)" },
          { icon: Target, text: "You're in medical, financial, enterprise, or leadership development" },
          { icon: Shield, text: "A single tech failure could cost you a contract renewal" },
          { icon: Headphones, text: "You use Zoom, Teams, Webex, or mixed platforms" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-xl p-5 flex items-center gap-4 hover:border-primary/30 transition-all duration-300 group"
          >
            <ScrollCheckbox checked={checkedItems[i]} />
            <div className="flex items-center gap-3 flex-1">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium text-foreground/90">{item.text}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} className="mt-14 text-center">
        <motion.p
          className="text-xl font-bold text-foreground mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Sound like you? <span className="keyword-glow text-primary">Then let's talk.</span>
        </motion.p>
        <p className="text-muted-foreground mb-8">
          If you checked 3 or more, we should be on a call <span className="text-foreground font-medium">this week.</span>
        </p>
        <div className="relative inline-block">
          <motion.div
            className="absolute -inset-3 rounded-lg bg-primary/15 blur-sm"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          />
          <Button
            asChild
            size="lg"
            className="relative group bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg font-bold shadow-[0_0_30px_hsl(38,90%,55%/0.3)] hover:shadow-[0_0_50px_hsl(38,90%,55%/0.5)] transition-shadow"
          >
            <a href={CALENDLY} onClick={openCalendlyPopup}>
              Yes, That's Me, Let's Talk
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
            </a>
          </Button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 shrink-0"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <span>We only onboard <strong className="text-foreground">4 new clients per month.</strong> If you're a fit, don't wait.</span>
        </motion.div>
      </motion.div>

      {/* Not for you section, with X marks */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 glass rounded-xl p-8 max-w-xl mx-auto border-l-2 border-l-muted-foreground/20"
      >
        <h3 className="mb-4 text-lg font-bold text-muted-foreground/70">Heads up, this is NOT for:</h3>
        <ul className="space-y-3">
          {[
            "Solo coaches running 10-person workshops",
            "One-off webinar hosts who need help once a year",
            "Teams with budgets under $15K (we can't deliver our standard at that level)",
            "Anyone who thinks \"my IT guy can handle it\"",
          ].map((item, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive/40" />
              <span className="text-muted-foreground">{item}</span>
            </motion.li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground/60 italic">
          No shade. We just know where we do our best work.
        </p>
      </motion.div>
    </motion.div>
  </section>
  );
};

// ─── The Shift ───
const ShiftSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.02]);

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-28">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={controlRoom} alt="" className="h-[120%] w-full object-cover opacity-10" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background" />
      <FloatingIcons icons={[Monitor, Users, Wrench, CheckCircle2, Star]} count={8} />

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
              Imagine this instead
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl font-extrabold sm:text-5xl leading-tight">
              You Teach.{" "}
              <span className="shimmer-text">We Run Everything Else.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Picture your next cohort session. Your facilitator walks in, takes a breath, and just... <span className="text-foreground font-semibold keyword-glow">teaches</span>. No fumbling with breakout rooms. No stressing about the poll timer. No "can everyone hear me?" panic. Just pure, focused delivery. That's what a dedicated production team gives you.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Technology becomes <span className="text-primary font-semibold">invisible</span>. And your training? It becomes <span className="text-foreground font-semibold keyword-glow">unforgettable</span>.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-primary to-line-accent glow-line-gold"
            />
          </div>
          <motion.div
            style={{ scale: imgScale }}
            className="overflow-hidden rounded-2xl border border-primary/20 shadow-[0_0_40px_hsl(38,90%,55%/0.15)] hover:shadow-[0_0_60px_hsl(38,90%,55%/0.25)] transition-shadow duration-500"
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

// ─── How It Works (NEW) ───
const processSteps = [
  {
    num: "01",
    title: "Strategy Call",
    desc: "We learn your program inside out, cohort size, platform, session structure, interactive elements, and what keeps you up at night.",
  },
  {
    num: "02",
    title: "We Build Your Playbook",
    desc: "Custom run-of-show for every session. Breakout room maps, poll sequences, media cues, backup plans, all documented before day one.",
  },
  {
    num: "03",
    title: "Rehearse & Align",
    desc: "We join your facilitators for a dry run. By the time the real session starts, we're already an extension of your team.",
  },
  {
    num: "04",
    title: "We Produce. You Shine.",
    desc: "Same dedicated crew, every session, for your entire cohort. Consistent. Reliable. Invisible. Your facilitator just teaches.",
  },
];

const HowItWorksSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [activeStep, setActiveStep] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.12) setActiveStep(-1);
    else if (v < 0.32) setActiveStep(0);
    else if (v < 0.52) setActiveStep(1);
    else if (v < 0.72) setActiveStep(2);
    else setActiveStep(3);
  });

  const stepIcons = [Phone, ClipboardCheck, UserCheck, Star];

  return (
    <>
      {/* Desktop: Sticky scroll experience */}
      <section ref={containerRef} className="relative hidden md:block" style={{ height: "320vh" }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          {/* BG effects */}
          <div
            className="absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(38 90% 55% / 0.06), transparent 50%)" }}
          />
          <FloatingIcons icons={[ClipboardCheck, Phone, Wrench, Users, Monitor, Target]} count={10} />

          <div className="relative z-10 mx-auto max-w-6xl w-full px-6">
            {/* Title */}
            <div className="text-center mb-10 lg:mb-14">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4"
              >
                Dead simple
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-extrabold sm:text-5xl"
              >
                Here's How We <span className="shimmer-text">Plug In</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                No red tape. No 6-week onboarding. We integrate with your team fast and make an impact from <span className="text-foreground font-medium">session one.</span>
              </motion.p>
            </div>

            {/* Steps grid with animated curved connector */}
            <div className="relative">
              {/* SVG curved connecting line */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 1000 500"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
              >
                <defs>
                  <linearGradient id="stepLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(43, 65%, 50%)" />
                    <stop offset="50%" stopColor="hsl(216, 90%, 58%)" />
                    <stop offset="100%" stopColor="hsl(43, 65%, 50%)" />
                  </linearGradient>
                </defs>
                {/* Curved path through 4 quadrants: TL -> TR -> BL -> BR */}
                <motion.path
                  d="M 230,110 C 360,110 420,110 500,250 C 580,390 640,390 770,390 M 230,390 C 360,390 420,390 500,250 M 770,110 C 640,110 580,110 500,250"
                  stroke="url(#stepLineGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.5"
                  initial={{ pathLength: 0 }}
                  style={{ pathLength: scrollYProgress }}
                />
                {/* Glow version */}
                <motion.path
                  d="M 230,110 C 360,110 420,110 500,250 C 580,390 640,390 770,390 M 230,390 C 360,390 420,390 500,250 M 770,110 C 640,110 580,110 500,250"
                  stroke="url(#stepLineGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0.15"
                  filter="blur(4px)"
                  initial={{ pathLength: 0 }}
                  style={{ pathLength: scrollYProgress }}
                />
              </svg>

              {/* 2x2 Grid */}
              <div className="grid grid-cols-2 gap-x-16 gap-y-10 relative z-10">
                {processSteps.map((step, i) => {
                  const StepIcon = stepIcons[i];
                  return (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, y: 50, scale: 0.92 }}
                      animate={
                        activeStep >= i
                          ? { opacity: 1, y: 0, scale: 1 }
                          : { opacity: 0.08, y: 50, scale: 0.92 }
                      }
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="glass rounded-2xl p-8 relative group"
                    >
                      <span className="absolute top-4 right-6 text-7xl font-extrabold text-primary/[0.07] select-none">
                        {step.num}
                      </span>
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 text-primary"
                          animate={
                            activeStep >= i
                              ? {
                                  borderColor: "hsl(43, 65%, 50%)",
                                  boxShadow: "0 0 25px hsl(43, 65%, 50%, 0.3)",
                                }
                              : { borderColor: "hsl(43, 65%, 50%, 0.2)", boxShadow: "none" }
                          }
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <StepIcon className="h-5 w-5" />
                        </motion.div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>

                      {/* Active step indicator line */}
                      <motion.div
                        className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full bg-primary"
                        initial={{ scaleX: 0 }}
                        animate={activeStep >= i ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        style={{ transformOrigin: "left" }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: Regular stacked scroll */}
      <section className="md:hidden px-6 py-28">
        <div className="mx-auto max-w-lg">
          <p className="text-center text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">Dead simple</p>
          <h2 className="text-center text-3xl font-extrabold sm:text-4xl">
            Here's How We <span className="shimmer-text">Plug In</span>
          </h2>
          <p className="text-center mt-4 text-muted-foreground max-w-md mx-auto">
            No red tape. No 6-week onboarding. Impact from session one.
          </p>
          <div className="mt-10 space-y-6 relative">
            {/* Vertical connecting line */}
            <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-primary/30 via-line-accent/30 to-primary/30" />
            {processSteps.map((step, i) => {
              const StepIcon = stepIcons[i];
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass rounded-2xl p-6 ml-12 relative"
                >
                  {/* Connector dot */}
                  <div className="absolute -left-[36px] top-7 h-4 w-4 rounded-full bg-primary border-2 border-background shadow-[0_0_12px_hsl(43,65%,50%/0.4)]" />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold">
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

// ─── Services ───
const services = [
  { icon: Monitor, label: "Full Platform Management", desc: "Zoom, Teams, Webex, we run it all so you never touch a setting" },
  { icon: Users, label: "Breakout Room Orchestration", desc: "Pre-mapped, timed, and seamless. Groups form in seconds, not minutes" },
  { icon: BarChart3, label: "Polls, Chat & Interactivity", desc: "Every engagement tool managed live, your facilitator just says 'go'" },
  { icon: Wrench, label: "Real-Time Troubleshooting", desc: "Audio issues? Screen share down? We fix it before anyone notices" },
  { icon: ClipboardCheck, label: "Pre-Session Rehearsals", desc: "We align with your team before every single session. No surprises" },
  { icon: UserCheck, label: "Same Crew, Every Session", desc: "No randoms. Your dedicated producer knows your program as well as you do" },
];

const ServicesSection = () => (
  <section className="px-6 py-28 relative overflow-hidden">
    <FloatingIcons icons={[Monitor, Users, BarChart3, Wrench, ClipboardCheck, UserCheck]} count={10} />
    <div
      className="absolute inset-0 opacity-20"
      style={{ background: "radial-gradient(ellipse at 60% 40%, hsl(216 90% 58% / 0.06), transparent 50%)" }}
    />
    <motion.div
      className="mx-auto max-w-6xl relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <motion.p variants={fadeUp} className="text-center text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">
        Everything handled
      </motion.p>
      <motion.h2 variants={fadeUp} className="text-center text-4xl font-extrabold sm:text-5xl">
        You Focus on <span className="shimmer-text">Teaching.</span>
        <br />
        We Handle <span className="gradient-text-accent">Literally Everything Else.</span>
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-12 overflow-hidden rounded-2xl border border-border/20 shadow-[0_0_40px_hsl(38,90%,55%/0.1)] hover:shadow-[0_0_60px_hsl(38,90%,55%/0.2)] transition-shadow duration-500"
      >
        <img src={videoProduction} alt="Virtual Producers video production setup" className="w-full h-72 object-cover" loading="lazy" />
      </motion.div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group glass rounded-2xl p-6 transition-all duration-500 hover:border-primary/30 hover:-translate-y-2 hover:shadow-[0_0_40px_hsl(38,90%,55%/0.12)]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-icon-accent/10 border border-icon-accent/20 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-icon-accent/20 group-hover:shadow-[0_0_20px_hsl(216,90%,58%/0.3)] transition-all duration-400">
                <s.icon className="h-6 w-6 text-icon-accent" />
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">{s.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

// ─── Social Proof ───
const testimonials = [
  {
    photo: tJeanette,
    quote: "Virtual Producers was amazing. We needed last-minute support for a large webinar including more than 10 high level speakers, translation into 5 languages, and thousands of participants. He was knowledgeable, supportive, and went above and beyond to ensure the project ran smoothly despite lots of variables. He saved the day multiple times. Highly recommend.",
    name: "Jeanette McCullough",
    role: "BirthSwell",
  },
  {
    photo: tKimR,
    quote: "We'd jump at the chance to work with VP again. They're incredibly skilled, knowledgeable, and easy to work with. He even went above and beyond to recruit additional support when it was needed at the 11th hour. The professionalism, expertise, and poise he brought to our virtual conference was exactly what we needed to make it a success. We could not have done it without them.",
    name: "Kim Ribich",
    role: "CoverCo 2020",
  },
  {
    photo: tDean,
    quote: "Virtual Producers were simply outstanding in providing producer services for a series of Zoom training meetings. His contributions brought our trainings to a higher level of professionalism that were recognized by our client. I would highly recommend Austin and plan to contract their services again in the future.",
    name: "Dean Hart",
    role: "Commex Consulting",
  },
  {
    photo: tLesley,
    quote: "With Austin's help, we ran six consecutive 90-minute sessions in a single day with hundreds of prospective partners, each one in a different global region, and not a single thing went awry! What I remember most was not feeling stressed, knowing that whatever came up, Austin and team would handle it behind the scenes and make us look good. Professional, responsive, reliable, and easy to work with. Incredible value for money!",
    name: "Lesley Edwards",
    role: "Finance Strategy | Global Health Advocacy | Strategic Partnerships",
  },
  {
    photo: tTony,
    quote: "It is such a huge help as a facilitator to not have to worry about the technology, the breakouts and managing polls, and Austin and his team have done it seamlessly every time. I've worked with Austin and Olivia and both have been extremely flexible, responsive and an absolute pleasure to work with. If you are hosting a large event or a small workshop Virtual Producers are well worth the investment.",
    name: "Tony Susa",
    role: "Executive Board Member at Institute for Contemporary Leadership",
  },
  {
    photo: tGeorge,
    quote: "I highly recommend working with Virtual Producers. They made all the difference for our two month virtual engagement. They are organized, enthusiastic, and professional. We got thrown a few curveballs and they were excellent at being flexible and going above and beyond to meet a super tight deadline and make the event a success. Their good spirit, calm demeanor, and sense of humor make them a pleasure to work closely with.",
    name: "George Zisiadis",
    role: "Co-Director at OF BY FOR",
  },
  {
    photo: tVicki,
    quote: "I was fortunate enough to find Virtual Producers to produce my virtual celebration! I had people all over the country and overseas! It went off without a hitch! A great time was had by all! Working with him and his team seriously made the experience effortless. I would highly recommend him.",
    name: "Vicki Annecca",
    role: "Realtor at Coldwell Banker Las Olas",
  },
  {
    photo: tJohn,
    quote: "Virtual Producers are consummate professionals. I worked with Austin. He is highly customer-centric in his approach to his work being both conscientious and polished. Austin is someone I'd highly recommend and be delighted to work with at any time.",
    name: "John Winter",
    role: "Vice President of Learning Solutions at Corporate Education Group",
  },
  {
    photo: tDeidra,
    quote: "He showed collaborative leadership by being open to suggestions and allowed room for other perspectives. He swiftly made decisions regarding the platform configuration, production planning, and processes. He demonstrated impeccable customer service in his responsiveness to each stakeholder and their unique needs. He was very knowledgeable in the technology and made great connections with all team-mates and speakers. It was an absolute pleasure working with him.",
    name: "Deidra Freeman",
    role: "Global Event Program Management | Project Management | Transformation",
  },
  {
    photo: tKimR2,
    quote: "I had the pleasure to work with Virtual Producers on a three-day virtual conference with multiple breakout sessions. They were incredibly skilled, knowledgeable, and easy to work with. The professionalism, expertise, and poise they brought to this event made it a flawless experience for the client and attendees. For virtual events that require complex coordination, my first call is to Austin and his team at Virtual Producers.",
    name: "Kim Ribich, CCTC, NCRW, NCOPE",
    role: "Multi-Certified Career Transition Coach + Resume and Online Profile Writer",
  },
  {
    photo: tErik,
    quote: "We love working with Virtual Producers to produce our virtual events! They are pro's pros. He's got all the technical savvy required but just as important he's super easy to work with. Great presence on camera as well! If you need a virtual producer for one of your events, go with Austin.",
    name: "Erik Pesner, Ph.D.",
    role: "Principal @ Contemporary Leadership Advisors | Industrial-Organizational",
  },
  {
    photo: tNatasha,
    quote: "They are highly experienced, organised and pleasure to work with. I would recommend Virtual Producers to anyone who wants to get work done professionally.",
    name: "Natasha Dolph",
    role: "Commercial Real Estate Investment Opportunities | Developers & Family Offices",
  },
  {
    photo: tMelissa,
    quote: "These folks are top notch virtual producers. Patient, knowledgeable, professional and ready to jump in to make your event a success are a few words that describe my experience. I look forward to further partnerships. Definitely worth the investment!",
    name: "Melissa Dawn Simkins",
    role: "CEO | Velvet Suite | Founder | The She-Suite | Inc 5000 | Advisor to the C-Suite",
  },
];

const TestimonialCard = ({ t, index }: { t: typeof testimonials[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="glass rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/25 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(38,90%,55%/0.1)] break-inside-avoid mb-6 group"
  >
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
      ))}
    </div>
    <p className="text-sm text-foreground/80 leading-relaxed italic">"{t.quote}"</p>
    <div className="flex items-center gap-3 mt-auto pt-2">
      <img
        src={t.photo}
        alt={t.name}
        className="h-11 w-11 rounded-full object-cover border-2 border-primary/20 shrink-0"
        loading="lazy"
      />
      <div>
        <p className="font-bold text-sm">{t.name}</p>
        <p className="text-xs text-muted-foreground leading-snug">{t.role}</p>
      </div>
    </div>
  </motion.div>
);

const SocialProofSection = () => (
  <section className="relative overflow-hidden px-6 py-28">
    <div
      className="absolute inset-0 opacity-30"
      style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(38 90% 55% / 0.08), transparent 60%)" }}
    />
    <FloatingIcons icons={[Star, CheckCircle2, Users, Shield]} count={8} />
    <motion.div
      className="relative z-10 mx-auto max-w-6xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={stagger}
    >
      <motion.p variants={fadeUp} className="text-center text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">
        Don't take our word for it
      </motion.p>
      <motion.h2 variants={fadeUp} className="text-center text-4xl font-extrabold sm:text-5xl">
        Here's What Happens When You{" "}
        <span className="shimmer-text">Stop Winging It</span>
      </motion.h2>
      <motion.p variants={fadeUp} className="text-center mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
        Real feedback from L&amp;D leaders, facilitators, and program directors who made the switch.
      </motion.p>

      <motion.div
        variants={stagger}
        className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-6"
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} t={t} index={i} />
        ))}
      </motion.div>
    </motion.div>
  </section>
);

// ─── Meet Austin ───
const FounderSection = () => (
  <section className="px-6 py-28 relative overflow-hidden">
    <FloatingIcons icons={[Phone, Mail, Linkedin, Star, Users]} count={6} />
    <div
      className="absolute inset-0 opacity-20"
      style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(38 90% 55% / 0.06), transparent 50%)" }}
    />
    <motion.div
      className="mx-auto max-w-4xl relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -3 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0"
        >
          <div className="relative group">
            <img
              src={austinPhoto}
              alt="Austin Talley, Founder of Virtual Producers"
              className="h-64 w-64 rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 shadow-[0_0_30px_hsl(38,90%,55%/0.2)] group-hover:shadow-[0_0_50px_hsl(38,90%,55%/0.3)] transition-shadow duration-500" />
            {/* Decorative corner accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-primary">From the founder</p>
          <h2 className="text-4xl font-extrabold sm:text-5xl">Hey, I'm <span className="shimmer-text">Austin.</span></h2>
          <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
            I've spent <span className="text-foreground font-semibold">15+ years</span> in virtual production, and for most of that time, I watched incredible facilitators get buried under tech they never signed up to manage. It frustrated me every single time.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
            So I built Virtual Producers to fix exactly that. Today, my team has produced <span className="text-primary font-semibold keyword-glow">2,000+ events</span> for <span className="text-primary font-semibold keyword-glow">350,000+ participants</span> worldwide, and we've never had a session fail. <span className="text-foreground font-bold">Not once.</span>
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
            If you're running high-stakes training programs, I'd love to be the person who makes tech completely invisible for you. Let's talk.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-bold shadow-[0_0_30px_hsl(38,90%,55%/0.3)] hover:shadow-[0_0_50px_hsl(38,90%,55%/0.5)] transition-all duration-300"
            >
              <a href={CALENDLY} onClick={openCalendlyPopup}>
                Book a Call with Austin
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

// ─── FAQ ───
const faqs = [
  {
    q: "Can we just handle production ourselves?",
    a: "Maybe for session one. By session five, your facilitator is fried. Content suffers. Engagement drops. Participants feel it. The question isn't whether you CAN do it yourself, it's whether you SHOULD, when this much is on the line.",
  },
  {
    q: "Isn't this too expensive?",
    a: "We hear you. But what does one botched session cost in participant trust, renewals, and brand credibility? If your cohort is worth $30K+, professional production isn't an expense, it's insurance.",
  },
  {
    q: "Will my facilitators actually like working with you?",
    a: "Absolutely. We assign the SAME producer to your entire cohort. We rehearse before session one. By session two, we're finishing each other's sentences. We don't feel like outsiders, we feel like the teammate your facilitator always wished they had.",
  },
  {
    q: "What platforms do you support?",
    a: "Zoom, Microsoft Teams, Webex, and mixed environments. If your org requires switching platforms mid-program, we handle that too. If your cohort runs on it, we produce on it. No exceptions.",
  },
  {
    q: "How fast can you start?",
    a: "Once we align on scope, we can be rehearsing with your team within days. No 6-week onboarding cycle. No paperwork avalanche. Just a strategy call, a playbook, a rehearsal, and you're live with a production team that's ready to go.",
  },
  {
    q: "What if we only need help for a few sessions?",
    a: "If you're running a multi-session cohort program, we're built for that. We don't do one-off webinars, not because we can't, but because the real value shows up when we're embedded in your program week after week. That's where consistency becomes your superpower.",
  },
];

const FAQSection = () => (
  <section className="px-6 py-28 relative overflow-hidden">
    <FloatingIcons icons={[Zap, Shield, Monitor, Users, CheckCircle2]} count={6} />
    <motion.div
      className="mx-auto max-w-3xl relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.p variants={fadeUp} className="text-center text-sm font-bold uppercase tracking-[0.25em] text-primary mb-4">
        We get it
      </motion.p>
      <motion.h2 variants={fadeUp} className="text-center text-4xl font-extrabold sm:text-5xl">
        You've Got <span className="shimmer-text">Questions.</span>
        <br />
        <span className="text-2xl sm:text-3xl text-muted-foreground font-bold">We've Got Straight Answers.</span>
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
                {faq.q}
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
const FinalCTA = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const words = ["Your", "Next", "Cohort", "Deserves"];

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-32 md:py-40">
      {/* Multi-layer animated background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(38 90% 55% / 0.12), hsl(24 85% 48% / 0.06), hsl(216 90% 58% / 0.04))",
          }}
        />
      </motion.div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(38 90% 55% / 0.12), transparent 60%)" }}
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(216 90% 58% / 0.08), transparent 60%)" }}
        animate={{ x: [0, -40, 25, 0], y: [0, 30, -25, 0], scale: [1, 0.95, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(43 65% 50% / 0.06), transparent 50%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating icons */}
      <FloatingIcons icons={[Star, CheckCircle2, ArrowRight, Zap, Shield, Phone, Mail]} count={12} />

      {/* Rising particles */}
      <ParticleField count={25} />

      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, hsl(38 90% 55% / 0.1), transparent 50%)" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {/* Animated headline word by word */}
        <h2 className="text-4xl font-extrabold sm:text-5xl md:text-6xl leading-tight">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.22em]"
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            className="inline-block shimmer-text"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Better Than "Fingers Crossed."
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 text-xl text-muted-foreground max-w-xl mx-auto"
        >
          <span className="text-foreground font-medium">15 minutes. One call.</span> That's all it takes to see if we're the right fit. No pitch deck. No pressure. Just a real conversation about your program.
        </motion.p>

        {/* CTA with epic pulsing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 flex justify-center"
        >
          <div className="relative">
            {/* Triple pulse rings */}
            <motion.div
              className="absolute -inset-5 rounded-xl bg-primary/20 blur-md"
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute -inset-5 rounded-xl bg-primary/15 blur-lg"
              animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            />
            <motion.div
              className="absolute -inset-5 rounded-xl bg-primary/10 blur-xl"
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
            />
            <Button
              asChild
              size="lg"
              className="relative group bg-primary hover:bg-primary/90 text-primary-foreground px-14 py-7 text-lg font-bold shadow-[0_0_50px_hsl(38,90%,55%/0.5)] hover:shadow-[0_0_80px_hsl(38,90%,55%/0.7)] transition-all duration-500"
            >
              <a href={CALENDLY} onClick={openCalendlyPopup}>
                Let's Make Tech Disappear
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.05 }}
          className="mt-8 flex items-center justify-center gap-2"
        >
          <span className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-2.5 text-sm font-medium text-amber-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 shrink-0"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            We only onboard <strong className="text-amber-100 mx-1">4 new clients per month.</strong>
            <span className="text-amber-300/70">You've found us, don't lose your spot.</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-sm text-muted-foreground"
        >
          15 minutes. One conversation. Zero pressure.
        </motion.p>
      </motion.div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent glow-line-gold" />
    </section>
  );
};

// ─── Footer ───
const Footer = () => (
  <footer className="border-t border-border/20 px-6 py-10">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8">
          <svg preserveAspectRatio="none" viewBox="90.391 393 3142.609 2721.9" height="32" width="32" xmlns="http://www.w3.org/2000/svg" aria-label="Virtual Producers Logo">
            <g>
              <path d="M90.4 394.5c.3.8 228.5 394.2 507.2 874.2 278.7 480.1 633.1 1090.6 787.7 1356.8 154.5 266.2 281.7 485.2 282.6 486.7l1.6 2.7 84.5-147.1c46.5-80.9 84.4-147.6 84.2-148.2s-301-524.9-668.5-1165.1-670.4-1168.1-673.1-1173c-2.7-5-15.3-26.9-27.9-48.8L445.8 393h-178c-157.7 0-177.9.2-177.4 1.5"></path>
              <path d="M765 393.5c0 .6 443.4 773.4 486.8 848.5 29.7 51.5 751.3 1288.4 752.1 1289.2.3.4 39-66.1 85.9-147.7l85.2-148.4-325.7-567.3c-179.1-312-325.7-568.2-325.7-569.3s-51.8-90.9-115.2-199.5l-115.2-197.5 385.1-.3c211.8-.1 385.2 0 385.5.2.2.3-50.5 87.3-112.6 193.3-62.2 106.1-113.4 193.6-113.7 194.5-.4 1 31.4 57.3 87.6 155.2 75.9 132.3 88.4 153.4 89.4 151.9.7-1 131.4-223.9 290.5-495.3s291.2-496.8 293.6-500.8l4.4-7.2h-919c-505.5 0-919 .2-919 .5"></path>
              <path d="M2533 1024.7c-203.7 347.4-370.3 632.1-370.3 632.7 0 1.5 171 299.1 171.8 299.1.6 0 898.5-1562.1 898.5-1563.1 0-.2-74.2-.4-164.9-.4h-164.8z"></path>
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
const Index = () => (
  <div className="min-h-screen bg-background text-foreground noise-overlay">
    <CalendlyPopup />
    <FloatingBlobs />
    <StickyBar />
    <main className="relative z-[2] pt-16">
      <Hero />
      <LogoMarquee />
      <ConnectingLine />
      <ProblemSection />
      <ConnectingLine />
      <RealCostSection />
      <ConnectingLine />
      <ShiftSection />
      <ConnectingLine />
      <HowItWorksSection />
      <ConnectingLine />
      <ServicesSection />
      <ConnectingLine />
      <BoldQualifierSection />
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
