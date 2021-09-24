package es.mde.repositorios;

import java.util.List;

import es.mde.entidades.Categoria;
import es.mde.entidades.Cenad;


public interface CategoriaDAOCustom {

	List<Categoria> getSubcategorias(Categoria categoriaPadre);
	List<Categoria> getCategoriasPadre();

}
