<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;
use IntlChar;

class ContactController extends Controller
{
    public function index(){
        $contacts = Contact::all();

        return Inertia::render('contacts/index', compact('contacts'));
    }

    public function add(){
        return Inertia::render('contacts/add');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'number' => 'required|regex:/^09\d{9}$/'
        ]);

        Contact::create($request->all());

        return redirect()->route('contacts.index')->with('message', 'Contact added!');
    }

    public function edit(Contact $contact){
        return Inertia::render('contacts/edit', compact('contact'));
    }

    public function update(Request $request, Contact $contact){
        $request->validate([
            'name' => 'required|string|max:50',
            'number' => 'required|regex:/^09\d{9}$/'
        ]);

        $contact->update([
            'name' => $request->input('name'),
            'number' => $request->input('number'),
        ]);

        return redirect()->route('contacts.index')->with('message', 'Contact updated!');
    }

    public function destroy(Contact $contact){
        $contact -> delete();
        return redirect()->route('contacts.index')->with('message', 'Contact deleted!');
    }
}
