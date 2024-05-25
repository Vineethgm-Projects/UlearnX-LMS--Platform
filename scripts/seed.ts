const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main()
{
    try {
        await database.category.createMany({
            data: [
                { name: "Computer Science" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Literature" },
        { name: "Art" },
        { name: "Cooking" },
        { name: "Travel" },
        { name: "Science" },
        { name: "Technology" },
        { name: "Web Development" }, 
        { name: "Data Science" }, 
        { name: "Artificial Intelligence" }, 
        { name: "Cybersecurity" }, 
        { name: "Cloud Computing" }, 
        { name: "Internet of Things" }, 
        { name: "Blockchain" }, 
        { name: "Machine Learning" }, 
        { name: "Mobile Development" }, 
        { name: "DevOps" }, 
        { name: "Software Engineering" }
            ]
        });
        console.log("Success");
    }
    catch (error)
    {
        console.log("Error seeding the database categoris", error);

    }
    finally {
        await database.$disconnect();
    }
}

main();