package es.mde.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import es.mde.entidades.Usuario;
import es.mde.entidades.UsuarioSuperadministrador;

@RepositoryRestResource(path="usuarios_superadministrador", collectionResourceRel="usuarios_superadministrador", itemResourceRel="usuario_superadministrador") 
public interface UsuarioSuperadministradorDAO extends JpaRepository<UsuarioSuperadministrador, Long> {

	@RestResource(path="nombre")
	List<UsuarioSuperadministrador> findByNombreIgnoreCaseContaining(@Param("nombre") String txt);
}
