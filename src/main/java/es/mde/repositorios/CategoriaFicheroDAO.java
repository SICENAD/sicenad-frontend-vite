package es.mde.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import es.mde.entidades.CategoriaFichero;

@RepositoryRestResource(path="categorias_fichero", collectionResourceRel="categorias_fichero", itemResourceRel="categoria_fichero") 
public interface CategoriaFicheroDAO extends JpaRepository<CategoriaFichero, Long> {

	@RestResource(path="nombre")
	List<CategoriaFichero> findByNombreIgnoreCaseContaining(@Param("nombre") String txt);
}
