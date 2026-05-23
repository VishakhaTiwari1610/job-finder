import React from 'react';

const Footer = () => {
    return (
        <footer className="border-t border-t-gray-200 py-8 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">

                    {/* Logo & Copyright */}
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-bold">
                            Job Portal<span className="text-[#F83002]">.</span>
                        </h2>
                        <p className="text-sm text-gray-600">
                            © 2026 Your Company. All rights reserved.
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-4 mt-4 md:mt-0">

                        {/* Facebook */}
                        <a
                            href="https://facebook.com"
                            className="text-gray-600 hover:text-gray-400"
                            aria-label="Facebook"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.696H16.56V24h6.115C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
                            </svg>
                        </a>

                        {/* X (Twitter) */}
                        <a
                            href="https://x.com"
                            className="text-gray-600 hover:text-gray-400"
                            aria-label="X"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M18.244 2H21.5l-7.11 8.13L22.75 22h-6.54l-5.12-6.69L5.2 22H1.94l7.6-8.69L1.25 2h6.71l4.63 6.11L18.244 2zm-1.15 18h1.81L6.34 3.9H4.4L17.094 20z" />
                            </svg>
                        </a>
                        {/* LinkedIn */}
                        <a
                            href="https://linkedin.com"
                            className="text-gray-600 hover:text-gray-400"
                            aria-label="LinkedIn"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20.447 20.452H16.85v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.267V9h3.452v1.561h.049c.48-.909 1.653-1.867 3.401-1.867 3.637 0 4.307 2.394 4.307 5.507v6.251zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM7.119 20.452H3.555V9h3.564v11.452z" />
                            </svg>
                        </a>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;