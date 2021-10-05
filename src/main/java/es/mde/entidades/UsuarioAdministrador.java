package es.mde.entidades;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.springframework.stereotype.Component;

import es.mde.repositorios.UsuarioAdministradorListener;

@Entity
@EntityListeners(UsuarioAdministradorListener.class)
@DiscriminatorValue("UA")
@Component
public class UsuarioAdministrador extends Usuario {
	@OneToOne
	@JoinColumn(name = "CENAD")
	private Cenad cenad;
	
	public UsuarioAdministrador() {}
	
	public Cenad getCenad() {
		return cenad;
	}
	
	public void setCenad(Cenad cenad) {
		this.cenad = cenad;
	}
	

}
