package es.mde.security.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import es.mde.security.auth.AuthResponse;
import es.mde.security.auth.LoginRequest;
import es.mde.security.auth.RegisterRequest;
import es.mde.security.usuarios.Usuario;
import es.mde.security.usuarios.UsuarioDAO;
import es.mde.security.usuarios.UsuarioSuperadministrador;
import es.mde.security.usuarios.UsuarioSuperadministradorDAO;

@Service
public class AuthService {

	private final UsuarioDAO usuarioDAO;
	private final UsuarioSuperadministradorDAO usuarioSuperadministradorDAO;
	private final JwtService jwtService;
	private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
		
	public AuthService(UsuarioDAO usuarioDAO,UsuarioSuperadministradorDAO usuarioSuperadministradorDAO, JwtService jwtService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
		this.usuarioDAO = usuarioDAO;
		this.usuarioSuperadministradorDAO = usuarioSuperadministradorDAO;
		this.jwtService = jwtService;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager  = authenticationManager;
	}

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        Usuario user=usuarioDAO.findByUsername(request.getUsername()).orElseThrow();
        String token=jwtService.getToken(user);
        
		AuthResponse authResponse = new AuthResponse(token, request.getUsername(), user.getRol());

        return authResponse;
	}
	
	public AuthResponse register(RegisterRequest request) {
				
		UsuarioSuperadministrador usuario = new UsuarioSuperadministrador();
		usuario.setUsername(request.getUsername());
		usuario.setPassword(passwordEncoder.encode(request.getPassword()));
		usuario.setEmail(request.getEmail());
		usuario.setTfno(request.getTfno());
		usuario.setDescripcion(request.getDescripcion());
		usuario.setEmailAdmitido(request.isEmailAdmitido());
		usuario.setRol(request.getRol());
		
		usuarioSuperadministradorDAO.save(usuario);
		
		AuthResponse authResponse = new AuthResponse(jwtService.getToken(usuario), usuario.getUsername(), usuario.getRol());
		
		return authResponse;
	}

}
