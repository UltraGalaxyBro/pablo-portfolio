import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faFolder } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@inertiajs/react";

export default function PortfolioProjectCard({ project }) {
    return (
        <>
            <div className="group relative bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 border border-gray-700">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition duration-300" />

                <div className="relative">
                    <div className="flex justify-between items-start mb-4">
                        <Link href={route('project-detail', { id: project.id })}>
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <FontAwesomeIcon icon={faFolder} className="text-blue-600" />
                            </div>
                        </Link>
                        <div className="flex gap-3">
                            {project.github && (
                                <a
                                    href={project.github}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                            )}
                            {project.link && (
                                <a
                                    href={project.link}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                </a>
                            )}

                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                            <Link href={route('project-detail', { id: project.id })}>
                                {project.title}
                            </Link>
                        </h3>
                        <p className="text-gray-400 line-clamp-3">
                            {project.description}
                        </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                            <span
                                key={tool.id}
                                className="text-sm px-3 py-1 bg-gray-700 text-gray-300 rounded-full"
                            >
                                {tool.name}
                            </span>
                        ))}
                    </div>

                    {project.date && (
                        <div className="mt-6 flex items-center gap-4 text-gray-400">
                            <span className="text-sm">{project.date}</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}