package io.whister.vendasapi.repository;

import io.whister.vendasapi.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
