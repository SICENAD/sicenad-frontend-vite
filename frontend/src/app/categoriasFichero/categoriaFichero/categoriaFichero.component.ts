import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { CategoriaFichero } from '../models/categoriaFichero';

@Component({
  selector: 'app-categoriaFichero',
  templateUrl: './categoriaFichero.component.html',
  styleUrls: ['./categoriaFichero.component.css']
})
export class CategoriaFicheroComponent implements OnInit {

  @Input() categoriaFichero: CategoriaFichero;
  @Output() categoriaFicheroSeleccionada = new EventEmitter<CategoriaFichero>();
  faEdit = faEdit;

  constructor() { }

  ngOnInit() {
  }
}



