import { useState } from "react";
import { Head } from "@inertiajs/react";
import PortfolioLayout from "@/Layouts/PortfolioLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCalendar, faUpRightFromSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const ImageGallery = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const truePath = (path) => `/storage/${path}`;

    const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative aspect-video cursor-pointer overflow-hidden rounded-lg bg-gray-800"
                        onClick={() => {
                            setCurrentImage(index);
                            setIsModalOpen(true);
                        }}
                    >
                        <img
                            src={truePath(image.path)}
                            alt={index}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>

            {/* MODAL*/}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 text-white/70 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faX} className="w-8 h-8" />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-4 text-white/70 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>

                    <img
                        src={truePath(images[currentImage].path)}
                        alt={images[currentImage].caption}
                        className="max-w-[90vw] max-h-[90vh] object-contain"
                    />

                    <button
                        onClick={nextImage}
                        className="absolute right-4 text-white/70 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>

                    <p className="absolute bottom-4 text-white/90 text-center w-full">
                        {images[currentImage].caption}
                    </p>
                </div>
            )}
        </>
    );
};

export default function ProjectDetail({ auth, project }) {

    return (
        <PortfolioLayout auth={auth}>
            <Head title={`Projeto - ${project.title}`} />

            <div className="relative min-h-screen pt-40 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            {project.title}
                        </h1>

                        <p className="text-gray-300 text-lg mb-6">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 mb-8">
                            {project.github &&
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-gray-300 hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                                    Código Fonte
                                </a>
                            }

                            {project.link &&
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-gray-300 hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faUpRightFromSquare} className="w-5 h-5" />
                                    Ver Projeto
                                </a>
                            }


                            <div className="flex items-center gap-2 text-gray-400">
                                <FontAwesomeIcon icon={faCalendar} className="w-5 h-5" />
                                {new Date(project.date).toLocaleDateString('pt-BR')}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tools.map((tool) => (
                                <span
                                    key={tool.id}
                                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                                >
                                    {tool.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <ImageGallery images={project.project_images} />

                    <div className="prose prose-invert max-w-none">
                        <div className="text-gray-300 leading-relaxed">
                            {project.details}
                        </div>
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}