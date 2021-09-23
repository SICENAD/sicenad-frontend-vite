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
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
//@EntityListeners(CenadListener.class)
@Table(name="CENADS")
public class Cenad {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique=true)
	private Long id;
	private String nombre;
	private int provincia;
	private String descripcion;
	private String direccion;
	private String tfno;
	private String email;
	private String escudo;
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Categoria.class, mappedBy = "cenad")
	private Collection<Categoria> categorias = new ArrayList<>();
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Cartografia.class, mappedBy = "cenad")
	private Collection<Cartografia> cartografias = new ArrayList<>();
	@OneToMany(cascade = CascadeType.ALL, targetEntity = UsuarioGestor.class, mappedBy = "cenad")
	private Collection<UsuarioGestor> usuariosGestores = new ArrayList<>();
	@OneToOne(cascade = CascadeType.ALL, targetEntity = UsuarioAdministrador.class, mappedBy = "cenad")
	private UsuarioAdministrador usuarioAdministrador;
	
	public Cenad() {
		super();
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

	public int getProvincia() {
		return provincia;
	}

	public void setProvincia(int provincia) {
		this.provincia = provincia;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getTfno() {
		return tfno;
	}

	public void setTfno(String tfno) {
		this.tfno = tfno;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEscudo() {
		return escudo;
	}

	public void setEscudo(String escudo) {
		this.escudo = escudo;
	}

	public Collection<Categoria> getCategorias() {
		return categorias;
	}
	
	public void setCategorias(Collection<Categoria> categorias) {
		this.categorias = categorias;
	}
	
	public Collection<Cartografia> getCartografias() {
		return cartografias;
	}
	
	public void setCartografias(Collection<Cartografia> cartografias) {
		this.cartografias = cartografias;
	}
	
	public Collection<UsuarioGestor> getUsuariosGestores() {
		return usuariosGestores;
	}
	
	public void setUsuariosGestores(Collection<UsuarioGestor> usuarios) {
		this.usuariosGestores = usuarios;
	}
	
	public UsuarioAdministrador getUsuarioAdministrador() {
		return usuarioAdministrador;
	}
	
	public void setUsuarioAdministrador(UsuarioAdministrador usuarioAdministrador) {
		this.usuarioAdministrador = usuarioAdministrador;
	}
	
	// Establece la relacion en los dos sentidos
	public void addCategoria(Categoria categoria) {
		getCategorias().add(categoria);
		categoria.setCenad(this);
	}
	
	public void addCartografia(Cartografia cartografia) {
		getCartografias().add(cartografia);
		cartografia.setCenad(this);
	}
	
	public void addUsuariosGestores(UsuarioGestor usuario) {
		getUsuariosGestores().add(usuario);
		usuario.setCenad(this);
	}
	
	@Override
	public String toString() {
		return "CENAD/CMT " + nombre + "(" + provincia + ")";
	}
}
