import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  @Output() onRowUpdating: EventEmitter<any> = new EventEmitter();
  @Output() onInitNewRow: EventEmitter<any> = new EventEmitter();
  @Output() onEditingStart: EventEmitter<any> = new EventEmitter();
  @Output() onToolbarPreparing: EventEmitter<any> = new EventEmitter();
  @Output() onEditorPreparing: EventEmitter<any> = new EventEmitter();
  @Output() onInitialized: EventEmitter<any> = new EventEmitter();
  @Output() dxGridReady: EventEmitter<any> = new EventEmitter();
  @Output() onSelectionChanged: EventEmitter<any> = new EventEmitter();
  @Input() dataSource: any;
  @Input() columns: any[];
  @Input() buttons: any[];
  @Input() name = '';
  @Input() title = '';
  @Input() editMode = 'row';
  @Input() allowAdding = true;
  @Input() allowUpdating = true;
  @Input() allowDeleting = true;
  @Input() headerFilter = true;
  @Input() filterPanel = true;
  @Input() filterRow = true;
  @Input() searchPanel = true;
  @Input() columnChooser = true;
  @Input() export = true;
  @Input() groupPanel = true;
  @Input() remoteOperations = false;
  totalSummaryColumns: any[];

  public get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }
  ngOnInit() {
    this.totalSummaryColumns = this.columns.filter(p => !!p.totalSummaryType)
  }
  ngAfterViewInit() {
    this.dxGridReady.emit(this.dataGrid);
  }
}
