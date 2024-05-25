import { db } from "@/lib/db";

export const getProgress = async (userId: string, courseId: string): Promise<number> => {
  try {
    // Fetch all published chapters for the given course
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    // Extract the IDs of the published chapters
    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    // Count the number of valid completed chapters by the user
    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    
    const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
};