package es.mde.entidades;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.stereotype.Component;

@Entity
//@EntityListeners(UsuarioGestorListener.class)
@DiscriminatorValue("UG")
@Component
public class UsuarioGestor extends Usuario {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CENAD")
	private Cenad cenad;
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Recurso.class, mappedBy = "usuarioGestor")
	private Collection<Recurso> recursos = new ArrayList<>();	

	public UsuarioGestor() {}

	public Cenad getCenad() {
		return cenad;
	}

	public void setCenad(Cenad cenad) {
		this.cenad = cenad;
	}

	public Collection<Recurso> getRecursos() {
		return recursos;
	}

	public void setRecursos(Collection<Recurso> recursos) {
		this.recursos = recursos;
	}

	// Establece la relacion en los dos sentidos
	public void addRecurso(Recurso recurso) {
		getRecursos().add(recurso);
		recurso.setUsuarioGestor(this);
	}
}
