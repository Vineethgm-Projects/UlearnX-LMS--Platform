"use client"

import { Category } from "@prisma/client"
import { FaLaptopCode, FaMusic, FaDumbbell, FaCamera, FaBook, FaPalette, FaUtensils, FaGlobe, FaFlask, FaMicrochip, FaCode, FaBrain, FaShieldAlt, FaCloud, FaWifi, FaCubes, FaRobot, FaMobileAlt, FaTools, FaCodeBranch } from 'react-icons/fa';
import { IoIosFitness } from 'react-icons/io';
import { FcMusic } from 'react-icons/fc';
import { IconType } from "react-icons/lib";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
    "Computer Science": FaLaptopCode,
    "Music": FcMusic,
    "Fitness": IoIosFitness,
    "Photography": FaCamera,
    "Literature": FaBook,
    "Art": FaPalette,
    "Cooking": FaUtensils,
    "Travel": FaGlobe,
    "Science": FaFlask,
    "Technology": FaMicrochip,
    "Web Development": FaCode,
    "Data Science": FaBrain,
    "Artificial Intelligence": FaRobot,
    "Cybersecurity": FaShieldAlt,
    "Cloud Computing": FaCloud,
    "Internet of Things": FaWifi,
    "Blockchain": FaCubes,
    "Machine Learning": FaCodeBranch,
    "Mobile Development": FaMobileAlt,
    "DevOps": FaTools,
    "Software Engineering": FaCubes,
  };

export const Categories = ({
    items,
}: CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2">
            Categories
            {items.map((item) => (
                <CategoryItem
                key={item.id}
                label={item.name}
                icon={iconMap[item.name]}
                value={item.id}
                />
            ))}
        </div>
    )
}