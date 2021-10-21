package es.mde.entidades;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import org.springframework.stereotype.Component;

@Entity
@DiscriminatorValue("UN")
@Component
public class UsuarioNormal extends Usuario {
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "UNIDAD")
	private Unidad unidad;
	@OneToMany(cascade = CascadeType.ALL, targetEntity = SolicitudRecurso.class, mappedBy = "usuarioNormal")
	private Collection<SolicitudRecurso> solicitudes = new ArrayList<>();
	
	public UsuarioNormal() {}

	public Unidad getUnidad() {
		return unidad;
	}

	public void setUnidad(Unidad unidad) {
		this.unidad = unidad;
	}
	
	public Collection<SolicitudRecurso> getSolicitudes() {
		return solicitudes;
	}

	public void setSolicitudes(Collection<SolicitudRecurso> solicitudes) {
		this.solicitudes = solicitudes;
	}

	// Establece la relacion en los dos sentidos
	public void addSolicitudes(SolicitudRecurso solicitud) {
		getSolicitudes().add(solicitud);
		solicitud.setUsuarioNormal(this);
	}
}