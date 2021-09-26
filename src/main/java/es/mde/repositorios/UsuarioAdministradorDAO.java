package es.mde.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import es.mde.entidades.UsuarioAdministrador;

@RepositoryRestResource(path="usuarios_administrador", collectionResourceRel="usuarios_administrador", itemResourceRel="usuarioAdministrador") 
public interface UsuarioAdministradorDAO extends JpaRepository<UsuarioAdministrador, Long> {

	@RestResource(path="nombre")
	List<UsuarioAdministrador> findByNombreIgnoreCaseContaining(@Param("nombre") String txt);
}
