package es.mde.entidades;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "ARMAS")
public class Arma {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	private Long id;
	private String nombre;
	private String tipoTiro;
	private String coordAsentamiento;
	private String coordPuntoCaida;
	private String alcanceMax;
	private String zonaSegAngulo;
	@ManyToMany(mappedBy = "armas")
	private Collection<SolicitudRecurso> solicitudes;

	public Arma() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getTipoTiro() {
		return tipoTiro;
	}

	public void setTipoTiro(String tipoTiro) {
		this.tipoTiro = tipoTiro;
	}

	public String getCoordAsentamiento() {
		return coordAsentamiento;
	}

	public void setCoordAsentamiento(String coordAsentamiento) {
		this.coordAsentamiento = coordAsentamiento;
	}

	public String getCoordPuntoCaida() {
		return coordPuntoCaida;
	}

	public void setCoordPuntoCaida(String coordPuntoCaida) {
		this.coordPuntoCaida = coordPuntoCaida;
	}

	public String getAlcanceMax() {
		return alcanceMax;
	}

	public void setAlcanceMax(String alcanceMax) {
		this.alcanceMax = alcanceMax;
	}

	public String getZonaSegAngulo() {
		return zonaSegAngulo;
	}

	public void setZonaSegAngulo(String zonaSegAngulo) {
		this.zonaSegAngulo = zonaSegAngulo;
	}

	public Collection<SolicitudRecurso> getSolicitudes() {
		return solicitudes;
	}

	public void setSolicitudes(Collection<SolicitudRecurso> solicitudes) {
		this.solicitudes = solicitudes;
	}

	public void addSolicitud(SolicitudRecurso solicitud) {
		getSolicitudes().add(solicitud);
		solicitud.getArmas().add(this);
	}

}
