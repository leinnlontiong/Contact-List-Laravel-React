import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button'
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Contacts',
            href: '/contacts',
        },
    ];

            interface Contact {
            id: number,
            name: string,
            number: string,
        }

        interface PageProps {
            flash: {
                message?: string
            },
            contacts: Contact[]
        }

export default function Index() {

    const { contacts, flash } = usePage().props as PageProps;

    const {processing, delete: destroy} = useForm();

    const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
        destroy(route('contacts.destroy', id));
    }   
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacts" />
            <div className="gap-4 rounded-xl p-4 overflow-x-auto">
                <Link href={route('contacts.add')}><Button>Add a contact</Button></Link>
            </div>
            <div>
                <div>
                    {flash.message && (
                        <Alert>
                            <Bell />
                            <AlertTitle>Notification</AlertTitle>
                            <AlertDescription>
                                {flash.message}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            {contacts.length > 0 && (
                <div className='m-4'>
                    <Table>
                        <TableCaption>A list of your recent contacts.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">ID</TableHead>
                                <TableHead className="w-[400px]">Name</TableHead>
                                <TableHead>Contact Number</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.map((contact) => (
                                <TableRow>
                                    <TableCell className="font-medium">{contact.id}</TableCell>
                                    <TableCell className="w-[400px]">{contact.name}</TableCell>
                                    <TableCell>{contact.number}</TableCell>
                                    <TableCell className='space-x-2 text-center'>
                                        <Link href={route('contacts.edit', contact.id)}>
                                        <Button>Edit</Button>
                                        </Link>
                                        <Button disabled={processing} onClick={() => handleDelete(contact.id, contact.name)} className="bg-red-500 hover:bg-red-700 gap-5">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}
