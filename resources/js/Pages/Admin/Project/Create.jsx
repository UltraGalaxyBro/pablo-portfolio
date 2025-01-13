import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryLink from "@/Components/PrimaryLink";
import { Head, useForm } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTable } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";

export default function Create({ tools = [] }) {
    const [selectedImages, setSelectedImages] = useState([]);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        github: '',
        link: '',
        date: '',
        details: '',
        tools: [],
        images: []
    });

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages([...selectedImages, ...files]);
        setData('images', [...data.images, ...files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('project.store'), {
            forceFormData: true
        });
    };

    const handleToolChange = (e) => {
        const value = parseInt(e.target.value);
        const isChecked = e.target.checked;

        setData('tools', isChecked
            ? [...data.tools, value]
            : data.tools.filter(id => id !== value)
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        <FontAwesomeIcon icon={faPlus} /> Criando Projeto
                    </h2>
                    <PrimaryLink href={route('project.index')} className="ml-4">
                        <FontAwesomeIcon icon={faTable} size='2x' className='mr-4' /> Projetos
                    </PrimaryLink>
                </div>

            }
        >
            <Head title="Criando Projeto" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="max-w-2xl mx-auto p-6">
                                <h1 className="font-bold mb-6">Formulário de criação</h1>
                                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel htmlFor="title" value="Título" />
                                            <TextInput
                                                id="title"
                                                value={data.title}
                                                onChange={e => setData('title', e.target.value)}
                                                className="mt-1 block w-full"
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
                                            <InputLabel value="Imagens" />
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="mt-1 block w-full"
                                            />
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
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <PrimaryButton disabled={processing}>{processing ? 'Criando...' : 'Criar'}</PrimaryButton>
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

