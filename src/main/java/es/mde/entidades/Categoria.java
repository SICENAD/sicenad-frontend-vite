package es.mde.entidades;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import es.mde.repositorios.CategoriaListener;

@Entity
@EntityListeners(CategoriaListener.class)
@Table(name="CATEGORIAS")
public class Categoria {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true)
	private Long id;
	private String nombre;
	private String descripcion;
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Recurso.class, mappedBy = "categoria")
	private Collection<Recurso> recursos = new ArrayList<>();
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Categoria.class, mappedBy = "categoriaPadre")
	private Collection<Categoria> subcategorias = new ArrayList<>();	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CENAD", nullable = false)
	private Cenad cenad;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CATEGORIA_PADRE")
	private Categoria categoriaPadre;
	
	public Categoria() {}
	
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
	
	public Collection<Recurso> getRecursos() {
		return recursos;
	}
	
	public void setRecursos(Collection<Recurso> recursos) {
		this.recursos = recursos;
	}
	
	public Collection<Categoria> getSubcategorias() {
		return subcategorias;
	}
	
	public void setSubcategorias(Collection<Categoria> subcategorias) {
		this.subcategorias = subcategorias;
	}
	
	public Categoria getCategoriaPadre() {
		return categoriaPadre;
	}
	
	public void setCategoriaPadre(Categoria categoriaPadre) {
		this.categoriaPadre = categoriaPadre;
	}
	
	public Cenad getCenad() {
		return cenad;
	}
	
	public void setCenad(Cenad cenad) {
		this.cenad = cenad;
	}
	
	// Establece la relacion en los dos sentidos
	public void addSubcategoria(Categoria categoria) {
		getSubcategorias().add(categoria);
		categoria.setCategoriaPadre(this);
	}
	public void addRecurso(Recurso recurso) {
		getRecursos().add(recurso);
		recurso.setCategoria(this);
	}

	@Override
	public String toString() {
		return "Categoria [id=" + id + ", nombre=" + nombre + ", descripcion=" + descripcion + "]";
	}
}