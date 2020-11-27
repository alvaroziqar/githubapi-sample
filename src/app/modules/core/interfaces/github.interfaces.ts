export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  created_at: string;
  open_issues: number;
}

export interface RepositoriesResponse {
  total_count: number;
  items: Repository[];
}

export interface IssueUser {
  avatar_url: string;
  login: string;
}

export type IssueState = 'open' | 'close';

export interface Issue {
  id: number;
  title: string;
  body: string;
  updated_at: string;
  state: IssueState;
  comments: number;
  comments_url: string;
  url: string;
  user: IssueUser;
  number: number;
}

export interface IssuesResponse {
  links: string;
  items: Issue[];
}
