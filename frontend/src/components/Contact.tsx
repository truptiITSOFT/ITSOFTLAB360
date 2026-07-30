"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: `${formData.get("firstName")} ${formData.get("lastName")}`,
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="pt-8 pb-24 relative z-10" id="contact">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-blue-600 dark:text-blue-500 font-semibold tracking-wider text-sm uppercase mb-4 transition-colors">Get In Touch</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white transition-colors">
              Let's Discuss Your <span className="text-blue-600 dark:text-blue-500 text-glow">Next Project</span>
            </h3>
            <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg transition-colors">
              Whether you need a custom enterprise solution or want to learn more about our products, our experts are here to help.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 bg-white/80 dark:bg-[#0f172a]/40 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-none p-4 md:p-8 backdrop-blur-sm transition-colors">
          
          {/* Contact Info (Left Side - spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/40 dark:to-[#020617] rounded-2xl p-8 border border-blue-200 dark:border-blue-500/20 relative overflow-hidden transition-colors"
          >
             {/* Decorative glow */}
             <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/30 blur-[80px] rounded-full"></div>
             
             <h4 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 transition-colors">Contact Information</h4>
             
             <div className="space-y-8 relative z-10">
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-500/30 transition-colors">
                   <Mail size={20} />
                 </div>
                 <div>
                   <h5 className="text-sm text-slate-500 dark:text-gray-400 mb-1 transition-colors">Email Us</h5>
                   <p className="text-slate-800 dark:text-white font-medium transition-colors">contact@itsoftlab.com</p>
                   <p className="text-slate-800 dark:text-white font-medium transition-colors">support@itsoftlab.com</p>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-500/30 transition-colors">
                   <Phone size={20} />
                 </div>
                 <div>
                   <h5 className="text-sm text-slate-500 dark:text-gray-400 mb-1 transition-colors">Call Us</h5>
                   <p className="text-slate-800 dark:text-white font-medium transition-colors">+1 (555) 123-4567</p>
                   <p className="text-slate-800 dark:text-white font-medium transition-colors">+1 (555) 987-6543</p>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-500/30 transition-colors">
                   <MapPin size={20} />
                 </div>
                 <div>
                   <h5 className="text-sm text-slate-500 dark:text-gray-400 mb-1 transition-colors">Visit Us</h5>
                   <p className="text-slate-800 dark:text-white font-medium leading-relaxed transition-colors">
                     123 Innovation Drive,<br />
                     Tech District, Silicon Valley,<br />
                     CA 94043, USA
                   </p>
                 </div>
               </div>
             </div>
          </motion.div>

          {/* Contact Form (Right Side - spans 3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 p-4 md:p-8"
          >
            {isSubmitted ? (
               <div className="flex flex-col items-center justify-center h-full text-center py-12">
                 <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                   <CheckCircle2 size={32} className="text-green-400" />
                 </div>
                 <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                 <p className="text-gray-400 mb-6">We've received your message and will get back to you shortly.</p>
                 <button 
                   onClick={() => setIsSubmitted(false)}
                   className="text-blue-400 hover:text-blue-300 font-medium"
                 >
                   Send another message
                 </button>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm text-center">
                    {error}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-gray-400 mb-2 transition-colors">First Name</label>
                    <input required name="firstName" type="text" placeholder="John" className="w-full bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-gray-400 mb-2 transition-colors">Last Name</label>
                    <input required name="lastName" type="text" placeholder="Doe" className="w-full bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none transition-colors" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-gray-400 mb-2 transition-colors">Email Address</label>
                  <input required name="email" type="email" placeholder="john@company.com" className="w-full bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-gray-400 mb-2 transition-colors">Subject</label>
                  <input name="subject" type="text" placeholder="How can we help you?" className="w-full bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-gray-400 mb-2 transition-colors">Message</label>
                  <textarea required name="message" rows={4} placeholder="Tell us about your project..." className="w-full bg-gray-50 dark:bg-[#020617] border border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none transition-colors resize-none"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">Sending <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></span>
                  ) : (
                    <>SEND MESSAGE <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
