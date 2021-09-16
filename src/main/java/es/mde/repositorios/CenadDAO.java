package es.mde.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import es.mde.entidades.Cenad;


@RepositoryRestResource(path="cenads", collectionResourceRel="cenads", itemResourceRel="cenad") 
public interface CenadDAO extends JpaRepository<Cenad, Long> {

	@RestResource(path="nombre")
	List<Cenad> findByNombreIgnoreCaseContaining(@Param("nombre") String txt);
}
