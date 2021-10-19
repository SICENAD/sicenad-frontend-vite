import { CategoriaFichero } from "src/app/categoriasFichero/models/categoriaFichero";
import { Recurso } from "./recurso";

export interface Fichero {
  idFichero: string;
  nombre: string;
  nombreArchivo: string;
  descripcion: string;
  imagen: string;
  categoriaFichero: CategoriaFichero | any;
  recurso: Recurso | any;
  url: string;
}
