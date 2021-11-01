package es.mde.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import es.mde.entidades.UsuarioAdministrador;

/**
 * Representa la interfaz que expone para la API los administradores 
 * @author JOSE LUIS PUENTES ÁLAMOS - MIGUEL PRADA MUÑOZ
 *
 */
@RepositoryRestResource(path="usuarios_administrador", collectionResourceRel="usuarios_administrador", itemResourceRel="usuarioAdministrador") 
public interface UsuarioAdministradorDAO extends JpaRepository<UsuarioAdministrador, Long> {}