<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

       /*  User::factory()->create([
            'name' => 'Seu Nome',
            'email' => 'seuemaildepreferencia@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('suasenhadepreferencia'),
        ]); */

        /*Ou você pode chamar uma seeder*/
        $this->call(DefaultAdminUserSeeder::class);
    }
}
