package es.mde.entidades;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import org.springframework.stereotype.Component;

/**
 * Representa a los usuarios superadministradores de la aplicacion
 * @author JOSE LUIS PUENTES ÁLAMOS - MIGUEL PRADA MUÑOZ
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