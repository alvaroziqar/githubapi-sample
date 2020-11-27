import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Interceptors
import { ApiUrlInterceptor } from './interceptors/api-url.interceptor';

// Store
import { Store } from './store/store';

// Singleton services
import { GithubService } from './services/github.service';

@NgModule({
  imports: [HttpClientModule],
  exports: [],
  providers: [
    // Singleton services
    GithubService,
    // Store
    Store,
    // Interceptors
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
