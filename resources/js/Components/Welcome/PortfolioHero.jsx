import profilePhoto from '../../../assets/images/profile-image.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function PortfolioHero() {

    const socialLinks = [
        { name: 'github', url: 'https://github.com/UltraGalaxyBro', color: '#FFFFFF' },
        { name: 'linkedin', url: 'https://www.linkedin.com/in/pablo-nogueira-de-faria', color: '#0077B5' },
        { name: 'whatsapp', url: 'https://wa.me/+5562999643899', color: '#25D366' },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
            <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-12 h-full w-full gap-4">
                    {Array(48).fill().map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                    ))}
                </div>
            </div>

            {/* Conteúdo principal */}
            <div className="relative container mx-auto px-4 py-32 md:py-48">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="relative inline-block mb-8">
                        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75 blur-sm animate-spin-slow"></div>
                        <div className="relative">
                            <img
                                src={profilePhoto}
                                alt="Pablo Nogueira"
                                className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white"
                            />
                            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                    </div>

                    <div className="inline-block px-4 py-2 bg-blue-500/10 rounded-full mb-4">
                        <p className="text-blue-300 font-medium">Desenvolvedor Full Stack</p>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        Olá, eu sou o{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Pablo Nogueira
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300">
                        Transformando ideias em experiências digitais, aplico na prática tudo o que aprendo. Seja para fortalecer ainda mais meu conhecimento ou para contribuir na vida de alguém.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <a href="#portfolio" className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors">
                            Ver Projetos
                        </a>
                        {/* <a href="#" className="px-8 py-4 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors">
                            Baixar Currículo
                        </a> */}
                    </div>

                    <div className="flex justify-center gap-6 pt-8">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                title={`Contato sugerido por ${social.name}`}
                                rel="noopener noreferrer"
                                style={{ color: 'gray' }}
                                className="text-gray-400 transition-colors hover:text-gray-400"
                                onMouseEnter={(e) => (e.currentTarget.style.color = social.color)}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'gray')}
                            >
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center">
                                    {social.name === 'github' && <FontAwesomeIcon icon={faGithub} beatFade size="2x" />}
                                    {social.name === 'linkedin' && <FontAwesomeIcon icon={faLinkedin} beatFade size="2x" />}
                                    {social.name === 'whatsapp' && <FontAwesomeIcon icon={faWhatsapp} beatFade size="2x" />}
                                </div>
                            </a>
                        ))}
                    </div>

                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                    <div className="w-1 h-3 bg-white/60 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}