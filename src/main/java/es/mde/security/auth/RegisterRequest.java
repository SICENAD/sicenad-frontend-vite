package es.mde.security.auth;

import es.mde.entidades.Cenad;
import es.mde.entidades.Unidad;
import es.mde.security.usuarios.Rol;
import jakarta.persistence.Column;

public class RegisterRequest {

	private String username;
	private String password;
	private String email;
	private String tfno;
	private String descripcion;
	private boolean emailAdmitido;
	private Rol rol;
    @Column(nullable = true) // Campo opcional
	private Cenad cenad;
    @Column(nullable = true) // Campo opcional (por defecto ya es true)
	private Unidad unidad;
	
	public RegisterRequest() {}

	public RegisterRequest(String username, String password, String email, String tfno, String descripcion,
			boolean emailAdmitido, Rol rol, Cenad cenad, Unidad unidad) {
		super();
		this.username = username;
		this.password = password;
		this.email = email;
		this.tfno = tfno;
		this.descripcion = descripcion;
		this.emailAdmitido = emailAdmitido;
		this.rol = rol;
		this.cenad = cenad;
		this.unidad = unidad;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Rol getRol() {
		return rol;
	}
	
	public void setRol(Rol rol) {
		this.rol = rol;
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

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public boolean isEmailAdmitido() {
		return emailAdmitido;
	}

	public void setEmailAdmitido(boolean emailAdmitido) {
		this.emailAdmitido = emailAdmitido;
	}

	public Cenad getCenad() {
		return cenad;
	}

	public void setCenad(Cenad cenad) {
		this.cenad = cenad;
	}

	public Unidad getUnidad() {
		return unidad;
	}

	public void setUnidad(Unidad unidad) {
		this.unidad = unidad;
	}
	
	
}
