import {  Component, OnInit, ViewChild} from "@angular/core";
import {  Observable, tap, throwError } from "rxjs";
import { ItemDTO } from "../model/item.dto";
import { ItemService } from "../service/item.service";
import { AsyncPipe, JsonPipe} from "@angular/common";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe,AsyncPipe,MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  

})
export class DashboardComponent implements OnInit{
    dataSource = new MatTableDataSource<ItemDTO>();

items$!: Observable<ItemDTO[]>; 

displayedColumns: string[] = ['name', 'price','supermarket','notes'];
constructor(private itemService:ItemService){}

@ViewChild (MatSort) sort: MatSort| null =null;
ngOnInit(): void {

  this.fetchAllItems();
  //this.items$=this.fetchAllItems();
 /**this.itemService.fetchAllItems().subscribe({
    next: response => {
      const items = response._embedded?.items ?? [];
      console.log('Items estratti:', items);
      this.dataSource.data = items;
    },
    error: err => console.error('Errore nel caricamento:', err)
  });
*/
  

}


fetchAllItems():void{
  this.itemService.fetchAllItems().subscribe({
    next: response => {
      const items = response._embedded?.items ?? [];
      console.log('Items estratti:', items);
      this.dataSource.data = items;
    },
    error: err => console.error('Errore nel caricamento:', err)
  });
}


/*fetchAllItems():Observable<ItemDTO[]> {
return this.itemService.fetchAllItems().pipe(
    tap(observerOrNext_=>console.log("Items fetched successfully")),
    catchError ( error => {
        console.error("Error fetching items:",error);
        return throwError(()=> new Error("Error fetching items. Please try again later.")); })  
);      

}
}

*/



}


