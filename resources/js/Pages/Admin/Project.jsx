import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryLink from '@/Components/PrimaryLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faLink, faPencil, faPlus, faTable, faTrashCan, faWind } from '@fortawesome/free-solid-svg-icons';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';

export default function Project({ projects }) {
    console.log(projects)
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        <FontAwesomeIcon icon={faTable} /> Seus Projetos
                    </h2>
                    <PrimaryLink href={route('project.create')} className="ml-4">
                        <FontAwesomeIcon icon={faPlus} size='2x' className='mr-4' /> Projeto
                    </PrimaryLink>
                </div>
            }
        >
            <Head title="Seus Projetos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* TABELA */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Título
                                            </th>

                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ferramentas
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Links
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ações
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {projects.data.map((project) => (
                                            <tr key={project.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {project.title}
                                                        </div>
                                                        <div className="text-sm text-gray-500 truncate max-w-xs">
                                                            {new Date(project.date).toLocaleDateString('pt-BR')}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.tools.map((tool) => (
                                                            <span
                                                                key={tool.id}
                                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                            >
                                                                {tool.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex space-x-3">
                                                        {project.github && (
                                                            <a
                                                                href={project.github}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-gray-500 hover:text-gray-700"
                                                            >
                                                                <FontAwesomeIcon icon={faSquareGithub} />
                                                            </a>
                                                        )}
                                                        {project.link && (
                                                            <a
                                                                href={project.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-gray-500 hover:text-gray-700"
                                                            >
                                                                <FontAwesomeIcon icon={faLink} />
                                                            </a>
                                                        )}
                                                        {!project.github && !project.link && (
                                                            <FontAwesomeIcon icon={faWind} />
                                                        )}

                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex space-x-3">
                                                        <Link
                                                            href={route('project.edit', project.id)}
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >
                                                            <FontAwesomeIcon icon={faPencil} />
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Tem certeza que deseja excluir este projeto?')) {
                                                                    router.delete(route('project.destroy', project.id));
                                                                }
                                                            }}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            <FontAwesomeIcon icon={faTrashCan} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* PAGINAÇÃO */}
                            <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    <button
                                        onClick={() => router.get(projects.prev_page_url)}
                                        disabled={!projects.prev_page_url}
                                        className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${projects.prev_page_url
                                            ? 'text-gray-700 hover:bg-gray-50'
                                            : 'text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        Anterior
                                    </button>
                                    <button
                                        onClick={() => router.get(projects.next_page_url)}
                                        disabled={!projects.next_page_url}
                                        className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${projects.next_page_url
                                            ? 'text-gray-700 hover:bg-gray-50'
                                            : 'text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        Próxima
                                    </button>
                                </div>
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Mostrando <span className="font-medium">{projects.from}</span> até{' '}
                                            <span className="font-medium">{projects.to}</span> de{' '}
                                            <span className="font-medium">{projects.total}</span> resultados
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                            {projects.links.map((link, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => link.url && router.get(link.url)}
                                                    disabled={!link.url}
                                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${link.active
                                                        ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                                        : link.url
                                                            ? 'text-gray-900 hover:bg-gray-50'
                                                            : 'text-gray-400 cursor-not-allowed'
                                                        } ${index === 0 ? 'rounded-l-md' : ''} ${index === projects.links.length - 1 ? 'rounded-r-md' : ''
                                                        }`}
                                                >
                                                    {link.label === "pagination.previous" ? (
                                                        <FontAwesomeIcon icon={faChevronLeft} />
                                                    ) : link.label === "pagination.next" ? (
                                                        <FontAwesomeIcon icon={faChevronRight} />
                                                    ) : (
                                                        link.label
                                                    )}
                                                </button>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
