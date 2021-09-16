package es.mde.entidades;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
	private String provincia;
		
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

	public String getProvincia() {
		return provincia;
	}

	public void setProvincia(String provincia) {
		this.provincia = provincia;
	}
	
	@OneToMany(targetEntity = Recurso.class)
	public Collection<Recurso> getRecursos() {
		return getRecursos();
	}
	


	// Establece la relacion en los dos sentidos
	public void addRecurso(Recurso recurso) {
		getRecursos().add(recurso);
		recurso.setCenad(this);
	}
}
