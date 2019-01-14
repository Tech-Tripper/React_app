import { Component, OnInit } from '@angular/core';
import{ Router, ActivatedRoute} from '@angular/router'
import { BallerService } from '../../baller.service';
import{ FormGroup, FormBuilder,Validators} from '@angular/forms';
import{ MatSnackBar } from '@angular/material';
import { Baller } from '../../baller.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id:String;
  baller: any = {};
  updateForm: FormGroup;

  constructor(private ballerService: BallerService, private router: Router, private route: ActivatedRoute, private snackBar:MatSnackBar, private fb:FormBuilder) {
     this.createForm();
  }
    

     createForm(){
      this.updateForm = this.fb.group({
      name:['', Validators.required],
      sport:'',
      teams:'',
      championships:'',
      retired:''
    });

  }
   


  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = params.id;
      this.ballerService.getBallerById(this.id).subscribe(res =>{
        this.baller = res;
        this.updateForm.get('name').setValue(this.baller.name);
        this.updateForm.get('sport').setValue(this.baller.sport);
        this.updateForm.get('teams').setValue(this.baller.teams);
        this.updateForm.get('championships').setValue(this.baller.championships);
        this.updateForm.get('retired').setValue(this.baller.retired);
      });
    });
  }


  updateBaller(name, sport, teams, championships, retired){
    this.ballerService.updateBaller(this.id, name, sport, teams, championships, retired).subscribe(() =>{
      this.snackBar.open('Baller updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
