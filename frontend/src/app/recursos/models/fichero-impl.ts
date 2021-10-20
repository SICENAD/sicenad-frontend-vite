import { CategoriaFichero } from "src/app/categoriasFichero/models/categoriaFichero";
import { Fichero } from "./fichero";
import { Recurso } from "./recurso";

export class FicheroImpl implements Fichero {
  idFichero: string;
  nombre: string;
  nombreArchivo: string;
  descripcion: string;
  imagen: string;
  categoriaFichero: CategoriaFichero | any;
  recurso: Recurso | any;
  url: string;

  constructor() {}

  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}