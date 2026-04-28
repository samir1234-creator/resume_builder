import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { FileText, Zap, Layout, Download, CheckCircle, ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="px-8 h-12 flex items-center bg-white sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-3" to="/">
          <div className="w-8 h-8 bg-slate-950 flex items-center justify-center text-white font-black rounded-xl rotate-12 italic text-lg shadow-lg">E</div>
          <span className="font-black text-lg tracking-tight uppercase italic">Elevate CV</span>
        </Link>
        <nav className="ml-auto flex gap-8 items-center">
          <Link className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-950 transition-colors" to="#features">
            Services
          </Link>
          <Link className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors" to="#templates">
            Templates
          </Link>
          <Link 
            className="bg-slate-900 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95" 
            to="/login"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 px-8">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 max-w-[900px]"
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif italic tracking-tighter leading-tight">
                Craft your <span className="text-slate-400 underline decoration-1 underline-offset-8 font-normal">professional</span> narrative.
              </h1>
              <p className="mx-auto max-w-[600px] text-slate-500 text-lg md:text-xl font-medium">
                Modern, editorial-style resume templates designed to get you noticed by the world's most innovative companies.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 pt-4"
            >
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-10 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-2xl transition-all hover:bg-slate-800 hover:-translate-y-1"
              >
                Start Building
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="#templates"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-10 py-4 text-xs font-bold uppercase tracking-widest shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300"
              >
                Gallery
              </Link>
            </motion.div>
          </div>
        </section>

            {/* Preview Image Placeholder */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-16 w-full max-w-5xl rounded-2xl border-8 border-slate-200 shadow-2xl overflow-hidden bg-slate-900"
            >
               <div className="aspect-video relative group cursor-pointer overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-8 bg-slate-800 flex items-center px-4 gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="pt-8 h-full flex">
                  {/* Mock Sidebar */}
                  <div className="w-1/3 h-full border-r border-slate-800 p-6 space-y-6 hidden md:block">
                     <div className="h-4 w-1/2 bg-slate-700 rounded animate-pulse" />
                     <div className="space-y-3">
                        <div className="h-2 w-full bg-slate-800 rounded" />
                        <div className="h-2 w-3/4 bg-slate-800 rounded" />
                        <div className="h-2 w-full bg-slate-800 rounded" />
                     </div>
                     <div className="h-4 w-1/3 bg-slate-700 rounded animate-pulse" />
                     <div className="space-y-3">
                        <div className="h-2 w-full bg-slate-800 rounded" />
                        <div className="h-2 w-full bg-slate-800 rounded" />
                     </div>
                  </div>
                  {/* Mock Page */}
                  <div className="flex-1 bg-white p-12 overflow-hidden">
                    <div className="max-w-[400px] mx-auto space-y-8">
                       <div className="space-y-4">
                          <div className="h-12 w-2/3 bg-slate-100 rounded-lg" />
                          <div className="h-4 w-full bg-slate-50 rounded" />
                       </div>
                       <div className="space-y-6">
                          <div className="h-4 w-1/4 bg-blue-100 rounded" />
                          <div className="space-y-4 border-l-2 border-slate-100 pl-4">
                             <div className="h-4 w-full bg-slate-50 rounded" />
                             <div className="h-2 w-3/4 bg-slate-50 rounded" />
                             <div className="h-4 w-full bg-slate-50 rounded" />
                             <div className="h-2 w-1/2 bg-slate-50 rounded" />
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

        {/* Features Section */}
        <section id="features" className="w-full py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Succeed</h2>
              <p className="text-slate-500 max-w-[800px] mx-auto text-lg">
                Our features are designed to make the resume building process as smooth and effective as possible.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: "Live Preview", desc: "See your changes in real-time as you type them. No more guessing." },
                { icon: Layout, title: "Modern Templates", desc: "Choose from a variety of professional templates designed for different industries." },
                { icon: Download, title: "Quick Export", desc: "Export your resume to PDF or DOCX in high quality with a single click." },
              ].map((feature, i) => (
                <div key={i} className="group p-8 rounded-2xl bg-slate-50 transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                  <div className="w-12 h-12 bg-slate-900/10 rounded-xl flex items-center justify-center mb-6 text-slate-900 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why experts choose Elevate CV</h2>
              <div className="space-y-6">
                {[
                  "No credit card required. Start building for free.",
                  "ATS-friendly templates to pass applicant systems.",
                  "Automatic section reordering with drag and drop.",
                  "Secure cloud storage. Access your resumes anywhere.",
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <p className="text-lg text-slate-600 font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/login"
                className="inline-flex h-12 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-medium text-white shadow transition-all hover:bg-slate-800 hover:scale-105 active:scale-95"
              >
                Sign Up Now
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-slate-200/50 blur-3xl rounded-full" />
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 flex flex-col gap-6">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-400 to-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">Sarah Johnson</h4>
                    <p className="text-xs text-slate-500">Software Engineer @ TechCorp</p>
                  </div>
                </div>
                <p className="text-slate-600 italic leading-relaxed">
                  "The templates are incredibly modern and easy to customize. I got an interview within a week of using the corporate template. Highly recommended!"
                </p>
                <div className="flex text-yellow-400 gap-0.5">
                  {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-4 border-t bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <Link className="flex items-center gap-2" to="/">
              <div className="w-6 h-6 bg-slate-950 text-white flex items-center justify-center text-[10px] font-black rounded-lg rotate-12 italic">E</div>
              <span className="font-black text-lg uppercase tracking-tight italic">Elevate CV</span>
            </Link>
            <p className="text-slate-500 text-sm">Curating the world's finest careers.</p>
          </div>
          <div className="flex gap-8 px-4 text-slate-400">
            <Link className="text-[10px] font-bold uppercase tracking-widest hover:text-slate-950 transition-colors" to="#">Legal</Link>
            <Link className="text-[10px] font-bold uppercase tracking-widest hover:text-slate-950 transition-colors" to="#">Privacy</Link>
            <Link className="text-[10px] font-bold uppercase tracking-widest hover:text-slate-950 transition-colors" to="#">Contact</Link>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-loose">© 2026 Elevate CV. Platform by Samir.</p>
        </div>
      </footer>
    </div>
  );
}
