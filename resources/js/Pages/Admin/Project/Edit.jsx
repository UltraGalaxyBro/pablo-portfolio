import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryLink from "@/Components/PrimaryLink";
import { Head, router, useForm } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTable } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState, useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";

export default function Edit({ project, tools = [] }) {
    const [selectedImages, setSelectedImages] = useState([]);
    const [existingImages, setExistingImages] = useState(project.project_images || []);
    const [imageUrls, setImageUrls] = useState({});

    const { data, setData, post, processing, errors } = useForm({
        title: project.title || '',
        description: project.description || '',
        github: project.github || '',
        link: project.link || '',
        date: project.date || '',
        details: project.details || '',
        tools: project.tools?.map(tool => tool.id) || [],
        images: [],
        images_to_remove: [],
    }, {
        forceFormData: true,
    });
    useEffect(() => {
        return () => {
            Object.values(imageUrls).forEach(url => {
                URL.revokeObjectURL(url);
            });
        };
    }, [imageUrls]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const maxSize = 5 * 1024 * 1024;

        const validFiles = files.filter(file => {
            const isValid = file.type.startsWith('image/');
            const isUnderSize = file.size <= maxSize;

            if (!isValid) {
                alert(`${file.name} não é uma imagem válida.`);
            }
            if (!isUnderSize) {
                alert(`${file.name} excede o tamanho máximo de 5MB.`);
            }

            return isValid && isUnderSize;
        });

        const newUrls = {};
        validFiles.forEach(file => {
            newUrls[file.name] = URL.createObjectURL(file);
        });

        setImageUrls(prev => ({ ...prev, ...newUrls }));
        setSelectedImages([...selectedImages, ...validFiles]);
        setData('images', [...(data.images || []), ...validFiles]);
    };

    const handleRemoveExistingImage = (imageId) => {
        if (confirm('Tem certeza que deseja remover esta imagem?')) {
            setExistingImages(existingImages.filter(img => img.id !== imageId));
            setData('images_to_remove', [...data.images_to_remove, imageId]);
        }
    };

    const handleRemoveSelectedImage = (index) => {
        const newSelectedImages = [...selectedImages];
        const removedImage = newSelectedImages.splice(index, 1)[0];

        if (imageUrls[removedImage.name]) {
            URL.revokeObjectURL(imageUrls[removedImage.name]);
            const newUrls = { ...imageUrls };
            delete newUrls[removedImage.name];
            setImageUrls(newUrls);
        }

        setSelectedImages(newSelectedImages);
        const newDataImages = [...data.images];
        newDataImages.splice(index, 1);
        setData('images', newDataImages);
    };

    function submit(e) {
        e.preventDefault();
        router.post(route('project.update', project.id), {
            ...data,
            _method: "patch",
        });
    }

    const handleToolChange = (e) => {
        const value = parseInt(e.target.value);
        const isChecked = e.target.checked;

        setData('tools', isChecked
            ? [...data.tools, value]
            : data.tools.filter(id => id !== value)
        );
    }

    useEffect(() => {
        if (project.date) {
            const formattedDate = new Date(project.date).toISOString().split('T')[0];
            setData('date', formattedDate);
        }
    }, [project.date]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        <FontAwesomeIcon icon={faPen} /> Editando Projeto
                    </h2>
                    <PrimaryLink href={route('project.index')} className="ml-4">
                        <FontAwesomeIcon icon={faTable} size='2x' className='mr-4' /> Projetos
                    </PrimaryLink>
                </div>
            }
        >
            <Head title="Editando Projeto" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="max-w-2xl mx-auto p-6">
                                <h1 className="font-bold mb-6">Formulário de edição</h1>
                                <form onSubmit={submit} className="max-w-2xl mx-auto p-6 space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel htmlFor="title" value="Título" />
                                            <TextInput
                                                id="title"
                                                value={data.title}
                                                onChange={e => setData('title', e.target.value)}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError message={errors.title} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="description" value="Descrição" />
                                            <textarea
                                                id="description"
                                                value={data.description}
                                                onChange={e => setData('description', e.target.value)}
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            />
                                            <InputError message={errors.description} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="github" value="GitHub" />
                                            <TextInput
                                                id="github"
                                                type="url"
                                                value={data.github}
                                                onChange={e => setData('github', e.target.value)}
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.github} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="link" value="Link do Projeto" />
                                            <TextInput
                                                id="link"
                                                type="url"
                                                value={data.link}
                                                onChange={e => setData('link', e.target.value)}
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.link} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="date" value="Data" />
                                            <TextInput
                                                id="date"
                                                type="date"
                                                value={data.date}
                                                onChange={e => setData('date', e.target.value)}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError message={errors.date} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="details" value="Detalhes" />
                                            <textarea
                                                id="details"
                                                value={data.details}
                                                onChange={e => setData('details', e.target.value)}
                                                rows={5}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            />
                                            <InputError message={errors.details} />
                                        </div>

                                        <div>
                                            <InputLabel value="Ferramentas" />
                                            <div className="mt-2 space-y-2">
                                                {tools.map(tool => (
                                                    <label key={tool.id} className="inline-flex items-center mr-4">
                                                        <Checkbox
                                                            value={tool.id}
                                                            checked={data.tools.includes(tool.id)}
                                                            onChange={handleToolChange}
                                                        />
                                                        <span className="ml-2">{tool.name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <InputError message={errors.tools} />
                                        </div>

                                        <div>
                                            <InputLabel value="Imagens Existentes" />
                                            {existingImages.length > 0 && (
                                                <div className="mt-4 grid grid-cols-3 gap-4">
                                                    {existingImages.map((image) => (
                                                        <div key={image.id} className="relative">
                                                            <img
                                                                src={`/storage/${image.path}`}
                                                                alt="Projeto"
                                                                className="h-24 w-24 object-cover rounded"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveExistingImage(image.id)}
                                                                className="absolute -top-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 focus:outline-none"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <InputLabel value="Adicionar Novas Imagens" className="mt-4" />
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="mt-1 block w-full"
                                            />
                                            <div className="text-sm text-gray-500 mt-1">
                                                Tamanho máximo: 5MB por imagem
                                            </div>
                                            <InputError message={errors.images} />

                                            {selectedImages.length > 0 && (
                                                <div className="mt-4 grid grid-cols-3 gap-4">
                                                    {selectedImages.map((image, index) => (
                                                        <div key={index} className="relative">
                                                            <img
                                                                src={URL.createObjectURL(image)}
                                                                alt={`Preview ${index + 1}`}
                                                                className="h-24 w-24 object-cover rounded"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveSelectedImage(index)}
                                                                className="absolute -top-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 focus:outline-none"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <PrimaryButton disabled={processing}>
                                            {processing ? 'Salvando...' : 'Salvar'}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}