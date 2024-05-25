"use client";
import * as z from "zod";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
    title: z.string().min(1,{
        message: "Title is required",


    })
});



const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;


    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        try {
            const response = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Course created");
        }
        catch {
            toast.error("Something went wrong");
        }
    }


    return ( 
        <div className="max-w-5wl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">
                    Name Your Course
                </h1>
                <p className="text-sm text-slate-600">
                    What would you like to name your course? Dont worry,you can change   it later if needed!Let's get started by naming your course!
                </p>
                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mt-8"
                    >
                        <FormField 
                        control={form.control}
                        name="title"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>
                                    Create Title
                                </FormLabel>
                                <FormControl>
                                    <Input className="text-black" 
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'AI Python Development'"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    What will you teach in this course!
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href='/'>
                                <Button type="button"
                                variant={"ghost"}
                                >
                                    Cancel 

                                </Button>
                            </Link>
                            <Button
                            type="submit"
                            // variant={"ghost"}
                            disabled={!isValid || isSubmitting}
                            >
                                Continue
                            </Button>

                        </div>


                    </form>
                </Form>
            </div>
        </div>
     );
}
 
export default CreatePage;