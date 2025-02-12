import { GetStaticProps, GetStaticPaths } from "next";
import {Post_ } from "../index"
import Link from "next/link";
type PostDetailsProps = {
  post: Post_;
};



export default function PostDetails({post}:PostDetailsProps) {
  return (
    <div className="flex flex-col justify-start items-center bg-purple-800 h-[100vh] pt-8 mx-auto p-4">
        <div className="max-w-[570px] bg-black rounded-md px-5 py-5">
      <h1 className="text-2xl font-bold text-white">{post.title}</h1>
      <p className="text-white pt-2">Post ID: {post.id} || Author: {post.userId}</p>
      <p className="mt-3 text-white">{post.body}</p>
      <Link href="/" className="text-blue-500 mt-4 block">Back to Homepage</Link>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
    console.log("GetStaticPath", posts)
  const paths = posts.map((post:Post_) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   if (!params || typeof params.id !== "string") {
    return { notFound: true }; 
  }
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post = await res.json();

  return {
    props: { post },
  };
};