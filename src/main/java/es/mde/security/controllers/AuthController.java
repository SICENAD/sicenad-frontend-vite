package es.mde.security.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import es.mde.security.auth.AuthResponse;
import es.mde.security.auth.ChangePasswordRequest;
import es.mde.security.auth.LoginRequest;
import es.mde.security.auth.RegisterRequest;
import es.mde.security.services.AuthService;


@RestController
public class AuthController {
    
    private final AuthService authService;
        
    public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/api/auth/login")
    @ResponseBody
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request)
    {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/api/auth/register")
    @ResponseBody
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request)
    {
        return ResponseEntity.ok(authService.register(request));
    }
    
    @PostMapping("/api/auth/change-password")
    @ResponseBody
    public ResponseEntity<AuthResponse> changePassword(@RequestBody ChangePasswordRequest request)
    {
        return ResponseEntity.ok(authService.changePassword(request));
    }
}
