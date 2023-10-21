'use client';

import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Store } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface SettingPageProps {
    initialData: Store;
}
const FormSchema = z.object({
	name:z.string().min(1),

})

type SettingsFormValues = z.infer<typeof FormSchema>
const SettingsForm: React.FC<SettingPageProps> = ({ initialData }) => {
	const  form = useForm<SettingsFormValues>({
		
	})
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

		</>
    );
};
export default SettingsForm;
