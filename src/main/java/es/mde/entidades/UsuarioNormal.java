package es.mde.entidades;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import org.springframework.stereotype.Component;

@Entity
//@EntityListeners(UsuarioNormalListener.class)
@DiscriminatorValue("UN")
@Component
public class UsuarioNormal extends Usuario {

	private String unidad;
	
	public UsuarioNormal() {}

	public String getUnidad() {
		return unidad;
	}

	public void setUnidad(String unidad) {
		this.unidad = unidad;
	}
}
