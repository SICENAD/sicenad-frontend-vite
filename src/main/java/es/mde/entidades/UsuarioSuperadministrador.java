package es.mde.entidades;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import org.springframework.stereotype.Component;

@Entity
@DiscriminatorValue("US")
@Component
public class UsuarioSuperadministrador extends Usuario {
	public UsuarioSuperadministrador() {}
}