

import { GetStaticProps } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
export interface Post_{
  userId: number
  id:number
  title:string
  body:string
}

export interface Post {
  posts: Post_[]; 
}

const generateHashtags = (text:string) => {
  if(!text) return []
  const words_ = text.split(" ")
  const commonWords = ["the", "is", "and", "or", "of", "to", "in", "on", "at", "with"];
  return words_.filter(word => word.length > 3 && !commonWords.includes(word.toLowerCase()))
               .map(word=>`#${word.toLowerCase()}`);
}


export default function Home({posts}:Post) {
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post_[]>([]); 
   
  useEffect(() => {
    if (selectedTag.length==0) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => generateHashtags(post.title).some(tag => selectedTag.includes(tag))));
    }
  }, [selectedTag, posts])

  const allHashtags = [...new Set(posts.flatMap(post => generateHashtags(post.title)))].slice(0,10);

  return (
    <div className="grid  grid-rows-[30px_1fr_30px] items-center justify-items-center min-h-screen px-8 md:px-16  pb-20 gap-12 pt-24 font-[family-name:var(--font-geist-sans)]">
      <div className="text-white font-bold w-full md:flex md:flex-row flex-col  justify-between text-xl px-4"><div><h1>My Blog List</h1></div>
        <div className="text-[9px] md:text-sm">
          <div className="pb-1"> 
            <span className="">Search: {" "} 
            {selectedTag.length > 0 && selectedTag.length <= 5 ? selectedTag.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-blacks px-2 py-1 rounded mx-1">
                {tag}
              </span>
            )): "No tags selected"}
          </span>
          </div>
          
          <div className="mb-4 grid grid-cols-3 md:grid-cols-4 ">
            {allHashtags.map((tag) => (              
            <button key={tag} disabled={selectedTag.length>=5 && !selectedTag.includes(tag)} onClick={() =>
                setSelectedTag(prevTags =>
                  prevTags.includes(tag)
                    ? prevTags.filter(t => t !== tag) 
                    : [...prevTags, tag] 
                )
              } 
              className={`px-1 h-7 flex items-center justify-center py-1 m-1 border rounded ${
              selectedTag.includes(tag) ? "bg-green-500 text-white" : "bg-black"
            }`}>{tag}</button>
            ))}
            {selectedTag && (
          <button onClick={() => setSelectedTag([])} className="ml-2 mt-1 bg-red-200 rounded-md h-7 text-red-500">
            Clear
          </button>
        )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 mt-5 md:mt-0 ">
      {filteredPosts.map((post:Post_) => (
        <div key={post.id} className="rounded-xl flex flex-col justify-between bg-white shadow-md p-4 mx-4 my-4"><Link href={`/post/${post.id}`} className="text-xl font-semibold">{post.title}</Link>
          <p className="text-gray-600">
                {post.body.substring(0, 100)}...
          </p>
        <Link href={`/post/${post.id}`} className="text-blue-500 mt-auto">Read More</Link>        
      </div>        
      ))}  
      </div>
      
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return {
    props: { posts },
    revalidate: 60,

  };
};
