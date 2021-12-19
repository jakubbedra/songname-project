import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-data-admin-panel',
  templateUrl: './data-admin-panel.component.html',
  styleUrls: ['./data-admin-panel.component.css']
})
export class DataAdminPanelComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  onImport() {
    this.http.post(environment.apiURL+ '/api/config/import', {}, {observe: 'response'}).subscribe();
  }

  onExport() {
    this.http.post(environment.apiURL + '/api/config/export', {}, {observe: 'response'}).subscribe();
  }

}
