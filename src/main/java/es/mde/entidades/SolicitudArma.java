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

/**
 * Representa un conjunto SOLICITUD-ARMA (es la tabla intermedia que se crea en la relación Many to Many entre ARMA y SOLICITUD)
 * @author JOSE LUIS PUENTES ALAMOS - MIGUEL PRADA MUNOZ
 *
 */
@Entity
@Table(name = "SOLICITUDES_ARMAS")
public class SolicitudArma {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	private Long id;
	private int coordAsentamiento;
	private int coordPuntoCaida;
	private int alcanceMax;
	private int zonaSegAngulo;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ARMA")
	private Arma arma;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOLICITUD")
	private SolicitudRecurso solicitud;

	/**
	 * Crea un "par" SOLICITUD-ARMA, para la relación Many to Many entre ambas
	 */
	public SolicitudArma() {
		super();
	}

	/**
	 * Devuelve el id del "par" SOLICITUD-ARMA
	 * @return Devuelve el id del "par" SOLICITUD-ARMA
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Guarda el id del "par" SOLICITUD-ARMA
	 * @param id Id del "par" SOLICITUD-ARMA
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Devuelve las coordenadas del asentamiento del "par" SOLICITUD-ARMA
	 * @return Devuelve las coordenadas del asentamiento del "par" SOLICITUD-ARMA
	 */
	public int getCoordAsentamiento() {
		return coordAsentamiento;
	}

	/**
	 * Guarda las coordenadas del asentamiento del "par" SOLICITUD-ARMA
	 * @param coordAsentamiento Coordenadas del asentamiento del "par" SOLICITUD-ARMA
	 */
	public void setCoordAsentamiento(int coordAsentamiento) {
		this.coordAsentamiento = coordAsentamiento;
	}

	/**
	 * Devuelve las coordenadas del punto de caída del "par" SOLICITUD-ARMA
	 * @return Devuelve las coordenadas del punto de caída del "par" SOLICITUD-ARMA
	 */
	public int getCoordPuntoCaida() {
		return coordPuntoCaida;
	}

	/**
	 * Guarda las coordenadas del punto de caída del "par" SOLICITUD-ARMA
	 * @param coordPuntoCaida Coordenadas del punto de caída del "par" SOLICITUD-ARMA
	 */
	public void setCoordPuntoCaida(int coordPuntoCaida) {
		this.coordPuntoCaida = coordPuntoCaida;
	}

	/**
	 * Devuelve el alcance máximo del "par" SOLICITUD-ARMA
	 * @return Devuelve el alcance máximo del "par" SOLICITUD-ARMA
	 */
	public int getAlcanceMax() {
		return alcanceMax;
	}

	/**
	 * Guarda el alcance máximo del "par" SOLICITUD-ARMA
	 * @param alcanceMax Alcance máximo del "par" SOLICITUD-ARMA
	 */
	public void setAlcanceMax(int alcanceMax) {
		this.alcanceMax = alcanceMax;
	}

	/**
	 * Devuelve el ángulo de la zona de seguridad del "par" SOLICITUD-ARMA
	 * @return Devuelve el ángulo de la zona de seguridad del "par" SOLICITUD-ARMA
	 */
	public int getZonaSegAngulo() {
		return zonaSegAngulo;
	}

	/**
	 * Guarda el ángulo de la zona de seguridad del "par" SOLICITUD-ARMA
	 * @param zonaSegAngulo Ángulo de la zona de seguridad del "par" SOLICITUD-ARMA
	 */
	public void setZonaSegAngulo(int zonaSegAngulo) {
		this.zonaSegAngulo = zonaSegAngulo;
	}

	/**
	 * Devuelve el arma del "par" SOLICITUD-ARMA
	 * @return Devuelve el arma del "par" SOLICITUD-ARMA
	 */
	public Arma getArma() {
		return arma;
	}

	/**
	 * Guarda el arma del "par" SOLICITUD-ARMA
	 * @param arma Arma del "par" SOLICITUD-ARMA
	 */
	public void setArma(Arma arma) {
		this.arma = arma;
	}

	/**
	 * Devuelve la solicitud del "par" SOLICITUD-ARMA
	 * @return Devuelve la solicitud del "par" SOLICITUD-ARMA
	 */
	public SolicitudRecurso getSolicitud() {
		return solicitud;
	}

	/**
	 * Guarda la solicitud del "par" SOLICITUD-ARMA
	 * @param solicitud Solicitud del "par" SOLICITUD-ARMA
	 */
	public void setSolicitud(SolicitudRecurso solicitud) {
		this.solicitud = solicitud;
	}
}