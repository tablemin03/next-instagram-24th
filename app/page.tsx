import HomeHeader from "./_components/HomeHeader";
import PostCard from "@/components/PostCard";
import { getFeedPosts } from "@/data/posts";

export default function Home() {
  const posts = getFeedPosts();

  return (
    <>
      <HomeHeader />
      <main className="mx-auto w-full max-w-[430px]">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>
    </>
  );
}