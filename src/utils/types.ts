export type Comments = {
  id: number;
  content: string;
  likes: number;
  userId: number;
};

export type CommentsWithUserName = Comments & { userName: string };

export type APIResponseType<T> = {
  error: boolean;
  message: string;
  data: T;
};

export type User = {
  id: number;
  email: string;
  userName: string;
  loggedIn: boolean;
};

export type TokenPayload = User & {
  iat: number;
  exp: number;
};

export type AuthContextType = {
  auth: {
    loggedIn: boolean;
    user: User | null;
  };
  setAuth: (value: { loggedIn: boolean; user: User | null }) => void;
  logout: (id: number) => void;
};
