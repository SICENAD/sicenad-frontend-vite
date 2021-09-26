package es.mde.entidades;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import org.springframework.stereotype.Component;

@Entity
//@EntityListeners(UsuarioAdministradorListener.class)
@DiscriminatorValue("US")
@Component
public class UsuarioSuperadministrador extends Usuario {

	public UsuarioSuperadministrador() {}

}
