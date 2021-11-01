package es.mde.entidades;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

/**
 * Representa los usuarios de la aplicacion
 * 
 * @author JOSE LUIS PUENTES ÁLAMOS - MIGUEL PRADA MUÑOZ
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
}