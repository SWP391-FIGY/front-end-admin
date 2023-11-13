"use client";
import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";

const FirstPage = () => {
  return (
    <div
      className='
    w-[100vw] h-[100vh] 
    bg-[url("https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/640px-Eopsaltria_australis_-_Mogo_Campground.jpg")]
    bg-cover
    flex justify-center items-center'
    >
      <div className="flex flex-col justify-center items-center 
      p-10 gap-4 bg-slate-200/[.45] rounded-md">
        <div className="text-3xl font-bold text-center">Bird Farm <br/> Meal System</div>
        <div className="text-xl text-center">A solution for managing and feeding meal for birds</div>
        <Link href={"/auth/login"}>
          <Button>Get started</Button>
        </Link>
      </div>
    </div>
  );
};

export default FirstPage;
