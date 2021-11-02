package es.mde.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import es.mde.entidades.Arma;


@RepositoryRestResource(path="armas", collectionResourceRel="armas", itemResourceRel="arma") 
public interface ArmaDAO extends JpaRepository<Arma, Long> {
	
	@RestResource(path="tipo")
	List<Arma> findBytipoTiroIgnoreCaseContaining(@Param("tipo") String txt);

}
