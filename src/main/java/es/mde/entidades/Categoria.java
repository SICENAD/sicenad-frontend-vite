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

/**
 * Categoría va a representar la jerarquía de los recursos de un CENAD/CMT
 * @author JOSE LUIS PUENTES ALAMOS - MIGUEL PRADA MUNOZ
 *
 */
@Entity
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
	
	/**
	 * Crea una categoría
	 */
	public Categoria() {}
	
	/**
	 * Devuelve el Id de una categoría
	 * @return Devuelve el Id de la categoría
	 */
	public Long getId() {
		return id;
	}
	
	/**
	 * Guarda el Id de una categoría
	 * @param id Id de la categoría
	 */
	public void setId(Long id) {
		this.id = id;
	}
	
	/**
	 * Devuelve el nombre de una categoría
	 * @return Devuelve el nombre de la categoría
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * Guarda el nombre de una categoría
	 * @param nombre Nombre de la categoría
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	/**
	 * Devuelve la descripción de una categoría
	 * @return Devuelve la descripción de la categoría
	 */
	public String getDescripcion() {
		return descripcion;
	}
	
	/**
	 * Guarda la descripción de una categoría
	 * @param descripcion Descripción de la categoría
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	/**
	 * Devuelve los recursos de una categoría
	 * @return Devuelve los recursos de la categoría
	 */
	public Collection<Recurso> getRecursos() {
		return recursos;
	}
	
	/**
	 * Guarda los recursos de una categoría
	 * @param recursos Recursos de la categoría
	 */
	public void setRecursos(Collection<Recurso> recursos) {
		this.recursos = recursos;
	}
	
	/**
	 * Devuelve las subcategorías de una categoría
	 * @return Devuelve las subcategorías de la categoría
	 */
	public Collection<Categoria> getSubcategorias() {
		return subcategorias;
	}
	
	/**
	 * Guarda las subcategorías de una categoría
	 * @param subcategorias Subcategorías de la categoría
	 */
	public void setSubcategorias(Collection<Categoria> subcategorias) {
		this.subcategorias = subcategorias;
	}
	
	/**
	 * Devuelve la categoría Padre de una categoría
	 * @return Devuelve la categoría Padre de la categoría
	 */
	public Categoria getCategoriaPadre() {
		return categoriaPadre;
	}
	
	/**
	 * Guarda la categoría Padre de una categoría
	 * @param categoriaPadre Categoría Padre de la categoría
	 */
	public void setCategoriaPadre(Categoria categoriaPadre) {
		this.categoriaPadre = categoriaPadre;
	}
	
	/**
	 * Devuelve el CENAD/CMT de una categoría
	 * @return Devuelve el CENAD/CMT de la categoría
	 */
	public Cenad getCenad() {
		return cenad;
	}
	
	/**
	 * Guarda el CENAD/CMT de una categoría
	 * @param cenad CENAD/CMT de la categoría
	 */
	public void setCenad(Cenad cenad) {
		this.cenad = cenad;
	}
	/**
	 * Añade la subcategoría a la categoría. Establece la relacion en los dos sentidos
	 * @param categoria Subcategoría añadida a la categoría
	 */ 
	public void addSubcategoria(Categoria categoria) {
		getSubcategorias().add(categoria);
		categoria.setCategoriaPadre(this);
	}
	
	/**
	 * Añade el recurso a la categoría. Establece la relacion en los dos sentidos
	 * @param recurso Recurso añadido a la categoría
	 */ 
	public void addRecurso(Recurso recurso) {
		getRecursos().add(recurso);
		recurso.setCategoria(this);
	}
}