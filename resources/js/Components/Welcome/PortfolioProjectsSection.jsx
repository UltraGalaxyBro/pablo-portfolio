import { useState, useEffect, useMemo } from "react";
import PortfolioProjectCard from "./PortfolioProjectCard";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PortfolioProjectsSection = ({ projects = [] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTechs, setSelectedTechs] = useState([]);

    const allTechnologies = useMemo(() => {
        if (!projects?.length) return [];

        const technologies = projects
            .flatMap(project => project.tools || [])
            .map(tool => tool.name);
        return [...new Set(technologies)].sort();
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (!projects?.length) return [];

        return projects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase());

            const projectTools = project.tools?.map(tool => tool.name) || [];
            const matchesTech = selectedTechs.length === 0 ||
                selectedTechs.every(tool => projectTools.includes(tool));

            return matchesSearch && matchesTech;
        });
    }, [projects, searchTerm, selectedTechs]);

    const toggleTech = (tool) => {
        setSelectedTechs(prev =>
            prev.includes(tool)
                ? prev.filter(t => t !== tool)
                : [...prev, tool]
        );
    };

    return (
        <section className="py-20 bg-gray-900" id="portfolio">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Meus Projetos
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Aqui estão alguns dos projetos que desenvolvi.<br />Use os filtros abaixo para
                        encontrar projetos específicos.
                    </p>
                </div>

                <div className="mb-12 space-y-6">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                            />
                            <input
                                type="text"
                                placeholder="Buscar projetos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faX} className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        {allTechnologies.map((tool) => (
                            <button
                                key={tool}
                                onClick={() => toggleTech(tool)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTechs.includes(tool)
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                {tool}
                            </button>
                        ))}
                    </div>

                    <div className="text-center text-gray-400">
                        {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1 ? 's' : ''}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <PortfolioProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center text-gray-400 py-12">
                        Nenhum projeto encontrado com os critérios selecionados.
                    </div>
                )}
            </div>
        </section>
    );
};

export default PortfolioProjectsSection;