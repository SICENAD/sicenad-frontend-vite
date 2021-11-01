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
 * @author JOSE LUIS PUENTES ÁLAMOS - MIGUEL PRADA MUÑOZ
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

	private String zonaCaida;
	private Boolean conMunTrazadoraIluminanteFumigena;
	private String arma1ZC;
	private String arma1ZCAsentamiento;
	private String arma1ZCCoordAsentamiento;
	private String arma1ZCCoordPuntoCaida;
	private String arma1ZCAlturaMax;
	private String arma2ZC;
	private String arma2ZCAsentamiento;
	private String arma2ZCCoordAsentamiento;
	private String arma2ZCCoordPuntoCaida;
	private String arma2ZCAlturaMax;
	private String arma3ZC;
	private String arma3ZCAsentamiento;
	private String arma3ZCCoordAsentamiento;
	private String arma3ZCCoordPuntoCaida;
	private String arma3ZCAlturaMax;

	// COMUNES CAMPO DE TIRO

	private String campoTiro;

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

	// CAMPO DE TIRO/EXPLOSIVOS

	private String arma1CT;
	private String arma1CTlongitud;
	private String arma1CTalturaMax;
	private String arma2CT;
	private String arma2CTlongitud;
	private String arma2CTalturaMax;
	private String arma3CT;
	private String arma3CTlongitud;
	private String arma3CTalturaMax;

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
	// COMUNES

	private int numPersonas; // Zona de vida de Batallón y Zona de Espera

	// ACANTONAMIENTO/VIVAC

	private String vivac;
	private String vivacCoord;

	// ZONA DE VIDA DE BATALLON

	private Boolean conUsoCocina;

	// ZONA DE ESPERA
	// no contiene atributos específicos

	// LAVADEROS

	private int numVehCadenas;
	private int numVehRuedas;

	// SIMULACION REAL LASER

	private String tipoSimulador;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss[.SSS][.SS][.S]")
	private Date fechaHoraMontaje;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss[.SSS][.SS][.S]")
	private Date fechaHoraDesmontaje;
	private int numSimuladores;
	private String usoEstacionSeg;

	// PETICION DATOS LOGISTICOS DE ACTIVADES A REALIZAR EN BASE
	// DOCUMENTACION
	// RELACION DE PERSONAL, ARMAMENTO Y MATERIAL

	private int ofGral;
	private int coronel;
	private int oficiales;
	private int suboficiales;
	private int tropa;
	private int reservistas;
	private int civiles;
	private int totalPersonal;
	private int carrosComate;
	private int vcrr;
	private int vci_vec;
	private int piezas_aca;
	private int piezas_aaa;
	private int otrosArmamentoPral;
	private int totalArmamentoPral;
	private int blindadosCadenas;
	private int blindadosRuedas;
	private int pesadosRuedas;
	private int ligerosRuedas;
	private int motos;
	private int otrosVehiculos;
	private int totalVehiculos;

	// PARTE NOVEDADES DEL USO DE RECURSOS
	// no contiene atributos específicos

	// ENVIO PUBLICACION NOTAM

	private String notamRef;
	private String notamAlturaMax;

	// OTROS RECURSOS
	// no contiene atributos específicos

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

	// Establece la relacion en los dos sentidos
	/**
	 * Agrega un fichero a la solicitud
	 * @param fichero Fichero agregado a la solicitud
	 */
	public void addDocumentacionCenad(Fichero fichero) {
		getDocumentacionCenad().add(fichero);
	}

	/**
	 * Agrega un fichero a la solicitud
	 * @param fichero Fichero agregado a la solicitud
	 */
	public void addDocumentacionUnidad(Fichero fichero) {
		getDocumentacionUnidad().add(fichero);
	}

	// ***************************************************
	// getters y setters DATOS ESPECIFICOS DE LOS RECURSOS
	// ***************************************************

	public String getZonaCaida() {
		return zonaCaida;
	}

	public void setZonaCaida(String zonaCaida) {
		this.zonaCaida = zonaCaida;
	}

	public Boolean isConMunTrazadoraIluminanteFumigena() {
		return conMunTrazadoraIluminanteFumigena;
	}

	public void setConMunTrazadoraIluminanteFumigena(Boolean conMunTrazadoraIluminanteFumigena) {
		this.conMunTrazadoraIluminanteFumigena = conMunTrazadoraIluminanteFumigena;
	}

	public String getArma1ZC() {
		return arma1ZC;
	}

	public void setArma1ZC(String arma1zc) {
		arma1ZC = arma1zc;
	}

	public String getArma1ZCAsentamiento() {
		return arma1ZCAsentamiento;
	}

	public void setArma1ZCAsentamiento(String arma1zcAsentamiento) {
		arma1ZCAsentamiento = arma1zcAsentamiento;
	}

	public String getArma1ZCCoordAsentamiento() {
		return arma1ZCCoordAsentamiento;
	}

	public void setArma1ZCCoordAsentamiento(String arma1zcCoordAsentamiento) {
		arma1ZCCoordAsentamiento = arma1zcCoordAsentamiento;
	}

	public String getArma1ZCCoordPuntoCaida() {
		return arma1ZCCoordPuntoCaida;
	}

	public void setArma1ZCCoordPuntoCaida(String arma1zcCoordPuntoCaida) {
		arma1ZCCoordPuntoCaida = arma1zcCoordPuntoCaida;
	}

	public String getArma1ZCAlturaMax() {
		return arma1ZCAlturaMax;
	}

	public void setArma1ZCAlturaMax(String arma1zcAlturaMax) {
		arma1ZCAlturaMax = arma1zcAlturaMax;
	}

	public String getArma2ZC() {
		return arma2ZC;
	}

	public void setArma2ZC(String arma2zc) {
		arma2ZC = arma2zc;
	}

	public String getArma2ZCAsentamiento() {
		return arma2ZCAsentamiento;
	}

	public void setArma2ZCAsentamiento(String arma2zcAsentamiento) {
		arma2ZCAsentamiento = arma2zcAsentamiento;
	}

	public String getArma2ZCCoordAsentamiento() {
		return arma2ZCCoordAsentamiento;
	}

	public void setArma2ZCCoordAsentamiento(String arma2zcCoordAsentamiento) {
		arma2ZCCoordAsentamiento = arma2zcCoordAsentamiento;
	}

	public String getArma2ZCCoordPuntoCaida() {
		return arma2ZCCoordPuntoCaida;
	}

	public void setArma2ZCCoordPuntoCaida(String arma2zcCoordPuntoCaida) {
		arma2ZCCoordPuntoCaida = arma2zcCoordPuntoCaida;
	}

	public String getArma2ZCAlturaMax() {
		return arma2ZCAlturaMax;
	}

	public void setArma2ZCAlturaMax(String arma2zcAlturaMax) {
		arma2ZCAlturaMax = arma2zcAlturaMax;
	}

	public String getArma3ZC() {
		return arma3ZC;
	}

	public void setArma3ZC(String arma3zc) {
		arma3ZC = arma3zc;
	}

	public String getArma3ZCAsentamiento() {
		return arma3ZCAsentamiento;
	}

	public void setArma3ZCAsentamiento(String arma3zcAsentamiento) {
		arma3ZCAsentamiento = arma3zcAsentamiento;
	}

	public String getArma3ZCCoordAsentamiento() {
		return arma3ZCCoordAsentamiento;
	}

	public void setArma3ZCCoordAsentamiento(String arma3zcCoordAsentamiento) {
		arma3ZCCoordAsentamiento = arma3zcCoordAsentamiento;
	}

	public String getArma3ZCCoordPuntoCaida() {
		return arma3ZCCoordPuntoCaida;
	}

	public void setArma3ZCCoordPuntoCaida(String arma3zcCoordPuntoCaida) {
		arma3ZCCoordPuntoCaida = arma3zcCoordPuntoCaida;
	}

	public String getArma3ZCAlturaMax() {
		return arma3ZCAlturaMax;
	}

	public void setArma3ZCAlturaMax(String arma3zcAlturaMax) {
		arma3ZCAlturaMax = arma3zcAlturaMax;
	}

	public String getCampoTiro() {
		return campoTiro;
	}

	public void setCampoTiro(String campoTiro) {
		this.campoTiro = campoTiro;
	}

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

	public String getArma1CTalturaMax() {
		return arma1CTalturaMax;
	}

	public void setArma1CTalturaMax(String arma1cTalturaMax) {
		arma1CTalturaMax = arma1cTalturaMax;
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

	public String getArma2CTalturaMax() {
		return arma2CTalturaMax;
	}

	public void setArma2CTalturaMax(String arma2cTalturaMax) {
		arma2CTalturaMax = arma2cTalturaMax;
	}

	public String getArma3CT() {
		return arma3CT;
	}

	public void setArma3CT(String arma3ct) {
		arma3CT = arma3ct;
	}

	public String getArma3CTlongitud() {
		return arma3CTlongitud;
	}

	public void setArma3CTlongitud(String arma3cTlongitud) {
		arma3CTlongitud = arma3cTlongitud;
	}

	public String getArma3CTalturaMax() {
		return arma3CTalturaMax;
	}

	public void setArma3CTalturaMax(String arma3cTalturaMax) {
		arma3CTalturaMax = arma3cTalturaMax;
	}

	public String getActividad() {
		return actividad;
	}

	public void setActividad(String actividad) {
		this.actividad = actividad;
	}

	public int getNumPersonas() {
		return numPersonas;
	}

	public void setNumPersonas(int numPersonas) {
		this.numPersonas = numPersonas;
	}

	public String getVivac() {
		return vivac;
	}

	public void setVivac(String vivac) {
		this.vivac = vivac;
	}

	public String getVivacCoord() {
		return vivacCoord;
	}

	public void setVivacCoord(String vivacCoord) {
		this.vivacCoord = vivacCoord;
	}

	public Boolean isConUsoCocina() {
		return conUsoCocina;
	}

	public void setConUsoCocina(Boolean conUsoCocina) {
		this.conUsoCocina = conUsoCocina;
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

	public String getTipoSimulador() {
		return tipoSimulador;
	}

	public void setTipoSimulador(String tipoSimulador) {
		this.tipoSimulador = tipoSimulador;
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

	public int getOfGral() {
		return ofGral;
	}

	public void setOfGral(int ofGral) {
		this.ofGral = ofGral;
	}

	public int getCoronel() {
		return coronel;
	}

	public void setCoronel(int coronel) {
		this.coronel = coronel;
	}

	public int getOficiales() {
		return oficiales;
	}

	public void setOficiales(int oficiales) {
		this.oficiales = oficiales;
	}

	public int getSuboficiales() {
		return suboficiales;
	}

	public void setSuboficiales(int suboficiales) {
		this.suboficiales = suboficiales;
	}

	public int getTropa() {
		return tropa;
	}

	public void setTropa(int tropa) {
		this.tropa = tropa;
	}

	public int getReservistas() {
		return reservistas;
	}

	public void setReservistas(int reservistas) {
		this.reservistas = reservistas;
	}

	public int getCiviles() {
		return civiles;
	}

	public void setCiviles(int civiles) {
		this.civiles = civiles;
	}

	public int getTotalPersonal() {
		return totalPersonal;
	}

	public void setTotalPersonal(int totalPersonal) {
		this.totalPersonal = totalPersonal;
	}

	public int getCarrosComate() {
		return carrosComate;
	}

	public void setCarrosComate(int carrosComate) {
		this.carrosComate = carrosComate;
	}

	public int getVcrr() {
		return vcrr;
	}

	public void setVcrr(int vcrr) {
		this.vcrr = vcrr;
	}

	public int getVci_vec() {
		return vci_vec;
	}

	public void setVci_vec(int vci_vec) {
		this.vci_vec = vci_vec;
	}

	public int getPiezas_aca() {
		return piezas_aca;
	}

	public void setPiezas_aca(int piezas_aca) {
		this.piezas_aca = piezas_aca;
	}

	public int getPiezas_aaa() {
		return piezas_aaa;
	}

	public void setPiezas_aaa(int piezas_aaa) {
		this.piezas_aaa = piezas_aaa;
	}

	public int getOtrosArmamentoPral() {
		return otrosArmamentoPral;
	}

	public void setOtrosArmamentoPral(int otrosArmamentoPral) {
		this.otrosArmamentoPral = otrosArmamentoPral;
	}

	public int getTotalArmamentoPral() {
		return totalArmamentoPral;
	}

	public void setTotalArmamentoPral(int totalArmamentoPral) {
		this.totalArmamentoPral = totalArmamentoPral;
	}

	public int getBlindadosCadenas() {
		return blindadosCadenas;
	}

	public void setBlindadosCadenas(int blindadosCadenas) {
		this.blindadosCadenas = blindadosCadenas;
	}

	public int getBlindadosRuedas() {
		return blindadosRuedas;
	}

	public void setBlindadosRuedas(int blindadosRuedas) {
		this.blindadosRuedas = blindadosRuedas;
	}

	public int getPesadosRuedas() {
		return pesadosRuedas;
	}

	public void setPesadosRuedas(int pesadosRuedas) {
		this.pesadosRuedas = pesadosRuedas;
	}

	public int getLigerosRuedas() {
		return ligerosRuedas;
	}

	public void setLigerosRuedas(int ligerosRuedas) {
		this.ligerosRuedas = ligerosRuedas;
	}

	public int getMotos() {
		return motos;
	}

	public void setMotos(int motos) {
		this.motos = motos;
	}

	public int getOtrosVehiculos() {
		return otrosVehiculos;
	}

	public void setOtrosVehiculos(int otrosVehiculos) {
		this.otrosVehiculos = otrosVehiculos;
	}

	public int getTotalVehiculos() {
		return totalVehiculos;
	}

	public void setTotalVehiculos(int totalVehiculos) {
		this.totalVehiculos = totalVehiculos;
	}

	public String getNotamRef() {
		return notamRef;
	}

	public void setNotamRef(String notamRef) {
		this.notamRef = notamRef;
	}

	public String getNotamAlturaMax() {
		return notamAlturaMax;
	}

	public void setNotamAlturaMax(String notamAlturaMax) {
		this.notamAlturaMax = notamAlturaMax;
	}
}
