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
@Table(name = "ARMAS")
public class Arma {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	private Long id;
	private String nombre;
	private String tipoTiro;

	@OneToMany(cascade = CascadeType.ALL, targetEntity = SolicitudArma.class, mappedBy = "arma")
	private Collection<SolicitudArma> armasSolicitudes = new ArrayList<>();

	public Arma() {
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

	public String getTipoTiro() {
		return tipoTiro;
	}

	public void setTipoTiro(String tipoTiro) {
		this.tipoTiro = tipoTiro;
	}

	public Collection<SolicitudArma> getArmasSolicitudes() {
		return armasSolicitudes;
	}

	public void setArmasSolicitudes(Collection<SolicitudArma> armasSolicitudes) {
		this.armasSolicitudes = armasSolicitudes;
	}

	public void addArmaSolicitud(SolicitudArma solicitudArma) {
		getArmasSolicitudes().add(solicitudArma);
		solicitudArma.setArma(this);
	}

}
