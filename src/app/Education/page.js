"use client"
import { useRouter } from 'next/navigation'; // Import useRouter from 'next/router' instead of 'next/navigation'
import React from 'react';
import EduNav from '../Components/EduNav';
import EduCard from '../Components/EduCard';
import { module_1 } from '../utils/info';
import topics from '../utils/topics';
import Link from 'next/link';

const Page = () => {
  const router = useRouter();

  

  return (
    <div>
      <EduNav />
      <div className="flex flex-wrap justify-center">
        {topics.map((topic, index) => (
          <Link href={`/Education/${index + 1}`} key={index}>
          <EduCard 
            key={index}
            title={topic.title}
            description={topic.description}
            imgSrc={topic.imgSrc}
            percentage={50} // Pass an arrow function to onClick
          />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
