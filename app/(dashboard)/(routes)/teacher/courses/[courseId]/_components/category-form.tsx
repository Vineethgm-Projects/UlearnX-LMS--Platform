"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Pencil, Router } from "lucide-react";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";

interface CategoryFormProps{
   
    initialData: Course;
    courseId: string;
    options: {label : string ; value: string;}[];
};

const formSchema = z.object({
    categoryId: z.string().min(1),
});

export const  CategoryForm = ({
    initialData,
    courseId,
    options,
}:CategoryFormProps) => {
    const [isEditing, setIsEditing] =useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId : initialData?.categoryId || ""
        },
    });

    const { isSubmitting, isValid }= form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Submitting values:", values); // Add this line
        try {
            const response = await axios.patch(`/api/courses/${courseId}`, values);
            console.log("Response:", response.data); // Add this line
            toast.success("Course updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            console.error("Error submitting form", error); // Add this line
            toast.error("Something went wrong");
        }
    }
     

    const selectedOption = options.find((option)=> option.value === initialData.categoryId);

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course category
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                        <Pencil className="h-4 w-4 mr-2"/>
                        Edit
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn("text-sm mt-2",
                    !initialData.categoryId && "text-slate-500 italic"
                    )}>
                        {selectedOption?.label|| "No category"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4">
                        <FormField control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                <Combobox 
                                options={options} 
                                
                                {...field} 
                          />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}