"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, ArrowRight, CheckCircle2 } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const COUNTRY_CODES = [
  { code: '+1', country: 'USA', flag: 'us' },
  { code: '+44', country: 'UK', flag: 'gb' },
  { code: '+61', country: 'AUS', flag: 'au' },
  { code: '+81', country: 'JPN', flag: 'jp' },
  { code: '+91', country: 'IND', flag: 'in' },
  { code: '+971', country: 'UAE', flag: 'ae' },
  { code: '+880', country: 'BAN', flag: 'bd' },
].sort((a, b) => a.country.localeCompare(b.country));

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // simulation
    setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section className={`relative min-h-screen pt-10 pb-20 overflow-hidden bg-white ${poppins.className}`} id="contact">
      {/* Background Gradients & Grid (matching Home theme) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_19.2px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/20  rounded-full blur-[96px] mix-blend-multiply  animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-[320px] h-[320px] bg-[#EB3158]/20  rounded-full blur-[80px] mix-blend-multiply  animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-[85rem]">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-stretch pt-8">
          
          {/* Left Column: Typography & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between h-full py-4"
          >
            <div className="space-y-8">
              {/* Heading Section */}
            <div>
              <h1 className="text-[3.5rem] sm:text-[4rem] lg:text-[4.5rem] font-extrabold text-[#111A4A] tracking-tighter leading-[1.05] mb-4">
                Lets Get <br />
                <span className="text-[#EB3158] tracking-tighter">in touch</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#111A4A] font-medium opacity-80 leading-snug">
                Don't be afraid to say <br />hello with us!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4 max-w-[28rem]">
              {/* Email Card */}
              <a href="mailto:contact@itsoftlab.com" className="flex items-center justify-between p-3.5 px-5 bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-100 hover:bg-gray-100 transition-all group shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EB3158]/10 text-[#EB3158] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h5 className="text-[11px] text-gray-500 font-medium tracking-wide mb-0.5">Email Us</h5>
                    <p className="text-[14px] text-[#111A4A] font-bold">contact@itsoftlab.com</p>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-[#111A4A] shadow-sm group-hover:text-[#EB3158] transition-colors border border-gray-100">
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </div>
              </a>

              {/* Phone Card */}
              <a href="tel:+917898822644" className="flex items-center justify-between p-3.5 px-5 bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-100 hover:bg-gray-100 transition-all group shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EB3158]/10 text-[#EB3158] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h5 className="text-[11px] text-gray-500 font-medium tracking-wide mb-0.5">Call Us</h5>
                    <p className="text-[14px] text-[#111A4A] font-bold">+91 7898822644</p>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-[#111A4A] shadow-sm group-hover:text-[#EB3158] transition-colors border border-gray-100">
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </div>
              </a>

              {/* Location Card */}
              <a href="#" className="flex items-center justify-between p-3.5 px-5 bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-100 hover:bg-gray-100 transition-all group shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EB3158]/10 text-[#EB3158] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h5 className="text-[11px] text-gray-500 font-medium tracking-wide mb-0.5">Our Headquarter</h5>
                    <p className="text-[14px] text-[#111A4A] font-bold">Indore, Madhya Pradesh, India</p>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-[#111A4A] shadow-sm group-hover:text-[#EB3158] transition-colors border border-gray-100">
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </div>
              </a>
            </div>
          </div>

            {/* Social Links */}
            <div className="flex items-center gap-5 pt-8 mt-auto pb-4">
              <span className="text-[13px] font-bold text-[#111A4A] leading-tight tracking-tight">Follow<br/>us on</span>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/itsoftlabofficial/directory_personal_details" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-[14px] bg-[#EB3158]/10 flex items-center justify-center text-[#EB3158] hover:bg-[#EB3158] hover:text-white hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <FaFacebookF size={15} />
                </a>
                <a href="https://www.instagram.com/itsoftlab_consultancy/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-[14px] bg-[#EB3158]/10 flex items-center justify-center text-[#EB3158] hover:bg-[#EB3158] hover:text-white hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <FaInstagram size={15} />
                </a>
                <a href="https://www.linkedin.com/company/105841243/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-[14px] bg-[#EB3158]/10 flex items-center justify-center text-[#EB3158] hover:bg-[#EB3158] hover:text-white hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <FaLinkedinIn size={15} />
                </a>
                <a href="https://x.com/Itsoftlab_" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-[14px] bg-[#EB3158]/10 flex items-center justify-center text-[#EB3158] hover:bg-[#EB3158] hover:text-white hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <BsTwitterX size={14} />
                </a>
                <a href="https://www.youtube.com/@ITSoftlab" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-[14px] bg-[#EB3158]/10 flex items-center justify-center text-[#EB3158] hover:bg-[#EB3158] hover:text-white hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <FaYoutube size={15} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form Container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 relative w-full lg:ml-auto h-full"
          >
            {/* The Outer frosted glass border effect */}
            <div className="bg-white/80 backdrop-blur-xl p-2 sm:p-4 rounded-[2rem] h-full flex flex-col">
              
              {/* The Inner Form Card */}
              <div className="bg-white rounded-[1.5rem] p-5 sm:p-8 relative z-10 flex-grow">
                <h2 className="text-3xl font-bold text-[#111A4A] mb-6">Contact Us</h2>
                
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center h-[460px] text-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h4 className="text-3xl font-bold text-[#111A4A] mb-4">Message Sent!</h4>
                    <p className="text-gray-500 mb-8 text-base max-w-sm">We've received your message and will get back to you shortly.</p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-[#EB3158] hover:bg-[#d62850] text-white px-8 py-3 rounded-xl text-lg font-medium transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="bg-red-50 text-red-500 p-4 rounded-xl text-base border border-red-100">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-gray-500 mb-1.5 font-medium">Name</label>
                        <input 
                          required 
                          name="name" 
                          type="text" 
                          placeholder="johndoe@gmail.com" 
                          className="w-full bg-[#FAFAFA] border-none focus:ring-1 focus:ring-[#EB3158] rounded-xl px-4 py-3 text-[#111A4A] placeholder:text-gray-400 outline-none transition-all text-base" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1.5 font-medium">Email</label>
                        <input 
                          required 
                          name="email" 
                          type="email" 
                          placeholder="johndoe@gmail.com" 
                          className="w-full bg-[#FAFAFA] border-none focus:ring-1 focus:ring-[#EB3158] rounded-xl px-4 py-3 text-[#111A4A] placeholder:text-gray-400 outline-none transition-all text-base" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-gray-500 mb-1.5 font-medium">Phone Number</label>
                        <div className="flex bg-[#FAFAFA] rounded-xl focus-within:ring-1 focus-within:ring-[#EB3158] transition-all relative border border-transparent">
                          
                          {/* Country Code Selector */}
                          <div 
                            className="flex items-center gap-2 pl-4 pr-2 bg-[#FAFAFA] cursor-pointer rounded-l-xl"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          >
                             <img src={`https://flagcdn.com/w20/${selectedCountry.flag}.png`} alt={selectedCountry.country} className="w-5 h-auto rounded-[2px] shadow-sm" />
                             <span className="text-sm font-semibold text-gray-700">{selectedCountry.code}</span>
                             <span className={`text-gray-400 text-[10px] ml-0.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                          </div>

                          {/* Dropdown Menu */}
                          {isDropdownOpen && (
                            <>
                              {/* Invisible overlay to catch outside clicks */}
                              <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setIsDropdownOpen(false)}
                              ></div>
                              
                              <div className="absolute top-full left-0 mt-1.5 w-[160px] bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
                                <div className="max-h-40 overflow-y-auto custom-scrollbar relative z-50">
                                {COUNTRY_CODES.map((item) => (
                                  <div
                                    key={item.country}
                                    onClick={() => {
                                      setSelectedCountry(item);
                                      setIsDropdownOpen(false);
                                    }}
                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
                                  >
                                    <img src={`https://flagcdn.com/w20/${item.flag}.png`} alt={item.country} className="w-6 h-auto rounded-[2px]" />
                                    <span className="text-sm font-medium text-gray-700">{item.country}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            </>
                          )}

                          <input 
                            required 
                            name="phone" 
                            type="tel" 
                            pattern="[0-9]{10}"
                            maxLength={10}
                            title="Please enter exactly 10 digits"
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                            }}
                            placeholder="XXX XXX XXXX" 
                            className="w-full bg-transparent border-none px-3 py-3 text-[#111A4A] placeholder:text-gray-400 outline-none text-base rounded-r-xl" 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1.5 font-medium">Subject</label>
                        <input 
                          name="subject" 
                          type="text" 
                          placeholder="enter your subject" 
                          className="w-full bg-[#FAFAFA] border-none focus:ring-1 focus:ring-[#EB3158] rounded-xl px-4 py-3 text-[#111A4A] placeholder:text-gray-400 outline-none transition-all text-base" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1.5 font-medium">Message</label>
                      <textarea 
                        required 
                        name="message" 
                        rows={4} 
                        placeholder="enter your text..." 
                        className="w-full bg-[#FAFAFA] border-none focus:ring-1 focus:ring-[#EB3158] rounded-xl px-4 py-3 text-[#111A4A] placeholder:text-gray-400 outline-none transition-all resize-none text-base"
                      ></textarea>
                      <div className="flex justify-end pr-2 pt-1">
                         <svg className="w-3 h-3 text-gray-300 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 8h16M4 16h16" />
                         </svg>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full flex items-center justify-center gap-2 bg-[#EB3158] hover:bg-[#d62850] text-white px-6 py-3.5 rounded-xl text-lg font-bold transition-all shadow-[0_4px_16px_-4px_rgba(235,49,88,0.5)] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">Sending <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div></span>
                      ) : (
                        <>Sign In <ArrowRight size={18} strokeWidth={2.5} /></>
                      )}
                    </button>
                    
                    <div className="flex gap-2 items-start mt-2">
                      <div className="text-gray-400 mt-[3px] shrink-0 border border-gray-300 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] font-bold">i</div>
                      <p className="text-[10px] text-gray-400 leading-relaxed max-w-[95%]">
                        By submitting this message, you agree to our <a href="#" className="font-semibold text-[#111A4A] hover:text-[#EB3158] underline transition-colors">Privacy Policy.</a> We respect your data and will never share your information without your consent.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
