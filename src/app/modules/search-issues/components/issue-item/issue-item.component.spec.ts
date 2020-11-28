import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { DateFnsModule } from 'ngx-date-fns';

import { IssueItemComponent } from './issue-item.component';

describe('IssueItem component', () => {
  let spectator: Spectator<IssueItemComponent>;
  const createComponent = createComponentFactory({
    component: IssueItemComponent,
    imports: [DateFnsModule.forRoot()]
  });

  it('should create and show issue data', () => {
    spectator = createComponent({
      props: {
        issue: {
          id: 1,
          title: 'mock Issue',
          body: 'mock Issue body',
          updated_at: '2020-11-26T08:08:15Z',
          state: 'close',
          comments: 1000,
          comments_url: 'mockCommentUrl',
          url: 'mockUrl',
          user: {
            avatar_url: 'mockAvatarUrl',
            login: 'mockUser'
          },
          number: 123
        }
      }
    });
    expect(spectator.component).toBeTruthy();
    expect(
      spectator.query('.issue-item .issue-item__state mat-icon')
    ).toHaveClass('text-error');
    expect(
      spectator.query('.issue-item .issue-item__info .info__title')
    ).toHaveExactText('mock Issue');
  });
});
