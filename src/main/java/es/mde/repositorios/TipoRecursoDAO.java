package es.mde.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import es.mde.entidades.TipoRecurso;


@RepositoryRestResource(path="tipos_recurso", collectionResourceRel="tipos_recurso", itemResourceRel="tipo_recurso") 
public interface TipoRecursoDAO extends JpaRepository<TipoRecurso, Long> {

	@RestResource(path="nombre")
	List<TipoRecurso> findByNombreIgnoreCaseContaining(@Param("nombre") String txt);
}
