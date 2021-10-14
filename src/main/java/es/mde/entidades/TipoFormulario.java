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
//@EntityListeners(TipoFormularioListener.class)
@Table(name="TIPOS_FORMULARIO")
public class TipoFormulario {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(unique=true)
	private Long id;
	private String nombre;
	private String descripcion;
	private int codTipo;
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Recurso.class, mappedBy = "tipoFormulario")
	private Collection<Recurso> recursos = new ArrayList<>();
	
	public TipoFormulario() {}

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

	public int getCodTipo() {
		return codTipo;
	}

	public void setCodTipo(int codTipo) {
		this.codTipo = codTipo;
	}

	public Collection<Recurso> getRecursos() {
		return recursos;
	}

	public void setRecursos(Collection<Recurso> recursos) {
		this.recursos = recursos;
	};
	
	// Establece la relacion en los dos sentidos
	public void addRecurso(Recurso recurso) {
		getRecursos().add(recurso);
		recurso.setTipoFormulario(this);
	}
}

