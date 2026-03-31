import { motion } from 'framer-motion';
import { 
  Sparkles, BookOpen, Layers, Download, BarChart3, 
  Zap, Shield, Globe, PenTool, MessageSquare 
} from 'lucide-react';

const features = [
  { icon: Sparkles, title: 'AI-Powered Writing', desc: 'Generate entire chapters with a single click using advanced AI.' },
  { icon: BookOpen, title: 'Smart Outlines', desc: 'AI creates detailed, structured outlines from your book concept.' },
  { icon: PenTool, title: 'Rich Editor', desc: 'Full Markdown editor with floating toolbar and live preview.' },
  { icon: Layers, title: 'Chapter Management', desc: 'Drag-and-drop chapter ordering with status tracking.' },
  { icon: Download, title: 'Multi-Format Export', desc: 'Export to PDF, Markdown, and more with one click.' },
  { icon: BarChart3, title: 'Writing Analytics', desc: 'Track your words, streaks, and productivity over time.' },
  { icon: Zap, title: 'Auto-Save', desc: 'Never lose work with automatic saving every 30 seconds.' },
  { icon: MessageSquare, title: 'AI Assistant', desc: 'Chat with AI to improve, expand, or refine your writing.' },
  { icon: Shield, title: 'Private & Secure', desc: 'Your writing data is encrypted and never shared.' },
  { icon: Globe, title: 'Multi-Language', desc: 'Write in any language with full Unicode support.' },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Write & Publish</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A complete toolkit for authors, from idea to published eBook.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-5 hover:-translate-y-1 transition-transform duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
