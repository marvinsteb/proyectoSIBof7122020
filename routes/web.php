<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InformacionClienteController;
use App\Http\Controllers\MunicipioController;
use App\Http\Controllers\PaisController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('oficios/7122020',[InformacionClienteController::class, 'index']);
Route::get('oficios/7122020/crear', [InformacionClienteController::class, 'create']);
Route::post('oficios/7122020/guardarActualizar', [InformacionClienteController::class, 'store']);
Route::get('departamentos/municipios/{id}',[MunicipioController::class, 'getMunicipio']);
Route::get('pais/obtenerpaises',[PaisController::class, 'getPais']);


