package io.whister.vendasapi.controller;


import io.whister.vendasapi.dto.ProdutoRequestDTO;
import io.whister.vendasapi.dto.ProdutoResponseDTO;
import io.whister.vendasapi.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin("*")
public class ProdutoController {

    @Autowired
    private ProdutoService service;

    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> cadastrar(@RequestBody ProdutoRequestDTO produtoRequestDTO) {

        ProdutoResponseDTO produtoResponseDTO = service.cadastrar(produtoRequestDTO);
        System.out.println(produtoResponseDTO);
        //                    avisa que foi criado      vai transformar em Json pra retornar
        return ResponseEntity.status(HttpStatus.CREATED).body(produtoResponseDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> atualizar(@PathVariable Long id, @RequestBody ProdutoRequestDTO produtoRequestDTO) {
        return ResponseEntity.ok().body(service.atualizar(id, produtoRequestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<ProdutoResponseDTO> listar(){
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.buscarPorId(id));
    }


}
