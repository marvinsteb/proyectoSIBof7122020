<?php

use App\Http\Controllers\CondicionMigratoriaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InformacionClienteController;
use App\Http\Controllers\MunicipioController;
use App\Http\Controllers\PaisController;
use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\MonedaController;

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
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('home', [InformacionClienteController::class, 'index']);
    Route::get('/',[InformacionClienteController::class, 'index']);
    Route::get('oficios/7122020', [InformacionClienteController::class, 'index']);
    Route::get('oficios/7122020', [InformacionClienteController::class, 'index']);
    Route::get('oficios/7122020/crear', [InformacionClienteController::class, 'create']);
    Route::post('oficios/7122020/guardarActualizar', [InformacionClienteController::class, 'store']);
    Route::get('oficios/7122020/editar/{id}', [InformacionClienteController::class, 'edit']);
    Route::get('eliminarFormulario/{id}', [InformacionClienteController::class, 'destroy']);
    Route::get('descargarjson/{id}', [InformacionClienteController::class, 'diccionarioFormularioJson']);
    Route::get('departamentos/municipios/{id}', [MunicipioController::class, 'getMunicipio']);
    Route::get('pais/obtenerpaises', [PaisController::class, 'getPais']);
    Route::get('departamento/obtenerdepartamento', [DepartamentoController::class, 'getDepartamento']);
    Route::get('moneda/listamonedas', [MonedaController::class, 'getMoneda']);
    Route::get('listacondicionmigratoria', [CondicionMigratoriaController::class, 'getCondicionMigratoria']);
});

