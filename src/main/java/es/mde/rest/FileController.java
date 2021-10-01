package es.mde.rest;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import es.mde.models.File;
import es.mde.models.Response;
import es.mde.servicios.FileServiceAPI;

@RestController
//@CrossOrigin("*")
@RequestMapping("/api/files")
public class FileController {

	@Autowired
	private FileServiceAPI fileServiceAPI;

//	@PostMapping("/subirEscudos")
//	public ResponseEntity<Response> uploadFileEscudos(@RequestParam("files") List<MultipartFile> files) throws Exception {
//		fileServiceAPI.save(files);
//		return ResponseEntity.status(HttpStatus.OK)
//				.body(new Response("Los archivos fueron cargados correctamente al servidor"));
//	}
	
	@PostMapping("/subirEscudo")
	public ResponseEntity<Response> uploadFileEscudo(@RequestParam("file") MultipartFile file) throws Exception {
		fileServiceAPI.saveEscudo(file);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response("El archivo fue cargado correctamente al servidor"));
	}
	
	@GetMapping("/borrarEscudo/{filename:.+}")
	public ResponseEntity<Response> borrarFileEscudo(@PathVariable String filename) throws Exception {
		fileServiceAPI.borrarEscudo(filename);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response("El archivo fue borrado correctamente del servidor"));
	}

	@GetMapping("/escudos/{filename:.+}")
	public ResponseEntity<Resource> getFileEscudo(@PathVariable String filename) throws Exception {
		Resource resource = fileServiceAPI.loadEscudo(filename);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	
	@GetMapping("/escudos/all")
	public ResponseEntity<List<File>> getAllFilesEscudos() throws Exception {
		List<File> files = fileServiceAPI.loadAllEscudos().map(path -> {
			String filename = path.getFileName().toString();
			String url = MvcUriComponentsBuilder.fromMethodName(FileController.class, "getFileEscudo", path.getFileName().toString()).build().toString();
			
			return new File(filename, url);
		}).collect(Collectors.toList());
		
		return ResponseEntity.status(HttpStatus.OK).body(files);
	}

	@PostMapping("/subirDocRecurso")
	public ResponseEntity<Response> uploadFileDocRecurso(@RequestParam("file") MultipartFile file) throws Exception {
		fileServiceAPI.saveDocRecurso(file);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response("El archivo fue cargado correctamente al servidor"));
	}

	@GetMapping("/borrarDocRecurso/{filename:.+}")
	public ResponseEntity<Response> borrarFileDocRecurso(@PathVariable String filename) throws Exception {
		fileServiceAPI.borrarDocRecurso(filename);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response("El archivo fue borrado correctamente del servidor"));
	}
	
	@GetMapping("/docRecursos/{filename:.+}")
	public ResponseEntity<Resource> getFileDocRecurso(@PathVariable String filename) throws Exception {
		Resource resource = fileServiceAPI.loadDocRecurso(filename);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	
	@GetMapping("/docRecursos/all")
	public ResponseEntity<List<File>> getAllFilesDocRecursos() throws Exception {
		List<File> files = fileServiceAPI.loadAllDocRecursos().map(path -> {
			String filename = path.getFileName().toString();
			String url = MvcUriComponentsBuilder.fromMethodName(FileController.class, "getFileDocRecurso", path.getFileName().toString()).build().toString();
			
			return new File(filename, url);
		}).collect(Collectors.toList());
		
		return ResponseEntity.status(HttpStatus.OK).body(files);
	}

	@PostMapping("/subirDocSolicitud")
	public ResponseEntity<Response> uploadFileDocSolicitud(@RequestParam("file") MultipartFile file) throws Exception {
		fileServiceAPI.saveDocSolicitud(file);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response("El archivo fue cargado correctamente al servidor"));
	}

	@GetMapping("/borrarDocSolicitud/{filename:.+}")
	public ResponseEntity<Response> borrarFileDocSolicitud(@PathVariable String filename) throws Exception {
		fileServiceAPI.borrarDocSolicitud(filename);
		return ResponseEntity.status(HttpStatus.OK)
				.body(new Response("El archivo fue borrado correctamente del servidor"));
	}
	
	@GetMapping("/docSolicitudes/{filename:.+}")
	public ResponseEntity<Resource> getFileDocSolicitud(@PathVariable String filename) throws Exception {
		Resource resource = fileServiceAPI.loadDocSolicitud(filename);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	
	@GetMapping("/docSolicitudes/all")
	public ResponseEntity<List<File>> getAllFilesDocSolicitud() throws Exception {
		List<File> files = fileServiceAPI.loadAllDocSolicitudes().map(path -> {
			String filename = path.getFileName().toString();
			String url = MvcUriComponentsBuilder.fromMethodName(FileController.class, "getFileDocSolicitud", path.getFileName().toString()).build().toString();
			
			return new File(filename, url);
		}).collect(Collectors.toList());
		
		return ResponseEntity.status(HttpStatus.OK).body(files);
	}

}
