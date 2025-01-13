import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryLink from '@/Components/PrimaryLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTable } from '@fortawesome/free-solid-svg-icons';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function Create() {

    const { data, setData, post, errors, processing } = useForm({
        name: '',
    })

    function submit(e) {
        e.preventDefault();
        post(route('tool.store'));
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        <FontAwesomeIcon icon={faPlus} /> Criando Ferramenta
                    </h2>
                    <PrimaryLink href={route('tool.index')} className="ml-4">
                        <FontAwesomeIcon icon={faTable} size='2x' className='mr-4' /> Ferramentas
                    </PrimaryLink>
                </div>

            }
        >
            <Head title="Criando Ferramenta" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="max-w-2xl mx-auto p-6">
                                <h1 className="font-bold mb-6">Formulário de criação</h1>

                                <form onSubmit={submit} className="space-y-4">
                                    <div>
                                        <InputLabel htmlFor="name" value="Nome da ferramenta" />
                                        <TextInput
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            isFocused={true}
                                            placeholder="Digite o nome"
                                            className="w-full mt-1"
                                        />
                                    </div>

                                    <div className="flex items-center justify-end mt-4">
                                        <PrimaryButton>
                                            {processing ? 'Criando...' : 'Criar'}
                                        </PrimaryButton>
                                    </div>
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}