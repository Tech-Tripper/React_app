import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BallerService {

  uri ='http://localhost:4000';

  constructor(private http: HttpClient) { }

  getBallers(){
    return this.http.get(`${this.uri}/ballers`);
  }
   
  getBallerById(id){

    return this.http.get(`${this.uri}/ballers/${id}`);

  }

  addBaller(name, sport, teams, championships,retired,){
    const baller = {
      name: name,
      sport: sport,
      teams: teams,
      championships: championships,
      retired:''
      
    }
    return this.http.post(`${this.uri}/ballers/add`,baller);
  }

  updateBaller(id, name, sport, teams, championships, retired){
    const baller = {
      name: name,
      sport: sport,
      teams: teams,
      championships: championships,
      retired: retired
    }
    return this.http.post(`${this.uri}/ballers/update/${id}`,baller);
  }

  deleteBaller(id){
    return this.http.get(`${this.uri}/ballers/delete/${id}`);
  }

}
