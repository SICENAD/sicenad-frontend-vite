import { Cenad } from "src/app/superadministrador/models/cenad";

export interface Categoria {
  idCategoria: string;
  nombre: string;
  descripcion: string;
  subcategorias: Categoria[];
  categoriaPadre: Categoria;
  cenad: Cenad;
  url: string;
}
