package es.mde.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import es.mde.entidades.UsuarioNormal;

/**
 * Representa la interfaz que expone para la API los usuarios normales 
 * @author JOSE LUIS PUENTES ÁLAMOS - MIGUEL PRADA MUÑOZ
 *
 */
@RepositoryRestResource(path="usuarios_normal", collectionResourceRel="usuarios_normal", itemResourceRel="usuario_normal") 
public interface UsuarioNormalDAO extends JpaRepository<UsuarioNormal, Long> {}