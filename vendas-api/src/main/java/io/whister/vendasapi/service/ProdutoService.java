package io.whister.vendasapi.service;


import io.whister.vendasapi.dto.ProdutoRequestDTO;
import io.whister.vendasapi.dto.ProdutoResponseDTO;
import io.whister.vendasapi.entity.Produto;
import io.whister.vendasapi.mapper.ProdutoMapper;
import io.whister.vendasapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    // ingeçao de dependencia
    @Autowired
    private ProdutoRepository repository;

    @Autowired
    private ProdutoMapper mapper;

    public ProdutoResponseDTO cadastrar(ProdutoRequestDTO produtoRequestDTO) {

        //vai chamar o metodo e vai transformar em entidade pra salvear no banco
        Produto produto = mapper.toEntity(produtoRequestDTO);
        produto.setDataCadastro(LocalDate.now());

        //salvei no banco
        produto = repository.save(produto);

        return mapper.toResponse(produto);
    }

    public List<ProdutoResponseDTO> listar() {
        List<Produto> produtos = repository.findAllByOrderByIdAsc();
        return mapper.toResponseList(produtos);
    }

    public ProdutoResponseDTO buscarPorId(Long id) {
        Produto produto =  repository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("Produto não encontrado"));
        return mapper.toResponse(produto);

    }

    public ProdutoResponseDTO atualizar(Long id, ProdutoRequestDTO prodRequestDTO) {
        Produto produto = repository.findById(id).orElseThrow();

        if (prodRequestDTO.sku() != null) {
            produto.setSku(prodRequestDTO.sku());
        }

        if (prodRequestDTO.nome() != null) {
            produto.setNome(prodRequestDTO.nome());
        }

        if (prodRequestDTO.preco() != null) {
            produto.setPreco(prodRequestDTO.preco());
        }

        if (prodRequestDTO.descricao() != null) {
            produto.setDescricao(prodRequestDTO.descricao());
        }

        return mapper.toResponse(repository.save(produto));
    }


    public void deletar(Long id) {
        repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Carro com id " + id + "não encontrado"));

        repository.deleteById(id);

    }
}


