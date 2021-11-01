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

/**
 * Representa a los usuarios de "unidades" que soliciten recursos...
 * @author JOSE LUIS PUENTES ÁLAMOS - MIGUEL PRADA MUÑOZ
 *
 */
@Entity
@DiscriminatorValue("UN")
@Component
public class UsuarioNormal extends Usuario {
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "UNIDAD")
	private Unidad unidad;
	@OneToMany(cascade = CascadeType.ALL, targetEntity = SolicitudRecurso.class, mappedBy = "usuarioNormal")
	private Collection<SolicitudRecurso> solicitudes = new ArrayList<>();
	
	/**
	 * Crea un usuario normal
	 */
	public UsuarioNormal() {}

	/**
	 * Devuelve la unidad a la que pertenece el usuario
	 * @return Devuelve la unidad a la que pertenece el usuario
	 */
	public Unidad getUnidad() {
		return unidad;
	}

	/**
	 * Guarda la unidad del usuario
	 * @param unidad Unidad a la que pertenece el usuario
	 */
	public void setUnidad(Unidad unidad) {
		this.unidad = unidad;
	}
	
	/**
	 * Devuelve las solicitudes que ha generado ese usuario
	 * @return Devuelve las solicitudes que ha generado ese usuario
	 */
	public Collection<SolicitudRecurso> getSolicitudes() {
		return solicitudes;
	}

	/**
	 * Guarda las solicitudes generadas por un usuario
	 * @param solicitudes Solicitudes generadas por el usuario
	 */
	public void setSolicitudes(Collection<SolicitudRecurso> solicitudes) {
		this.solicitudes = solicitudes;
	}

	// Establece la relacion en los dos sentidos
	/**
	 * Agrega una solicitud al usuario
	 * @param solicitud Solicitud agregada
	 */
	public void addSolicitudes(SolicitudRecurso solicitud) {
		getSolicitudes().add(solicitud);
		solicitud.setUsuarioNormal(this);
	}
}