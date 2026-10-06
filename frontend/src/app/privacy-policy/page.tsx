import React from 'react';
import ChatWidget from "@/components/ChatWidget";

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen relative flex flex-col pt-24 pb-16 bg-[#f8fafc]">
            <div className="max-w-4xl mx-auto px-6 w-full">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-[#111A4A] mb-6 tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
                        Last updated: September 5, 2026
                    </p>

                    <div className="prose prose-blue max-w-none text-[#15172B]/80 text-sm md:text-base space-y-6">
                        <section>
                            <h2 className="text-xl font-bold text-[#111A4A] mb-3">1. Introduction</h2>
                            <p>
                                Welcome to ITSoftLab360. We are committed to protecting your personal information and your right to privacy.
                                If you have any questions or concerns about this privacy notice or our practices with regard to your personal information,
                                please contact us at hello@itsoftlab360.com.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#111A4A] mb-3">2. Information We Collect</h2>
                            <p>
                                We collect personal information that you voluntarily provide to us when you register on the website,
                                express an interest in obtaining information about us or our products and services, when you participate in
                                activities on the website, or otherwise when you contact us.
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Personal Data (e.g., Name, Email Address, Phone Number)</li>
                                <li>Usage Data (e.g., IP Address, Browser Type, Pages Visited)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#111A4A] mb-3">3. How We Use Your Information</h2>
                            <p>
                                We use personal information collected via our website for a variety of business purposes described below.
                                We process your personal information for these purposes in reliance on our legitimate business interests,
                                in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#111A4A] mb-3">4. Will Your Information Be Shared With Anyone?</h2>
                            <p>
                                We only share information with your consent, to comply with laws, to provide you with services,
                                to protect your rights, or to fulfill business obligations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#111A4A] mb-3">5. Cookies and Similar Technologies</h2>
                            <p>
                                We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information.
                                Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#111A4A] mb-3">6. Contact Us</h2>
                            <p>
                                If you have questions or comments about this notice, you may email us at hello@itsoftlab360.com or by post to:
                            </p>
                            <p className="mt-2 font-medium">
                                ITSoftLab360<br />
                                651 Sector A Mahalaxmi Nagar<br />
                                Indore
                            </p>
                        </section>
                    </div>
                </div>
            </div>
            <ChatWidget />

            {/* Global decorative background elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-[96px] translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-[96px] -translate-x-1/3 translate-y-1/3"></div>
            </div>
        </main>
    );
}
