import type { User } from "@/types/user";

const users: User[] = [
  {
    id: "u1",
    username: "sangbin",
    name: "이상빈",
    profileImage: "/images/default-profile.jpeg",
    followers: 120,
    following: 300,
  },
  {
    id: "u2",
    username: "sangmin",
    name: "이상민",
    profileImage: "/images/default-profile.jpeg",
    followers: 98,
    following: 150,
  },
];

// 유저 전체 목록
export function getUsers(): User[] {
  return users;
}

// id로 유저 하나 찾기 (게시물 작성자 찾을 때). 없으면 undefined
export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

// username으로 유저 하나 찾기 (프로필 페이지 /sangbin). 없으면 undefined
export function getUserByUsername(username: string): User | undefined {
  return users.find((user) => user.username === username);
}