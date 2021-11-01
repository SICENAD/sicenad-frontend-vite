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

/**
 * Representa a los gestores de los recursos de un CENAD
 * @author JOSE LUIS PUENTES ALAMOS - MIGUEL PRADA MUNOZ
 *
 */
@Entity
@DiscriminatorValue("UG")
@Component
public class UsuarioGestor extends Usuario {
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CENAD")
	private Cenad cenad;
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Recurso.class, mappedBy = "usuarioGestor")
	private Collection<Recurso> recursos = new ArrayList<>();	

	/**
	 * Crea un gestor de un CENAD
	 */
	public UsuarioGestor() {}

	/**
	 * Devuelve el CENAD al que pertenece el gestor
	 * @return Devuelve el CENAD al que pertenece el gestor
	 */
	public Cenad getCenad() {
		return cenad;
	}

	/**
	 * Guarda el CENAD del gestor
	 * @param cenad CENAD al que pertenece el gestor
	 */
	public void setCenad(Cenad cenad) {
		this.cenad = cenad;
	}

	/**
	 * Devuelve los recursos que gestiona el usuario
	 * @return Devuelve los recursos que gestiona el usuario
	 */
	public Collection<Recurso> getRecursos() {
		return recursos;
	}

	/**
	 * Guarda los recursos que gestiona el usuario
	 * @param recursos Recursos que gestiona el usuario
	 */
	public void setRecursos(Collection<Recurso> recursos) {
		this.recursos = recursos;
	}

	// Establece la relacion en los dos sentidos
	/**
	 * Agrega el recurso al usuario
	 * @param recurso Recurso agregado
	 */
	public void addRecurso(Recurso recurso) {
		getRecursos().add(recurso);
		recurso.setUsuarioGestor(this);
	}
}