import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';
import { environment } from 'src/environments/environment';
import { ArmaImpl } from '../../models/arma-impl';

@Component({
  selector: 'app-arma-ficha',
  templateUrl: './arma-ficha.component.html',
  styleUrls: ['./arma-ficha.component.css']
})
export class ArmaFichaComponent implements OnInit {
  //variable que trae del otro componente el arma
  @Input() arma: ArmaImpl;
  //variables que emiten al otro componente los eventos para eliminar/editar el arma
  @Output() armaEliminar = new EventEmitter<ArmaImpl>();
  @Output() armaEditar = new EventEmitter<ArmaImpl>();
  //variable que recoge los tipos de tiro
  tiposTiro: string[] = environment.tiposTiro;

  constructor(private appConfigService: AppConfigService) {
      this.tiposTiro = appConfigService.tiposTiro ? appConfigService.tiposTiro : environment.tiposTiro;
    }    
  ngOnInit(): void {}

  //metodo que emite el evento para eliminar el arma
  eliminar(): void {
    this.armaEliminar.emit(this.arma);
  }

  //metodo que emite el evento para editar el arma
  editar(): void {
    this.armaEditar.emit(this.arma);
  }
}