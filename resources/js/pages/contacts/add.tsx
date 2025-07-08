import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add a Contact',
        href: '/contacts/add',
    },
];

export default function Index() {

    const {data, setData, post, processing, errors} = useForm({
        name: '',
        number: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contacts.store'));
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add a Contact" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    Add Contact
                    </Button>
                </form>
                </div>
        </AppLayout>
    );
}
