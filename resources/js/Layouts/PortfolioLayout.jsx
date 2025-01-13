import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faUserSecret } from '@fortawesome/free-solid-svg-icons';

const PortfolioLayout = ({ auth, children }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <header>
                <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
                    }`}>
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between h-20">
                            <div className="flex items-center">
                                <Link href={route('welcome')} title='Página principal' className="flex items-center space-x-2">
                                    <ApplicationLogo />
                                </Link>
                            </div>

                            {/* Versão Desktop */}
                            <div className="hidden md:flex items-center space-x-8">
                                {auth.user ? (
                                    <Link
                                        href={route('project.index')}
                                        className="px-4 py-2 hover:bg-slate-600 rounded-lg text-white transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faUserSecret} />
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-2 hover:bg-slate-600 rounded-lg text-white transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faDoorOpen} />
                                    </Link>
                                )
                                }
                            </div>

                            {/* Versão Mobile */}
                            <div className="md:hidden flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('project.index')}
                                        className="px-4 py-2 hover:bg-slate-600 rounded-lg text-white text-sm transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faUserSecret} />
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-2 hover:bg-slate-600 rounded-lg text-white text-sm transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faDoorOpen} />
                                    </Link>
                                )}

                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-grow">
                {children}
            </main>

            <footer className="w-full bg-gray-900 text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm">Site Desenvolvido por Pablo Nogueira</p>
                </div>
            </footer>
        </div>
    );
};

export default PortfolioLayout;