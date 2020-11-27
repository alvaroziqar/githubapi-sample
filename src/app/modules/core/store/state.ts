import { Repository, Issue } from './../interfaces/github.interfaces';

export interface State {
  repository: Repository;
  issues: Issue[];
  issuesPagination: any;
  isLoadingIssues: boolean;
  issuesError: string;
  issuesPaginationLink: string;
}
