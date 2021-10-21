package es.mde.repositorios;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import es.mde.entidades.UsuarioNormal;

@RepositoryRestResource(path="usuarios_normal", collectionResourceRel="usuarios_normal", itemResourceRel="usuario_normal") 
public interface UsuarioNormalDAO extends JpaRepository<UsuarioNormal, Long> {
	@RestResource(path="nombre")
	List<UsuarioNormal> findByNombreIgnoreCaseContaining(@Param("nombre") String txt);
}