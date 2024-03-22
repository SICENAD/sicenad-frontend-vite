package es.mde.entidades;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import org.springframework.stereotype.Component;

/**
 * Representa a los usuarios superadministradores de la aplicacion
 * @author JOSE LUIS PUENTES ALAMOS - MIGUEL PRADA MUNOZ
 *
 */
@Entity
@DiscriminatorValue("US")
@Component
public class UsuarioSuperadministrador extends Usuario {
	/**
	 * Crea un usuario superadministrador
	 */
	public UsuarioSuperadministrador() {}
}