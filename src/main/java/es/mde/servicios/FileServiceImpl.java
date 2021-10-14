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

@Service
public class FileServiceImpl implements FileServiceAPI {

	private static String rutaEscudos = "archivos/escudos";
	private static String rutaDocRecursos = "archivos/docRecursos";
	private static String rutaDocSolicitudes = "archivos/docSolicitudes";

	@Autowired
	public FileServiceImpl(@Qualifier("rutaEscudos") String rutaEscudos, @Qualifier("rutaDocRecursos") String rutaDocRecursos, @Qualifier("rutaDocSolicitudes") String rutaDocSolicitudes) {
		FileServiceImpl.rutaEscudos = rutaEscudos;
		FileServiceImpl.rutaDocRecursos = rutaDocRecursos;
		FileServiceImpl.rutaDocSolicitudes = rutaDocSolicitudes;
	}

	private final Path escudosFolder = Paths.get(rutaEscudos);
	private final Path docSolicitudesFolder = Paths.get(rutaDocSolicitudes);
	private final Path docRecursosFolder = Paths.get(rutaDocRecursos);

	// *******************************
	// Métodos para tratar los escudos
	// *******************************
	
	@Override
	public void saveEscudo(MultipartFile file) throws Exception {
		Files.createDirectories(escudosFolder);
		Files.copy(file.getInputStream(), this.escudosFolder.resolve(file.getOriginalFilename()));
	}

	@Override
	public void borrarEscudo(String name) throws Exception {
		Path file = escudosFolder.resolve(name);
		Files.deleteIfExists(file);
	}
	
	@Override
	public Resource loadEscudo(String name) throws Exception {
		Path file = escudosFolder.resolve(name);
		Resource resource = new UrlResource(file.toUri());
		return resource;
	}

	@Override
	public void saveEscudos(List<MultipartFile> files) throws Exception {
		Files.createDirectories(escudosFolder);
		for (MultipartFile file : files) {
			this.saveEscudo(file);
		}
	}

	@Override
	public Stream<Path> loadAllEscudos() throws Exception {
		return Files.walk(escudosFolder, 1).filter(path -> !path.equals(escudosFolder)).map(escudosFolder::relativize);
	}

	// *********************************************************
	// Métodos para tratar los ficheros asociados a los recursos
	// *********************************************************
	
	@Override
	public void saveDocRecurso(MultipartFile file, String id) throws Exception {
		Path docRecursosFolder2 = Paths.get(docRecursosFolder.toString(), id);
		Files.createDirectories(docRecursosFolder2);

		Files.copy(file.getInputStream(), docRecursosFolder2.resolve(file.getOriginalFilename()));
	}
	
	@Override
	public void borrarDocRecurso(String name, String id) throws Exception {
		Path docRecursosFolder2 = Paths.get(docRecursosFolder.toString(), id);
		Path file = docRecursosFolder2.resolve(name);
		Files.deleteIfExists(file);
	}
	
	@Override
	public void borrarCarpetaDocRecurso(String id) throws Exception {
		Path carpeta = docRecursosFolder.resolve(id);
		Files.walk(carpeta).sorted(Comparator.reverseOrder()).map(Path::toFile).forEach(File::delete);
	}

	@Override
	public Resource loadDocRecurso(String name, String id) throws Exception {
		Path docRecursosFolder2 = Paths.get(docRecursosFolder.toString(), id);
		Path file = docRecursosFolder2.resolve(name);
		Resource resource = new UrlResource(file.toUri());
		return resource;
	}
	
	@Override
	public Resource loadDocRecurso(String name) throws Exception {
		Path file = docRecursosFolder.resolve(name);
		Resource resource = new UrlResource(file.toUri());
		return resource;
	}

	@Override
	public void saveDocRecursos(List<MultipartFile> files, String id) throws Exception {
		for (MultipartFile file : files) {
			this.saveDocRecurso(file, id);
		}
	}

	@Override
	public Stream<Path> loadAllDocRecursos(String id) throws Exception {
		Path docRecursosFolder2 = Paths.get(docRecursosFolder.toString(), id);
		return Files.walk(docRecursosFolder2, 1).filter(path -> !path.equals(docRecursosFolder2)).map(docRecursosFolder2::relativize);
	}

	// ************************************************************
	// Métodos para tratar los ficheros asociados a las solicitudes
	// ************************************************************
	
	@Override
	public void saveDocSolicitud(MultipartFile file, String id) throws Exception {
		Path docSolicitudesFolder2 = Paths.get(docSolicitudesFolder.toString(), id);
		Files.createDirectories(docSolicitudesFolder2);
		Files.copy(file.getInputStream(), docSolicitudesFolder2.resolve(file.getOriginalFilename()));
	}
	
	@Override
	public void borrarDocSolicitud(String name, String id) throws Exception {
		Path docSolicitudesFolder2 = Paths.get(docSolicitudesFolder.toString(), id);
		Path file = docSolicitudesFolder2.resolve(name);
		Files.deleteIfExists(file);
	}
	
	@Override
	public void borrarCarpetaDocSolicitud(String id) throws Exception {
		Path carpeta = docSolicitudesFolder.resolve(id);
		Files.walk(carpeta).sorted(Comparator.reverseOrder()).map(Path::toFile).forEach(File::delete);
	}

	@Override
	public Resource loadDocSolicitud(String name, String id) throws Exception {
		Path docSolicitudesFolder2 = Paths.get(docSolicitudesFolder.toString(), id);
		Path file = docSolicitudesFolder2.resolve(name);
		Resource resource = new UrlResource(file.toUri());
		return resource;
	}
	
	@Override
	public Resource loadDocSolicitud(String name) throws Exception {
		Path file = docSolicitudesFolder.resolve(name);
		Resource resource = new UrlResource(file.toUri());
		return resource;
	}

	@Override
	public void saveDocSolicitudes(List<MultipartFile> files, String id) throws Exception {
		for (MultipartFile file : files) {
			this.saveDocSolicitud(file, id);
		}
	}

	@Override
	public Stream<Path> loadAllDocSolicitudes(String id) throws Exception {
		Path docSolicitudesFolder2 = Paths.get(docSolicitudesFolder.toString(), id);
		return Files.walk(docSolicitudesFolder2, 1).filter(path -> !path.equals(docSolicitudesFolder2)).map(docSolicitudesFolder2::relativize);
	}


}
