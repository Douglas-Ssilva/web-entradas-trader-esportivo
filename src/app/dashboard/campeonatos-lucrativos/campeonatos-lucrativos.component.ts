import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-campeonatos-lucrativos',
  templateUrl: './campeonatos-lucrativos.component.html',
  styleUrls: ['./campeonatos-lucrativos.component.css']
})
export class CampeonatosLucrativosComponent implements OnInit {

  @Input()
  campeonatos? : any

  @Input()
  contentCaption : string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
