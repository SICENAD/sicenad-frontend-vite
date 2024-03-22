package es.mde.entidades;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import org.springframework.stereotype.Component;

/**
 * Representa a los administradores de cada CENAD
 * @author JOSE LUIS PUENTES ALAMOS - MIGUEL PRADA MUNOZ
 *
 */
@Entity
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