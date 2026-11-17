import type { FeedPage, Post, PostWithAuthor } from "@/types/post";
import { getUserById } from "@/data/users";

const basePosts: Post[] = [
  {
    id: "1",
    authorId: "u1",
    images: ["/posts/1-1.jpeg"],
    caption: "먼직귀: 먼가 직장다니고 귀신 들린거..",
    likes: 155,
    createdAt: "2025-12-25",
  },
  {
    id: "2",
    authorId: "u1",
    images: ["/posts/2-1.jpeg", "/posts/2-2.jpeg"],
    caption: "나애 일상",
    likes: 123,
    createdAt: "2025-08-10",
  },
  {
    id: "3",
    authorId: "u1",
    images: ["/posts/3-1.jpeg", "/posts/3-2.jpeg"],
    caption: "나애 꿈",
    likes: 102,
    createdAt: "2025-06-29",
  },
  {
    id: "4",
    authorId: "u1",
    images: ["/posts/4-1.jpeg"],
    caption: "요즘 내 정신상태 헤헤",
    likes: 88,
    createdAt: "2025-05-20",
  },
];

// 무한 스크롤 확인용: sangmin(u2)이 쓴 게시물 26개를 기존 사진으로 만들기
const extraPosts: Post[] = Array.from({ length: 26 }, (_, index) => {
  const base = basePosts[index % basePosts.length];
  return {
    ...base,
    id: String(index + 5),
    authorId: "u2",
    caption: `${base.caption} #${index + 5}`,
    createdAt: `2025-04-${String(30 - index).padStart(2, "0")}`,
  };
});

const posts: Post[] = [...basePosts, ...extraPosts];

// 게시물 전체 목록 (그리드에서 사용)
export function getPosts(): Post[] {
  return posts;
}

// id로 게시물 하나 찾기 (상세 페이지에서 사용). 없으면 undefined
export function getPost(id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}

// 특정 유저의 게시물만 (프로필 그리드에서 사용)
export function getPostsByUserId(userId: string): Post[] {
  return posts.filter((post) => post.authorId === userId);
}

// 피드용: 모든 게시물을 최신순으로
export function getFeedPosts(): Post[] {
  return [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

const PAGE_SIZE = 5;

// 피드 한 페이지: offset번째부터 5개 + 작성자 정보 붙이기
export function getFeedPage(offset: number): FeedPage {
  const feed = getFeedPosts();
  const page = feed.slice(offset, offset + PAGE_SIZE);

  const posts: PostWithAuthor[] = [];
  for (const post of page) {
    const author = getUserById(post.authorId);
    if (author) posts.push({ ...post, author });
  }

  const nextOffset = offset + PAGE_SIZE < feed.length ? offset + PAGE_SIZE : null;
  return { posts, nextOffset };
}