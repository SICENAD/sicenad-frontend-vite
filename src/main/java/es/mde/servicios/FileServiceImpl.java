package es.mde.servicios;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileServiceAPI {

	private final Path escudosFolder = Paths.get("archivos/escudos");
	private final Path docSolicitudesFolder = Paths.get("archivos/docSolicitudes");
	private final Path docRecursosFolder = Paths.get("archivos/docRecursos");

	@Override
	public void saveEscudo(MultipartFile file) throws Exception {
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
		for (MultipartFile file : files) {
			this.saveEscudo(file);
		}
	}

	@Override
	public Stream<Path> loadAllEscudos() throws Exception {
		return Files.walk(escudosFolder, 1).filter(path -> !path.equals(escudosFolder)).map(escudosFolder::relativize);
	}

	@Override
	public void saveDocRecurso(MultipartFile file) throws Exception {
		Files.copy(file.getInputStream(), this.docRecursosFolder.resolve(file.getOriginalFilename()));
	}
	
	@Override
	public void borrarDocRecurso(String name) throws Exception {
		Path file = docRecursosFolder.resolve(name);
		Files.deleteIfExists(file);
	}

	@Override
	public Resource loadDocRecurso(String name) throws Exception {
		Path file = docRecursosFolder.resolve(name);
		Resource resource = new UrlResource(file.toUri());
		return resource;
	}

	@Override
	public void saveDocRecursos(List<MultipartFile> files) throws Exception {
		for (MultipartFile file : files) {
			this.saveDocRecurso(file);
		}
	}

	@Override
	public Stream<Path> loadAllDocRecursos() throws Exception {
		return Files.walk(docRecursosFolder, 1).filter(path -> !path.equals(docRecursosFolder)).map(docRecursosFolder::relativize);
	}

	@Override
	public void saveDocSolicitud(MultipartFile file) throws Exception {
		Files.copy(file.getInputStream(), this.docSolicitudesFolder.resolve(file.getOriginalFilename()));
	}
	
	@Override
	public void borrarDocSolicitud(String name) throws Exception {
		Path file = docSolicitudesFolder.resolve(name);
		Files.deleteIfExists(file);
	}

	@Override
	public Resource loadDocSolicitud(String name) throws Exception {
		Path file = docSolicitudesFolder.resolve(name);
		Resource resource = new UrlResource(file.toUri());
		return resource;
	}

	@Override
	public void saveDocSolicitudes(List<MultipartFile> files) throws Exception {
		for (MultipartFile file : files) {
			this.saveDocSolicitud(file);
		}
	}

	@Override
	public Stream<Path> loadAllDocSolicitudes() throws Exception {
		return Files.walk(docSolicitudesFolder, 1).filter(path -> !path.equals(docSolicitudesFolder)).map(docSolicitudesFolder::relativize);
	}


}
