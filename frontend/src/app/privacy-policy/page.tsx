"use client";

import React from "react";
import {
    ShieldCheck,
    Lock,
    Database,
    Users,
    Eye,
    FileText,
    Server,
    Cookie,
    CreditCard,
    Mail,
    CheckCircle2,
    ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const sections = [
    {
        id: "information",
        title: "Information We Collect",
        icon: Database,
        content: (
            <>
                <p>
                    Depending on how you use ITSOFTLAB360, we may collect information
                    necessary to provide our website, applications, software products,
                    and related services.
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-gray-200 p-5">
                        <h4 className="font-semibold text-black">Personal Information</h4>
                        <ul className="mt-3 space-y-2 text-sm">
                            <li>• Name</li>
                            <li>• Email address</li>
                            <li>• Phone number</li>
                            <li>• Business or organization name</li>
                            <li>• Job title and account information</li>
                        </ul>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-5">
                        <h4 className="font-semibold text-black">Technical Information</h4>
                        <ul className="mt-3 space-y-2 text-sm">
                            <li>• Device and browser information</li>
                            <li>• Operating system</li>
                            <li>• Application version</li>
                            <li>• IP and log information</li>
                            <li>• Date and time of access</li>
                        </ul>
                    </div>
                </div>
            </>
        ),
    },

    {
        id: "usage",
        title: "How We Use Your Information",
        icon: Eye,
        content: (
            <>
                <p>
                    ITSOFTLAB360 uses collected information only for legitimate business
                    and operational purposes.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                        "Provide and operate our services",
                        "Create and manage user accounts",
                        "Authenticate and authorize users",
                        "Provide customer support",
                        "Improve our products and applications",
                        "Monitor performance and reliability",
                        "Detect security threats",
                        "Prevent unauthorized access",
                        "Process subscriptions and invoices",
                        "Comply with legal requirements",
                    ].map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-3 rounded-lg bg-gray-50 p-4"
                        >
                            <CheckCircle2 className="h-5 w-5 shrink-0" />
                            <span className="text-sm">{item}</span>
                        </div>
                    ))}
                </div>
            </>
        ),
    },

    {
        id: "security",
        title: "Data Security",
        icon: ShieldCheck,
        content: (
            <>
                <p>
                    ITSOFTLAB360 takes reasonable technical and organizational measures
                    designed to protect personal, business, and organizational
                    information.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            icon: Lock,
                            title: "Secure Authentication",
                            description:
                                "Authentication mechanisms help protect access to user accounts.",
                        },
                        {
                            icon: Users,
                            title: "Role-Based Access",
                            description:
                                "Users can access information based on their assigned permissions.",
                        },
                        {
                            icon: Server,
                            title: "System Security",
                            description:
                                "We use appropriate security controls to help protect our systems.",
                        },
                        {
                            icon: Database,
                            title: "Data Protection",
                            description:
                                "Appropriate measures are implemented to protect stored information.",
                        },
                        {
                            icon: Eye,
                            title: "Access Control",
                            description:
                                "Access to sensitive information is restricted to authorized users.",
                        },
                        {
                            icon: ShieldCheck,
                            title: "Security Monitoring",
                            description:
                                "We work to identify and address potential security issues.",
                        },
                    ].map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="rounded-xl border border-gray-200 p-5"
                            >
                                <Icon className="h-7 w-7" />

                                <h4 className="mt-4 font-semibold">{item.title}</h4>

                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </>
        ),
    },

    {
        id: "application",
        title: "ITSOFTLAB360 Application Security",
        icon: Lock,
        content: (
            <>
                <p>
                    ITSOFTLAB360 applications are designed with privacy and security in
                    mind. We implement appropriate controls to help protect user,
                    organization, franchise, and business information.
                </p>

                <div className="mt-6 space-y-4">
                    <div className="rounded-xl border border-gray-200 p-5">
                        <h4 className="font-semibold">Secure User Access</h4>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Access to applications is controlled through authentication and
                            authorization mechanisms.
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-5">
                        <h4 className="font-semibold">Role-Based Permissions</h4>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Users may receive different levels of access based on their role
                            and assigned permissions.
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-5">
                        <h4 className="font-semibold">
                            Organization and Franchise Data Isolation
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Our multi-organization applications are designed to restrict
                            users to information that they are authorized to access.
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-5">
                        <h4 className="font-semibold">Secure APIs</h4>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            APIs and backend services use authentication and authorization
                            controls to help prevent unauthorized access.
                        </p>
                    </div>
                </div>
            </>
        ),
    },

    {
        id: "privacy",
        title: "Your Data Privacy",
        icon: Users,
        content: (
            <>
                <p>
                    ITSOFTLAB360 respects the privacy of its customers, organizations,
                    franchise partners, and users.
                </p>

                <div className="mt-5 rounded-xl border border-gray-200 p-6">
                    <h4 className="font-semibold">
                        We do not sell personal information.
                    </h4>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                        ITSOFTLAB360 does not sell personal information to third parties
                        for advertising or unrelated marketing purposes.
                    </p>
                </div>

                <p className="mt-5">
                    Access to information is limited to authorized users and systems
                    where access is necessary for providing services, technical support,
                    maintenance, security, and legal compliance.
                </p>
            </>
        ),
    },

    {
        id: "ownership",
        title: "Data Ownership",
        icon: FileText,
        content: (
            <p>
                Customer and organization data remains the responsibility of the
                organization or authorized customer that provides the information.
                ITSOFTLAB360 does not claim ownership of customer business data solely
                because the information is processed through our applications.
            </p>
        ),
    },

    {
        id: "payments",
        title: "Payments and Financial Information",
        icon: CreditCard,
        content: (
            <p>
                Some ITSOFTLAB360 services may involve subscriptions, invoices, and
                payment processing. Where third-party payment providers are used,
                payment processing may also be subject to the privacy and security
                practices of those providers.
            </p>
        ),
    },

    {
        id: "cookies",
        title: "Cookies",
        icon: Cookie,
        content: (
            <>
                <p>
                    Our website may use cookies and similar technologies to improve user
                    experience and website functionality.
                </p>

                <ul className="mt-5 space-y-2">
                    <li>• Maintaining user sessions</li>
                    <li>• Remembering preferences</li>
                    <li>• Improving website performance</li>
                    <li>• Understanding website usage</li>
                </ul>
            </>
        ),
    },

    {
        id: "retention",
        title: "Data Retention",
        icon: Database,
        content: (
            <p>
                We retain information for as long as reasonably necessary to provide
                our services, maintain customer accounts, fulfill contractual
                obligations, resolve disputes, comply with legal requirements, and
                maintain the security and integrity of our systems.
            </p>
        ),
    },

    {
        id: "third-party",
        title: "Third-Party Services",
        icon: Server,
        content: (
            <p>
                ITSOFTLAB360 may use trusted third-party services for cloud
                infrastructure, email delivery, payment processing, notifications,
                analytics, authentication, and file storage. These providers may
                process information only as necessary to provide their services.
            </p>
        ),
    },

    {
        id: "rights",
        title: "Your Privacy Rights",
        icon: ShieldCheck,
        content: (
            <>
                <p>
                    Depending on applicable laws, you may have certain rights regarding
                    your personal information.
                </p>

                <ul className="mt-5 space-y-3">
                    <li>• Request access to your personal information</li>
                    <li>• Request correction of inaccurate information</li>
                    <li>• Request deletion where applicable</li>
                    <li>• Request information about how data is processed</li>
                    <li>• Withdraw consent where applicable</li>
                </ul>
            </>
        ),
    },

    {
        id: "changes",
        title: "Changes to This Privacy Policy",
        icon: FileText,
        content: (
            <p>
                ITSOFTLAB360 may update this Privacy Policy from time to time. Any
                updated version will be published on our website or application. We
                encourage users to review this Privacy Policy periodically.
            </p>
        ),
    },
];

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            {/* HERO */}

            <section className="border-b border-gray-200">
                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-black"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>

                    <div className="mt-12 max-w-4xl">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
                            <ShieldCheck className="h-7 w-7" />
                        </div>

                        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            Privacy Policy
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                            At ITSOFTLAB360, we respect your privacy and are committed to
                            protecting the personal, business, and organizational information
                            processed through our website, applications, and software
                            services.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-600">
                            <span className="rounded-full border border-gray-200 px-4 py-2">
                                Effective Date: September 5, 2026
                            </span>

                            <span className="rounded-full border border-gray-200 px-4 py-2">
                                Last Updated: September 5, 2026
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* QUICK SECURITY MESSAGE */}

            <section className="border-b border-gray-200 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-3">
                        <div>
                            <ShieldCheck className="h-7 w-7" />

                            <h3 className="mt-4 font-semibold">Privacy Focused</h3>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                We respect the privacy of our customers, organizations, and
                                users.
                            </p>
                        </div>

                        <div>
                            <Lock className="h-7 w-7" />

                            <h3 className="mt-4 font-semibold">Security Conscious</h3>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Our systems are designed with appropriate security and access
                                controls.
                            </p>
                        </div>

                        <div>
                            <Users className="h-7 w-7" />

                            <h3 className="mt-4 font-semibold">Controlled Access</h3>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Users can access information based on their authorized role and
                                permissions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT */}

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
                <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
                    {/* SIDEBAR */}

                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                Contents
                            </p>

                            <nav className="space-y-1">
                                {sections.map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-black"
                                    >
                                        {section.title}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* MAIN CONTENT */}

                    <div className="max-w-4xl">
                        {/* INTRO */}

                        <div className="mb-16">
                            <h2 className="text-2xl font-bold">
                                Our Commitment to Privacy
                            </h2>

                            <p className="mt-5 leading-8 text-gray-600">
                                This Privacy Policy explains how ITSOFTLAB360 collects, uses,
                                stores, protects, and manages information when you use our
                                website, applications, software products, and related services.
                            </p>

                            <p className="mt-4 leading-8 text-gray-600">
                                By accessing or using ITSOFTLAB360 services, you acknowledge
                                the practices described in this Privacy Policy.
                            </p>
                        </div>

                        {/* SECTIONS */}

                        <div className="space-y-16">
                            {sections.map((section) => {
                                const Icon = section.icon;

                                return (
                                    <article
                                        key={section.id}
                                        id={section.id}
                                        className="scroll-mt-28 border-b border-gray-200 pb-16 last:border-none"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <div>
                                                <h2 className="text-2xl font-bold">
                                                    {section.title}
                                                </h2>

                                                <div className="mt-5 leading-8 text-gray-600">
                                                    {section.content}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        {/* SECURITY DISCLAIMER */}

                        <section className="mt-16 rounded-2xl border border-gray-200 p-8">
                            <ShieldCheck className="h-8 w-8" />

                            <h2 className="mt-5 text-2xl font-bold">
                                Our Commitment to Security
                            </h2>

                            <p className="mt-4 leading-8 text-gray-600">
                                ITSOFTLAB360 is committed to building reliable technology
                                solutions and continuously improving our privacy and security
                                practices. While we implement reasonable measures designed to
                                protect information, no website, application, system, or
                                internet transmission can be guaranteed to be completely
                                secure.
                            </p>
                        </section>

                        {/* CONTACT */}

                        <section className="mt-12 border-t border-gray-200 pt-12">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                                    <Mail className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold">Contact Us</h2>

                                    <p className="mt-4 leading-7 text-gray-600">
                                        If you have questions about this Privacy Policy, data
                                        privacy, or information security, please contact us.
                                    </p>

                                    <div className="mt-5 space-y-2 text-sm">
                                        <p>
                                            <strong>Company:</strong> ITSOFTLAB360
                                        </p>

                                        <p>
                                            <strong>Email:</strong>{" "}
                                            <a
                                                href="mailto:privacy@itsoftlab360.com"
                                                className="underline underline-offset-4"
                                            >
                                                privacy@itsoftlab360.com
                                            </a>
                                        </p>

                                        <p>
                                            <strong>Website:</strong> ITSOFTLAB360
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
}