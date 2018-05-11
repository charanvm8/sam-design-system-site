import {
    ChangeDetectionStrategy, Injectable, ChangeDetectorRef, Component, Input,
    Optional, ViewEncapsulation, OnDestroy, OnInit, HostBinding, HostListener
  } from '@angular/core';
import {SamSortDirective, SamSortable, SortDirection} from './sort.directive';
import {SamMultiSortDirective, SamMultiSortable} from './multicol-sort.directive';
import {CdkColumnDef, coerceBooleanProperty} from '@angular/cdk';
import {Subscription} from 'rxjs/Subscription';


/**
 * To modify the labels and text displayed, create a new instance of SamMultiSortHeaderIntl and
 * include it in a custom provider.
 */
@Injectable()
export class SamMultiSortHeaderIntl {
  sortButtonLabel = (id: string) => {
    return `Change sorting for ${id}`;
  }

  /** A label to describe the current sort (visible only to screenreaders). */
  sortDescriptionLabel = (id: string, direction: SortDirection) => {
    return `Sorted by ${id} ${direction === 'asc' ? 'ascending' : 'descending'}`;
  }
}
/* tslint:disable */
/**
 * Applies sorting behavior (click to change sort) and styles to an element, including an
 * arrow to display the current sort direction.
 *
 * Must be provided with an id and contained within a parent MdSort directive.
 *
 * If used on header cells in a CdkTable, it will automatically default its id from its containing
 * column definition.
 */
@Component({
selector: '[sam-sort-multi-header]',
template: `
<div class="sam-sort-header-container"
     [class.sam-sort-header-position-before]="arrowPosition == 'before'">
  <button class="sam-sort-header-button" type="button"
          [attr.aria-label]="_intl.sortButtonLabel(id)">
    <ng-content></ng-content>
    <span *ngIf="_isSorted(); else not_sorted"
        class="fa"
        [class.fa-sort-up]="direction == 'asc'"
        [class.fa-sort-down]="direction == 'desc'">
    </span>
    <ng-template #not_sorted><span class="fa fa-sort"></span></ng-template>
  </button>

  
</div>

<span class="sr-only" *ngIf="_isSorted()">  
  {{_intl.sortDescriptionLabel(id, _sort.direction)}}
</span>
`,
encapsulation: ViewEncapsulation.None,
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SamSortMultiHeaderComponent implements SamMultiSortable, OnInit, OnDestroy {
    /** @docs-private  */
    sortSubscription: Subscription;
    direction: SortDirection = "";
    /**
     * ID of this sort header. If used within the context of a CdkColumnDef, this will default to
     * the column's name.
     */
    @Input() id: string;

    /** Sets the position of the arrow that displays when sorted. */
    @Input() arrowPosition: 'before' | 'after' = 'after';

    /** Overrides the sort start value of the containing MdSort for this SamSortable. */
    @Input('start') start: 'asc' | 'desc';

    /** Overrides the disable clear value of the containing MdSort for this SamSortable. */
    @Input()

    @HostBinding('class.sam-sort-header-sorted') samSortHeaderSorted(){
        return this._isSorted();
    }
    @HostListener('click') hostClick(){
        return this._sort.sort(this);
    }
    get disableClear() { return this._disableClear; }
    set disableClear(v) { this._disableClear = coerceBooleanProperty(v); }
    private _disableClear: boolean;


    constructor(public _intl: SamMultiSortHeaderIntl,
                private _changeDetectorRef: ChangeDetectorRef,
                @Optional() public _sort: SamMultiSortDirective,
                @Optional() public _cdkColumnDef: CdkColumnDef) {

        if (!_sort) {
            throw Error("Parent Sort directive not found");
        }

        this.sortSubscription = _sort.samSortChange.subscribe(() => _changeDetectorRef.markForCheck());
    }

    ngOnInit() {
        if (!this.id && this._cdkColumnDef) {
        this.id = this._cdkColumnDef.name;
        }

        this._sort.register(this);
    }

    ngOnDestroy() {
        this._sort.deregister(this);
        this.sortSubscription.unsubscribe();
    }

    /** Whether this MdSortHeader is currently sorted in either ascending or descending order. */
    _isSorted() {
        return this.direction;
    }
}