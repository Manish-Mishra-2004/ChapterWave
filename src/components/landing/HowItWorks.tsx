import { motion } from 'framer-motion';
import { Target, PenTool, Download } from 'lucide-react';

const steps = [
  { icon: Target, num: '01', title: 'Define Your Book', desc: 'Fill in title, genre, and let AI build your outline with chapter descriptions and key points.' },
  { icon: PenTool, num: '02', title: 'Write with AI', desc: 'Generate chapters instantly or write yourself. AI assists with improvements and suggestions.' },
  { icon: Download, num: '03', title: 'Export & Publish', desc: 'Download as PDF or Markdown instantly. Your book, beautifully formatted and ready to share.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-surface/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Three simple steps from idea to published book.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="relative inline-flex mb-6">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <span className="absolute -top-2 -right-2 text-xs font-bold gradient-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
                  {s.num}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
