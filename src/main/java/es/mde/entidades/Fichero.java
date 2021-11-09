package es.mde.entidades;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Representa la entidad que controla los archivos adjuntos
 * 
 * @author JOSE LUIS PUENTES ALAMOS - MIGUEL PRADA MUNOZ
 *
 */
@Entity
@Table(name = "FICHEROS")
public class Fichero {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	private Long id;
	private String nombre;
	private String nombreArchivo;
	@Lob
	private String descripcion;
	private String imagen; // campo no usado
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CATEGORIA_FICHERO", nullable = false)
	private CategoriaFichero categoriaFichero;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RECURSO")
	private Recurso recurso;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOLICITUDRECURSO_CENAD")
	private SolicitudRecurso solicitudRecursoCenad;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SOLICITUDRECURSO_UNIDAD")
	private SolicitudRecurso solicitudRecursoUnidad;

	/**
	 * Crea un fichero
	 */
	public Fichero() {
	}

	/**
	 * Devuelve el Id de un fichero
	 * 
	 * @return Devuelve el Id de un fichero
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Guarda el id de un fichero
	 * 
	 * @param id Id del fichero
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Devuelve el nombre del fichero
	 * 
	 * @return Devuelve el nombre del fichero
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * Guarda el nombre del fichero
	 * 
	 * @param nombre Nombre del fichero
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	/**
	 * Devuelve el nombre del archivo del fichero
	 * 
	 * @return Devuelve el nombre del archivo del fichero
	 */
	public String getNombreArchivo() {
		return nombreArchivo;
	}

	/**
	 * Guarda el nombre del archivo del fichero
	 * 
	 * @param nombreArchivo Nombre del archivo del fichero
	 */
	public void setNombreArchivo(String nombreArchivo) {
		this.nombreArchivo = nombreArchivo;
	}

	/**
	 * Devuelve la descripcion del fichero
	 * 
	 * @return Devuelve la descripcion del fichero
	 */
	public String getDescripcion() {
		return descripcion;
	}

	/**
	 * Guarda la descripcion del fichero
	 * 
	 * @param descripcion Descripcion del fichero
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	// campo no usado
	public String getImagen() {
		return imagen;
	}

	// campo no usado
	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	/**
	 * Devuelve la categoria de fichero
	 * 
	 * @return Devuelve la categoria del fichero
	 */
	public CategoriaFichero getCategoriaFichero() {
		return categoriaFichero;
	}

	/**
	 * Guarda la categoria del fichero
	 * 
	 * @param categoriaFichero Tipo de fichero
	 */
	public void setCategoriaFichero(CategoriaFichero categoriaFichero) {
		this.categoriaFichero = categoriaFichero;
	}

	/**
	 * Devuelve el recurso al que pertenece el fichero
	 * 
	 * @return Devuelve el recurso al que pertenece el fichero
	 */
	public Recurso getRecurso() {
		return recurso;
	}

	/**
	 * Guarda el recurso al que pertenece el fichero
	 * 
	 * @param recurso Recurso al que pertenece el fichero
	 */
	public void setRecurso(Recurso recurso) {
		this.recurso = recurso;
	}

	/**
	 * Devuelve la solicitudRecurso al que pertenece el fichero
	 * 
	 * @return solicitudRecurso
	 */
	public SolicitudRecurso getSolicitudRecursoCenad() {
		return solicitudRecursoCenad;
	}
	
	/**
	 * Guarda la solicitudRecurso a la que pertenece el fichero
	 * 
	 * @param solicitudRecursoCenad
	 */
	public void setSolicitudRecursoCenad(SolicitudRecurso solicitudRecursoCenad) {
		this.solicitudRecursoCenad = solicitudRecursoCenad;
	}

	
	/**
	 * Devuelve la solicitudRecurso al que pertenece el fichero
	 * 
	 * @return solicitudRecurso
	 */
	public SolicitudRecurso getSolicitudRecursoUnidad() {
		return solicitudRecursoUnidad;
	}

	/**
	 * Guarda la solicitudRecurso a la que pertenece el fichero
	 * 
	 * @param solicitudRecursoUnidad
	 */
	public void setSolicitudRecursoUnidad(SolicitudRecurso solicitudRecursoUnidad) {
		this.solicitudRecursoUnidad = solicitudRecursoUnidad;
	}

}