package es.mde.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import es.mde.entidades.UsuarioGestor;

/**
 * Representa la interfaz que expone para la API los gestores 
 * @author JOSE LUIS PUENTES ÁLAMOS - MIGUEL PRADA MUÑOZ
 *
 */
@RepositoryRestResource(path="usuarios_gestor", collectionResourceRel="usuarios_gestor", itemResourceRel="usuario_gestor") 
public interface UsuarioGestorDAO extends JpaRepository<UsuarioGestor, Long> {}