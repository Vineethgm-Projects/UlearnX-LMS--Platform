"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


interface ActionsProps {
    disabled: boolean;
    courseId:string;
    isPublished: boolean;
};


export const Actions = ({
    disabled,
    courseId,
    isPublished
}: ActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoding] = useState(false);


    const onDelete = async () => {
        try{
            setIsLoding(true);
            await axios.delete(`/api/courses/${courseId}`);

            toast.success("Course deleted");
            router.refresh();
            router.push(`/teacher/courses`);
        }
        catch {
            toast.error("Something went wrong");
        }
        finally {
            setIsLoding(false);
        }
    }

    const onClick = async () => {
        try {
            setIsLoding(true);
    
            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("Course unpublished");
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success("Course published");
                confetti.onOpen();
            }
            router.refresh();
        } catch (error) {
            console.error("Error publishing chapter:", error);
            toast.error("Something went wrong");
        } finally {
            setIsLoding(false);
        }
    };
    return (
        <div className="flex items-center gap-x-2">
           <Button
            
            onClick={onClick}
            disabled={disabled || isLoading}
            variant="outline"
            size="sm"
            >
                {isPublished ? "Unpublish": "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
            <Button size="sm">
                <Trash className="h-4 w-4"/>
            </Button>
            </ConfirmModal>
        </div>
    )
}