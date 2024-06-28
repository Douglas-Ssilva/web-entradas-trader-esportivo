import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibirMenu = false;

  constructor(
    private router : Router
  ) { }

  toggleMenu(button : any, listMenu : any) {
    button.classList.toggle('active');
    listMenu.classList.toggle('active');
    this.exibirMenu =! this.exibirMenu;
  }

  isUserLogado() {
    return localStorage.getItem('userId')
  }

  logout() {
    localStorage.removeItem('userId')
    this.router.navigate(['/login'])
  }
}
