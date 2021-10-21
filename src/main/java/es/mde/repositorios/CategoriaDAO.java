package es.mde.repositorios;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import es.mde.entidades.Categoria;

@RepositoryRestResource(path="categorias", collectionResourceRel="categorias", itemResourceRel="categoria") 
public interface CategoriaDAO extends JpaRepository<Categoria, Long>, CategoriaDAOCustom {
	@RestResource(path="nombre")
	List<Categoria> findByNombreIgnoreCaseContaining(@Param("nombre") String txt);
}