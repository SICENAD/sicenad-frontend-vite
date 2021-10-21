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
@Table(name="UNIDADES")
public class Unidad {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true)
	private Long id;
	private String nombre;
	private String descripcion;
	private String email;
	private String tfno;
	private String direccion;
	private String poc;
	@OneToMany(cascade = CascadeType.ALL, targetEntity = UsuarioNormal.class, mappedBy = "unidad")
	private Collection<UsuarioNormal> usuariosNormal = new ArrayList<>();
	
	public Unidad() {
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

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTfno() {
		return tfno;
	}

	public void setTfno(String tfno) {
		this.tfno = tfno;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getPoc() {
		return poc;
	}

	public void setPoc(String poc) {
		this.poc = poc;
	}

	public Collection<UsuarioNormal> getUsuariosNormal() {
		return usuariosNormal;
	}

	public void setUsuariosNormal(Collection<UsuarioNormal> usuariosNormal) {
		this.usuariosNormal = usuariosNormal;
	}

	// Establece la relacion en los dos sentidos
	public void addUsuarioNormal(UsuarioNormal usuarioNormal) {
		getUsuariosNormal().add(usuarioNormal);
		usuarioNormal.setUnidad(this);
	}
}