import { Component, Input, OnInit } from '@angular/core';
import { TimeLucrativoDTO } from '../models/time-lucrativo-dto';

@Component({
  selector: 'app-times-lucrativos',
  templateUrl: './times-lucrativos.component.html',
  styleUrls: ['./times-lucrativos.component.css']
})
export class TimesLucrativosComponent implements OnInit {

  @Input()
  times? : any

  @Input()
  contentCaption : string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
