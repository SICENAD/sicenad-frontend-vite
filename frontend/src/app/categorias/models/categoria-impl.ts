import { Cenad } from "src/app/superadministrador/models/cenad";
import { Categoria } from "./categoria";

export class CategoriaImpl implements Categoria {
  idCategoria: string;
  nombre: string;
  descripcion: string;
  subcategorias: Categoria[];
  categoriaPadre: Categoria;
  cenad: Cenad;
  url: string;

  constructor() {}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}
