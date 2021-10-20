package es.mde.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import es.mde.entidades.Unidad;


@RepositoryRestResource(path="unidades", collectionResourceRel="unidades", itemResourceRel="unidad") 
public interface UnidadDAO extends JpaRepository<Unidad, Long> {

	@RestResource(path="nombre")
	List<Unidad> findByNombreIgnoreCaseContaining(@Param("nombre") String txt);
}