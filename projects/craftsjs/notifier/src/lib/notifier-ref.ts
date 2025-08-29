import { NotifierComponent } from './notifier.component';
import { Subject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

export class NotifierRef {

    private readonly _component: NotifierComponent;

  private readonly _destroy: () => void;

    private readonly _afterClose = new Subject<string>();

  constructor(component: NotifierComponent, id: string, destroy: () => void) {
      this._component = component;
        this._component._id = id;
      this._destroy = destroy;
        this._component._close.subscribe(this.close.bind(this));
    }

    get component(): NotifierComponent {
        return this._component;
    }

    afterClosed(): Observable<string> {
        return this._afterClose.asObservable();
    }

    close() {
        this._component._animationStateChanged.pipe(
            filter(x => x.phaseName === 'done'),
            take(1)
        )
            .subscribe(() => {
                this._afterClose.next(this._component._id);
                this._afterClose.complete();
                this._destroyPortal();
            });
        this._component.startExitAnimation();
    }

    changedStyle(style: any) {
        this._component._style = style;
    }

    private _destroyPortal() {
      this._destroy();
    }

}
