import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  ComponentRef,
  OnDestroy,
  Self,
  OnInit
} from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LastSearchesService } from './../../services/last-searches.service';
import { LastSearchesComponent } from './../../components/last-searches/last-searches.component';
import { NgControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[lastSearches]',
  exportAs: 'lastSearches'
})
export class LastSearchesTriggerDirective implements OnInit, OnDestroy {
  private overlayRef: OverlayRef;
  private component: ComponentRef<LastSearchesComponent>;
  private destroy = new Subject();

  @Input() lastSearches: string; // key for storage

  @HostListener('focus')
  onFocus(): void {
    this.showPanel();
  }

  constructor(
    private host: ElementRef,
    @Self() private control: NgControl,
    private overlay: Overlay,
    private lastSearchesService: LastSearchesService
  ) {}

  get element(): HTMLInputElement {
    return this.host.nativeElement;
  }

  ngOnInit(): void {
    this.subscribeToDocumentClick();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  add(item: string): void {
    this.lastSearchesService.add(this.lastSearches, item);
  }

  private showPanel(): void {
    this.show();
  }

  private hidePanel(): void {
    this.component.destroy();
    this.overlayRef.detach();
    this.overlayRef = null;
  }

  private show(): void {
    if (this.overlayRef) {
      return;
    }
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    const portal = new ComponentPortal(LastSearchesComponent);
    this.component = this.overlayRef.attach(portal);
    this.component.instance.key = this.lastSearches;

    this.component.instance.clickItem
      .pipe(takeUntil(this.destroy))
      .subscribe((item: string) => {
        this.control.control.patchValue(item);
        this.hidePanel();
      });
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.element)
      .withPush(false)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 15
        }
      ]);

    return new OverlayConfig({
      positionStrategy
    });
  }

  private subscribeToDocumentClick(): void {
    fromEvent(document, 'click')
      .pipe(takeUntil(this.destroy))
      .subscribe((event: MouseEvent) => {
        if (this.clickOutsidePanel(event)) {
          this.hidePanel();
        }
      });
  }

  private clickOutsidePanel(event: MouseEvent): boolean {
    const hostElement = this.element;
    const element = document.querySelector('#lastSearchesPanel');
    return (
      element &&
      hostElement &&
      !element.contains(event.target as Node) &&
        !hostElement.contains(event.target as Node)
    );
  }
}
