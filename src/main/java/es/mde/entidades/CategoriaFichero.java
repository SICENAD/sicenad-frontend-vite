package es.mde.entidades;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
//@EntityListeners(CategoriaFicheroListener.class)
@Table(name = "CATEGORIAS_FICHERO")
public class CategoriaFichero {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	private Long id;
	private String nombre; //Imagen, normativa, instrucciones, etc
	private String descripcion;
	private int tipo; //0 para imagenes y 1 para otros archivos
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Fichero.class, mappedBy = "categoriaFichero")
	private Collection<Fichero> ficheros = new ArrayList<>();
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Cartografia.class, mappedBy = "categoriaFichero")
	private Collection<Cartografia> cartografias = new ArrayList<>();
	
	public CategoriaFichero() {}

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

	public int getTipo() {
		return tipo;
	}

	public void setTipo(int tipo) {
		this.tipo = tipo;
	}
	
	public Collection<Fichero> getFicheros() {
		return ficheros;
	}
	
	public void setFicheros(Collection<Fichero> ficheros) {
		this.ficheros = ficheros;
	}
	
	public Collection<Cartografia> getCartografias() {
		return cartografias;
	}
	
	public void setCartografias(Collection<Cartografia> cartografias) {
		this.cartografias = cartografias;
	}
	
	// Establece la relacion en los dos sentidos
	public void addFichero(Fichero fichero) {
		getFicheros().add(fichero);
		fichero.setCategoriaFichero(this);
	}
	
	public void addCartografia(Cartografia cartografia) {
		getCartografias().add(cartografia);
		cartografia.setCategoriaFichero(this);
	}
}
