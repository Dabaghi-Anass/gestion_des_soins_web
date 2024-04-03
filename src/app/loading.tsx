import NavSkeleton from '@/components/skeleton/nav-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
const HomePage: React.FC = () => {
  return (
    <>
      <NavSkeleton />
      <div className="flex flex-col gap-4 my-4 p-4">
        <Skeleton className='w-full h-[200px] rounded-lg' />
        <Skeleton className='w-full h-[200px] rounded-lg' />
      </div>
    </>
  );
};

export default HomePage;