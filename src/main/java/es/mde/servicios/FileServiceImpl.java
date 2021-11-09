package es.mde.servicios;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * Crea el servicio para el almacenamiento de archivos
 * 
 * @author JOSE LUIS PUENTES ALAMOS - MIGUEL PRADA MUNOZ
 *
 */
@Service
public class FileServiceImpl implements FileServiceAPI {
	private static String rutaEscudos = "archivos/escudos";
	private static String rutaDocRecursos = "archivos/docRecursos";
	private static String rutaDocSolicitudes = "archivos/docSolicitudes";
	private static String rutaCartografias = "archivos/cartografias";

	/**
	 * Me permite inyectar valores desde el archivo properties para poder modificar
	 * estos valores sin necesidad de tocar codigo
	 * 
	 * @param rutaEscudos        Define la ruta donde se guardaran los escudos de
	 *                           los CENAD,s/CMT,s
	 * @param rutaDocRecursos    Define la ruta donde se guardaran los archivos de
	 *                           los recursos
	 * @param rutaDocSolicitudes Define la ruta donde se guardaran los archivos
	 *                           asociados a solicitudes
	 * @param rutaCartografias   Define la ruta donde se guardaran los distintos
	 *                           conjuntos cartograficos
	 */
	@Autowired
	public FileServiceImpl(@Qualifier("rutaEscudos") String rutaEscudos,
			@Qualifier("rutaDocRecursos") String rutaDocRecursos,
			@Qualifier("rutaDocSolicitudes") String rutaDocSolicitudes
			,@Qualifier("rutaCartografias") String rutaCartografias
			) {
		FileServiceImpl.rutaEscudos = rutaEscudos;
		FileServiceImpl.rutaDocRecursos = rutaDocRecursos;
		FileServiceImpl.rutaDocSolicitudes = rutaDocSolicitudes;
		FileServiceImpl.rutaCartografias = rutaCartografias;
	}

	private final Path escudosFolder = Paths.get(rutaEscudos);
	private final Path docSolicitudesFolder = Paths.get(rutaDocSolicitudes);
	private final Path docRecursosFolder = Paths.get(rutaDocRecursos);
	private final Path cartografiasFolder = Paths.get(rutaCartografias);

	// *******************************
	// Métodos para tratar los escudos
	// *******************************

	/**
	 * Metodo para almacenar un escudo
	 */
	@Override
	public void saveEscudo(MultipartFile file) throws Exception {
		Files.createDirectories(escudosFolder);
		Files.copy(file.getInputStream(), this.escudosFolder.resolve(file.getOriginalFilename()));
	}

	/**
	 * Metodo para borrar un escudo
	 */
	@Override
	public void borrarEscudo(String name) throws Exception {
		Path file = escudosFolder.resolve(name);
		Files.deleteIfExists(file);
	}

	/**
	 * Metodo para cargar un escudo
	 */
	@Override
	public Resource loadEscudo(String name) throws Exception {
		Path file = escudosFolder.resolve(name);
		Resource resource = new UrlResource(file.toUri());
		return resource;
	}

	/**
	 * Metodo para almacenar varios escudos (en la actualidad no se emplea)
	 */
	@Override
	public void saveEscudos(List<MultipartFile> files) throws Exception {
		Files.createDirectories(escudosFolder);
		for (MultipartFile file : files) {
			this.saveEscudo(file);
		}
	}

	/**
	 * Metodo para cargar todos los escudos
	 */
	@Override
	public Stream<Path> loadAllEscudos() throws Exception {
		return Files.walk(escudosFolder, 1).filter(path -> !path.equals(escudosFolder)).map(escudosFolder::relativize);
	}

	// *********************************************************
	// Métodos para tratar los ficheros asociados a los recursos
	// *********************************************************

	/**
	 * Metodo para guardar el archivo de un recurso
	 */
	@Override
	public void saveDocRecurso(MultipartFile file, String id) throws Exception {
		Path docRecursosFolder2 = Paths.get(docRecursosFolder.toString(), id);
		Files.createDirectories(docRecursosFolder2);

		Files.copy(file.getInputStream(), docRecursosFolder2.resolve(file.getOriginalFilename()));
	}

	/**
	 * Metodo para borrar el archivo de un recurso
	 */
	@Override
	public void borrarDocRecurso(String name, String id) throws Exception {
		Path docRecursosFolder2 = Paths.get(docRecursosFolder.toString(), id);
		Path file = docRecursosFolder2.resolve(name);
		Files.deleteIfExists(file);
	}

	/**
	 * Metodo para borrar la carpeta de un recurso
	 */
	@Override
	public void borrarCarpetaDocRecurso(String id) throws Exception {
		Path carpeta = docRecursosFolder.resolve(id);
		Files.walk(carpeta).sorted(Comparator.reverseOrder()).map(Path::toFile).forEach(File::delete);
	}

	/**
	 * Metodo para cargar el archivo de un recurso
	 */
	@Override
	public Resource loadDocRecurso(String name, String id) throws Exception {
		Path docRecursosFolder2 = Paths.get(docRecursosFolder.toString(), id);
		Path file = docRecursosFolder2.resolve(name);
		Resource resource = new UrlResource(file.toUri());
		return resource;
	}

	/**
	 * Metodo para cargar el archivo de un recurso
	 */
	@Override
	public Resource loadDocRecurso(String name) throws Exception {
		Path file = docRecursosFolder.resolve(name);
		Resource resource = new UrlResource(file.toUri());
		return resource;
	}

	/**
	 * Metodo para guardar varios archivos de un recurso (no se usa por requerir
	 * añadir observaciones individuales a cada fichero)
	 */
	@Override
	public void saveDocRecursos(List<MultipartFile> files, String id) throws Exception {
		for (MultipartFile file : files) {
			this.saveDocRecurso(file, id);
		}
	}

	/**
	 * Metodo para cargar los archivos de un recurso
	 */
	@Override
	public Stream<Path> loadAllDocRecursos(String id) throws Exception {
		Path docRecursosFolder2 = Paths.get(docRecursosFolder.toString(), id);
		return Files.walk(docRecursosFolder2, 1).filter(path -> !path.equals(docRecursosFolder2))
				.map(docRecursosFolder2::relativize);
	}

	// ************************************************************
	// Métodos para tratar los ficheros asociados a las solicitudes
	// ************************************************************

	/**
	 * Metodo para guardar el archivo de una solicitud
	 */
	@Override
	public void saveDocSolicitud(MultipartFile file, String id) throws Exception {
		Path docSolicitudesFolder2 = Paths.get(docSolicitudesFolder.toString(), id);
		Files.createDirectories(docSolicitudesFolder2);
		Files.copy(file.getInputStream(), docSolicitudesFolder2.resolve(file.getOriginalFilename()));
	}

	/**
	 * Metodo para borrar el archivo de una solicitud
	 */
	@Override
	public void borrarDocSolicitud(String name, String id) throws Exception {
		Path docSolicitudesFolder2 = Paths.get(docSolicitudesFolder.toString(), id);
		Path file = docSolicitudesFolder2.resolve(name);
		Files.deleteIfExists(file);
	}

	/**
	 * Metodo para borrar la carpeta de una solicitud
	 */
	@Override
	public void borrarCarpetaDocSolicitud(String id) throws Exception {
		Path carpeta = docSolicitudesFolder.resolve(id);
		Files.walk(carpeta).sorted(Comparator.reverseOrder()).map(Path::toFile).forEach(File::delete);
	}

	/**
	 * Metodo para cargar el archivo de una solicitud
	 */
	@Override
	public Resource loadDocSolicitud(String name, String id) throws Exception {
		Path docSolicitudesFolder2 = Paths.get(docSolicitudesFolder.toString(), id);
		Path file = docSolicitudesFolder2.resolve(name);
		Resource resource = new UrlResource(file.toUri());
		return resource;
	}

	/**
	 * Metodo para cargar el archivo de una solicitud
	 */
	@Override
	public Resource loadDocSolicitud(String name) throws Exception {
		Path file = docSolicitudesFolder.resolve(name);
		Resource resource = new UrlResource(file.toUri());
		return resource;
	}

	/**
	 * Metodo para guardar varios archivos de una solicitud(en la actualidad no se
	 * usa por requerir informacion individual de cada fichero)
	 */
	@Override
	public void saveDocSolicitudes(List<MultipartFile> files, String id) throws Exception {
		for (MultipartFile file : files) {
			this.saveDocSolicitud(file, id);
		}
	}

	/**
	 * Metodo para cargar los archivos de una solicitud
	 */
	@Override
	public Stream<Path> loadAllDocSolicitudes(String id) throws Exception {
		Path docSolicitudesFolder2 = Paths.get(docSolicitudesFolder.toString(), id);
		return Files.walk(docSolicitudesFolder2, 1).filter(path -> !path.equals(docSolicitudesFolder2))
				.map(docSolicitudesFolder2::relativize);
	}

	// *************************************************************
	// Métodos para tratar los ficheros asociados a las cartografías
	// *************************************************************

	/**
	 * Metodo para guardar el archivo de un conjunto cartografico
	 */
	@Override
	public void saveCartografia(MultipartFile file, String id) throws Exception {
		Path cartografiasFolder2 = Paths.get(cartografiasFolder.toString(), id);
		Files.createDirectories(cartografiasFolder2);
		Files.copy(file.getInputStream(), cartografiasFolder2.resolve(file.getOriginalFilename()));
	}

	/**
	 * Metodo para borrar el archivo de un conjunto cartografico
	 */
	@Override
	public void borrarCartografia(String name, String id) throws Exception {
		Path cartografiasFolder2 = Paths.get(cartografiasFolder.toString(), id);
		Path file = cartografiasFolder2.resolve(name);
		Files.deleteIfExists(file);
	}

	/**
	 * Metodo para borrar la carpeta de un conjunto cartografico
	 */
	@Override
	public void borrarCarpetaCartografia(String id) throws Exception {
		Path carpeta = cartografiasFolder.resolve(id);
		Files.walk(carpeta).sorted(Comparator.reverseOrder()).map(Path::toFile).forEach(File::delete);
	}

	/**
	 * Metodo para cargar el archivo de un conjunto cartografico
	 */
	@Override
	public Resource loadCartografia(String name, String id) throws Exception {
		Path cartografiasFolder2 = Paths.get(cartografiasFolder.toString(), id);
		Path file = cartografiasFolder2.resolve(name);
		Resource resource = new UrlResource(file.toUri());
		return resource;
	}

	/**
	 * Metodo para cargar el archivo de un conjunto cartografico
	 */
	@Override
	public Resource loadCartografia(String name) throws Exception {
		Path file = cartografiasFolder.resolve(name);
		Resource resource = new UrlResource(file.toUri());
		return resource;
	}

	/**
	 * Metodo para guardar varios archivos de un conjunto cartografico (en la actualidad no se usa por querer añadir informacion individual a cada fichero)
	 */
	@Override
	public void saveCartografias(List<MultipartFile> files, String id) throws Exception {
		for (MultipartFile file : files) {
			this.saveCartografia(file, id);
		}
	}

	/**
	 * Metodo para cargar varios archivos de un conjunto cartografico
	 */
	@Override
	public Stream<Path> loadAllCartografias(String id) throws Exception {
		Path cartografiasFolder2 = Paths.get(cartografiasFolder.toString(), id);
		return Files.walk(cartografiasFolder2, 1).filter(path -> !path.equals(cartografiasFolder2))
				.map(cartografiasFolder2::relativize);
	}
}