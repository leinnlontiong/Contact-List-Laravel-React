import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';


// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Edit a Contact',
//         href: '/contacts/edit',
//     },
// ];

interface Contact{
    id:number,
    name:string,
    number:string,
}

interface Props{
    contact: Contact
}

export default function Edit({contact} : Props) {

    const {data, setData, put, processing, errors} = useForm({
        name: contact.name,
        number: contact.number,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('contacts.update', contact.id));
    };


    return (
        <AppLayout breadcrumbs={[{title: 'Edit a Contact', href: '/contacts/${contact.id}/edit'}]}>
            <Head title="Update a Contact" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    {/* to display error */}
                    {Object.keys(errors).length > 0 &&(
                        <Alert>
                        <CircleAlert />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>
                            <ul>
                                {Object.entries(errors).map(([key, message]) => (
                                    <li key={key}>{message as string}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                        </Alert>
                    )}
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input
                        placeholder="Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        />                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="number">Phone Number</Label>
                        <Input
                        placeholder="Phone Number"
                        value={data.number}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (!/^\d*$/.test(value)) return;
                            if (value.length > 11) return;
                            setData('number', value);
                        }}
                        />

                    </div>
                    <Button disabled={processing} type="submit" className="self-start">
                    Update Contact
                    </Button>
                </form>
                </div>
        </AppLayout>
    );
}
