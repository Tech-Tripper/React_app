import { Component, OnInit } from '@angular/core';
import{ Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import{ Baller } from '../../baller.model';
import { BallerService } from '../../baller.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ballers: Baller[];
  displayedColumns = ['name','sport','teams','championships','retired','actions'];

  constructor(private balllerService: BallerService, private router: Router) { }

  ngOnInit() {
    //this.balllerService.getBallers().subscribe((ballers) =>{
      //console.log(ballers);
    //});
    this.fetchBallers();
  }
  
   
  fetchBallers() {
    this.balllerService
       .getBallers()
       .subscribe((data: Baller[]) => {
          this.ballers = data;
          console.log('Data requested..');
          console.log(this.ballers);
       });
  }

editBaller(id) {
  this.router.navigate([`/edit/${id}`]);
}

deleteBaller(id){
  this.balllerService.deleteBaller(id).subscribe(() => {
    this.fetchBallers();
  });
}


}
