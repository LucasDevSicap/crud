$(document).ready(function () {
  function initializeSelects() {
      $(".form-select").select2({
          width: "100%",
          dropdownParent: $(".modal-content"),
      });
  }

  function applyMasks() {
      $("#cpf").mask("000.000.000-00");
      $("#telephone").mask("(00) 9 0000-0000");
  }

  $("#cadastroModal").on("show.bs.modal", function () {
      initializeSelects();
      applyMasks();
  });

  function loadUsers() {
      $.ajax({
          url: "http://localhost/crud-php/read.php",
          type: "GET",
          dataType: 'json',
          success: function (response) {
              $("#results").empty();
              response.forEach(function(user) {
                  $("#results").append(`
                      <tr>
                          <td>${user.nome}</td>
                          <td>${user.cpf}</td>
                          <td>${user.cidade}</td>
                          <td>${user.email}</td>
                          <td>${user.telefone}</td>
                          <td>
                              <button type="button" class="btn btn-success" onclick="editUser(${user.id})">Editar</button>
                              <button type="button" class="btn btn-danger" onclick="remove(${user.id})">Excluir</button>
                          </td>
                      </tr>
                  `);
              });
          },
          error: function (jqXHR, textStatus, errorThrown) {
              console.error(`Erro: ${textStatus} - ${errorThrown}`);
              Swal.fire("Erro!", "Ocorreu um erro ao carregar os dados. Tente novamente.", "error");
          },
      });
  }

  window.editUser = function(id) {
      $.ajax({
          url: `http://localhost/crud-php/usuario_por_id.php?id=${id}`,
          type: "GET",
          dataType: 'json',
          success: function (user) {
              $("#name").val(user.nome);
              $("#cpf").val(user.cpf);
              $("#telephone").val(user.telefone);
              $("#email").val(user.email);
              $("#cidade").val(user.cidade);
              $("#estado").val(user.estado).trigger('change');
              $("#especialidade").val(user.especialidade).trigger('change');
              $("#stack").val(user.stack).trigger('change');
              $("#observacao").val(user.observacao);

              $("#btn").off("click").on("click", function() { updateUser(id); });
              $("#btn").text("Atualizar");
              $("#cadastroModal").modal("show");
          },
          error: function (jqXHR, textStatus, errorThrown) {
              Swal.fire("Erro!", "Ocorreu um erro ao carregar os dados do usuário. Tente novamente.", "error");
          },
      });
  };

  window.remove = function(id) {
      Swal.fire({
          title: 'Tem certeza?',
          text: "Você não poderá reverter isso!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim, deletar!',
          cancelButtonText: 'Cancelar'
      }).then((result) => {
          if (result.isConfirmed) {
              $.ajax({
                  url: `http://localhost/crud-php/remove.php?id=${id}`,
                  type: "DELETE",
                  success: function (response) {
                      Swal.fire("Sucesso!", response.message, "success");
                      loadUsers(); 
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                      Swal.fire("Erro!", "Ocorreu um erro ao excluir. Tente novamente.", "error");
                  },
              });
          }
      });
  };

  function createUser() {
      const userData = {
          name: $("#name").val(),
          cpf: $("#cpf").val(),
          telephone: $("#telephone").val(),
          email: $("#email").val(),
          cidade: $("#cidade").val(),
          estado: $("#estado").val(),
          especialidade: $("#especialidade").val(),
          stack: $("#stack").val(),
          observacao: $("#observacao").val(),
      };

      $.ajax({
          url: "http://localhost/crud-php/cadastro.php",
          type: "POST",
          data: userData,
          success: function (response) {
              Swal.fire("Sucesso!", response.message, "success");
              $("#cadastroModal").modal("hide");
              loadUsers();
          },
          error: function (jqXHR, textStatus, errorThrown) {
              Swal.fire("Erro!", "Ocorreu um erro ao cadastrar. Tente novamente.", "error");
          },
      });
  }

  function updateUser(id) {
      const userData = {
          id: id,
          name: $("#name").val(),
          cpf: $("#cpf").val(),
          telephone: $("#telephone").val(),
          email: $("#email").val(),
          cidade: $("#cidade").val(),
          estado: $("#estado").val(),
          especialidade: $("#especialidade").val(),
          stack: $("#stack").val(),
          observacao: $("#observacao").val(),
      };

      $.ajax({
          url: "http://localhost/crud-php/update.php", // Altere para o seu endpoint de atualização
          type: "POST",
          data: userData,
          success: function (response) {
              Swal.fire("Sucesso!", response.message, "success");
              $("#cadastroModal").modal("hide");
              loadUsers();
          },
          error: function (jqXHR, textStatus, errorThrown) {
              Swal.fire("Erro!", "Ocorreu um erro ao atualizar. Tente novamente.", "error");
          },
      });
  }

  $("#btn").on("click", function () {
      createUser();
  });

  loadUsers();
});
