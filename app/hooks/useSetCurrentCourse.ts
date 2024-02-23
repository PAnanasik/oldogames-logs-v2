// "use client";
// import { redirect, useRouter } from "next/navigation";
// import { useMemo } from "react";

// import { SafeUser } from "@/app/types";

// interface IuseSetCurrentCourse {
//   currentUser?: SafeUser | null;
// }

// const useSetCurrentCourse = ({ currentUser }: IuseSetCurrentCourse) => {
//   const timeLeft = useMemo(() => {
//     if (
//       !currentUser ||
//       !currentUser.currentCourseId ||
//       !currentUser.courseDeadline
//     ) {
//       return null;
//     }

//     const deadline = new Date(currentUser.courseDeadline);
//     const now = new Date();

//     if (now > deadline) {
//       return "Дедлайн истек";
//     }

//     const timeDiff = deadline.getTime() - now.getTime();
//     const daysLeft = Math.ceil(timeDiff / (1000 * 60));

//     return `До дедлайна осталось ${daysLeft} дней`;
//   }, [currentUser]);

//   return {
//     timeLeft,
//   };
// };

// export default useSetCurrentCourse;
