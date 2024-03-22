package es.mde.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

/**
 * Representa los usuarios de la aplicacion
 * @author JOSE LUIS PUENTES ALAMOS - MIGUEL PRADA MUNOZ
 *
 */
@Entity
@Table(name = "USUARIOS")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TIPO")
@DiscriminatorValue("U")
public abstract class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true)
	private Long id;
	private String nombre;
	private String password;
	private String email;
	private String tfno;
	private String descripcion;
	private boolean emailAdmitido;

	/**
	 * Crea un usuario
	 */
	public Usuario() {
		super();
	}

	/**
	 * Devuelve el id de un usuario
	 * 
	 * @return Devuelve el id del usuario
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Guarda el id del usuario
	 * 
	 * @param id Id del usuario
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Devuelve el nombre del usuario
	 * 
	 * @return Devuelve el nombre del usuario
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * Guarda el nombre del usuario
	 * 
	 * @param nombre Nombre del usuario
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	/**
	 * Devuelve el password del usuario
	 * @return Devuelve el password del usuario
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * Guarda el password del usuario
	 * @param password Password del usuario
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * Devuelve el email del usuario
	 * @return Devuelve el email del usuario
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * Guarda el email del usuario
	 * @param email Email del usuario
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * Devuelve el telefono del usuario
	 * @return Devuelve el telefono del usuario
	 */
	public String getTfno() {
		return tfno;
	}

	/**
	 * Guarda el telefono del usuario
	 * @param tfno Telefono del usuario
	 */
	public void setTfno(String tfno) {
		this.tfno = tfno;
	}

	/**
	 * Devuelve la descripcion del usuario
	 * @return Devuelve la descripcion del usuario
	 */
	public String getDescripcion() {
		return descripcion;
	}

	/**
	 * Guarda la descripcion del usuario
	 * @param descripcion Descripcion del usuario
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	/**
	 * Devuelve un boolean que le permitirá recibir emails o no
	 * @return Devuelve un boolean que le permitirá recibir emails o no
	 */
	public boolean isEmailAdmitido() {
		return emailAdmitido;
	}
	
	/**
	 * Guarda un boolean que le permitirá recibir emails o no
	 * @param emailAdmitido Variable boolean que le permitirá recibir emails o no
	 */
	public void setEmailAdmitido(boolean emailAdmitido) {
		this.emailAdmitido = emailAdmitido;
	}
}