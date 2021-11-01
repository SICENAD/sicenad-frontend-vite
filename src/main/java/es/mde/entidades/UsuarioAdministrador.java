package es.mde.entidades;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import org.springframework.stereotype.Component;
import es.mde.repositorios.UsuarioAdministradorListener;

/**
 * Representa a los administradores de cada CENAD
 * @author JOSE LUIS PUENTES ALAMOS - MIGUEL PRADA MUNOZ
 *
 */
@Entity
@EntityListeners(UsuarioAdministradorListener.class)
@DiscriminatorValue("UA")
@Component
public class UsuarioAdministrador extends Usuario {
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CENAD_ADMINISTRADO")
	private Cenad cenad;
	
	/**
	 * Crea un administrador
	 */
	public UsuarioAdministrador() {}
	
	/**
	 * Devuelve el CENAD que administra el usuario
	 * @return Devuelve el CENAD que administra el usuario
	 */
	public Cenad getCenad() {
		return cenad;
	}
	
	/**
	 * Guarda el CENAD administrado por el usuario
	 * @param cenad CENAD administrado
	 */
	public void setCenad(Cenad cenad) {
		this.cenad = cenad;
	}
}