package es.mde.entidades;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.stereotype.Component;

@Entity
//@EntityListeners(UsuarioNormalListener.class)
@DiscriminatorValue("UN")
@Component
public class UsuarioNormal extends Usuario {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "UNIDAD", nullable = false)
	private Unidad unidad;
	
	public UsuarioNormal() {}

	public Unidad getUnidad() {
		return unidad;
	}

	public void setUnidad(Unidad unidad) {
		this.unidad = unidad;
	}
}
