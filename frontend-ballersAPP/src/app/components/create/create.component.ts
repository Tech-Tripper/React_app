import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators} from '@angular/forms';
import{Router} from '@angular/router';
import { BallerService } from '../../baller.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm:FormGroup;

  constructor(private ballerService: BallerService, private fb: FormBuilder, private router: Router) { 
    this.createForm = this.fb.group({
      name:['', Validators.required],
      sport:'',
      teams:'',
      championships:'',
      retired:''
    });
  }
  
  addBaller(name, sport, teams, championships, retired ){
    this.ballerService.addBaller(name, sport, teams, championships, retired).subscribe(() =>{
      this.router.navigate(['/list']);
    })
  }


  ngOnInit(){
  }

}
