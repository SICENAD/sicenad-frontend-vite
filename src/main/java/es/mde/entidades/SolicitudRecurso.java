package es.mde.entidades;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Representa las solicitudes de recursos
 * 
 * @author JOSE LUIS PUENTES ALAMOS - MIGUEL PRADA MUNOZ
 *
 */
@Entity
@Table(name = "SOLICITUDES")
public class SolicitudRecurso {

	// **************************************
	// DATOS COMUNES A TODAS LAS SOLICITUDES
	// **************************************

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	private Long id;
	@Lob
	private String observaciones;
	@Lob
	private String observacionesCenad;
	private String jefeUnidadUsuaria;
	private String pocEjercicio;
	private String tlfnRedactor;
	private String estado; // Borrador, Solicitada, Rechazada, Validada, Cancelada
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
	private Date fechaSolicitud;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
	private Date fechaUltModSolicitud;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
	private Date fechaHoraInicioRecurso;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
	private Date fechaHoraFinRecurso;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
	private Date fechaFinDocumentacion;
	private String unidadUsuaria;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USUARIO_NORMAL")
	private UsuarioNormal usuarioNormal;
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Fichero.class, mappedBy = "solicitudRecursoCenad")
	private Collection<Fichero> documentacionCenad = new ArrayList<>();
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Fichero.class, mappedBy = "solicitudRecursoUnidad")
	private Collection<Fichero> documentacionUnidad = new ArrayList<>();
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RECURSO")
	private Recurso recurso;
	private String etiqueta;

	// *************************************
	// DATOS ESPECIFICOS DE LOS RECURSOS
	// *************************************

	// ZONA DE CAIDA DE PROYECTILES/EXPLOSIVOS

	private Boolean isConMunTrazadoraIluminanteFumigena;
	@OneToMany(cascade = CascadeType.ALL, targetEntity = SolicitudArma.class, mappedBy = "solicitud")
	private Collection<SolicitudArma> solicitudesArmas = new ArrayList<>();

	// CAMPO DE TIRO DE CARROS, VCI/C, PRECISICION

	private String tipoEjercicio;
	private String armaPral;
	private String armaPrpalNumDisparosPrev;
	private String armaSecund;
	private String armaSecundNumDisparosPrev;

	// CAMPO DE TIRO LASER (se han creado hasta 5 tipos de blancos para hacerlo
	// compatible con cualquier CENAD/CMT)

	private int numBlancosFijosA;
	private int numBlancosFijosB;
	private int numBlancosFijosC;
	private int numBlancosFijosD;
	private int numBlancosFijosE;
	private int numBlancosMovilesA;
	private int numBlancosMovilesB;
	private int numBlancosMovilesC;
	private int numBlancosMovilesD;
	private int numBlancosMovilesE;

	// CAMPO DE TIRO

	private String arma1CT;
	private String arma1CTlongitud;
	private String arma2CT;
	private String arma2CTlongitud;

	// CAMPO EXPLOSIVOS

	private String explosivo;

	// POLIGONO DE COMBATE EN ZONAS URBANAS
	// no tiene atributos específicos

	// COMBATE URBANO
	// no tiene atributos específicos

	// TORRE MULTIUSOS
	// no tiene atributos específicos

	// CASA 3 ALTURAS
	// no tiene atributos específicos

	// PISTA DE CONDUCCION TT/OBSTACULOS
	// no tiene atributos específicos

	// EJERCICIOS ZONA RESTRINGIDA

	private String actividad;

	// LOGISTICA
	// ACANTONAMIENTO/VIVAC

	private String vivac;

	// ZONA DE VIDA DE BATALLON

	private Boolean isConUsoCocina;
	private int numPersonasZVB;

	// ZONA DE ESPERA

	private int numPersonasZE;

	// LAVADEROS

	private int numVehCadenas;
	private int numVehRuedas;

	// SIMULACION REAL LASER

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss[.SSS][.SS][.S]")
	private Date fechaHoraMontaje;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss[.SSS][.SS][.S]")
	private Date fechaHoraDesmontaje;
	private int numSimuladores;
	private String usoEstacionSeg;

	// OTROS RECURSOS
	// no contiene atributos específicos
	private String otrosDatosEspecificos;

	/**
	 * Crea una solicitud
	 */
	public SolicitudRecurso() {
		super();
	}

	// *******************************************************
	// getters y setters DATOS COMUNES A TODAS LAS SOLICITUDES
	// *******************************************************

	/**
	 * Devuelve el Id de la solicitud
	 * 
	 * @return Devuelve el Id de la solicitud
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Guarda el Id de la solicitud
	 * 
	 * @param id Id de la solicitud
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Devuelve las observaciones de una solicitud
	 * 
	 * @return Devuelve las observaciones de una solicitud
	 */
	public String getObservaciones() {
		return observaciones;
	}

	/**
	 * Guarda las observaciones de una solicitud
	 * 
	 * @param observaciones Observaciones de la solicitud
	 */
	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	/**
	 * Devuelve el estado de la solicitud
	 * 
	 * @return Devuelve el estado de la solicitud
	 */
	public String getEstado() {
		return estado;
	}

	/**
	 * Guarda el estado de una solicitud
	 * 
	 * @param estado Estado de la solicitud
	 */
	public void setEstado(String estado) {
		this.estado = estado;
	}

	/**
	 * Devuelve el recurso que se solicita
	 * 
	 * @return Devuelve el recurso que se solicita
	 */
	public Recurso getRecurso() {
		return recurso;
	}

	/**
	 * Guarda el recurso de la solicitud
	 * 
	 * @param recurso Recurso solicitado
	 */
	public void setRecurso(Recurso recurso) {
		this.recurso = recurso;
	}

	/**
	 * Devuelve la fecha en la que se produce la solicitud
	 * 
	 * @return Devuelve la fecha en la que se produce la solicitud
	 */
	public Date getFechaSolicitud() {
		return fechaSolicitud;
	}

	/**
	 * Guarda la fecha en la que se produce la solicitud
	 * 
	 * @param fechaSolicitud Fecha en la que se produce la solicitud
	 */
	public void setFechaSolicitud(Date fechaSolicitud) {
		this.fechaSolicitud = fechaSolicitud;
	}

	/**
	 * Devuelve la fecha en la que se ha modificado la solicitud por ultima vez
	 * 
	 * @return Devuelve la fecha en la que se ha modificado la solicitud por ultima
	 *         vez
	 */
	public Date getFechaUltModSolicitud() {
		return fechaUltModSolicitud;
	}

	/**
	 * Guarda la fecha en la que se ha modificado la solicitud por ultima vez
	 * 
	 * @param fechaUltModSolicitud Fecha en la que se ha modificado la solicitud por
	 *                             ultima vez
	 */
	public void setFechaUltModSolicitud(Date fechaUltModSolicitud) {
		this.fechaUltModSolicitud = fechaUltModSolicitud;
	}

	/**
	 * Devuelve el usuario que realiza la solicitud
	 * 
	 * @return Devuelve el usuario que realiza la solicitud
	 */
	public UsuarioNormal getUsuarioNormal() {
		return usuarioNormal;
	}

	/**
	 * Guarda el usuario que realiza la solicitud
	 * 
	 * @param usuarioNormal Usuario que realiza la solicitud
	 */
	public void setUsuarioNormal(UsuarioNormal usuarioNormal) {
		this.usuarioNormal = usuarioNormal;
	}

	/**
	 * Devuelve los ficheros que adjunta el gestor del recurso
	 * 
	 * @return Devuelve los ficheros que adjunta el gestor del recurso
	 */
	public Collection<Fichero> getDocumentacionCenad() {
		return documentacionCenad;
	}

	/**
	 * Guarda los ficheros que adjunta el gestor del recurso
	 * 
	 * @param documentacionCenad Ficheros que adjunta el gestor del recurso
	 */
	public void setDocumentacionCenad(Collection<Fichero> documentacionCenad) {
		this.documentacionCenad = documentacionCenad;
	}

	/**
	 * Devuelve los ficheros que adjunta el usuario que solicita el recurso
	 * 
	 * @return Devuelve los ficheros que adjunta el usuario que solicita el recurso
	 */
	public Collection<Fichero> getDocumentacionUnidad() {
		return documentacionUnidad;
	}

	/**
	 * Guarda los ficheros que adjunta el usuario que solicita el recurso
	 * 
	 * @param documentacionUnidad Ficheros que adjunta el usuario que solicita el
	 *                            recurso
	 */
	public void setDocumentacionUnidad(Collection<Fichero> documentacionUnidad) {
		this.documentacionUnidad = documentacionUnidad;
	}

	/**
	 * Devuelve las observaciones que hace el CENAD a la solicitud
	 * 
	 * @return Devuelve las observaciones que hace el CENAD a la solicitud
	 */
	public String getObservacionesCenad() {
		return observacionesCenad;
	}

	/**
	 * Guarda las observaciones que hace el CENAD a la solicitud
	 * 
	 * @param observacionesCenad Observaciones que hace el CENAD a la solicitud
	 */
	public void setObservacionesCenad(String observacionesCenad) {
		this.observacionesCenad = observacionesCenad;
	}

	/**
	 * Devuelve el Jefe de la unidad que solicita el recurso
	 * 
	 * @return Devuelve el Jefe de la unidad que solicita el recurso
	 */
	public String getJefeUnidadUsuaria() {
		return jefeUnidadUsuaria;
	}

	/**
	 * Guarda el Jefe de la unidad que solicita el recurso
	 * 
	 * @param jefeUnidadUsuaria Jefe de la unidad que solicita el recurso
	 */
	public void setJefeUnidadUsuaria(String jefeUnidadUsuaria) {
		this.jefeUnidadUsuaria = jefeUnidadUsuaria;
	}

	/**
	 * Devuelve el POC del ejercicio asociado a la solicitud
	 * 
	 * @return Devuelve el POC del ejercicio asociado a la solicitud
	 */
	public String getPocEjercicio() {
		return pocEjercicio;
	}

	/**
	 * Guarda el POC del ejercicio asociado a la solicitud
	 * 
	 * @param pocEjercicio POC del ejercicio asociado a la solicitud
	 */
	public void setPocEjercicio(String pocEjercicio) {
		this.pocEjercicio = pocEjercicio;
	}

	/**
	 * Devuelve el telefono del redactor de la solicitud
	 * 
	 * @return Devuelve el telefono del redactor de la solicitud
	 */
	public String getTlfnRedactor() {
		return tlfnRedactor;
	}

	/**
	 * Guarda el telefono del redactor de la solicitud
	 * 
	 * @param tlfnRedactor Telefono del redactor de la solicitud
	 */
	public void setTlfnRedactor(String tlfnRedactor) {
		this.tlfnRedactor = tlfnRedactor;
	}

	/**
	 * Devuelve la fecha y hora del inicio de la actividad
	 * 
	 * @return Devuelve la fecha y hora del inicio de la actividad
	 */
	public Date getFechaHoraInicioRecurso() {
		return fechaHoraInicioRecurso;
	}

	/**
	 * Guarda la fecha y hora del inicio de la actividad
	 * 
	 * @param fechaHoraInicioRecurso Fecha y hora del inicio de la actividad
	 */
	public void setFechaHoraInicioRecurso(Date fechaHoraInicioRecurso) {
		this.fechaHoraInicioRecurso = fechaHoraInicioRecurso;
	}

	/**
	 * Devuelve la fecha y hora del fin de la actividad
	 * 
	 * @return Devuelve la fecha y hora del fin de la actividad
	 */
	public Date getFechaHoraFinRecurso() {
		return fechaHoraFinRecurso;
	}

	/**
	 * Guarda la fecha y hora del fin de la actividad
	 * 
	 * @param fechaHoraFinRecurso Fecha y hora del fin de la actividad
	 */
	public void setFechaHoraFinRecurso(Date fechaHoraFinRecurso) {
		this.fechaHoraFinRecurso = fechaHoraFinRecurso;
	}

	/**
	 * Devuelve la fecha maxima para adjuntar documentacion
	 * 
	 * @return Devuelve la fecha maxima para adjuntar documentacion
	 */
	public Date getFechaFinDocumentacion() {
		return fechaFinDocumentacion;
	}

	/**
	 * Guarda la fecha maxima para adjuntar documentacion
	 * 
	 * @param fechaFinDocumentacion Fecha maxima para adjuntar documentacion
	 */
	public void setFechaFinDocumentacion(Date fechaFinDocumentacion) {
		this.fechaFinDocumentacion = fechaFinDocumentacion;
	}

	/**
	 * Devuelve la unidad a la que pertenece el usuario que solicita el recurso
	 * 
	 * @return Devuelve la unidad a la que pertenece el usuario que solicita el
	 *         recurso
	 */
	public String getUnidadUsuaria() {
		return unidadUsuaria;
	}

	/**
	 * Guarda la unidad a la que pertenece el usuario que solicita el recurso
	 * 
	 * @param unidadUsuaria Unidad a la que pertenece el usuario que solicita el
	 *                      recurso
	 */
	public void setUnidadUsuaria(String unidadUsuaria) {
		this.unidadUsuaria = unidadUsuaria;
	}

	/**
	 * Devuelve la etiqueta de la solicitud
	 * 
	 * @return Devuelve la etiqueta de la solicitud
	 */
	public String getEtiqueta() {
		return etiqueta;
	}

	/**
	 * Guarda la etiqueta de la solicitud
	 * 
	 * @param etiqueta Etiqueta de la solicitud
	 */
	public void setEtiqueta(String etiqueta) {
		this.etiqueta = etiqueta;
	}

	public Collection<SolicitudArma> getSolicitudesArmas() {
		return solicitudesArmas;
	}

	public void setSolicitudesArmas(Collection<SolicitudArma> solicitudesArmas) {
		this.solicitudesArmas = solicitudesArmas;
	}

	// Establece la relacion en los dos sentidos
	/**
	 * Agrega un fichero a la solicitud
	 * 
	 * @param fichero Fichero agregado a la solicitud
	 */
	public void addDocumentacionCenad(Fichero fichero) {
		getDocumentacionCenad().add(fichero);
		fichero.setSolicitudRecursoCenad(this);
	}

	/**
	 * Agrega un fichero a la solicitud
	 * 
	 * @param fichero Fichero agregado a la solicitud
	 */
	public void addDocumentacionUnidad(Fichero fichero) {
		getDocumentacionUnidad().add(fichero);
		fichero.setSolicitudRecursoUnidad(this);

	}

	public void addSolicitudArma(SolicitudArma solicitudArma) {
		getSolicitudesArmas().add(solicitudArma);
		solicitudArma.setSolicitud(this);
	}

	// ***************************************************
	// getters y setters DATOS ESPECIFICOS DE LOS RECURSOS
	// ***************************************************

	public String getTipoEjercicio() {
		return tipoEjercicio;
	}

	public void setTipoEjercicio(String tipoEjercicio) {
		this.tipoEjercicio = tipoEjercicio;
	}

	public String getArmaPral() {
		return armaPral;
	}

	public void setArmaPral(String armaPral) {
		this.armaPral = armaPral;
	}

	public String getArmaPrpalNumDisparosPrev() {
		return armaPrpalNumDisparosPrev;
	}

	public void setArmaPrpalNumDisparosPrev(String armaPrpalNumDisparosPrev) {
		this.armaPrpalNumDisparosPrev = armaPrpalNumDisparosPrev;
	}

	public String getArmaSecund() {
		return armaSecund;
	}

	public void setArmaSecund(String armaSecund) {
		this.armaSecund = armaSecund;
	}

	public String getArmaSecundNumDisparosPrev() {
		return armaSecundNumDisparosPrev;
	}

	public void setArmaSecundNumDisparosPrev(String armaSecundNumDisparosPrev) {
		this.armaSecundNumDisparosPrev = armaSecundNumDisparosPrev;
	}

	public int getNumBlancosFijosA() {
		return numBlancosFijosA;
	}

	public void setNumBlancosFijosA(int numBlancosFijosA) {
		this.numBlancosFijosA = numBlancosFijosA;
	}

	public int getNumBlancosFijosB() {
		return numBlancosFijosB;
	}

	public void setNumBlancosFijosB(int numBlancosFijosB) {
		this.numBlancosFijosB = numBlancosFijosB;
	}

	public int getNumBlancosFijosC() {
		return numBlancosFijosC;
	}

	public void setNumBlancosFijosC(int numBlancosFijosC) {
		this.numBlancosFijosC = numBlancosFijosC;
	}

	public int getNumBlancosFijosD() {
		return numBlancosFijosD;
	}

	public void setNumBlancosFijosD(int numBlancosFijosD) {
		this.numBlancosFijosD = numBlancosFijosD;
	}

	public int getNumBlancosFijosE() {
		return numBlancosFijosE;
	}

	public void setNumBlancosFijosE(int numBlancosFijosE) {
		this.numBlancosFijosE = numBlancosFijosE;
	}

	public int getNumBlancosMovilesA() {
		return numBlancosMovilesA;
	}

	public void setNumBlancosMovilesA(int numBlancosMovilesA) {
		this.numBlancosMovilesA = numBlancosMovilesA;
	}

	public int getNumBlancosMovilesB() {
		return numBlancosMovilesB;
	}

	public void setNumBlancosMovilesB(int numBlancosMovilesB) {
		this.numBlancosMovilesB = numBlancosMovilesB;
	}

	public int getNumBlancosMovilesC() {
		return numBlancosMovilesC;
	}

	public void setNumBlancosMovilesC(int numBlancosMovilesC) {
		this.numBlancosMovilesC = numBlancosMovilesC;
	}

	public int getNumBlancosMovilesD() {
		return numBlancosMovilesD;
	}

	public void setNumBlancosMovilesD(int numBlancosMovilesD) {
		this.numBlancosMovilesD = numBlancosMovilesD;
	}

	public int getNumBlancosMovilesE() {
		return numBlancosMovilesE;
	}

	public void setNumBlancosMovilesE(int numBlancosMovilesE) {
		this.numBlancosMovilesE = numBlancosMovilesE;
	}

	public String getArma1CT() {
		return arma1CT;
	}

	public void setArma1CT(String arma1ct) {
		arma1CT = arma1ct;
	}

	public String getArma1CTlongitud() {
		return arma1CTlongitud;
	}

	public void setArma1CTlongitud(String arma1cTlongitud) {
		arma1CTlongitud = arma1cTlongitud;
	}

	public String getArma2CT() {
		return arma2CT;
	}

	public void setArma2CT(String arma2ct) {
		arma2CT = arma2ct;
	}

	public String getArma2CTlongitud() {
		return arma2CTlongitud;
	}

	public void setArma2CTlongitud(String arma2cTlongitud) {
		arma2CTlongitud = arma2cTlongitud;
	}

	public String getExplosivo() {
		return explosivo;
	}

	public void setExplosivo(String explosivo) {
		this.explosivo = explosivo;
	}

	public String getActividad() {
		return actividad;
	}

	public void setActividad(String actividad) {
		this.actividad = actividad;
	}

	public String getVivac() {
		return vivac;
	}

	public void setVivac(String vivac) {
		this.vivac = vivac;
	}

	public int getNumVehCadenas() {
		return numVehCadenas;
	}

	public void setNumVehCadenas(int numVehCadenas) {
		this.numVehCadenas = numVehCadenas;
	}

	public int getNumVehRuedas() {
		return numVehRuedas;
	}

	public void setNumVehRuedas(int numVehRuedas) {
		this.numVehRuedas = numVehRuedas;
	}

	public Date getFechaHoraMontaje() {
		return fechaHoraMontaje;
	}

	public void setFechaHoraMontaje(Date fechaHoraMontaje) {
		this.fechaHoraMontaje = fechaHoraMontaje;
	}

	public Date getFechaHoraDesmontaje() {
		return fechaHoraDesmontaje;
	}

	public void setFechaHoraDesmontaje(Date fechaHoraDesmontaje) {
		this.fechaHoraDesmontaje = fechaHoraDesmontaje;
	}

	public int getNumSimuladores() {
		return numSimuladores;
	}

	public void setNumSimuladores(int numSimuladores) {
		this.numSimuladores = numSimuladores;
	}

	public String getUsoEstacionSeg() {
		return usoEstacionSeg;
	}

	public void setUsoEstacionSeg(String usoEstacionSeg) {
		this.usoEstacionSeg = usoEstacionSeg;
	}

	public Boolean isConMunTrazadoraIluminanteFumigena() {
		return isConMunTrazadoraIluminanteFumigena;
	}

	public void setIsConMunTrazadoraIluminanteFumigena(Boolean isConMunTrazadoraIluminanteFumigena) {
		this.isConMunTrazadoraIluminanteFumigena = isConMunTrazadoraIluminanteFumigena;
	}

	public Boolean isConUsoCocina() {
		return isConUsoCocina;
	}

	public void setIsConUsoCocina(Boolean isConUsoCocina) {
		this.isConUsoCocina = isConUsoCocina;
	}

	public int getNumPersonasZVB() {
		return numPersonasZVB;
	}

	public void setNumPersonasZVB(int numPersonasZVB) {
		this.numPersonasZVB = numPersonasZVB;
	}

	public int getNumPersonasZE() {
		return numPersonasZE;
	}

	public void setNumPersonasZE(int numPersonasZE) {
		this.numPersonasZE = numPersonasZE;
	}

	/**
	 * Devuelve otros datos especificos de la solicitud
	 * 
	 * @return Devuelve otros datos especificos de la solicitud
	 */

	public String getOtrosDatosEspecificos() {
		return otrosDatosEspecificos;
	}

	/**
	 * Guarda otros datos especificos de la solicitud
	 * 
	 * @param otrosDatosEspecificos Otros datos especificos de la solicitud
	 */

	public void setOtrosDatosEspecificos(String otrosDatosEspecificos) {
		this.otrosDatosEspecificos = otrosDatosEspecificos;
	}

}
