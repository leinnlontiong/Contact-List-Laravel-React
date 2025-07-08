<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->
group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/contacts', [ContactController::class, 'index']) -> name('contacts.index');
    Route::get('/contacts/add', [ContactController::class, "add"]) -> name('contacts.add');
    Route::post('/contacts/store', [ContactController::class, "store"]) -> name('contacts.store');
    Route::get('/contacts/{contact}/edit', [ContactController::class, "edit"]) -> name('contacts.edit');
    Route::put('/contacts/{contact}', [ContactController::class, "update"]) -> name('contacts.update');
    Route::delete('/contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');
});


Route::get('/dbconn', function(){
    return view ('dbconn');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
