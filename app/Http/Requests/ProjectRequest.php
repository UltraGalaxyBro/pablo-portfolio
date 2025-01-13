<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'github' => ['nullable', 'url'],
            'link' => ['nullable', 'url'],
            'date' => ['required', 'date'],
            'details' => ['required', 'string'],
            'tools' => ['nullable', 'array'],
            'tools.*' => ['exists:tools,id'],
            'images' => ['nullable', 'array'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,gif'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'O título é obrigatório',
            'description.required' => 'A descrição é obrigatória',
            'github.url' => 'O link do GitHub deve ser uma URL válida',
            'link.url' => 'O link/site do projeto deve ser uma URL válida',
            'date.required' => 'A data é obrigatória',
            'date.date' => 'A data deve estar em um formato válido',
            'details.required' => 'Os detalhes são obrigatórios',
            'tools.*.exists' => 'Uma das ferramentas selecionadas é inválida',
            'images.*.image' => 'Os arquivos devem ser imagens',
            'images.*.mimes' => 'As imagens devem ser dos tipos: jpeg, png, jpg ou gif',
        ];
    }
}
