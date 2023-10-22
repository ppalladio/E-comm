'use client';

import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Store } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface SettingPageProps {
    initialData: Store;
}
const FormSchema = z.object({
    name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof FormSchema>;
const SettingsForm: React.FC<SettingPageProps> = ({ initialData }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: initialData,
    });

    const onSubmit = async (data: SettingsFormValues) => {
        console.log(data);
    };
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title="Settings" description="Manage your store" />
                Settings
                <Button variant="destructive" size="icon" onClick={() => {}}>
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            {...field}
                                            placeholder="Store Name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} type="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
        </>
    );
};
export default SettingsForm;
