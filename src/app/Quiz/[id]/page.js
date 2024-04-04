"use client";
import { module1Quiz, module2Quiz, module3Quiz, module4Quiz, module5Quiz, module6Quiz, module7Quiz, module8Quiz } from "@/app/utils/Question";

import { useRouter } from "next/navigation";
import Quiz from "@/app/Components/Quiz1";
import React from 'react';


const Page = () => {
    const path = window.location.pathname;
    return (
        <div>
            {path === '/Quiz/1' && <Quiz quizData={module1Quiz} />}
            {path === '/Quiz/2' && <Quiz quizData={module2Quiz} />}
            {path === '/Quiz/3' && <Quiz quizData={module3Quiz} />}
            {path === '/Quiz/4' && <Quiz quizData={module4Quiz} />}
            {path === '/Quiz/5' && <Quiz quizData={module5Quiz} />}
            {path === '/Quiz/6' && <Quiz quizData={module6Quiz} />}
            {path === '/Quiz/7' && <Quiz quizData={module7Quiz} />}
            {path === '/Quiz/8' && <Quiz quizData={module8Quiz} />}
        </div>
    )
}

export default Page;
