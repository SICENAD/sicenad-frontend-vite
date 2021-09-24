package es.mde.repositorios;

import java.util.List;

import es.mde.entidades.Categoria;
import es.mde.entidades.Cenad;


public interface CenadDAOCustom {

	List<Categoria> getCategoriasCenad(Cenad cenad);


}
