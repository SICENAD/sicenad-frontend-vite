package es.mde.repositorios;

import java.util.List;

import es.mde.entidades.CategoriaFichero;

public interface RecursoDAOCustom {
	List<CategoriaFichero> getCategoriasFicheroDeRecurso(Long id);

}
