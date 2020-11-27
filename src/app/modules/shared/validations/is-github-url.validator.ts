import { AbstractControl, ValidatorFn } from '@angular/forms';

export function isGithubUrl(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const githubUrlRegex = /https:\/\/github.com\/[^\/]+\/[^\/]+/;
    if (control && control.value) {
      return githubUrlRegex.test(control.value)
        ? null
        : { invalidGithubUrl: control.value };
    }

    return null;
  };
}
