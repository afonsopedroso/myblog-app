import Link from "next/link";

export default function About() {
  return (
    <div className="grid grid-rows-auto items-start justify-items-center px-8 md:px-16 pb-20 gap-12 pt-24 font-[family-name:var(--font-geist-sans)] text-white">
      {/* Page Title */}
      <h1 className="text-3xl font-bold">About This Blog</h1>
        <span>This is a simple blog presented as an exercise to hopefully work with miracle tree :)</span>
      <p className="text-center max-w-2xl text-lg">
       Another cool section  
        Built with <strong>Next.js</strong> and <strong>Tailwind CSS</strong>, it features dynamic content, hashtag filtering, and an easy-to-navigate UI.
      </p>
      <Link href="/" className="bg-white text-gray-500 px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition">
        Back to Home
      </Link>
      
    </div>
  );
}