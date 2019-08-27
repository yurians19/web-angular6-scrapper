import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public loading: boolean = false
  public loadingList: boolean = false
  public users: any
  public email: string
  public password: string
  constructor(
                public UsersService: UsersService,
              ) { }

  ngOnInit() {
    this.getUsers()
  }
  getUsers(){
      this.loadingList = true
      this.UsersService.getUsers().subscribe(result => {
        /* console.log(result); */
        this.users = result
      },
      error => console.log('error',error),
      () => this.loadingList = false
    );
  }
  deleteUser(email){
    this.loading = true
    this.UsersService.deletetUser(email).subscribe(result => {
      this.getUsers()
      console.log(result);
    },
    error => console.log('error',error),
    () => this.loading = false
  );
}
  saveUser(){
    if (this.email && this.password) {
      this.loading = true
      this.UsersService.saveUser(this.email,this.password).subscribe(result => {
          this.email = ''
          this.password = ''
          this.getUsers()
          console.log(result);
        },
        error =>{
          if (error.status == 409 ) {
            alert('Usuario ya existe')
            this.loading = false
          } else {
            alert('Error al registrar de Usuario')
            console.log('error',error)
          }
        },
        () => this.loading = false
      );
    } else {
      alert('Debe completar los campos')
    }
    
}

}
