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
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "RECURSOS")
public class Recurso {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	private Long id;
	private String nombre;
	@Lob	
	private String descripcion;
	@Lob	
	private String otros;
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Fichero.class, mappedBy = "recurso")
	private Collection<Fichero> ficheros = new ArrayList<>();
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USUARIO_GESTOR")
	private UsuarioGestor usuarioGestor;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CATEGORIA", nullable = false)
	private Categoria categoria;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TIPO_FORMULARIO", nullable = false)
	private TipoFormulario tipoFormulario;
	@OneToMany(cascade = CascadeType.ALL, targetEntity = SolicitudRecurso.class, mappedBy = "recurso")
	private Collection<SolicitudRecurso> solicitudes = new ArrayList<>();
	private boolean conDatosEspecificosSolicitud;
	@Lob	
	private String datosEspecificosSolicitud = "Ejemplo: \nHorario: 08:00h a 21:00h \nMedios CIS: medios propios de la UCO  \nSIMACET: se solicita el nodo del CENAD "
			+ "\nPOC CIS: CAP. XXX \nObservaciones Particulares:";

	public Recurso() {
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

	public String getOtros() {
		return otros;
	}

	public void setOtros(String otros) {
		this.otros = otros;
	}

	public Collection<Fichero> getFicheros() {
		return ficheros;
	}

	public void setFicheros(Collection<Fichero> ficheros) {
		this.ficheros = ficheros;
	}

	public UsuarioGestor getUsuarioGestor() {
		return usuarioGestor;
	}

	public void setUsuarioGestor(UsuarioGestor usuario) {
		this.usuarioGestor = usuario;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public TipoFormulario getTipoFormulario() {
		return tipoFormulario;
	}

	public void setTipoFormulario(TipoFormulario tipoFormulario) {
		this.tipoFormulario = tipoFormulario;
	}

	public Collection<SolicitudRecurso> getSolicitudes() {
		return solicitudes;
	}

	public void setSolicitudes(Collection<SolicitudRecurso> solicitudes) {
		this.solicitudes = solicitudes;
	}

	public boolean isConDatosEspecificosSolicitud() {
		return conDatosEspecificosSolicitud;
	}

	public void setConDatosEspecificosSolicitud(boolean conDatosEspecificosSolicitud) {
		this.conDatosEspecificosSolicitud = conDatosEspecificosSolicitud;
	}

	public String getDatosEspecificosSolicitud() {
		return datosEspecificosSolicitud;
	}

	public void setDatosEspecificosSolicitud(String datosEspecificosSolicitud) {
		this.datosEspecificosSolicitud = datosEspecificosSolicitud;
	}

	// Establece la relacion en los dos sentidos
	public void addFichero(Fichero fichero) {
		getFicheros().add(fichero);
		fichero.setRecurso(this);
	}

	public void addSolicitudRecurso(SolicitudRecurso solicitud) {
		getSolicitudes().add(solicitud);
		solicitud.setRecurso(this);
	}
}