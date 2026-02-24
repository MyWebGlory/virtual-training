import { motion } from "framer-motion";
import {
  Monitor, Users, BarChart3, Wrench, ClipboardCheck, UserCheck,
  CheckCircle2, XCircle, Star, Phone, Mail, Linkedin, ChevronDown,
  Zap, Shield, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import austinPhoto from "@/assets/austin-talley-founder.png";
import vmLogo from "@/assets/vm-logo-white.png";
import heroBg from "@/assets/hero-bg.webp";
import controlRoom from "@/assets/virtual-events-control-room.webp";
import videoProduction from "@/assets/video-production.webp";
import meetingProsVideo from "@/assets/meeting-pros-video.mp4";

const CALENDLY = "https://calendly.com/austin-vmproducers";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Sticky Top Bar ───
const StickyBar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <img src={vmLogo} alt="Virtual Producers" className="h-8" />
      <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
          Book Your Free Strategy Call
        </a>
      </Button>
    </div>
  </header>
);

// ─── Hero ───
const Hero = () => (
  <section className="relative flex min-h-[90vh] items-center justify-center px-6 pt-16">
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
    </div>
    <motion.div
      className="relative z-10 mx-auto max-w-4xl text-center"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      <motion.h1
        variants={fadeUp}
        className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Your Facilitators Shouldn't Be Managing{" "}
        <span className="text-primary">Breakout Rooms.</span>
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
      >
        For corporate cohorts of 50+ participants, we handle every technical detail — so your training team can focus entirely on delivery.
      </motion.p>
      <motion.div variants={fadeUp} className="mt-10">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-base font-semibold">
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
            Book a Free Strategy Call
          </a>
        </Button>
      </motion.div>
      <motion.div
        variants={fadeUp}
        className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground sm:gap-10"
      >
        {[
          "2,000+ Successful Events",
          "100% Success Rate",
          "350K+ Global Attendees",
        ].map((stat) => (
          <div key={stat} className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="font-medium text-foreground/80">{stat}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

// ─── Problem Cards ───
const problems = [
  {
    icon: Zap,
    title: "Facilitator Overload",
    text: "Your instructors are juggling teaching, chat, polls, breakout rooms, and troubleshooting — all at once. Teaching always suffers.",
  },
  {
    icon: Shield,
    title: "Credibility at Risk",
    text: "One technical glitch in a high-stakes cohort erodes professional trust. In corporate training, trust = future contracts.",
  },
  {
    icon: Layers,
    title: "Interactivity Chaos",
    text: "You want polls, breakout rooms, and smooth transitions. Without a dedicated producer, complexity becomes chaos.",
  },
];

const ProblemSection = () => (
  <section className="px-6 py-24">
    <motion.div
      className="mx-auto max-w-6xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold sm:text-4xl">
        The Hidden Cost of <span className="text-primary">DIY Production</span>
      </motion.h2>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {problems.map((p) => (
          <motion.div
            key={p.title}
            variants={fadeUp}
            className="rounded-xl border border-border/60 bg-card p-8 transition-colors hover:border-primary/40"
          >
            <p.icon className="mb-4 h-8 w-8 text-primary" />
            <h3 className="mb-3 text-xl font-bold">{p.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{p.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

// ─── The Shift ───
const ShiftSection = () => (
  <section className="relative overflow-hidden px-6 py-24">
    <div className="absolute inset-0">
      <img src={controlRoom} alt="" className="h-full w-full object-cover opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background" />
    </div>
    <motion.div
      className="relative z-10 mx-auto max-w-5xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <motion.p variants={fadeUp} className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            The Shift
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold sm:text-4xl">
            What If Technology Was Never a Barrier to Learning?
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground leading-relaxed">
            When a dedicated production team handles the platform, your facilitators do what they do best — teach, engage, and lead.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 h-1 w-24 rounded-full bg-primary" />
        </div>
        <motion.div variants={fadeUp} className="overflow-hidden rounded-xl border border-border/30">
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
  <section className="px-6 py-24">
    <motion.div
      className="mx-auto max-w-6xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold sm:text-4xl">
        What We <span className="text-primary">Handle</span>
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-4 text-center text-muted-foreground">
        One reliable team. Every session. No surprises.
      </motion.p>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className="flex items-start gap-4 rounded-lg border border-border/40 bg-card/50 p-6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold">{s.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

// ─── Qualifier ───
const QualifierSection = () => (
  <section className="px-6 py-24">
    <motion.div
      className="mx-auto max-w-4xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold sm:text-4xl">
        Is This <span className="text-primary">For You?</span>
      </motion.h2>
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <motion.div variants={fadeUp} className="rounded-xl border border-primary/30 bg-primary/5 p-8">
          <h3 className="mb-6 text-lg font-bold text-primary">This is for you if…</h3>
          <ul className="space-y-4">
            {[
              "You run cohort-based training with 50–150+ participants",
              "Your programs span 6–12+ sessions",
              "You operate in medical, financial, or enterprise environments",
              "Professional credibility is non-negotiable",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={fadeUp} className="rounded-xl border border-border/60 bg-card p-8">
          <h3 className="mb-6 text-lg font-bold text-muted-foreground">This is NOT for…</h3>
          <ul className="space-y-4">
            {[
              "Solo coaches or individual presenters",
              "Small webinars under 30 participants",
              "One-off workshops or single events",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground/50" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

// ─── Social Proof ───
const SocialProofSection = () => (
  <section className="relative overflow-hidden px-6 py-24">
    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
    <motion.div
      className="relative z-10 mx-auto max-w-5xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold sm:text-4xl">
        Trusted by <span className="text-primary">Industry Leaders</span>
      </motion.h2>

      {/* Testimonial */}
      <motion.div variants={fadeUp} className="mx-auto mt-14 max-w-3xl rounded-xl border border-border/40 bg-card p-8 md:p-10">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-primary text-primary" />
          ))}
        </div>
        <blockquote className="text-lg leading-relaxed text-foreground/90 italic">
          "I have been so blessed to work with Virtual Producers!!! They are ALWAYS on time, professional, detail-oriented and committed to excellence. This team works alongside our team to produce high-quality events."
        </blockquote>
        <div className="mt-6">
          <p className="font-bold">Jeanette McCullough</p>
          <p className="text-sm text-muted-foreground">BirthSwell — Director of Virtual Events</p>
        </div>
      </motion.div>

      {/* Client Logos */}
      <motion.div variants={fadeUp} className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
        {["Nike", "Samsung", "HP", "Oracle", "Adidas", "Nokia", "Secureworks"].map((logo) => (
          <span key={logo} className="text-lg font-semibold tracking-wide text-muted-foreground/40 uppercase">
            {logo}
          </span>
        ))}
      </motion.div>

      {/* Review Badges */}
      <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center justify-center gap-8">
        {["Capterra", "Trustpilot", "Google"].map((platform) => (
          <div key={platform} className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">{platform}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

// ─── Meet Austin ───
const FounderSection = () => (
  <section className="px-6 py-24">
    <motion.div
      className="mx-auto max-w-4xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-14">
        <motion.div variants={fadeUp} className="shrink-0">
          <img
            src={austinPhoto}
            alt="Austin Talley, Founder of Virtual Producers"
            className="h-56 w-56 rounded-2xl object-cover border-2 border-primary/20"
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Meet the Founder</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Austin Talley</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            With over 2,000 successful virtual events produced globally, Austin built Virtual Producers to solve one problem: facilitators shouldn't double as tech support. Based in New York, he and his team provide the calm, invisible production backbone that high-stakes cohort programs demand.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a href="tel:4043371539" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Phone className="h-4 w-4" /> 404.337.1539
            </a>
            <a href="mailto:austin@vproducers.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Mail className="h-4 w-4" /> austin@vproducers.com
            </a>
            <a href="https://www.linkedin.com/in/talley-austin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
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
  <section className="px-6 py-24">
    <motion.div
      className="mx-auto max-w-3xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-center text-3xl font-bold sm:text-4xl">
        Common <span className="text-primary">Questions</span>
      </motion.h2>
      <motion.div variants={fadeUp} className="mt-12">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="rounded-lg border border-border/60 bg-card px-6">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                "{faq.q}"
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
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
  <section className="relative overflow-hidden px-6 py-28">
    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent" />
    <motion.div
      className="relative z-10 mx-auto max-w-3xl text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-3xl font-bold sm:text-4xl md:text-5xl">
        Stop Risking Your Program's <span className="text-primary">Credibility.</span>
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground">
        Book a free strategy call. Let's make technology invisible.
      </motion.p>
      <motion.div variants={fadeUp} className="mt-10">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-base font-semibold">
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
            Book Your Free Strategy Call
          </a>
        </Button>
      </motion.div>
      <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
        <a href="tel:4043371539" className="flex items-center gap-2 hover:text-foreground transition-colors">
          <Phone className="h-4 w-4" /> 404.337.1539
        </a>
        <a href="mailto:austin@vproducers.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
          <Mail className="h-4 w-4" /> austin@vproducers.com
        </a>
      </motion.div>
    </motion.div>
  </section>
);

// ─── Footer ───
const Footer = () => (
  <footer className="border-t border-border/40 px-6 py-8">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
      <span>© {new Date().getFullYear()} Virtual Producers · New York, NY</span>
      <div className="flex items-center gap-6">
        <a href="mailto:austin@vproducers.com" className="hover:text-foreground transition-colors">austin@vproducers.com</a>
        <a href="tel:4043371539" className="hover:text-foreground transition-colors">404.337.1539</a>
        <a href="https://www.linkedin.com/in/talley-austin" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </div>
  </footer>
);

// ─── Main Page ───
const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <StickyBar />
    <main>
      <Hero />
      <ProblemSection />
      <ShiftSection />
      <ServicesSection />
      <QualifierSection />
      <SocialProofSection />
      <FounderSection />
      <FAQSection />
      <FinalCTA />
    </main>
    <Footer />
  </div>
);

export default Index;
