package es.mde.entidades;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
//@EntityListeners(RecursoListener.class)
@Table(name="RECURSOS")
public class Recurso {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true)
	private Long id;
	private String nombre;
	private String descripcion;
	private String otros;
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Fichero.class, mappedBy = "recurso")
	private Collection<Fichero> ficheros = new ArrayList<>();
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USUARIO_GESTOR")
	private UsuarioGestor usuarioGestor;	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CATEGORIA", nullable = false)
	private Categoria categoria;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TIPO_FORMULARIO", nullable = false)
	private TipoFormulario tipoFormulario;
	
	public Recurso() {}
	
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

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getOtros() {
		return otros;
	}

	public void setOtros(String otros) {
		this.otros = otros;
	}

	public Collection<Fichero> getFicheros() {
		return ficheros;
	}

	public void setFicheros(Collection<Fichero> ficheros) {
		this.ficheros = ficheros;
	}

	public UsuarioGestor getUsuarioGestor() {
		return usuarioGestor;
	}

	public void setUsuarioGestor(UsuarioGestor usuario) {
		this.usuarioGestor = usuario;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}
	
	public TipoFormulario getTipoFormulario() {
		return tipoFormulario;
	}

	public void setTipoFormulario(TipoFormulario tipoFormulario) {
		this.tipoFormulario = tipoFormulario;
	}

	// Establece la relacion en los dos sentidos
	public void addFichero(Fichero fichero) {
		getFicheros().add(fichero);
		fichero.setRecurso(this);
	}
}
