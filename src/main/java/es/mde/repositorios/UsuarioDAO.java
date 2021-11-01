package es.mde.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import es.mde.entidades.Usuario;

/**
 * Representa la interfaz que expone para la API los usuarios
 * @author JOSE LUIS PUENTES ÁLAMOS - MIGUEL PRADA MUÑOZ
 *
 */
@RepositoryRestResource(path="usuarios", collectionResourceRel="usuarios", itemResourceRel="usuario") 
public interface UsuarioDAO extends JpaRepository<Usuario, Long> {}