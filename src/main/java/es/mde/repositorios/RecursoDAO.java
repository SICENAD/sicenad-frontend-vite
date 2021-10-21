package es.mde.repositorios;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import es.mde.entidades.Recurso;

@RepositoryRestResource(path="recursos", collectionResourceRel="recursos", itemResourceRel="recurso")
public interface RecursoDAO extends JpaRepository<Recurso, Long>, RecursoDAOCustom {
	@RestResource(path="nombre")
	List<Recurso> findByNombreIgnoreCaseContaining(@Param("nombre") String txt);
}