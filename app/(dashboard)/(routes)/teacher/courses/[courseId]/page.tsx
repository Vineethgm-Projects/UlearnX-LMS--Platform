import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { CircleDollarSign, File, FileCode, IndianRupee, LayoutDashboard, ListChecks, MoonStar, RocketIcon, WavesIcon } from "lucide-react";
import { redirect } from "next/navigation";


import { Label } from "@/components/ui/label";
import { Category } from "@prisma/client";
import { AttachmentForm } from "./_components/attachment-form";
import { CategoryForm } from "./_components/category-form";
import { ChaptersForm } from "./_components/chapters-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { PriceForm } from "./_components/price-forth";
import { TitleForm } from "./_components/title-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";




const CourseIdPage = async({
    params
}:  {
    params : {courseId: string}
}) => {

    const {userId} = auth();

    if(!userId){
        return redirect("/");
    }
    const course = await db.course.findUnique ({
        where : {
            id: params.courseId,
            userId
        },
        include:{
            chapters:{
                orderBy:{
                    position:"asc",
                },
            },
        
            attachments: {
                orderBy:{
                    createAT: "desc",
                },
            },
        },
    });

    const categories = await db.category.findMany ({
        orderBy : {
            name: "asc",
        },
    });

    

    if(!course){
        return redirect("/");
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished)
    ];

    const totalFields = requiredFields.length;
    const compeltedFields = requiredFields.filter(Boolean).length;

    const compeltionText = `(${compeltedFields}/${totalFields})`

    const isComplete = requiredFields.every(Boolean);




    return ( 
        <>
        {!course.isPublished&& (
            <Banner 
                label="This course is unpublished.It will not be visible to the students."

            />
        )}
        <div className = "p-6">
            <div className = "flex items-center justify-between">
                <div className = "flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Course setup
                    </h1>
                    <span className="text-sm text-slate-700">
                        Complete all fields {compeltionText}
                    </span>
                </div>
                <Actions
                    disabled={!isComplete}
                    courseId={params.courseId}
                    isPublished={course.isPublished}
                />
            </div>
            <div className = "grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon = {RocketIcon} />
                        <h2 className="text-xl">
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm 
                    initialData={course}
                    courseId = {course.id}  
                    />
                   <DescriptionForm
                   initialData={{ description: course.description || "" }}
                   courseId={course.id}
                    />
                    <ImageForm 
                    initialData={course}
                    courseId = {course.id}  
                    />

                   <CategoryForm 
                    initialData={course}
                    courseId = {course.id}  
                    options = {categories.map((category) =>({
                        label: category.name,
                        value: category.id,
                    }))}
                    />

                    
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                                <IconBadge icon={ListChecks}/>
                                <h2 className="text-xl">
                                Course Chapters
                                </h2>
                        </div>
                        <ChaptersForm
                   initialData={course}
                   courseId={course.id}
                    />
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                        <IconBadge icon={IndianRupee}/>
                        <h2 className="text-xl">
                            Sell your Course
                        </h2>
                        </div>
                        <PriceForm 
                        initialData={course}
                        courseId={course.id}
                        
                        />
                    </div>
                    <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={FileCode}/>
                        <h2 className="text-xl">
                            Resourses & Attachments
                        </h2>
                        </div>
                        <AttachmentForm
                    initialData={course}
                    courseId = {course.id}  
                    />
                    </div>
                </div>

            </div>
        </div>
        </>
     );
}
 
export default CourseIdPage;