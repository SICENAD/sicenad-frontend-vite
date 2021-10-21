package es.mde.entidades;

import java.util.Date;

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
@Table(name = "CARTOGRAFIAS")
public class Cartografia {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	private Long id;
	private String nombre;
	private String nombreArchivo;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CATEGORIA_FICHERO", nullable = false)
	private CategoriaFichero categoriaFichero;
	private String imagen;
	private String escala;
	private String sistemaReferencia;
	private Date fechaCartografia;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CENAD", nullable = false)
	private Cenad cenad;

	public Cartografia() {}

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
	
	public CategoriaFichero getCategoriaFichero() {
		return categoriaFichero;
	}

	public void setCategoriaFichero(CategoriaFichero categoriaFichero) {
		this.categoriaFichero = categoriaFichero;
	}
	
	public String getImagen() {
		return imagen;
	}
	
	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public String getEscala() {
		return escala;
	}

	public void setEscala(String escala) {
		this.escala = escala;
	}

	public String getSistemaReferencia() {
		return sistemaReferencia;
	}

	public void setSistemaReferencia(String sistemaReferencia) {
		this.sistemaReferencia = sistemaReferencia;
	}

	public Date getFechaCartografia() {
		return fechaCartografia;
	}

	public void setFechaCartografia(Date fechaCartografia) {
		this.fechaCartografia = fechaCartografia;
	}

	public Cenad getCenad() {
		return cenad;
	}

	public void setCenad(Cenad cenad) {
		this.cenad = cenad;
	}	
}