package es.mde.entidades;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "SOLICITUDES_ARMAS")
public class SolicitudArma {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	private Long id;
	private String coordAsentamiento;
	private String coordPuntoCaida;
	private String alcanceMax;
	private String zonaSegAngulo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ARMA")
	private Arma arma;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOLICITUD")
	private SolicitudRecurso solicitud;

	public SolicitudArma() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Arma getArma() {
		return arma;
	}

	public void setArma(Arma arma) {
		this.arma = arma;
	}

	public SolicitudRecurso getSolicitud() {
		return solicitud;
	}

	public void setSolicitud(SolicitudRecurso solicitud) {
		this.solicitud = solicitud;
	}

}
