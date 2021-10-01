package es.mde.repositorios;

import java.util.List;

import es.mde.entidades.Categoria;
import es.mde.entidades.Recurso;


public interface CenadDAOCustom {

	List<Categoria> getCategoriasCenad(Long id);
	List<Recurso> getRecursosCenad(Long id);

}
