import { Component, OnInit, ElementRef, ViewChild } 	from '@angular/core';
import { DataSource } 									from '@angular/cdk/table';
import { MdPaginator } 									from '@angular/material';
import { MdSort } 										from '@angular/material';
import { BehaviorSubject } 								from 'rxjs/BehaviorSubject';
import { Observable } 									from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import { TableData } 									from '../../../../helper/table-data/table-data';
import { CRUDService } 									from 	'../../../../../services/crud.service';

@Component({
	selector: 'admin-return-reasons-list',
	templateUrl: './return-reasons-list.component.html',
	styleUrls: [ './return-reasons-list.component.scss' ]
})
export class ReturnReasonsListComponent implements OnInit {

	displayedColumns = ['return_reason_name', 'action'];

	tableData = new TableData();
	dataSource: ReturnReasonsDataSource | null;

	constructor(private crudService: CRUDService) { }

	ngOnInit() {
		this.crudService.retrieve( 'ReturnReason' ).subscribe( result => {
			if (result.status == 'ok') {
				this.tableData.setData(result.content);
				this.dataSource = new ReturnReasonsDataSource(this.tableData);
			}
		});
	}
}

export class ReturnReasonsDataSource extends DataSource<any> {

	displayDataChanges: any;

	constructor(private _tableData: TableData) {
		super();

		this.displayDataChanges = [
			_tableData.dataChange,
		]
	}

	connect(): Observable<any> {
		return Observable.merge(...this.displayDataChanges).map(() => {
			return this._tableData.data;
		});
	}

	disconnect() {

	}
}