import { Component, Input, OnInit } from '@angular/core';
import { Cenad } from '../../models/cenad';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styles: ['.lista a { color: #52796f; font-weight: bold}']
})
export class ResultadoComponent implements OnInit {
  @Input() cenad: Cenad;

  constructor() { }

  ngOnInit() {
  }

}
