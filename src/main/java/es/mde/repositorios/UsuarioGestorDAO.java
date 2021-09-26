package es.mde.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import es.mde.entidades.UsuarioGestor;

@RepositoryRestResource(path="usuarios_gestor", collectionResourceRel="usuarios_gestor", itemResourceRel="usuario_gestor") 
public interface UsuarioGestorDAO extends JpaRepository<UsuarioGestor, Long> {

	@RestResource(path="nombre")
	List<UsuarioGestor> findByNombreIgnoreCaseContaining(@Param("nombre") String txt);
}
