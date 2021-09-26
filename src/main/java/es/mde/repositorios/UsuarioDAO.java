package es.mde.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import es.mde.entidades.Usuario;

@RepositoryRestResource(path="usuarios", collectionResourceRel="usuarios", itemResourceRel="usuario") 
public interface UsuarioDAO extends JpaRepository<Usuario, Long> {

	@RestResource(path="nombre")
	List<Usuario> findByNombreIgnoreCaseContaining(@Param("nombre") String txt);
}
