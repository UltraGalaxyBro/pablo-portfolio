<<<<<<< HEAD
<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
=======
# pablo-portfolio
Just my portfolio to save and show my projects better for you. Enjoy!

# Portfolio - Laravel, React & Inertia.js

Este é um projeto de portfólio desenvolvido com Laravel, React e Inertia.js. Ele permite o cadastro de projetos para exibição na área de visitantes. O objetivo principal é criar uma plataforma que destaque os projetos do desenvolvedor de forma profissional e interativa.

## Funcionalidades

- **Cadastro de Projetos:** Área administrativa para adicionar, editar e excluir projetos.
- **Exibição de Projetos:** Página de portfólio que apresenta os projetos cadastrados.
- **Interface Moderna:** Utiliza React para uma experiência dinâmica e Inertia.js para comunicação fluida entre front-end e back-end.
- **Design Responsivo:** Compatível com dispositivos móveis e desktops.

## Tecnologias Utilizadas

### Back-end
- [Laravel](https://laravel.com/) - Framework PHP para desenvolvimento robusto e escalável.

### Front-end
- [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces interativas.
- [Inertia.js](https://inertiajs.com/) - Framework que conecta front-end e back-end de maneira simples e eficiente.
- [Tailwind CSS](https://tailwindcss.com/) (opcional) - Framework CSS utilitário para design responsivo.

### Outros
- [SQLite](https://sqlite.org/) - Banco de dados leve para ambientes de teste.
- [MySQL](https://www.mysql.com/) - Banco de dados relacional para produção.
- [Vite](https://vitejs.dev/) - Gerenciador de builds para carregar os assets de forma rápida e eficiente.

## Instalação

### Requisitos
- PHP >= 8.1
- Composer
- Node.js >= 16.x
- MySQL (para produção)
- SQLite (para teste)

### Passo a Passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências do Laravel:
   ```bash
   composer install
   ```

3. Instale as dependências do Node.js:
   ```bash
   npm install
   ```

4. Configure o arquivo `.env`:
   - Duplique o arquivo `.env.example` e renomeie para `.env`.
   - Configure as variáveis de ambiente para produção ou teste:
     
     **Para produção (MySQL):**
     ```env
     DB_CONNECTION=mysql
     DB_DATABASE=portfolio
     DB_USERNAME=seu-usuario
     DB_PASSWORD=sua-senha
     ```

     **Para teste (SQLite):**
     ```env
     DB_CONNECTION=sqlite
     DB_DATABASE=/caminho/para/database.sqlite
     ```

5. Gere a chave da aplicação:
   ```bash
   php artisan key:generate
   ```

6. Execute as migrações para criar as tabelas:
   ```bash
   php artisan migrate
   ```

7. Compile os assets:
   ```bash
   npm run dev # Para ambiente de desenvolvimento
   npm run build # Para ambiente de produção
   ```

8. Inicie o servidor:
   ```bash
   php artisan serve
   ```

Acesse o projeto em [http://localhost:8000](http://localhost:8000).

## Estrutura de Pastas

- **/resources/js:** Contém os componentes React.
- **/app/Models:** Modelos Eloquent do Laravel.
- **/routes/web.php:** Rotas da aplicação.
- **/database/migrations:** Arquivos de migração para o banco de dados.

## Contribuição

Se você deseja contribuir com este projeto, sinta-se à vontade para abrir um pull request ou relatar problemas na aba [Issues](https://github.com/seu-usuario/seu-repositorio/issues).

## Licença

Este projeto é licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

---

Feito com ❤️ por Pablo Nogueira.
>>>>>>> 59bad32c99a1a7292fcea2044f2c6ca122f2e543
