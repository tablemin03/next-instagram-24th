import Image from "next/image";
import Link from "next/link";
import PostImageSlider from "@/components/PostImageSlider";
import { getUserById } from "@/data/users";
import { formatDate } from "@/utils/formatDate";
import type { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
};

// 피드에 들어가는 게시물 카드 하나
export default function PostCard({ post }: PostCardProps) {
  const author = getUserById(post.authorId);
  if (!author) return null;

  return (
    <article className="pb-4">
      {/* 작성자 줄 */}
      <div className="flex h-14 items-center pl-3">
        <Link href={`/${author.username}`} className="flex items-center gap-3.5">
          <Image
            src={author.profileImage}
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-full object-cover"
          />
          <span className="text-sm leading-[18px] font-semibold">{author.username}</span>
        </Link>
      </div>

      {/* 사진 */}
      <PostImageSlider images={post.images} alt={post.caption} />

      {/* 본문, 날짜 */}
      <div className="px-4 pt-3">
        <p className="text-sm">
          <Link href={`/${author.username}`} className="font-semibold">
            {author.username}
          </Link>{" "}
          {post.caption}
        </p>
        <Link href={`/p/${post.id}`} className="mt-1 block text-xs text-[#a8a8a8]">
          <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
        </Link>
      </div>
    </article>
  );
}