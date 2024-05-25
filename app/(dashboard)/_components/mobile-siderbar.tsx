import { Toggle } from "@/components/ui/toggle";
import {Menu} from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
export const MobileSideBar = () => {

    return(
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Toggle>
                    <Menu  /> 
                </Toggle>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 g-white">
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
}