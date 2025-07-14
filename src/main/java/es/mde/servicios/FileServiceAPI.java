package es.mde.servicios;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

/**
 * Interfaz del servicio encargado del almacenamiento de archivos
 * 
 * @author JOSE LUIS PUENTES ALAMOS - MIGUEL PRADA MUNOZ
 *
 */
public interface FileServiceAPI {
	// *******************************
	// Métodos para tratar los escudos
	// *******************************

	/**
	 * Metodo para guardar un escudo
	 * 
	 * @param file Archivo de imagen del escudo
	 * @throws Exception
	 */
	public String saveEscudo(MultipartFile file) throws Exception;

	/**
	 * Metodo para borrar un escudo
	 * 
	 * @param name Nombre del archivo de imagen del escudo
	 * @throws Exception
	 */
	public void borrarEscudo(String name) throws Exception;

	/**
	 * Metodo para cargar un escudo
	 * 
	 * @param name Nombre del archivo de imagen del escudo
	 * @throws Exception
	 */
	public Resource loadEscudo(String name) throws Exception;

	/**
	 * Metodo para guardar varios escudos
	 * 
	 * @param filse Nombre de la lista de archivos de imagen de escudos
	 * @throws Exception
	 */
	public void saveEscudos(List<MultipartFile> files) throws Exception;

	/**
	 * Metodo para cargar varios escudos
	 * 
	 * @throws Exception
	 */
	public Stream<Path> loadAllEscudos() throws Exception;

	// *********************************************************
	// Métodos para tratar los ficheros asociados a los recursos
	// *********************************************************

	/**
	 * Metodo para guardar un archivo de un recurso
	 * 
	 * @param file Archivo a subir
	 * @param id   Id del recurso
	 * @throws Exception
	 */
	public void saveDocRecurso(MultipartFile file, String id) throws Exception;

	/**
	 * Metodo para borrar un archivo de un recurso
	 * 
	 * @param name Nombre del archivo
	 * @param id   Id del recurso
	 * @throws Exception
	 */
	public void borrarDocRecurso(String name, String id) throws Exception;

	/**
	 * Metodo para borrar la carpeta de un recurso
	 * 
	 * @param id Id del recurso
	 * @throws Exception
	 */
	public void borrarCarpetaDocRecurso(String id) throws Exception;

	/**
	 * Metodo para cargar un archivo de un recurso
	 * 
	 * @param name Nombre del archivo
	 * @param id   Id del recurso
	 * @throws Exception
	 */
	public Resource loadDocRecurso(String name, String id) throws Exception;

	/**
	 * Metodo para cargar un archivo de un recurso
	 * 
	 * @param name Nombre del archivo
	 * @throws Exception
	 */
	public Resource loadDocRecurso(String name) throws Exception;

	/**
	 * Metodo para guardar varios archivos de un recurso
	 * 
	 * @param files Lista de archivos a subir
	 * @param id    Id del recurso
	 * @throws Exception
	 */
	public void saveDocRecursos(List<MultipartFile> files, String id) throws Exception;

	/**
	 * Metodo para cargar varios archivos de un recurso
	 * 
	 * @param id Id del recurso
	 * @throws Exception
	 */
	public Stream<Path> loadAllDocRecursos(String id) throws Exception;

	// ************************************************************
	// Métodos para tratar los ficheros asociados a las solicitudes
	// ************************************************************

	/**
	 * Metodo para guardar un archivo de una solicitud
	 * 
	 * @param file Archivo a subir
	 * @param id   Id de la solicitud
	 * @throws Exception
	 */
	public void saveDocSolicitud(MultipartFile file, String id) throws Exception;

	/**
	 * Metodo para borrar un archivo de una solicitud
	 * 
	 * @param name Nombre del archivo
	 * @param id   Id de la solicitud
	 * @throws Exception
	 */
	public void borrarDocSolicitud(String name, String id) throws Exception;

	/**
	 * Metodo para borrar la carpeta de una solicitud
	 * 
	 * @param id Id de la solicitud
	 * @throws Exception
	 */
	public void borrarCarpetaDocSolicitud(String id) throws Exception;

	/**
	 * Metodo para cargar un archivo de una solicitud
	 * 
	 * @param name Nombre del archivo
	 * @param id   Id de la solicitud
	 * @throws Exception
	 */
	public Resource loadDocSolicitud(String name, String id) throws Exception;

	/**
	 * Metodo para cargar un archivo de una solicitud
	 * 
	 * @param name Nombre del archivo
	 * @throws Exception
	 */
	public Resource loadDocSolicitud(String name) throws Exception;

	/**
	 * Metodo para guardar varios archivos de una solicitud
	 * 
	 * @param files Lista de archivos a subir
	 * @param id    Id de la solicitud
	 * @throws Exception
	 */
	public void saveDocSolicitudes(List<MultipartFile> files, String id) throws Exception;

	/**
	 * Metodo para cargar varios archivos de una solicitud
	 * 
	 * @param id Id de la solicitud
	 * @throws Exception
	 */
	public Stream<Path> loadAllDocSolicitudes(String id) throws Exception;

	// *******************************
	// Métodos para tratar las cartografías
	// *******************************

	/**
	 * Metodo para guardar un archivo de un conjunto cartografico
	 * 
	 * @param file Archivo a subir
	 * @param id   Id del CENAD
	 * @throws Exception
	 */
	public void saveCartografia(MultipartFile file, String id) throws Exception;

	/**
	 * Metodo para borrar un archivo de un conjunto cartografico
	 * 
	 * @param name Nombre del archivo
	 * @param id   Id del CENAD
	 * @throws Exception
	 */
	public void borrarCartografia(String name, String id) throws Exception;

	/**
	 * Metodo para borrar la carpeta de un conjunto cartografico
	 * 
	 * @param id Id del CENAD
	 * @throws Exception
	 */
	public void borrarCarpetaCartografia(String id) throws Exception;

	/**
	 * Metodo para cargar un archivo de un conjunto cartografico
	 * 
	 * @param name Nombre del archivo
	 * @param id   Id del CENAD
	 * @throws Exception
	 */
	public Resource loadCartografia(String name, String id) throws Exception;

	/**
	 * Metodo para cargar un archivo de un conjunto cartografico
	 * 
	 * @param name Nombre del archivo
	 * @throws Exception
	 */
	public Resource loadCartografia(String name) throws Exception;

	/**
	 * Metodo para guardar varios archivos de un conjunto cartografico
	 * 
	 * @param files Lista de archivos a subir
	 * @param id    Id del CENAD
	 * @throws Exception
	 */
	public void saveCartografias(List<MultipartFile> files, String id) throws Exception;

	/**
	 * Metodo para cargar varios archivos de un conjunto cartografico
	 * 
	 * @param id Id del CENAD
	 * @throws Exception
	 */
	public Stream<Path> loadAllCartografias(String id) throws Exception;

	// *******************************
	// Métodos para tratar las normativas
	// *******************************

	/**
	 * Metodo para guardar un archivo de una normativa
	 * 
	 * @param file Archivo a subir
	 * @param id   Id del CENAD
	 * @throws Exception
	 */
	public void saveNormativa(MultipartFile file, String id) throws Exception;

	/**
	 * Metodo para borrar un archivo de normativa
	 * 
	 * @param name Nombre del archivo
	 * @param id   Id del CENAD
	 * @throws Exception
	 */
	public void borrarNormativa(String name, String id) throws Exception;

	/**
	 * Metodo para borrar la carpeta de normativa de un CENAD
	 * 
	 * @param id Id del CENAD
	 * @throws Exception
	 */
	public void borrarCarpetaNormativa(String id) throws Exception;

	/**
	 * Metodo para cargar un archivo de normativa
	 * 
	 * @param name Nombre del archivo
	 * @param id   Id del CENAD
	 * @throws Exception
	 */
	public Resource loadNormativa(String name, String id) throws Exception;

	/**
	 * Metodo para cargar un archivo de normativa
	 * 
	 * @param name Nombre del archivo
	 * @throws Exception
	 */
	public Resource loadNormativa(String name) throws Exception;

	/**
	 * Metodo para guardar varios archivos de normativa
	 * 
	 * @param files Lista de archivos a subir
	 * @param id    Id del CENAD
	 * @throws Exception
	 */
	public void saveNormativas(List<MultipartFile> files, String id) throws Exception;

	/**
	 * Metodo para cargar varios archivos de normativa
	 * 
	 * @param id Id del CENAD
	 * @throws Exception
	 */
	public Stream<Path> loadAllNormativas(String id) throws Exception;

	// *******************************
	// Métodos para tratar las imagenes de InfoCenad
	// *******************************

	/**
	 * Metodo para guardar un archivo de información del CENAD
	 * 
	 * @param file Archivo a subir
	 * @param id Id del CENAD
	 * @throws Exception
	 */
	public void saveInfoCenad(MultipartFile file, String id) throws Exception;

	/**
	 * Metodo para borrar un archivo de información del CENAD
	 * 
	 * @param name Nombre del archivo
	 * @param id   Id del CENAD
	 * @throws Exception
	 */
	public void borrarInfoCenad(String name, String id) throws Exception;

	/**
	 * Metodo para borrar la carpeta de información del CENAD
	 * 
	 * @param id Id del CENAD
	 * @throws Exception
	 */
	public void borrarCarpetaInfoCenad(String id) throws Exception;

	/**
	 * Metodo para cargar un archivo de información del CENAD
	 * 
	 * @param name Nombre del archivo
	 * @param id   Id del CENAD
	 * @throws Exception
	 */
	public Resource loadInfoCenad(String name, String id) throws Exception;

	/**
	 * Metodo para cargar un archivo de información del CENAD
	 * 
	 * @param name Nombre del archivo
	 * @throws Exception
	 */
	public Resource loadInfoCenad(String name) throws Exception;

	/**
	 * Metodo para guardar varios archivos de información del CENAD
	 * 
	 * @param files Lista de archivos a subir
	 * @param id    Id del CENAD
	 * @throws Exception
	 */
	public void saveInfoCenads(List<MultipartFile> files, String id) throws Exception;

	/**
	 * Metodo para cargar varios archivos de información del CENAD
	 * 
	 * @param id Id del CENAD
	 * @throws Exception
	 */
	public Stream<Path> loadAllInfoCenads(String id) throws Exception;
}