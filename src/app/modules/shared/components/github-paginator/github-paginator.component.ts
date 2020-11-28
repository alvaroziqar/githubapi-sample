import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

const humanKeys = {
  first: 'rel=first',
  prev: 'rel=prev',
  next: 'rel=next',
  last: 'rel=last'
};

@Component({
  selector: 'iron-github-paginator',
  templateUrl: 'github-paginator.component.html',
  styleUrls: ['./github-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubPaginatorComponent {
  @Input()
  set links(value: string) {
    this.createPaginatorOptions(value);
  }

  @Output() changePage = new EventEmitter<number>();

  options = [
    { id: 'first', icon: '<<' },
    { id: 'prev', icon: '<' },
    { id: 'next', icon: '>' },
    { id: 'last', icon: '>>' }
  ];
  currentPage: number;
  totalPages: number;
  // tslint:disable-next-line: variable-name
  private _links: { [rel: string]: string };

  get showPaginator(): boolean {
    return !!this._links;
  }

  isActive(key: string): boolean {
    return !!this.getLink(key) || false;
  }

  onClick(key: string): void {
    const link = this.getLink(key);
    this.changePage.emit(getPageOfLink(link));
  }

  private createPaginatorOptions(value: string): void {
    this._links = getPaginationData(value);
    this.getPagesInfo();
  }

  private getPagesInfo(): void {
    if (this._links) {
      // Logic for total pages and current page
      const lastLink = this.getLink('last');
      const nextLink = this.getLink('next');
      if (!lastLink || !nextLink) {
        const prevLink = this.getLink('prev');
        const page = getPageOfLink(prevLink) + 1;
        this.totalPages = this.currentPage = page;
      } else {
        this.currentPage = getPageOfLink(nextLink) - 1;
        this.totalPages = getPageOfLink(lastLink);
      }
    }
  }

  private getLink(key: string): string {
    return (this._links && this._links[humanKeys[key]]) || null;
  }
}

function getPageOfLink(link: string): number {
  const page = link.match(/(\?|&)page=(\d*)/)[2];

  return Number(page);
}

function getPaginationData(links: string): any {
  if (!links) {
    return null;
  }
  const parsedLinks = links
    .split(',')
    .reduce((result: { [rel: string]: string }, link: string) => {
      const parts = link.split(';');
      const key = parts[1]
        .trim()
        .replace('"', '')
        .replace('"', ''); // we need to replaces
      const value = parts[0].trim();
      return {
        ...result,
        [key]: value
      };
    }, {});

  return parsedLinks;
}
