import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

// Date
import { DateFnsModule, DateFnsConfigurationService } from 'ngx-date-fns';
import { es } from 'date-fns/locale';

// Shared Components
import { HeaderComponent } from './components/header/header.component';
import { RepoItemComponent } from './components/repo-item/repo-item.component';
import { GithubPaginatorComponent } from './components/github-paginator/github-paginator.component';

// Pipes
import { ShortNumberPipe } from './pipes/short-number.pipe';

// Custom Modules as if it were an npm package
import { LastSearchesModule } from './../last-searches/last-searches.module';

// Date configuration
const spanishConfig = new DateFnsConfigurationService();
spanishConfig.setLocale(es);

const COMMON_MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule,
  LastSearchesModule
];

const COMPONENTS = [
  HeaderComponent,
  RepoItemComponent,
  GithubPaginatorComponent
];

const PIPES = [ShortNumberPipe];

@NgModule({
  imports: [...COMMON_MODULES, DateFnsModule.forRoot()],
  exports: [...COMMON_MODULES, DateFnsModule, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
  providers: [{ provide: DateFnsConfigurationService, useValue: spanishConfig }]
})
export class SharedModule {}
