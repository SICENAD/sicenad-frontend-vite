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
//@EntityListeners(FicheroListener.class)
@Table(name = "FICHEROS")
public class Fichero {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	private Long id;
	private String nombre;
	private String nombreArchivo;
	private String descripcion;
	private String imagen;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CATEGORIA_FICHERO", nullable = false)
	private CategoriaFichero categoriaFichero;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RECURSO", nullable = false)
	private Recurso recurso;

	public Fichero() {
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

	public String getNombreArchivo() {
		return nombreArchivo;
	}
	
	public void setNombreArchivo(String nombreArchivo) {
		this.nombreArchivo = nombreArchivo;
	}
	
	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	public String getImagen() {
		return imagen;
	}
	
	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public CategoriaFichero getCategoriaFichero() {
		return categoriaFichero;
	}

	public void setCategoriaFichero(CategoriaFichero categoriaFichero) {
		this.categoriaFichero = categoriaFichero;
	}

	public Recurso getRecurso() {
		return recurso;
	}

	public void setRecurso(Recurso recurso) {
		this.recurso = recurso;
	}

}
